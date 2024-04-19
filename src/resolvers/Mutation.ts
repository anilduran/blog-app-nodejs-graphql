import User from '../models/user'
import jwt from 'jsonwebtoken'
import bcrypt, { hash } from 'bcrypt'
import Post from '../models/post'
import Comment from '../models/comment'
import Category from '../models/category'
import ReadingList from '../models/reading_list'
import authenticate from '../middlewares/authenticate'
import { GraphQLError, graphql } from 'graphql'
import { v4 as uuidv4 } from 'uuid'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import s3 from '../utils/s3'

const Mutation = {
    async signIn(parent, args, contextValue, info) {
    
        const user = await User.findOne({
            email: args.data.email
        })

        if (!user) {
            throw new Error('User does not exist!')
        }
        
        if (!(await bcrypt.compare(args.data.password, user.password))) {
            throw new Error('Password is wrong!')
        }

        const token = jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email
        }, process.env.SECRET, {
            expiresIn: '24h'
        })
        
        return token

    },
    async signUp(parent, args, contextValue, info) {

        const exists = await User.exists({
            $or: [
                {
                    username: args.data.username
                },
                {
                    email: args.data.email
                }
            ]
        })

        if (exists) {
            throw new Error('User already exists!')
        }

        const hashedPassword = await bcrypt.hash(args.data.password, 10)

        const user = new User({
            username: args.data.username,
            email: args.data.email,
            password: hashedPassword
        })

        await user.save()

        const token = jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email
        }, process.env.SECRET, {
            expiresIn: '24h'
        })

        return token

    },
    async createUser(parent, args, contextValue, info) {
        authenticate(contextValue.token)
        const userExists = await User.exists({
            $or: [
                {
                    username: args.data.username
                },
                {
                    email: args.data.email
                }
            ]
        })        
        
        if (userExists) {
            throw new Error('User already exists!')
        }

        const hashedPassword = await bcrypt.hash(args.data.password, 10)

        const user = new User({ 
            username: args.data.username,
            email: args.data.email,
            password: hashedPassword
        })

        await user.save()

        return user

    },
    async updateUser(parent, args, contextValue, info) {
        const authenticatedUser = authenticate(contextValue.token)

        const user = await User.findById(args.id)

        if (user.id != authenticatedUser.id) {
            throw new GraphQLError('You are not authorized to update this user!')
        }

        const { username, email, password, profilePhotoUrl } = args.data

        if (username) {
            user.username = username
        }

        if (email) {
            user.email = email
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10)
            user.password = hashedPassword
        }

        if (profilePhotoUrl) {
            user.profilePhotoUrl = profilePhotoUrl
        }

        await user.save()
       
        return user

    },
    async deleteUser(parent, args, contextValue, info) {
        const authenticatedUser = authenticate(contextValue.token)
        const user = await User.findById(args.id)

        if (user.id != authenticatedUser.id) {
            throw new GraphQLError('You are not authorized to delete this user!')
        }

        const deletedUser = await User.findByIdAndDelete(args.id)
        return deletedUser
    },
    async createPost(parent, args, contextValue, info) {
        const user = authenticate(contextValue.token)
        const { title, description, content, imageUrl, isVisible } = args.data
        console.log(user)
        const post = new Post({ title, description, content, imageUrl, isVisible, author: user.id })
        await post.save()
        return post
    },
    async updatePost(parent, args, contextValue, info) {
        const user = authenticate(contextValue.token)

        const { title, description, content, imageUrl, isVisible } = args.data

        const post = await Post.findById(args.id)

        if (post.author.toString() != user.id) {
            throw new GraphQLError('You are not authorized to update this post!')
        }
        
        if (title) {
            post.title = title
        }

        if (description) {
            post.description = description
        }

        if (content) {
            post.content = content
        }

        if (imageUrl) {
            post.imageUrl = imageUrl
        }

        if (typeof isVisible !== 'undefined' || isVisible !== null) {
            post.isVisible = isVisible
        }

        await post.save()

        return post

    },
    async deletePost(parent, args, contextValue, info) {
        const user = authenticate(contextValue.token)
        
        const post = await Post.findById(args.id)

        if (post.author.toString() != user.id) {
            throw new GraphQLError('You are not authorized to delete this post!')
        }
        
        const deletedPost = await Post.findByIdAndDelete(args.id)
        
        return deletedPost
    },
    async createComment(parent, args, contextValue, info) {
        const user = authenticate(contextValue.token)
        const { content, post } = args.data
        const comment = new Comment({ content, post, user: user.id })
        await comment.save()
        return comment
    },
    async updateComment(parent, args, contextValue, info) {
        const user = authenticate(contextValue.token)

        const comment = await Comment.findById(args.id)
        
        if (comment.user.toString() != user.id) {
            throw new GraphQLError('You are not authorized to update this comment!')
        }

        if (args.data.content) {
            comment.content = args.data.content
        }

        await comment.save()

        return comment
    },
    async deleteComment(parent, args, contextValue, info) {
        const user = authenticate(contextValue.token)
        const comment = await Comment.findById(args.id)
      
        if (comment.user.toString() != user.id) {
            throw new GraphQLError('You are not authorized to delete this comment!')
        }

        const deletedComment = await Comment.findByIdAndDelete(args.id)
        return deletedComment
    },
    async createCategory(parent, args, contextValue, info) {
        authenticate(contextValue.token)
        const { name, description } = args.data
        const category = new Category({ name, description })
        await category.save()
        return category
    },
    async updateCategory(parent, args, contextValue, info) {    
        authenticate(contextValue.token)
        const { name, description } = args.data
        const category = await Category.findById(args.id)

        if (name) {
            category.name = name
        }

        if (description) {
            category.description = description
        }

        await category.save()
        return category

    },
    async deleteCategory(parent, args, contextValue, info) {
        authenticate(contextValue.token)
        const category = await Category.findByIdAndDelete(args.id)
        return category
    },
    async createReadingList(parent, args, contextValue, info) {
        const user = authenticate(contextValue.token)
        const { name, description, imageUrl } = args.data
        const readingList = new ReadingList({ name, description, creator: user.id, imageUrl })
        await readingList.save()
        return readingList
    },
    async updateReadingList(parent, args, contextValue, info) {
        const user = authenticate(contextValue.token)
        
        const { name, description, imageUrl } = args.data

        const readingList = await ReadingList.findById(args.id)

        if (readingList.creator.toString() != user.id) {
            throw new GraphQLError('You are not authorized to update this reading list!')
        }

        if (name) {
            readingList.name = name
        }

        if (description) {
            readingList.description = description
        }

        if (imageUrl) {
            readingList.imageUrl = imageUrl
        }

        await readingList.save()

        return readingList

    },
    async deleteReadingList(parent, args, contextValue, info) {
        const user = authenticate(contextValue.token)
        const readingList = await ReadingList.findById(args.id)

        if (readingList.creator.toString() != user.id) {
            throw new GraphQLError('You are not authorized to delete this reading list!')
        }
        
        const deletedReadingList = await ReadingList.findByIdAndDelete(args.id)
        return deletedReadingList
    },
    async addPostToReadingList(parent, args, contextValue, info) {
        const user = authenticate(contextValue.token)

        const readingList = await ReadingList.findById(args.readingList)

        if (readingList.creator.toString() != user.id) {
            throw new GraphQLError('You are not authorized to perform this action!')
        }

        const post = await Post.findById(args.post)
        
        readingList.posts.push(post.id)

        await post.save()

        return readingList
    
    },
    async removePostFromReadingList(parent, args, contextValue, info) {
        const user = authenticate(contextValue.token)
        
        const readingList = await ReadingList.findById(args.readingList)

        if (readingList.creator.toString() != user.id) {
            throw new GraphQLError('You are not authorized to perform this action!')
        }

        const post = await Post.findById(args.post)

        await ReadingList.updateOne({  _id: readingList.id }, { $pull: { posts: post.id } })

        return post
    
    },
    async createPresignedUrlForImage(parent, args, contextValue, info) {
        const user = authenticate(contextValue.token)

        try {
            const key = `images/${user.id}/${uuidv4()}.jpeg`

            const command = new PutObjectCommand({
                Bucket: process.env.bucket,
                Key: key,
                ContentType: 'image/jpeg'
            })

            const url = await getSignedUrl(s3, command, { expiresIn: 60 * 5 })

            return { url, key }

        } catch(error) {
            throw new GraphQLError('Failed to create presigned url!')
        }

    }
}

export { Mutation as default }
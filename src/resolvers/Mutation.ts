import User from '../models/user'
import jwt from 'jsonwebtoken'
import bcrypt, { hash } from 'bcrypt'
import Post from '../models/post'
import Comment from '../models/comment'
import Category from '../models/category'
import Bookmark from '../models/bookmark'
import ReadingList from '../models/reading_list'

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
            username: user.username,
            email: user.email
        }, process.env.SECRET, {
            expiresIn: '24h'
        })

        return token

    },
    async createUser(parent, args, contextValue, info) {
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

        const user = await User.findById(args.id)

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
        const user = await User.findByIdAndDelete(args.id)
        return user
    },
    async createPost(parent, args, contextValue, info) {
        const { title, description, content, imageUrl, isVisible, author } = args.data
        const post = new Post({ title, description, content, imageUrl, isVisible, author })
        await post.save()
        return post
    },
    async updatePost(parent, args, contextValue, info) {

        const { title, description, content, imageUrl, isVisible } = args.data

        const post = await Post.findById(args.id)
        
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
        const post = await Post.findByIdAndDelete(args.id)
        return post
    },
    async createComment(parent, args, contextValue, info) {
        const { content, post, user } = args.data
        const comment = new Comment({ content, post, user })
        await comment.save()
        return comment
    },
    async updateComment(parent, args, contextValue, info) {
        const comment = await Comment.findById(args.id)
        if (args.data.content) {
            comment.content = args.data.content
        }
        await comment.save()
        return comment
    },
    async deleteComment(parent, args, contextValue, info) {
        const comment = await Comment.findByIdAndDelete(args.id)
        return comment
    },
    async createCategory(parent, args, contextValue, info) {
        const { name, description } = args.data
        const category = new Category({ name, description })
        await category.save()
        return category
    },
    async updateCategory(parent, args, contextValue, info) {    

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
        const category = await Category.findByIdAndDelete(args.id)
        return category
    },
    async createBookmark(parent, args, contextValue, info) {
        const { user, post } = args.data
        const bookmark = new Bookmark({ user, post })
        await bookmark.save()
        return bookmark
    },
    async deleteBookmark(parent, args, contextValue, info) {
        const bookmark = await Bookmark.findByIdAndDelete(args.id)
        return bookmark
    },
    async createReadingList(parent, args, contextValue, info) {
        const { name, description, creator, imageUrl } = args.data
        const readingList = new ReadingList({ name, description, creator, imageUrl })
        await readingList.save()
        return readingList
    },
    async updateReadingList(parent, args, contextValue, info) {
        
        const { name, description, imageUrl } = args.data

        const readingList = await ReadingList.findById(args.id)

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
        const readingList = await ReadingList.findByIdAndDelete(args.id)
        return readingList
    },
    async addPostToReadingList(parent, args, contextValue, info) {
        
    },
    async removePostFromReadingList(parent, args, contextValue, info) {

    }
}

export { Mutation as default }
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
        }, process.env.SALT, {
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
        }, process.env.SALT, {
            expiresIn: '24h'
        })

        return token

    },
    async createUser(parent, args, contextValue, info) {
        
    },
    async updateUser(parent, args, contextValue, info) {

    },
    async deleteUser(parent, args, contextValue, info) {

    },
    async createPost(parent, args, contextValue, info) {
        const { title, description, content, imageUrl, isVisible, authorId } = args.data
        const post = new Post({ title, description, content, imageUrl, isVisible, authorId })
        await post.save()
        return post
    },
    async updatePost(parent, args, contextValue, info) {

    },
    async deletePost(parent, args, contextValue, info) {
        const post = await Post.findByIdAndDelete(args.id)
        return post
    },
    async createComment(parent, args, contextValue, info) {
        const { content, postId, userId } = args.data
        const comment = new Comment({ content, postId, userId })
        await comment.save()
        return comment
    },
    async updateComment(parent, args, contextValue, info) {

    },
    async deleteComment(parent, args, contextValue, info) {

    },
    async createCategory(parent, args, contextValue, info) {
        const { name, description } = args.data
        const category = new Category({ name, description })
        await category.save()
        return category
    },
    async updateCategory(parent, args, contextValue, info) {

    },
    async deleteCategory(parent, args, contextValue, info) {

    },
    async createBookmark(parent, args, contextValue, info) {
        const { userId, postId } = args.data
        const bookmark = new Bookmark({ userId, postId })
        await bookmark.save()
        return bookmark
    },
    async deleteBookmark(parent, args, contextValue, info) {

    },
    async createReadingList(parent, args, contextValue, info) {
        const { name, description, creatorId } = args.data
        const readingList = new ReadingList({ name, description, creatorId, })
        await readingList.save()
        return readingList
    },
    async updateReadingList(parent, args, contextValue, info) {
    
    },
    async deleteReadingList(parent, args, contextValue, info) {
        
    }
}

export { Mutation as default }
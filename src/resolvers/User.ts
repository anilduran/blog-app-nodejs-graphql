import Comment from "../models/comment"
import Post from "../models/post"
import { default as UserModel } from '../models/user'

const User = {
    async posts(parent, args, contextValue, info) {
        const posts = await Post.find({
            author: parent.id
        })
        return posts
    },
    async comments(parent, args, contextValue, info) {
        const comments = await Comment.find({
            user: parent.id
        })
        return comments
    },
    async bookmarks(parent, args, contextValue, info) {
        const user = await UserModel.findById(parent.id).populate('bookmarks').exec()
        return user.bookmarks
    }
}

export { User as default }
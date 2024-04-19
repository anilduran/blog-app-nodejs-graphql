import Comment from "../models/comment"
import User from "../models/user"
import { default as PostModel } from '../models/post'

const Post = {
    async author(parent, args, contextValue, info) {
        const user = await User.findById(parent.author)
        return user
    },
    async comments(parent, args, contextValue, info) {
        const comments = await Comment.find({
            postId: parent.id
        })
        return comments
    },
    async categories(parent, args, contextValue, info) {
        const post = await PostModel.findById(parent.id).populate('categories').exec()
        return post.categories
    },
}

export { Post as default }
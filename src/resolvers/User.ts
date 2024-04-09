import Comment from "../models/comment"
import Post from "../models/post"

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
    }
}

export { User as default }
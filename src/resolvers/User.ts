import Comment from "../models/comment"
import Post from "../models/post"

const User = {
    async posts(parent, args, contextValue, info) {
        const posts = await Post.find({
            authorId: parent.id
        })
        return posts
    },
    async comments(parent, args, contextValue, info) {
        const comments = await Comment.find({
            userId: parent.id
        })
        return comments
    }
}

export { User as default }
import Post from "../models/post"
import User from "../models/user"

const Bookmark = {
    async post(parent, args, contextValue, info) {
        const post = await Post.findById(parent.postId)
        return post
    },
    async user(parent, args, contextValue, info) {
        const user = await User.findById(parent.userId)
        return user        
    }
}

export { Bookmark as default }
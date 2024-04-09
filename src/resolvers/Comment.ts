import Post from "../models/post"
import User from "../models/user"

const Comment = {
    async post(parent, args, contextValue, info) {
        const post = await Post.findById(parent.post)
        return post
    },
    async user(parent, args, contextValue, info) {
        const user = await User.findById(parent.user)
        return user        
    }
}

export { Comment as default }
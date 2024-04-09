import Post from "../models/post"
import User from "../models/user"

const Bookmark = {
    async post(parent, args, contextValue, info) {
        const post = await Post.findById(parent.post)
        return post
    },
    async user(parent, args, contextValue, info) {
        const user = await User.findById(parent.user)
        return user        
    }
}

export { Bookmark as default }
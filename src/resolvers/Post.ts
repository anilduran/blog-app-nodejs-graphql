import Bookmark from "../models/bookmark"
import Comment from "../models/comment"
import User from "../models/user"

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

    },
    async bookmarks(parent, args, contextValue, info) {
        const bookmarks = await Bookmark.find({
            postId: parent.id
        })
        return bookmarks
    }
}

export { Post as default }
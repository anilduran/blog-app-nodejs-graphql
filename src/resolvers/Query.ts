import authenticate from '../middlewares/authenticate';
import Bookmark from '../models/bookmark';
import Category from '../models/category';
import Comment from '../models/comment';
import Post from '../models/post';
import ReadingList from '../models/reading_list';
import User from '../models/user'


const Query = {
    async users(parent, args, contextValue, info) {
        authenticate(contextValue.token)
        const users = await User.find()
        return users
    },
    async posts(parent, args, contextValue, info) {
        authenticate(contextValue.token)
        const posts = await Post.find()
        return posts
    },
    async categories(parent, args, contextValue, info) {
        authenticate(contextValue.token)
        const categories = await Category.find()
        return categories        
    },
    async bookmarks(parent, args, contextValue, info) {
        authenticate(contextValue.token)
        const bookmarks = await Bookmark.find()
        return bookmarks
    },
    async comments(parent, args, contextValue, info) {
        authenticate(contextValue.token)
        const comments = await Comment.find()
        return comments
    },
    async readingLists(parent, args, contextValue, info) {
        authenticate(contextValue.token)
        const readingLists = await ReadingList.find()
        return readingLists
    },
    async me(parent, args, contextValue, info) {
        const authenticatedUser = authenticate(contextValue.token)
        const user = await User.findById(authenticatedUser.id)
        return user
    }
}

export { Query as default }
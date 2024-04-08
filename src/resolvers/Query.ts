import Bookmark from '../models/bookmark';
import Category from '../models/category';
import Comment from '../models/comment';
import Post from '../models/post';
import ReadingList from '../models/reading_list';
import User from '../models/user'

const Query = {
    async users(parent, args, contextValue, info) {
        const users = await User.find()
        return users
    },
    async posts(parent, args, contextValue, info) {
        const posts = await Post.find()
        return posts
    },
    async categories(parent, args, contextValue, info) {
        const categories = await Category.find()
        return categories        
    },
    async bookmarks(parent, args, contextValue, info) {
        const bookmarks = await Bookmark.find()
        return bookmarks
    },
    async comments(parent, args, contextValue, info) {
        const comments = await Comment.find()
        return comments
    },
    async readingLists(parent, args, contextValue, info) {
        const readingLists = await ReadingList.find()
        return readingLists
    }
}

export { Query as default }
import authenticate from '../middlewares/authenticate';
import Category from '../models/category';
import Comment from '../models/comment';
import Post from '../models/post';
import ReadingList from '../models/reading_list';
import User from '../models/user'


const Query = {
    async users(parent, args, contextValue, info) {
        authenticate(contextValue.token)

        let query = {}

        if (args.cursor) {
            query = {
                _id: { $gt: args.cursor }
            }
        }


        const users = await User.find(query).limit(args.limit + 1).sort({ _id: 1 }).exec()

        const hasNextPage = users.length > args.limit
        const edges = hasNextPage ? users.slice(0, -1) : users
        const endCursor = edges[edges.length - 1]?._id
        
        return {
            edges,
            pageInfo: {
                hasNextPage,
                endCursor
            }
        }

    },
    async posts(parent, args, contextValue, info) {
        authenticate(contextValue.token)

        let query = {}

        if (args.cursor) {
            query = {
                _id: { $gt: args.cursor }
            }
        }


        const posts = await Post.find(query).limit(args.limit + 1).sort({ _id: 1 }).exec()

        const hasNextPage = posts.length > args.limit
        const edges = hasNextPage ? posts.slice(0, -1) : posts
        const endCursor = edges[edges.length - 1]?._id
        
        return {
            edges,
            pageInfo: {
                hasNextPage,
                endCursor
            }
        }
    },
    async categories(parent, args, contextValue, info) {
        authenticate(contextValue.token)
        
        let query = {}

        if (args.cursor) {
            query = {
                _id: { $gt: args.cursor }
            }
        }

        const categories = await Category.find(query).limit(args.limit + 1).sort({ _id: 1 }).exec()
        
        const hasNextPage = categories.length > args.limit
        const edges = hasNextPage ? categories.slice(0, -1) : categories
        const endCursor = edges[edges.length - 1]?._id

        return {
            edges,
            pageInfo: {
                hasNextPage,
                endCursor
            }
        }        
    },
    async comments(parent, args, contextValue, info) {
        authenticate(contextValue.token)

        let query = {}

        if (args.cursor) {
            query = {
                _id: { $gt: args.cursor }
            }
        }


        const comments = await Comment.find(query).limit(args.limit + 1).sort({ _id: 1 }).exec()

        const hasNextPage = comments.length > args.limit
        const edges = hasNextPage ? comments.slice(0, -1) : comments
        const endCursor = edges[edges.length - 1]?._id


        return {
            edges,
            pageInfo: {
                hasNextPage,
                endCursor
            }
        }
    },
    async readingLists(parent, args, contextValue, info) {
        authenticate(contextValue.token)

        let query = {}

        if (args.cursor) {
            query = {
                _id: { $gt: args.cursor }
            }
        }


        const readingLists = await ReadingList.find(query).limit(args.limit + 1).sort({ _id: 1 }).exec()

        const hasNextPage = readingLists.length > args.limit
        const edges = hasNextPage ? readingLists.slice(0, -1) : readingLists
        const endCursor = edges[edges.length - 1]?._id


        return {
            edges,
            pageInfo: {
                hasNextPage,
                endCursor
            }
        }
    },
    async me(parent, args, contextValue, info) {
        const authenticatedUser = authenticate(contextValue.token)
        const user = await User.findById(authenticatedUser.id)
        return user
    }
}

export { Query as default }
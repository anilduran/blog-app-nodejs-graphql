import User from '../models/user'

const Query = {
    async users(parent, args, ctx, info) {
        const users = await User.find();
        console.log(users)
        return users
    },
    async posts(parent, args, ctx, info) {

    },
    async categories(parent, args, ctx, info) {
        
    },
    async bookmarks(parent, args, ctx, info) {

    },
    async comments(parent, args, ctx, info) {

    }
}

export { Query as default }
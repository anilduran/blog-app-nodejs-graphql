import Post from "../models/post"

const Category = {
    async posts(parent, args, contextValue, info) {
        const posts = await Post.find({
            categories: parent.id
        })
        return posts
    }
}

export { Category as default }
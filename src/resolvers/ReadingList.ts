import User from "../models/user"
import { default as ReadingListModel } from '../models/reading_list'

const ReadingList = {
    async creator(parent, args, contextValue, info) {
        const creator = await User.findById(parent.creator)
        return creator
    },
    async posts(parent, args, contextValue, info)  {
        const readingList = await ReadingListModel.findById(parent.id).populate('posts').exec()
        return readingList.posts
    }

}

export { ReadingList as default }
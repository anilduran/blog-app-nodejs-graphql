import User from "../models/user"

const ReadingList = {
    async creator(parent, args, contextValue, info) {
        const creator = await User.findById(parent.creatorId)
        return creator
    }

}

export { ReadingList as default }
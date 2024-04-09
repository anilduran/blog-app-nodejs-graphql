import User from "../models/user"

const ReadingList = {
    async creator(parent, args, contextValue, info) {
        const creator = await User.findById(parent.creator)
        return creator
    },
    async posts(parent, args, contextValue, info)  {
        
    }

}

export { ReadingList as default }
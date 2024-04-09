import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'

const authenticate = token => {
    
    const user = jwt.verify(token, process.env.SECRET)

    if (!user) {
        throw new GraphQLError('User is not authenticated', {
            extensions: {
               http: {
                status: 401
               }
            }
        })
    }


}

export default authenticate
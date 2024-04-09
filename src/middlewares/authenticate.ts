import { GraphQLError, graphql } from 'graphql'
import jwt from 'jsonwebtoken'

const authenticate = (token): { id: string, username: string, email: string }  => {
    
    try {
        const user = jwt.verify(token, process.env.SECRET)

        if (!user) {
            throw new GraphQLError('User is not authenticated!', {
                extensions: {
                   http: {
                    status: 401
                   }
                }
            })
        }
    
        return user as { id: string, username: string, email: string }

    } catch(error) {
        throw new GraphQLError('Please provide an authorization token!', {
            extensions: {
                http: {
                    status: 400
                }
            }
        })
    }

}

export default authenticate
import { createServer } from 'node:http'
import { createSchema, createYoga } from 'graphql-yoga'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Category from './resolvers/Category'
import Bookmark from './resolvers/Bookmark'
import mongoose from 'mongoose'
import Comment from './resolvers/Comment'

const yoga = createYoga({
    schema: createSchema({
        typeDefs: readFileSync(join(__dirname, 'schema.graphql'), 'utf-8'),
        resolvers: {
            Query,
            Mutation,
            User,
            Post,
            Category,
            Bookmark,
            Comment
        }
    })
    
})

const bootstrap = async () => {
    try {
        const server = createServer(yoga);
        mongoose.connect('mongodb://localhost:27017/blogdb')
        server.listen(4000, () => {
            console.log('server is listening...')
        })
    } catch(error) {
        console.log(error)
    }
}

bootstrap()
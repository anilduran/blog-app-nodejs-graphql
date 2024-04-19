import dotenv from 'dotenv'
dotenv.config({
    path: __dirname + '/.env'
})
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Category from './resolvers/Category'
import mongoose from 'mongoose'
import Comment from './resolvers/Comment'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import ReadingList from './resolvers/ReadingList'


const server = new ApolloServer({
    typeDefs: readFileSync(join(__dirname, 'schema.graphql'), 'utf-8'),
    resolvers: {
        Query,
        Mutation,
        User,
        Post,
        Category,
        Comment,
        ReadingList
    }
})

const bootstrap = async () => {
    try {
        mongoose.connect('mongodb://localhost:27017/blogdb')
        const { url } = await startStandaloneServer(server, {
            listen: {port: 4000},
            context: async ({ req, res }) => {

                const token = req.headers.authorization || ''

                return {
                    token
                }
            }
        })
        console.log('server is listening on', url)
    } catch(error) {
        console.log(error)
    }
}

bootstrap()
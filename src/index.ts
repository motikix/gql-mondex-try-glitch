/**
 * モン図鑑
 */

import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchemaSync } from 'type-graphql'
import { MonResolver } from './resolvers'

const schema = buildSchemaSync({
  resolvers: [MonResolver],
})

const server = new ApolloServer({
  schema,
  playground: true,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

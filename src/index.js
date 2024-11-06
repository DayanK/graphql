import { createServer } from 'node:http';
import {  createSchema, createYoga} from 'graphql-yoga';
import path from "path";
import fs from "fs";

import { Query } from './resolvers/Query.mjs';
import { Todo } from './resolvers/Todo.mjs';
import { User } from './resolvers/User.mjs';
import { db } from './db/db.mjs';
import { Mutation } from './resolvers/Mutation.mjs';
import { Subscription } from './resolvers/Subscription.mjs';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub(); // Initialize PubSub

const __dirname = path.resolve();
// Load the schema
const typeDefsPath = fs.readFileSync(
  path.join(__dirname, './', 'src/schema', 'schema.graphql'),
  'utf8'
);


const yoga = createYoga({
  schema: createSchema({
    typeDefs: typeDefsPath,
    resolvers: {
      Query: Query,
      Todo: Todo,
      User : User,
      Mutation: Mutation,
      Subscription: Subscription
    },   
  }),
  context: () => ({
    db, // add `db` context
    pubSub
  }),

  maskedErrors: false,
});




const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
});
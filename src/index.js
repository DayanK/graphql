import { createServer } from 'node:http'
import {  createSchema, createYoga } from 'graphql-yoga';
import path from "path";
import fs from "fs";

import { Query } from './resolvers/Query.mjs';
import { Todo } from './resolvers/Todo.mjs';
import { User } from './resolvers/User.mjs';

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
      User : User
    }
  }),
  maskedErrors: false,
});

const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
});
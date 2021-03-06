# A simple program to test GraphQL Subscriptions aka Websocket implementation in Apollo Express Server v3

```index.js
const { createServer } = require("http");
const express = require("express");
const { execute, subscribe } = require("graphql");
const { ApolloServer } = require("apollo-server-express");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

(async () => {
  const PORT = 4000;
  const app = express();
  const httpServer = createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const server = new ApolloServer({
    schema,
  })
  await server.start();
  server.applyMiddleware({ app })
  SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  )
  httpServer.listen(PORT, () => {
    console.log(`🤘🧑‍💻 Endpoint ready at http://localhost:${PORT}${server.graphqlPath}`)
  })
})();

```
```resolvers.js
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const names = ['aseer, saad, faisal']
const resolvers = {
    Query: {
        name() {
            return names;
        },
    },
    Mutation: {
        addName(parent, { name }, context) {
            pubsub.publish('newName', { newName: name })
            names.push(name)
            return names
        }
    },
    Subscription: {
        newName: {
            subscribe: () => pubsub.asyncIterator(['newName'])
        },
    },
}
module.exports = resolvers
```
```schema.js
const { gql } = require("apollo-server-express");

const typeDefs = gql`
type Query {
  name: [String]!
}
type Mutation {
  addName(name: String!): [String]!
}
type Subscription {
  newName: String!  
}
`;
module.exports = typeDefs
```

```graphql query
subscription {
  newName
}

query Query {
  name
}

mutation {
  addName("aseer")
}
```


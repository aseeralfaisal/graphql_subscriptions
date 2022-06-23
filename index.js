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


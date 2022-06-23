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
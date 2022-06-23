# Subscriptions in Apollo Server v3

This example demonstrates a basic subscription operation in Apollo Server. [See the docs on subscriptions](https://www.apollographql.com/docs/apollo-server/data/subscriptions/)

A function that takes user input returns an array of names. A graphql subscription .i.e. websocket was implemented

```graphql
subscription {
  numberIncremented
}

query Query {
  name
}

mutation Mutation($name: String!) {
  addName(name: $name)
}
```


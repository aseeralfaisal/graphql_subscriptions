# Subscriptions in Apollo Server v3

This example demonstrates a basic subscription operation in Apollo Server. [See the docs on subscriptions](https://www.apollographql.com/docs/apollo-server/data/subscriptions/)

a function that takes user input returns an array of names. A graphql subscription .i.e. websocket was implemented

After you start up this server, you can test out running a subscription with the Apollo Studio Explorer or GraphQL Playground. You'll see the subscription's value update every second.

```graphql
subscription IncrementingNumber {
  numberIncremented
}
```

## Run locally

```shell
yarn install
yarn start
```

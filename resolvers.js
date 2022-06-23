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
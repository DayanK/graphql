// Subscription resolver
export const Subscription = {
  todo: {
    subscribe: (parent, args, { pubSub }, info) => {
      return pubSub.asyncIterator('todo'); // Channel name
    },
  },
};
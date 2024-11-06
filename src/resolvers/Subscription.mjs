// Subscription resolver
export const Subscription = {
  todo: {
    subscribe: (parent, args, { pubsub }, info) => {
      return pubsub.asyncIterator("todo"); // Channel name
    },
  },
};

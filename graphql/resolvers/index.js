const userResolver = require("./users");
const messageResolver = require("./messages");

module.exports = {
  Message: {
    createdAt: (parent) => parent.createdAt.toISOString(),
  },

  Query: {
    ...userResolver.Query,
    ...messageResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...messageResolver.Mutation,
  },
};

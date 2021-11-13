const { gql } = require("apollo-server");

// The GraphQL schema
module.exports = gql`
  type User {
    username: String!
    email: String!
    createdAt: String!
    token: String
  }

  type Message {
    uuid: String!
    content: String!
    from: String!
    to: String!
    createdAt: String!
  }

  type Query {
    getUsers: [User]!
    login(username: String!, password: String!): User!
    getMessages(from: String!): [Message]!
  }

  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
      imageUrl: String
    ): User!

    sendMessage(to: String!, content: String!): Message!
  }
`;

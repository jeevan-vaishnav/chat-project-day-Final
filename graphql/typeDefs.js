const { gql } = require("apollo-server");

// The GraphQL schema
module.exports = gql`
  type User {
    username: String!
    email: String!
  }

  type Query {
    getUsers: [User]!
  }

  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
      imageUrl: String
    ): User!
  }
`;

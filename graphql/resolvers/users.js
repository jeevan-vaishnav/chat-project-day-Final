const bycrpt = require("bcryptjs");
const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/env.json");
const { Message, User } = require("../../models");
const { Op } = require("sequelize");

// A map of functions which return data for the schema.
module.exports = {
  Query: {
    getUsers: async (_, __, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");

        let users = await User.findAll({
          attributes: ["username", "imageUrl", "createdAt"],
          where: { username: { [Op.ne]: user.username } },
        });

        const allUserMessage = await Message.findAll({
          where: { [Op.or]: [{ from: user.username }, { to: user.username }] },
          order: [["createdAt", "DESC"]],
        });

        users = users.map((otherUser) => {
          const latestMessages = allUserMessage.find(
            (m) => m.from === otherUser.username || m.to === otherUser.username
          );
          otherUser.latestMessages = latestMessages;
          return otherUser;
        });

        return users;
      } catch (error) {
        throw error;
      }
    }, //end getUser Query

    login: async (_, args) => {
      const { username, password } = args;
      let errors = {};

      try {
        //user and password must not empty
        if (username.trim() === "")
          errors.username = "username must not be empty";
        if (password === "") errors.password = "password must not be empty";

        if (Object.keys(errors).length > 0) {
          throw new UserInputError("Bad Input", { errors });
        }

        const user = await User.findOne({
          where: { username },
        });

        //if user NA
        if (!user) {
          errors.username = "user not found";
          throw new UserInputError("user not found ", { errors });
        }

        const correctPassword = await bycrpt.compare(password, user.password);

        if (!correctPassword) {
          errors.password = "password is incorrect";
          throw new AuthenticationError("password is incorrect", { errors });
        }

        //adding token
        const token = jwt.sign(
          {
            username,
          },
          JWT_SECRET,
          { expiresIn: 60 * 60 }
        );

        return {
          ...user.toJSON(),
          createdAt: user.createdAt.toISOString(),
          token,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },

  //mutation register
  Mutation: {
    register: async (_, args) => {
      let { username, email, password, confirmPassword } = args;
      let errors = {};
      try {
        //TODO validate input data
        if (email.trim() === "") errors.email = "email must not be empty";
        if (username.trim() === "")
          errors.username = "username must not be empty";
        if (password.trim() === "")
          errors.password = "password must not be empty";
        if (confirmPassword.trim() === "")
          errors.confirmPassword = "repeat password must not be empty";

        if (confirmPassword != password)
          errors.confirmPassword = "passwords must match";

        //TODO check if username / email exits
        const userByUsername = await User.findOne({ where: { username } });
        const userByEmail = await User.findOne({ where: { email } });
        if (userByUsername) errors.username = "Username is taken";
        if (userByEmail) errors.email = "Email is taken";

        if (Object.keys(errors).length > 0) {
          throw errors;
        }

        //TODO : Has password
        password = await bycrpt.hash(password, 6);
        // TODO : create user
        const user = await User.create({
          username,
          email,
          password,
        });
        //TODO return users
        return user;
      } catch (error) {
        console.log(error);
        if (error.name === "SequelizeUniqueConstraintError") {
          error.errors.forEach(
            (e) => (errors[e.path] = `${e.path} is already taken`)
          );
        } else if (error.name === "SequelizeValidationError") {
          error.errors.forEach((e) => (errors[e.path] = e.message));
        }
        throw new UserInputError("Bad Input", { errors });
      }
    },
  },
};

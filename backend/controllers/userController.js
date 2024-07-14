import bcrypt from "bcryptjs";
import { UserInputError } from "apollo-server";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../utils/validators.js";
import { generateToken } from "../utils/check-auth.js";
import User from "../models/User.js";

// @desc Login user
// @access Public
const login = async (username, password) => {
  const { errors, valid } = validateLoginInput(username, password);

  if (!valid) {
    throw new UserInputError("Errors", { errors });
  }

  const user = await User.findOne({ username });
  if (!user) {
    errors.general = "User not found";
    throw new UserInputError("User not found", { errors });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    errors.general = "Wrong credentials";
    throw new UserInputError("Wrong credentials", { errors });
  }

  const token = generateToken(user);
  return {
    ...user._doc,
    id: user._id,
    token,
  };
};

// @desc Register user
// @access Public
const register = async ({ username, email, password, confirmPassword }) => {

  // Validate user data
  const { valid, errors } = validateRegisterInput(
    username,
    email,
    password,
    confirmPassword
  );
  if (!valid) {
    throw new UserInputError("Errors", { errors });
  }

  const user = await User.findOne({ username });
  password = await bcrypt.hash(password, 12);

  if (user) {
    throw new UserInputError("Username is taken", {
      errors: {
        username: "This username is taken",
      },
    });
  }

  const newUser = new User({
    username,
    password,
    email,
  });

  const response = await newUser.save();
  const token = generateToken(response);
  return {
    ...response._doc,
    id: response._id,
    token,
  };
};

export { login, register };

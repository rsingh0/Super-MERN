import { login, register } from "../controllers/userController.js";

const user = {
  Mutations: {
    login: (parent, { username, password }) => login(username, password),
    register: (parent, { registerInput }, context) => register(registerInput),
  },
};

export default user;

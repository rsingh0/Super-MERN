import books from "./book.js";
import user from "./user.js";

const resolvers = {
  Query: {
    ...books.Query,
  },
  Mutation: {
    ...books.Mutations,
    ...user.Mutations,
  },
};

export default resolvers;

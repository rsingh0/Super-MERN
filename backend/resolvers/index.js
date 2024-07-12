import books from "./book.js";

const resolvers = {
  Query: {
    ...books.Query,
  },
  Mutation: {
    ...books.Mutations,
  },
};

export default resolvers;

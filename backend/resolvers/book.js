import {
  getBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook
} from "../controllers/bookControllers.js";

const books = {
  Query: {
    getBooks: () => getBooks(),
    getBook: (parent, { bookId }) => getBook(bookId),
  },
  Mutations: {
    createBook: (parent, { input }, context) => createBook(input, context),
    updateBook: (parent, { id, book }, context) => updateBook(id, book, context),
    deleteBook: (parent, { id }, context) => deleteBook(id, context),
  },
};

export default books;

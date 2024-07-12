import Book from "../models/book.js";
import authorize from "../utils.js/check-auth.js";
import { AuthenticationError, UserInputError } from "apollo-server";

// @desc Fetch all Books
// @access Public
const getBooks = async () => {
  try {
    console.log("Get all Books".blue);
    return await Book.find().sort({ created: -1 });
  } catch (error) {
    console.log("Error fetching books".red);
    throw new Error(error);
  }
};

// @desc Fetch Book by Id
// @access Public
const getBook = async (bookId) => {
  try {
    console.log(`Get Book by ${bookId}`.blue);
    const book = await Book.findById(bookId);

    if (book) {
      return book;
    } else {
      throw new Error(`Book not found`);
    }
  } catch (error) {
    console.log(`Error fetching book for ${bookId}`.red);
    throw new Error(error);
  }
};

// @desc Create Book
// @access private
const createBook = async (input, context) => {
  // Book should only be created by authorized users
  // const user = authorize(context);
  // console.log("Authorized User:", user);

  // if(!user){
  //   throw new AuthenticationError("Invalid User");
  // }
  console.log("Create Book Input", input);
  if (!input) {
    throw new UserInputError("Book input cannot be empty");
  }

  const { title, author, publishYear } = input;

  if (!title && !author && !publishYear) {
    throw new UserInputError(
      "Missing required fields: title, author, publishYear"
    );
  }

  // Create new post
  const newBook = new Book({ title, author, publishYear });
  return await newBook.save();
};

// @desc Update Book by id
// @access private
const updateBook = async (id, book, context) => {
  // Book should only be created by authorized users
  // const user = authorize(context);
  // console.log("Authorized User:", user);

  // if(!user){
  //   throw new AuthenticationError("Invalid User");
  // }
  console.log("Update Book Input", book, id);
  if (!book && !id) {
    throw new UserInputError("Book input or bookId cannot be empty");
  }

  const { title, author, publishYear } = book;

  if (!(title || author || publishYear)) {
    throw new UserInputError(
      "Atleast one field should be available: title, author, publishYear"
    );
  }

  // Update Book
  const updatedBook = await Book.findByIdAndUpdate(id, book);
  if (!updatedBook) {
    throw new UserInputError(`Book ${id} not found`);
  }
  const updatedId = { id: updatedBook._id };
  return { ...updatedBook._doc, ...updatedId, ...book };
};

// @desc Delete Book by id
// @access private
const deleteBook = async (id, context) => {
  // Book should only be deleted by authorized users
  // const user = authorize(context);
  // console.log("Authorized User:", user);

  // if(!user){
  //   throw new AuthenticationError("Invalid User");
  // }

  try {
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return "Book not found";
    }
    return "Book deleted successfully";
  } catch (error) {
    console.log(`Error deleting Book for ${id}`.red);
    throw new Error(error);
  }
};

export { getBooks, getBook, createBook, deleteBook, updateBook };

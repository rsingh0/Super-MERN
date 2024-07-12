import gql from "graphql-tag";

const FETCH_BOOKS_QUERY = gql`
  query getBooks {
    getBooks {
      id
      author
      createdAt
      publishYear
      title
      updatedAt
    }
  }
`;

const FETCH_BOOK_BY_ID_QUERY = gql`
  query getBookById($bookId: ID!) {
    getBook(bookId: $bookId) {
      author
      createdAt
      id
      publishYear
      title
      updatedAt
    }
  }
`;

const CREATE_BOOK_MUTATION = gql`
  mutation CreateBook($input: BookInput!) {
    createBook(input: $input) {
      id
      title
      author
      publishYear
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_BOOK_MUTATION = gql`
  mutation UpdateBook($updateBookId: ID!, $book: BookInput!) {
    updateBook(id: $updateBookId, book: $book) {
      author
      createdAt
      id
      publishYear
      title
      updatedAt
    }
  }
`;

const DELETE_BOOK_MUTATION = gql`
  mutation DeleteBook($deleteBookId: ID!) {
    deleteBook(id: $deleteBookId)
  }
`;

export {
  FETCH_BOOKS_QUERY,
  FETCH_BOOK_BY_ID_QUERY,
  CREATE_BOOK_MUTATION,
  UPDATE_BOOK_MUTATION,
  DELETE_BOOK_MUTATION,
};

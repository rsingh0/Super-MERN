export default `

type Query {
    getBooks: [Book]
    getBook(bookId: ID!): Book
  }
`;

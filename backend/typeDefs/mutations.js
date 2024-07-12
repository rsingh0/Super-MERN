export default `

type Mutation {
    createBook(input: BookInput!): Book!
    updateBook(id: ID!, book: BookInput!): Book!
    deleteBook(id: ID!): String!
  }
`;

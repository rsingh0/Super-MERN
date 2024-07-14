export default `
  input BookInput {
    title: String
    author: String
    publishYear: Int
  }
  
  type Book {
    id: ID!
    title: String!
    author: String!
    publishYear: Int!
    createdAt: String!
    updatedAt: String!
  }  
`;

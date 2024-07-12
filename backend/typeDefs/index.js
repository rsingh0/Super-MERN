import gql from "graphql-tag";
import queries from "./queries.js";
import book from "./book.js";
import mutations from "./mutations.js";

export default gql`
  ${book}
  ${queries}
  ${mutations}
`;

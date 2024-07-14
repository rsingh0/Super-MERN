import gql from "graphql-tag";
import queries from "./queries.js";
import book from "./bookTypeDef.js";
import mutations from "./mutations.js";
import user from "./userTypeDef.js";

export default gql`
  ${book}
  ${user}
  ${queries}
  ${mutations}
`;

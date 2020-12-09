import { gql } from "@apollo/client";

const typeDefs = gql`
  type Brand {
    id: Int!
    name: String!
    company: String!
    image: String!
    ingredients: String!
    website: String!
    likes: [Like!]!
  }
  type Like {
    id: Int!
    ip: String!
    brand: Brand!
  }

  type Query {
    brand(id: Int!): Brand
    brands: [Brand!]!
  }
  type Mutation {
    createBrand(
      name: String!
      company: String!
      image: String!
      ingredients: String!
      website: String!
    ): Brand
    createLike(ip: String!, brand: Int!): Like
    deleteLike(id: Int!): Like
  }
`;

export default typeDefs;

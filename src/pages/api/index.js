import { ApolloServer, gql } from "apollo-server-micro";
import knex from "knex";

const database = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "reilley",
    password: "darkrai12",
    database: "reilley",
  },
});

const typeDefs = gql`
  type Query {
    brands: [Brand!]!
  }
  type Brand {
    id: ID!
    name: String!
    image: String!
    likes: [Like!]!
  }
  type Like {
    id: ID!
    ip: String!
    brand: Brand!
  }
  type Mutation {
    createBrand(name: String!, image: String!): Brand
    createLike(ip: String!, brand: String!): Like
  }
`;

const resolvers = {
  Query: {
    brands: () => database("choccy.brand").select("*"),
  },
  Brand: {
    likes: ({ id }) => database("like").select("*").where("book_id", id),
  },
  Mutation: {
    createBrand: async (_, { name, image }) => {
      const [brand] = await database("brand")
        .returning("*")
        .insert({ name, image });
      return brand;
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export default apolloServer.createHandler({ path: "/api" });

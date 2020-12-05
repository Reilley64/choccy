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
    id: Int!
    name: String!
    company: String!
    image: String!
    likes: [Like!]!
  }
  type Like {
    id: Int!
    ip: String!
    brand: Brand!
  }
  type Mutation {
    createBrand(name: String!, image: String!): Brand
    createLike(ip: String!, brand_id: Int!): Like
    deleteLike(id: Int!): Int
  }
`;

const resolvers = {
  Query: {
    brands: () => database("choccy.brand").select("*"),
  },
  Brand: {
    likes: ({ id }) =>
      database("choccy.like").where("brand_id", id).select("*"),
  },
  Mutation: {
    createBrand: async (_, { name, company, image }) => {
      const [brand] = await database("choccy.brand")
        .returning("*")
        .insert({ name, company, image });
      return brand;
    },
    createLike: async (_, { ip, brand_id }) => {
      const [like] = await database("choccy.like")
        .returning("*")
        .insert({ ip, brand_id });
      return like;
    },
    deleteLike: async (_, { id }) => {
      await database("choccy.like").where("id", id).delete();
      return id;
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api" });

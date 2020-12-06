import { ApolloServer, gql } from "apollo-server-micro";
import knex from "knex";

const database = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

const typeDefs = gql`
  type Query {
    brand(id: Int!): Brand
    brands: [Brand!]!
  }
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
  type Mutation {
    createBrand(
      name: String!
      company: String!
      image: String!
      ingredients: String!
      website: String!
    ): Brand
    createLike(ip: String!, brand_id: Int!): Like
    deleteLike(id: Int!): Int
  }
`;

const resolvers = {
  Query: {
    brand: (parent, { id }) => database(`${process.env.DB_SCHEMA}.brand`).where("id", id).first(),
    brands: () => database(`${process.env.DB_SCHEMA}.brand`).select("*"),
  },
  Brand: {
    likes: ({ id }) =>
      database(`${process.env.DB_SCHEMA}.like`).where("brand_id", id).select("*"),
  },
  Mutation: {
    createBrand: async (_, newBrand) => {
      const [brand] = await database(`${process.env.DB_SCHEMA}.brand`)
        .returning("*")
        .insert(newBrand);
      return brand;
    },
    createLike: async (_, newLike) => {
      const [like] = await database(`${process.env.DB_SCHEMA}.like`)
        .returning("*")
        .insert(newLike);
      return like;
    },
    deleteLike: async (_, { id }) => {
      await database(`${process.env.DB_SCHEMA}.like`).where("id", id).delete();
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

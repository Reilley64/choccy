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

const resolvers = {
  Query: {
    brand: (parent, { id }) =>
      database(`${process.env.DB_SCHEMA}.brand`).where("id", id).first(),
    brands: () => database(`${process.env.DB_SCHEMA}.brand`).select("*"),
  },
  Brand: {
    likes: ({ id }) =>
      database(`${process.env.DB_SCHEMA}.like`).where("brand", id).select("*"),
  },
  Like: {
    brand: ({ brand }) =>
      database(`${process.env.DB_SCHEMA}.brand`).where("id", brand).first(),
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
      const like = await database(`${process.env.DB_SCHEMA}.like`)
        .where("id", id)
        .first();
      await database(`${process.env.DB_SCHEMA}.like`).where("id", id).delete();
      return like;
    },
  },
};

export default resolvers;

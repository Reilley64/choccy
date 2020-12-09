import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import { initializeApollo } from "../../apollo/client";
import BrandTemplate from "../../components/Templates/BrandTemplate";

const BrandQuery = gql`
  query BrandQuery($id: Int!) {
    brand(id: $id) {
      id
      name
      company
      image
      ingredients
      website
    }
  }
`;

const Milk = () => {
  const { id } = useRouter().query;

  const {
    data: { brand },
  } = useQuery(BrandQuery, { variables: { id: parseInt(id) } });

  return <BrandTemplate brand={brand} />;
};

export const getServerSideProps = async ({ params: { id } }) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: BrandQuery,
    variables: { id: parseInt(id) },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default Milk;

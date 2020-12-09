import { gql, useQuery } from "@apollo/client";
import publicIp from "public-ip";
import React, { useEffect, useState } from "react";

import { initializeApollo } from "../apollo/client";
import HomeTemplate from "../components/Templates/HomeTemplate";

const BrandsQuery = gql`
  {
    brands {
      id
      name
      company
      image
      likes {
        id
        ip
      }
    }
  }
`;

const Home = () => {
  const {
    data: { brands },
  } = useQuery(BrandsQuery);

  const [ip, setIp] = useState(null);

  useEffect(() => {
    if (!ip) publicIp.v4().then((value) => setIp(value));
  }, []);

  return <HomeTemplate brands={brands} ip={ip} />;
};

export const getServerSideProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: BrandsQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default Home;

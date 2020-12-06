import publicIp from "public-ip";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import { fetcher } from "../_";
import HomeTemplate from "../components/Templates/HomeTemplate";

const Home = () => {
  const { data, error, mutate } = useSWR(
    "{ brands { id, name, company, image, likes { id, ip } } }",
    fetcher
  );

  const [ip, setIp] = useState(null);

  useEffect(() => {
    if (!ip) publicIp.v4().then((value) => setIp(value));
  }, []);

  if (error) return "Error";
  if (!data || !ip) return "Loading...";

  return <HomeTemplate data={data} ip={ip} mutate={mutate} />;
};

export default Home;

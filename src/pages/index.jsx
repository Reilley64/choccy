import { MdThumbUp } from "@react-icons/all-files/md/MdThumbUp";
import publicIp from "public-ip";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import "typeface-roboto";

import Button from "../components/Button/Button";
import Card from "../components/Card";
import Grid from "../components/Grid";
import Typography from "../components/Typography";
import { theme } from "./_app";

const fetcher = (query) =>
  fetch("/api", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

const Home = () => {
  const { data, error, mutate } = useSWR(
    "{ brands { id, name, company, image, likes { id, ip } } }",
    fetcher
  );

  const [ip, setIp] = useState(null);

  useEffect(() => {
    publicIp.v4().then((value) => setIp(value));
  }, []);

  if (error) return "Error";
  if (!data || !ip) return "Loading...";

  return (
    <Grid>
      {data.brands
        .sort((a, b) => b.likes.length - a.likes.length)
        .map((brand, index) => (
          <Grid.Col key={brand.id} xs={12} md={4} lg={3}>
            <Card>
              <Card.Media image={brand.image} />
              <Card.Body>
                <Typography level={6} type={"headline"}>
                  {brand.name}
                </Typography>
                <br />
                <Typography level={2} muted type={"body"}>
                  {brand.company}
                </Typography>
              </Card.Body>
              <Card.Actions>
                <Button variant="text">View</Button>
                <Button
                  onClick={() =>
                    brand.likes.some((like) => like.ip === ip)
                      ? fetch("/api", {
                          method: "POST",
                          headers: {
                            "Content-type": "application/json",
                          },
                          body: JSON.stringify({
                            query: `mutation { deleteLike(id: ${
                              brand.likes.filter((like) => like.ip === ip)[0].id
                            }) }`,
                          }),
                        })
                          .then((res) => res.json())
                          .then((json) => json.data)
                          .then((deleteLike) => {
                            let brands = data.brands;
                            brands[0].likes.filter(
                              (like) => !like.id === deleteLike.deleteLike
                            );
                            mutate({ brands });
                          })
                      : fetch("/api", {
                          method: "POST",
                          headers: {
                            "Content-type": "application/json",
                          },
                          body: JSON.stringify({
                            query: `mutation { createLike(ip: "${ip}", brand_id: ${brand.id}) { id, ip } }`,
                          }),
                        })
                          .then((res) => res.json())
                          .then((json) => json.data)
                          .then((insertLike) => {
                            let brands = data.brands;
                            brands[0].likes.push(insertLike);
                            mutate({ brands });
                          })
                  }
                  style={{ marginLeft: "auto" }}
                  variant="icon"
                >
                  <MdThumbUp
                    style={{
                      color: brand.likes.some((like) => like.ip === ip)
                        ? theme.palette.primary
                        : "rgba(0, 0, 0, .6)",
                    }}
                  />
                </Button>
              </Card.Actions>
            </Card>
          </Grid.Col>
        ))}
    </Grid>
  );
};

export default Home;

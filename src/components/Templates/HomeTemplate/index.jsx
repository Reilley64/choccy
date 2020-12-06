import { MdThumbUp } from "@react-icons/all-files/md/MdThumbUp";
import Link from "next/link";
import React from "react";

import { theme } from "../../../pages/_app";
import Button from "../../ui-library/Button/Button";
import Card from "../../ui-library/Card";
import Grid from "../../ui-library/Grid";
import Typography from "../../ui-library/Typography";
import NewMilkModal from "./NewMilkModal";

const HomeTemplate = ({ data, ip, mutate }) => {
  return (
    <Grid>
      {data.brands
        .sort((a, b) => b.likes.length - a.likes.length)
        .map((brand) => (
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
                <Link href={`/milk/${brand.id}`}>
                  <a>
                    <Button variant="text">View</Button>
                  </a>
                </Link>
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
                        }).then(() => mutate())
                      : fetch("/api", {
                          method: "POST",
                          headers: {
                            "Content-type": "application/json",
                          },
                          body: JSON.stringify({
                            query: `mutation { createLike(ip: "${ip}", brand_id: ${brand.id}) { id, ip } }`,
                          }),
                        }).then(() => mutate())
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
      <Grid.Col xs={12} md={4} lg={3}>
        <NewMilkModal mutate={mutate} />
      </Grid.Col>
    </Grid>
  );
};

export default HomeTemplate;

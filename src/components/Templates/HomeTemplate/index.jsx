import { gql, useMutation } from "@apollo/client";
import { MdThumbUp } from "@react-icons/all-files/md/MdThumbUp";
import findIndex from "lodash/findIndex";
import Link from "next/link";
import React from "react";

import { theme } from "../../../pages/_app";
import Button from "../../ui-library/Button/Button";
import Card from "../../ui-library/Card";
import Grid from "../../ui-library/Grid";
import Typography from "../../ui-library/Typography";
import NewMilkModal from "./NewMilkModal";

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

const CreateLikeMutation = gql`
  mutation CreateLikeMutation($ip: String!, $brand: Int!) {
    createLike(ip: $ip, brand: $brand) {
      id
      ip
      brand {
        id
      }
    }
  }
`;

const DeleteLikeMutation = gql`
  mutation DeleteLikeMutation($id: Int!) {
    deleteLike(id: $id) {
      id
      brand {
        id
      }
    }
  }
`;

const HomeTemplate = ({ brands, ip }) => {
  const [createLike] = useMutation(CreateLikeMutation, {
    update(cache, { data: { createLike } }) {
      const data = cache.readQuery({ query: BrandsQuery });
      let brands = JSON.parse(JSON.stringify(data.brands));
      const index = findIndex(brands, ["id", createLike.brand.id]);
      brands[index].likes.push(createLike);
      cache.writeQuery({ query: BrandsQuery, data: { brands } });
    },
  });
  const [deleteLike] = useMutation(DeleteLikeMutation, {
    update(cache, { data: { deleteLike } }) {
      const data = cache.readQuery({ query: BrandsQuery });
      let brands = JSON.parse(JSON.stringify(data.brands));
      const brandIndex = findIndex(brands, ["id", deleteLike.brand.id]);
      const likeIndex = findIndex(brands[brandIndex].likes, [
        "id",
        deleteLike.id,
      ]);
      delete brands[brandIndex].likes[likeIndex];
      cache.writeQuery({ query: BrandsQuery, data: { brands } });
    },
  });

  return (
    <Grid>
      {brands
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
                {Array.isArray(brand.likes) && (
                  <Button
                    onClick={() =>
                      brand.likes.some((like) => like.ip === ip)
                        ? deleteLike({
                            variables: {
                              id: brand.likes.filter(
                                (like) => like.ip === ip
                              )[0].id,
                            },
                          })
                        : createLike({ variables: { ip: ip, brand: brand.id } })
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
                )}
              </Card.Actions>
            </Card>
          </Grid.Col>
        ))}
      <Grid.Col xs={12} md={4} lg={3}>
        <NewMilkModal />
      </Grid.Col>
    </Grid>
  );
};

export default HomeTemplate;

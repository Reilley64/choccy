import { gql, useMutation } from "@apollo/client";
import { MdThumbUp } from "@react-icons/all-files/md/MdThumbUp";
import findIndex from "lodash/findIndex";
import Link from "next/link";
import { memo } from "react";

import { theme } from "../../../pages/_app";
import Button from "../../ui-library/Button/Button";
import Card from "../../ui-library/Card";
import Typography from "../../ui-library/Typography";

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

const Brand = ({ ip, value }) => {
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
    <Card>
      <Card.Media image={value.image} />
      <Card.Body>
        <Typography level={6} type={"headline"}>
          {value.name}
        </Typography>
        <br />
        <Typography level={2} muted type={"body"}>
          {value.company}
        </Typography>
      </Card.Body>
      <Card.Actions>
        <Link href={`/milk/${value.id}`}>
          <a>
            <Button variant="text">View</Button>
          </a>
        </Link>
        {Array.isArray(value.likes) && (
          <Button
            onClick={() =>
              value.likes.some((like) => like.ip === ip)
                ? deleteLike({
                    variables: {
                      id: value.likes.filter((like) => like.ip === ip)[0].id,
                    },
                  })
                : createLike({ variables: { ip: ip, brand: value.id } })
            }
            style={{ marginLeft: "auto" }}
            variant="icon"
          >
            <MdThumbUp
              style={{
                color: value.likes.some((like) => like.ip === ip)
                  ? theme.palette.primary
                  : "rgba(0, 0, 0, .6)",
              }}
            />
          </Button>
        )}
      </Card.Actions>
    </Card>
  );
};

export default memo(Brand);

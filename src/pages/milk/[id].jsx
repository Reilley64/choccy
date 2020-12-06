import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import { fetcher } from "../../_";
import Grid from "../../components/ui-library/Grid";
import Typography from "../../components/ui-library/Typography";

const Milk = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, mutate } = useSWR(
    `{ brand(id: ${id}) { id, name, company, image, ingredients, website } }`,
    fetcher
  );

  if (error) return "Error";
  if (!data) return "Loading...";

  return (
    <Grid>
      <Grid.Col xs={6}>
        <Grid>
          <Grid.Col xs={12}>
            <Typography level={2} type="headline">
              {data.brand.name}
            </Typography>
            <br />
            <Typography level={3} type="headline">
              {data.brand.company}
            </Typography>
          </Grid.Col>
          <Grid.Col xs={12}>
            <Typography level={1} type="body">
              {data.brand.ingredients}
            </Typography>
          </Grid.Col>
          <Grid.Col xs={12}>
            <a href={data.brand.website}>
              <Typography level={2} type="body">
                {data.brand.website}
              </Typography>
            </a>
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col xs={6}>
        <img src={data.brand.image} style={{ width: "100%" }} />
      </Grid.Col>
    </Grid>
  );
};

export default Milk;

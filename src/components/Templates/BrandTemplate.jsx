import React from "react";

import Grid from "../ui-library/Grid";
import Typography from "../ui-library/Typography";

const BrandTemplate = ({ brand }) => (
  <Grid>
    <Grid.Col xs={6}>
      <Grid>
        <Grid.Col xs={12}>
          <Typography level={2} type="headline">
            {brand.name}
          </Typography>
          <br />
          <Typography level={3} type="headline">
            {brand.company}
          </Typography>
        </Grid.Col>
        <Grid.Col xs={12}>
          <Typography level={1} type="body">
            {brand.ingredients}
          </Typography>
        </Grid.Col>
        <Grid.Col xs={12}>
          <a href={brand.website}>
            <Typography level={2} type="body">
              {brand.website}
            </Typography>
          </a>
        </Grid.Col>
      </Grid>
    </Grid.Col>
    <Grid.Col xs={6}>
      <img alt={brand.name} src={brand.image} style={{ width: "100%" }} />
    </Grid.Col>
  </Grid>
);

export default BrandTemplate;

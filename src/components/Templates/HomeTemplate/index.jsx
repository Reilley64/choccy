import { memo } from "react";

import Grid from "../../ui-library/Grid";
import Brand from "./Brand";
import NewBrandModal from "./NewBrandModal";

const HomeTemplate = ({ brands, ip }) => {
  return (
    <Grid>
      {brands.map((brand) => (
        <Grid.Col key={brand.id} xs={12} md={4} lg={3}>
          <Brand ip={ip} value={brand} />
        </Grid.Col>
      ))}
      <Grid.Col xs={12} md={4} lg={3}>
        <NewBrandModal />
      </Grid.Col>
    </Grid>
  );
};

export default memo(HomeTemplate);

import { MdThumbUp } from "@react-icons/all-files/md/MdThumbUp";
import useSWR from "swr";
import "typeface-roboto";

import AppBar from "../components/AppBar";
import Card from "../components/Card";
import Grid from "../components/Grid";
import Typography from "../components/Typography";

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
  const { data, error } = useSWR("{ brands { id, name, image } }", fetcher);

  if (error) return "Error";
  if (!data) return "Loading...";

  return (
    <div>
      <AppBar>
        <Typography
          color={"rgb(255, 255, 255)"}
          level={6}
          spacing={"0.25px"}
          type={"headline"}
        >
          Choccy
        </Typography>
      </AppBar>
      <Grid>
        {data.brands.map((brand) => (
          <Grid.Col key={brand.id} size={4}>
            <Card>
              <Card.Media image={brand.image} />
              <Card.Body>
                <Typography level={6} type={"headline"}>
                  {brand.name}
                </Typography>
              </Card.Body>
              <Card.Actions>
                <Card.Actions.Icon Icon={MdThumbUp} />
              </Card.Actions>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default Home;

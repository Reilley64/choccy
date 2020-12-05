import React from "react";
import { ThemeProvider } from "react-jss";
import "sanitize.css";

import AppBar from "../components/AppBar";
import Typography from "../components/Typography";

export const theme = {
  font: {
    family: "Roboto",
  },
  palette: {
    primary: "rgb(121, 85, 72)",
  },
};

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
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
      <div style={{ paddingTop: "64px" }}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
};

export default MyApp;

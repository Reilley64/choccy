import Head from "next/head";
import Link from "next/link";
import React from "react";
import { ThemeProvider } from "react-jss";
import "sanitize.css";
import "typeface-roboto";

import AppBar from "../components/ui-library/AppBar";
import Typography from "../components/ui-library/Typography";

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
      <Head>
        <title>Choccy</title>
      </Head>
      <AppBar>
        <AppBar.Row>
          <AppBar.Row.Section>
            <Link href={"/"}>
              <a style={{ textDecoration: "none" }}>
                <Typography
                  color={"rgb(255, 255, 255)"}
                  level={6}
                  spacing={"0.25px"}
                  type={"headline"}
                >
                  Choccy
                </Typography>
              </a>
            </Link>
          </AppBar.Row.Section>
        </AppBar.Row>
      </AppBar>
      <div style={{ padding: "88px 24px 24px" }}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
};

export default MyApp;

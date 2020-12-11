import { ApolloProvider } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { ThemeProvider } from "react-jss";
import "sanitize.css";
import "typeface-permanent-marker";
import "typeface-roboto";

import { useApollo } from "../apollo/client";
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
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
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
                    color={theme.palette.primary}
                    fontFamily={"Permanent Marker"}
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
    </ApolloProvider>
  );
};

export default MyApp;

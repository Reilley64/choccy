import React, { useLayoutEffect, useState } from "react";
import { createUseStyles } from "react-jss";

const getProperties = ({ screenWidth, xs, sm, md, lg, xl }) => {
  if (screenWidth >= 1920 && xl) {
    return {
      flex: `1 0 calc(100% / 12 * ${xl} - 24px)`,
      margin: "24px 12px 0 12px",
      maxWidth: `calc(100% / 12 * ${xl} - 24px)`,
      minWidth: "calc(100% / 12 - 24px)",
    };
  }

  if (screenWidth >= 1440 && lg) {
    return {
      flex: `1 0 calc(100% / 12 * ${lg} - 24px)`,
      margin: "24px 12px 0 12px",
      maxWidth: `calc(100% / 12 * ${lg} - 24px)`,
      minWidth: "calc(100% / 12 - 24px)",
    };
  }

  if (screenWidth >= 1024 && md) {
    return {
      flex: `1 0 calc(100% / 12 * ${md} - 24px)`,
      margin: "24px 12px 0 12px",
      maxWidth: `calc(100% / 12 * ${md} - 24px)`,
      minWidth: "calc(100% / 12 - 24px)",
    };
  }

  if (screenWidth >= 600 && sm) {
    if (screenWidth >= 720) {
      return {
        flex: `1 0 calc(100% / 12 * ${sm} - 24px)`,
        margin: "24px 12px 0 12px",
        maxWidth: `calc(100% / 12 * ${sm} - 24px)`,
        minWidth: "calc(100% / 12 - 24px)",
      };
    }

    return {
      flex: `1 0 calc(100% / 12 * ${sm} - 16px)`,
      margin: "16px 8px 0 8px",
      maxWidth: `calc(100% / 12 * ${sm} - 16px)`,
      minWidth: "calc(100% / 12 - 16px)",
    };
  }

  if (screenWidth >= 720) {
    return {
      flex: `1 0 calc(100% / 12 * ${xs} - 24px)`,
      margin: "24px 12px 0 12px",
      maxWidth: `calc(100% / 12 * ${xs} - 24px)`,
      minWidth: "calc(100% / 12 - 24px)",
    };
  }

  return {
    flex: `1 0 calc(100% / 12 * ${xs} - 16px)`,
    margin: "16px 8px 0 8px",
    maxWidth: `calc(100% / 12 * ${xs} - 16px)`,
    minWidth: "calc(100% / 12 - 16px)",
  };
};

export const useStyles = createUseStyles({
  col: ({ screenWidth, xs, sm, md, lg, xl }) => ({
    alignSelf: "stretch",
    overflowWrap: "break-word",
    ...getProperties({
      screenWidth,
      xs,
      sm,
      md,
      lg,
      xl,
    }),
  }),
});

const Col = ({ children, xs, sm, md, lg, xl }) => {
  const [screenWidth, setScreenWidth] = useState(0);

  const classes = useStyles({
    screenWidth,
    xs,
    sm,
    md,
    lg,
    xl,
  });

  useLayoutEffect(() => {
    const updateScreenWidth = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", updateScreenWidth);
    updateScreenWidth();

    return () => window.removeEventListener("resize", updateScreenWidth);
  }, []);

  return <div className={classes.col}>{children}</div>;
};

export default Col;

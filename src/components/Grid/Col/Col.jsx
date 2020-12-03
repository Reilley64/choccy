import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  col: ({ size }) => ({
    alignSelf: "stretch",
    flex: `1 0 calc(100% / 12 * ${size} - 24px)`,
    margin: "24px 12px 0 12px",
    maxWidth: `calc(100% / 12 * ${size} - 24px)`,
    minWidth: "calc(100% / 12 - 24px)",
    overflowWrap: "break-word",
    transition: "max-width 250ms cubic-bezier(.4, 0, .2, 1)",
  }),
});

const Col = ({ children, size }) => {
  const classes = useStyles({ size });

  return <div className={classes.col}>{children}</div>;
};

export default Col;

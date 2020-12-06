import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  row: {
    display: "flex",
    height: "64px",
    position: "relative",
    width: "100%",
  },
});

const Row = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.row}>{children}</div>;
};

export default Row;

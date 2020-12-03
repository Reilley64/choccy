import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  grid: {
    alignItems: "flex-start",
    display: "flex",
    flexWrap: "wrap",
    margin: "-24px 0 0 0",
    padding: "24px 12px",
    position: "relative",
  },
});

const Grid = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.grid}>{children}</div>;
};

export default Grid;

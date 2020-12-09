import React from "react";
import { createUseStyles } from "react-jss";

const getProperties = ({ screenWidth }) => {
  if (screenWidth >= 720) {
    return "-24px -12px 0";
  }

  return "-16px -8px 0";
};

const useStyles = createUseStyles({
  grid: ({ screenWidth }) => ({
    alignItems: "flex-start",
    display: "flex",
    flexWrap: "wrap",
    margin: getProperties({ screenWidth }),
    position: "relative",
  }),
});

const Grid = ({ children, style }) => {
  const classes = useStyles({
    screenWidth: typeof window !== "undefined" ? window.innerWidth : 0,
  });

  return (
    <div className={classes.grid} style={style}>
      {children}
    </div>
  );
};

export default Grid;

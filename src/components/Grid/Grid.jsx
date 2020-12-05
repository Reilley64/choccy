import React from "react";
import { createUseStyles } from "react-jss";

const getProperties = ({ screenWidth }) => {
  if (screenWidth >= 720) {
    return {
      marginTop: "-24px",
      padding: "24px 12px",
    };
  }

  return {
    marginTop: "-16px",
    padding: "16px 8px",
  };
};

const useStyles = createUseStyles({
  grid: ({ screenWidth }) => ({
    alignItems: "flex-start",
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
    ...getProperties({ screenWidth }),
  }),
});

const Grid = ({ children, style }) => {
  const classes = useStyles({ screenWidth: window.innerWidth });

  return (
    <div className={classes.grid} style={style}>
      {children}
    </div>
  );
};

export default Grid;

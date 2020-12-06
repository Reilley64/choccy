import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary,
    boxShadow:
      "0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "fixed",
    width: "100%",
    zIndex: "1030",
  },
}));

const AppBar = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.appBar}>{children}</div>;
};

export default AppBar;

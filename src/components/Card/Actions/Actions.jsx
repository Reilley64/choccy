import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  actions: {
    alignItems: "center",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    minHeight: "52px",
    padding: "8px",
  },
});

const Actions = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.actions}>{children}</div>;
};

export default Actions;

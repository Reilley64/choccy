import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  actions: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    minHeight: "52px",
    padding: "8px",
  },
});

const Actions = ({ children, style }) => {
  const classes = useStyles();

  return (
    <div className={classes.actions} style={style}>
      {children}
    </div>
  );
};

export default Actions;

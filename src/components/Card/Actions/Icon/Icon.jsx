import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  iconButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "rgba(0, 0, 0, 0.6)",
    display: "inline-block",
    fill: "currentcolor",
    fontSize: "24px",
    flexGrow: "1",
    height: "48px",
    justifyContent: "flex-end",
    marginLeft: "16px",
    outline: "none",
    padding: "12px",
    position: "relative",
    width: "48px",
  },
});

const Icon = ({ Icon }) => {
  const classes = useStyles();

  return (
    <button className={classes.iconButton}>
      <Icon />
    </button>
  );
};

export default Icon;

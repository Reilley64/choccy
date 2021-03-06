import clsx from "clsx";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  card: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: "4px",
    boxShadow:
      "0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    transition: "box-shadow 150ms cubic-bezier(.4, 0, .2, 1)",
  },
});

const Card = ({ children, className, style, ...props }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.card, className)} style={style} {...props}>
      {children}
    </div>
  );
};

export default Card;

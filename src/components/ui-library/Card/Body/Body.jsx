import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  body: {
    padding: "16px 16px 0",

    "&:last-child": {
      paddingBottom: "16px",
    },
  },
});

const Body = ({ children, style }) => {
  const classes = useStyles();

  return (
    <div className={classes.body} style={style}>
      {children}
    </div>
  );
};

export default Body;

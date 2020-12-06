import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  section: {
    alignItems: "center",
    display: "inline-flex",
    flex: "1 1 auto",
    padding: "8px 12px",
    zIndex: "1",
  },
});

const Section = ({ children, style }) => {
  const classes = useStyles();

  return (
    <div className={classes.section} style={style}>
      {children}
    </div>
  );
};

export default Section;

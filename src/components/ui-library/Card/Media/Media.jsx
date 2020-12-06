import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  media: ({ image }) => ({
    background: `url(${image})`,
    backgroundSize: "cover",
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit",
    position: "relative",

    "&:before": {
      display: "block",
      content: "''",
      marginTop: "56.25%",
    },
  }),
});

const Media = ({ image }) => {
  const classes = useStyles({ image });

  return <div className={classes.media} />;
};

export default Media;

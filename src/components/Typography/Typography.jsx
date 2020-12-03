import React from "react";
import { createUseStyles } from "react-jss";

const getSize = (type, level) => {
  switch (type) {
    case "headline":
      switch (level) {
        case 1:
          return "96px";

        case 2:
          return "60px";

        case 3:
          return "48px";

        case 4:
          return "34px";

        case 5:
          return "24px";

        case 6:
          return "20px";

        default:
          return "96px";
      }

    default:
      return "16px";
  }
};

const getWeight = (type, level) => {
  switch (type) {
    case "headline":
      switch (level) {
        case 1:
        case 2:
          return "100";

        case 3:
        case 4:
        case 5:
          return "400";

        case 6:
          return "500";

        default:
          return "100";
      }

    default:
      return "400";
  }
};

const getLetterSpacing = (type, level) => {
  switch (type) {
    case "headline":
      switch (level) {
        case 1:
          return "-1.5px";

        case 2:
          return "-0.5px";

        case 3:
          return "0px";

        case 4:
          return "0.25px";

        case 5:
          return "0px";

        case 6:
          return "0.15px";

        default:
          return "-1.5px";
      }

    default:
      return "0.5px";
  }
};

const useStyles = createUseStyles({
  typography: ({ color, level, size, spacing, type, weight }) => ({
    color: color || "rgba(0, 0, 0, .87)",
    fontFamily: "Roboto",
    fontSize: size || getSize(type, level),
    fontWeight: weight || getWeight(type, level),
    letterSpacing: spacing || getLetterSpacing(type, level),
  }),
});

const Typography = ({
  color,
  children,
  level,
  size,
  spacing,
  type,
  weight,
}) => {
  const classes = useStyles({ color, level, size, spacing, type, weight });

  return <span className={classes.typography}>{children}</span>;
};

export default Typography;

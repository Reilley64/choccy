import React, { useLayoutEffect, useState } from "react";
import { createUseStyles } from "react-jss";

const getProperties = ({ screenWidth }) => {
  if (screenWidth >= 720) {
    return "-24px -12px 0";
  }

  return "-16px -8px 0";
};

const useStyles = createUseStyles({
  grid: ({ screenWidth }) => ({
    alignItems: "flex-start",
    display: "flex",
    flexWrap: "wrap",
    margin: getProperties({ screenWidth }),
    position: "relative",
  }),
});

const Grid = ({ children, style }) => {
  const [screenWidth, setScreenWidth] = useState(0);

  const classes = useStyles({
    screenWidth,
  });

  useLayoutEffect(() => {
    const updateScreenWidth = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", updateScreenWidth);
    updateScreenWidth();

    return () => window.removeEventListener("resize", updateScreenWidth);
  }, []);

  return (
    <div className={classes.grid} style={style}>
      {children}
    </div>
  );
};

export default Grid;

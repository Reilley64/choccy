import React, {useLayoutEffect, useState} from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  appBar: ({ scrollY }) => ({
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: scrollY > 0
      ? "0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12)"
      : "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "fixed",
    transition: "box-shadow 150ms cubic-bezier(.4, 0, .2, 1)",
    width: "100%",
    zIndex: "1030",
  }),
}));

const AppBar = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);

  const classes = useStyles({ scrollY });

  useLayoutEffect(() => {
    const updateScrollY = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", updateScrollY);
    updateScrollY();

    return () => window.removeEventListener("scroll", updateScrollY);
  }, []);

  return <div className={classes.appBar}>{children}</div>;
};

export default AppBar;

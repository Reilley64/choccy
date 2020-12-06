import React, { cloneElement } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  scrim: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, .32)",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    left: "0",
    position: "fixed",
    top: "0",
    width: "100%",
    zIndex: "1040",

    "& > *": {
      boxShadow:
        "0 11px 15px -7px rgba(0, 0, 0, .2), 0 24px 38px 3px rgba(0, 0, 0, .14), 0 9px 46px 8px rgba(0, 0, 0, .12)",
      maxHeight: "calc(100% - 32px)",
      maxWidth: "560px",
      minWidth: "280px",
      zIndex: "1050",
    },
  },
});

const Modal = ({ children, close, open }) => {
  const classes = useStyles();

  if (open) {
    return (
      <div className={classes.scrim} onClick={() => close()}>
        {cloneElement(children, {
          onClick: (e) => {
            e.stopPropagation();
          },
        })}
      </div>
    );
  }
  return null;
};

export default Modal;

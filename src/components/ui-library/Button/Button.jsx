import { MdAdd } from "@react-icons/all-files/md/MdAdd";
import Color from "color";
import React from "react";
import { createUseStyles } from "react-jss";

import { theme } from "../../../pages/_app";
import Typography from "../Typography";

const getStyles = ({ variant, theme }) => {
  switch (variant) {
    case "icon":
      return {
        backgroundColor: "transparent",
        border: "none",
        borderRadius: "50%",
        color: "rgba(0, 0, 0, 0.6)",
        cursor: "pointer",
        display: "inline-block",
        fill: "currentcolor",
        fontSize: "24px",
        height: "48px",
        justifyContent: "flex-end",
        outline: "none",
        padding: "12px",
        position: "relative",
        transition: "background-color 150ms cubic-bezier(.4, 0, .2, 1)",
        width: "48px",

        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, .04)",
        },

        "&:active": {
          backgroundColor: "rgba(0, 0, 0, .12)",
        },

        "& svg": {
          display: "inline-block",
          verticalAlign: "initial",
        },
      };

    case "text":
      return {
        alignItems: "center",
        backgroundColor: "transparent",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        display: "inline-flex",
        flexDirection: "row",
        justifyContent: "center",
        height: "36px",
        outline: "none",
        padding: "0 8px",
        position: "relative",
        transition: "background-color 150ms cubic-bezier(.4, 0, .2, 1)",

        "&:hover": {
          backgroundColor: Color(theme.palette.primary).alpha(0.12).toString(),
        },

        "&:active": {
          backgroundColor: Color(theme.palette.primary).alpha(0.16).toString(),
        },
      };

    case "contained":
    default:
      return {
        alignItems: "center",
        backgroundColor: theme.palette.primary,
        border: "none",
        borderRadius: "4px",
        boxShadow:
          "0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12)",
        cursor: "pointer",
        display: "inline-flex",
        height: "36px",
        justifyContent: "center",
        minWidth: "64px",
        outline: "none",
        padding: "0 16px",
        position: "relative",
        transition:
          "background-color 150ms cubic-bezier(.4, 0, .2, 1), box-shadow 150ms cubic-bezier(.4, 0, .2, 1)",

        "&:hover": {
          backgroundColor: Color(theme.palette.primary)
            .lighten(0.05)
            .toString(),
          boxShadow:
            "0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12)",
        },

        "&:active": {
          backgroundColor: Color(theme.palette.primary).darken(0.05).toString(),
          boxShadow:
            "0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12)",
        },
      };
  }
};

const useStyles = createUseStyles((theme) => ({
  button: ({ variant }) => ({
    ...getStyles({ variant, theme }),
  }),
}));

const Button = ({ children, onClick, style, type = "button", variant }) => {
  const classes = useStyles({ variant });

  return (
    <button
      className={classes.button}
      onClick={onClick}
      style={style}
      type={type}
    >
      {variant === "icon" ? (
        children
      ) : (
        <Typography
          color={
            variant === "text" ? theme.palette.primary : "rgb(255, 255, 255)"
          }
          size={"14px"}
          spacing={"1.25px"}
          style={{ textTransform: "uppercase" }}
          weight={"500"}
        >
          {children}
        </Typography>
      )}
    </button>
  );
};

export default Button;

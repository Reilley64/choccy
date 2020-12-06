import clsx from "clsx";
import React, { memo } from "react";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles((theme) => ({
  container: ({ textarea, width }) => ({
    display: "flex",
    flexDirection: "column",
    width,

    "& .text-field": {
      borderRadius: "4px 4px 0 0",
      display: "flex",
      height: textarea ? "auto" : "56px",
      position: "relative",
      width,

      "& .input": {
        backgroundColor: "transparent",
        border: "none",
        color: "rgba(0, 0, 0, 0.87)",
        display: "flex",
        fontFamily: "Roboto",
        fontSize: "16px",
        padding: "12px 16px 14px",
        outline: "none",
        width,
      },

      "& .outline-container": {
        display: "flex",
        height: "100%",
        left: "0",
        pointerEvents: "none",
        position: "absolute",
        right: "0",
        width: "100%",

        "& .notch-leading, .notch, .notch-trailing": {
          borderBottom: "1px solid rgba(0, 0, 0, 0.38)",
          borderTop: "1px solid rgba(0, 0, 0, 0.38)",
        },

        "& .notch-leading": {
          borderLeft: "1px solid rgba(0, 0, 0, 0.38)",
          borderRadius: "4px 0 0 4px",
          height: "100%",
          width: "12px",
        },

        "& .notch": {
          flex: "0 0 auto",
          height: "100%",
          maxWidth: "calc(100% -12px * 2)",
          width: "auto",

          "& .label": {
            color: "rgba(0, 0, 0, 0.6)",
            display: "inline-block",
            fontFamily: "Roboto",
            fontSize: "16px",
            left: "4px",
            maxWidth: "100%",
            pointerEvents: "none",
            position: "relative",
            right: "initial",
            top: textarea ? "17px" : "50%",
            transform: textarea ? "none" : "translateY(-50%)",
            transition:
              "transform 150ms cubic-bezier(.4, 0, .2, 1), color 150ms cubic-bezier(.4, 0, .2, 1)",
          },
        },

        "& .notch-trailing": {
          borderRight: "1px solid rgba(0, 0, 0, 0.38)",
          borderRadius: "0 4px 4px 0",
          flexGrow: "1",
        },
      },

      "&:hover": {
        "& .outline-container": {
          "& .notch-leading, .notch, .notch-trailing": {
            borderColor: "rgba(0, 0, 0, .87)",
          },
        },
      },

      "&:focus-within, &.value": {
        "& .outline-container": {
          "& .notch": {
            borderTop: "none",
            paddingRight: "8px",
            paddingTop: "2px",

            "& .label": {
              transform: textarea
                ? "translateY(-130%) scale(0.75)"
                : "translateY(-38.75px) scale(0.75)",
            },
          },
        },
      },

      "&:focus-within": {
        "& .outline-container": {
          "& .notch-leading, .notch, .notch-trailing": {
            borderColor: theme.palette.primary,
            borderWidth: "2px",
          },

          "& .notch": {
            "& .label": {
              color: theme.palette.primary,
            },
          },
        },
      },
    },
  }),
}));

const TextField = memo(
  ({ label, name, register, textarea, value, width = "256px" }) => {
    const styles = useStyles({ textarea, width });

    return (
      <div className={clsx(styles.container)}>
        <div className={clsx("text-field", { value })}>
          {textarea ? (
            <textarea className={clsx("input")} ref={register} name={name} />
          ) : (
            <input className={clsx("input")} ref={register} name={name} />
          )}
          <div className={clsx("outline-container")}>
            <div className={clsx("notch-leading")} />
            <div className={clsx("notch")}>
              <label className={clsx("label")} htmlFor={name}>
                {label}
              </label>
            </div>
            <div className={clsx("notch-trailing")} />
          </div>
        </div>
      </div>
    );
  }
);

export default TextField;

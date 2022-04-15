import { Button, ButtonProps } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

export const TagButton = ({
  style,
  styles,
  to,
  children,
  popular,
  ...props
}: ButtonProps<typeof Link> & { popular?: boolean }) => (
  <Button
    component={Link}
    to={to}
    variant="outline"
    style={{
      borderColor: popular ? "#0BB07B" : "#111112",
      borderRadius: "4px",
      color: popular ? "#00865A" : "#111112",
      height: "33px",
      paddingLeft: "12px",
      paddingRight: "12px",

      fontFamily: "Inter",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "24px",
      ...style,
    }}
    styles={{
      root: {
        "&:hover": {
          backgroundColor: "transparent",
        },
      },
      ...styles,
    }}
    {...props}
  >
    {children}
    {/* oil in canvas */}
  </Button>
);

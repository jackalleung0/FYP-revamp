import { ChevronDownIcon } from "@heroicons/react/solid";
import { Select, SelectProps } from "@mantine/core";
import React from "react";

export const CustomSelect = ({
  ...props
}: SelectProps & React.RefAttributes<HTMLInputElement>) => {
  return (
    <Select
      {...props}
      rightSection={<ChevronDownIcon style={{ width: 20 }} />}
      styles={{
        rightSection: {
          width: 20,
        },
        input: {
          border: 0,
          fontSize: "14px",
          fontFamily: "Inter",
          fontWeight: "normal",
          color: "#111112",
          height: "17px",
          lineHeight: "20px",
          textAlign: "end",
          paddingRight: 30 - 4 -1,
        },
        item: {
          fontSize: "14px",
          fontFamily: "Inter",
          fontWeight: "normal",
          color: "#111112",
          lineHeight: "20px",
        },
      }}
    />
  );
};

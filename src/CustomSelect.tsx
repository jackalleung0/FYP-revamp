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
        input: {
          border: 0,
          fontSize: "14px",
          fontFamily: "Inter",
          fontWeight: "normal",
          color: "#111112",
          height: "17px",
          lineHeight: "20px",
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

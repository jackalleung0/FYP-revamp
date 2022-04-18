import { Text, Image } from "@mantine/core";
import React, { forwardRef } from "react";
import { getImageURL } from "./getImageURL";

const defaultValue = {
  title: "The Girl by the Window",
  tag: "oil on canvas",
  author: "Edvard Munch",
  src: "https://picsum.photos/1200",
};

export const DiscoverCard = forwardRef<
  HTMLImageElement,
  {
    title: string;
    tag: string;
    author: string;
    src: string;
    onClickCapture: () => void;
  }
>(({ title, tag, author, src, onClickCapture }, ref) => {
  return (
    <div style={{ position: "relative" }} onClickCapture={onClickCapture}>
      <Image
        src={src}
        width={228}
        height={182}
        styles={{
          image: {
            borderRadius: "8px",
          },
        }}
        imageRef={ref}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 228,
          height: 182,
          borderRadius: "8px",
          opacity: 0.2,
          backgroundColor: "#000",
        }}
      />
      <Text
        style={{
          paddingTop: "13px",
          fontSize: "13px",
          fontFamily: "Inter",
          fontWeight: "normal",
          lineHeight: "16px",
          color: "#00865A",
        }}
        lineClamp={1}
      >
        {tag}
      </Text>
      <Text
        lineClamp={1}
        style={{
          paddingTop: "8px",
          fontSize: "18px",
          fontFamily: "SFProDisplay",
          fontWeight: "bold",
          lineHeight: "20px",
        }}
      >
        {title}
      </Text>
      <Text
        lineClamp={1}
        style={{
          paddingTop: "9px",
          fontSize: "13px",
          fontFamily: "Inter",
          fontWeight: "normal",
          lineHeight: "16px",
          color: "#8A94A6",
        }}
      >
        {author}
      </Text>
    </div>
  );
});

import { Text, Image } from "@mantine/core";
import React from "react";

const defaultValue = {
  title: "The Girl by the Window",
  tag: "oil on canvas",
  author: "Edvard Munch",
};

export function DiscoverCard(props: any): JSX.Element {
  // @ts-expect-error 2525
  const { title, tag, author } = { ...defaultValue, ...props };
  return (
    <div style={{ position: "relative" }}>
      <Image
        src="https://picsum.photos/1200"
        width={228}
        height={182}
        styles={{
          image: {
            borderRadius: "8px",
          },
        }}
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
      >
        {tag}
      </Text>
      <Text
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
}

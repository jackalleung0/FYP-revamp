import { Text, Image } from "@mantine/core";
import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

export const MasImage = forwardRef<
  HTMLImageElement,
  { artist: string; title: string; src: string; id: string }
>(({ src, title, id, artist }: any, ref) => {
  const nav = useNavigate();
  return (
    <div
      style={{
        marginBottom: "23px",
        width: 160,
        display: "inline-block",
      }}
      onClickCapture={() => nav(`/artwork/${id}`)}
    >
      <Image radius={12} src={src} imageRef={ref} />
      <Text
        style={{
          paddingTop: 11,
          fontFamily: "SFProDisplay",
          fontSize: 16,
          fontWeight: "bold",
          lineHeight: "20px",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          paddingTop: 4,

          fontFamily: "Inter",
          fontSize: 13,
          fontWeight: "100",
          lineHeight: "16px",
          color: "#8A94A6",
        }}
      >
        {artist}
      </Text>
    </div>
  );
});

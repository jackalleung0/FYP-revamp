import { createStyles, Text, Image } from "@mantine/core";
import React, { createRef, forwardRef, useRef } from "react";
import { useNavigate } from "react-router-dom";

const style = createStyles((theme, _params, getRef) => ({
  root: {
    boxShadow: theme.shadows.lg,
  },
}));

export const RecommendedCard = forwardRef<HTMLImageElement>(
  ({ src, title, text, artist, id }: any, ref) => {
    const { classes } = style();
    const nav = useNavigate();

    return (
      <div
        style={{
          width: "317px",
          borderRadius: "12px",
        }}
        className={classes.root}
        onClickCapture={() => nav(`/artwork/${id}`)}
      >
        <div style={{ position: "relative" }}>
          <Image
            width={317}
            height={322}
            styles={{
              image: {
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              },
            }}
            src={src}
            imageRef={ref}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "317px",
              height: "322px",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              opacity: 0.2,
              backgroundColor: "#000",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              marginLeft: "20px",
              marginRight: "20px",
              marginBottom: "27px",
            }}
          >
            <Text
              style={{
                fontFamily: "SFProDisplay",
                fontWeight: "bold",
                fontSize: "22px",
                lineHeight: "28px",
                color: "#FFF",
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                marginTop: "10px",
                fontFamily: "Inter",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "18px",
                color: "#FFF",
              }}
              lineClamp={3}
            >
              {text}
            </Text>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "317px",
            height: "63px",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#FFF",
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
          }}
        >
          <Text
            style={{
              marginLeft: "20px",
              fontFamily: "Inter",
              fontWeight: "normal",
              fontSize: "14px",
              lineHeight: "24px",
            }}
            lineClamp={1}
          >
            {artist}
          </Text>
          <svg
            style={{ marginRight: "21px", flexShrink: 0 }}
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="15"
            viewBox="0 0 17 15"
          >
            <path
              id="Path_4"
              data-name="Path 4"
              d="M4.1,6.115a3.849,3.849,0,0,0,0,5.385L10.5,18l6.4-6.5a3.849,3.849,0,0,0,0-5.385,3.71,3.71,0,0,0-5.3,0L10.5,7.23,9.4,6.115a3.71,3.71,0,0,0-5.3,0Z"
              transform="translate(-2 -4)"
              fill="none"
              stroke="#111112"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    );
  }
);

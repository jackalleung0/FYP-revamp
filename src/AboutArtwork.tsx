import React from "react";
import { useNavigate } from "react-router-dom";
import { BackIcon } from "./BackIcon";
import { CommentIcon } from "./CommentIcon";
import { ShareIcon } from "./ShareIcon";

export function AboutArtwork() {
  const nav = useNavigate();
  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 10,
          paddingTop: 10,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 24,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <BackIcon onClick={() => nav(-1)} />

          <ShareIcon />
        </div>
      </div>
    </>
  );
}

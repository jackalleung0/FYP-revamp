import { createStyles, Text, Image } from "@mantine/core";
import React, { createRef, forwardRef, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HeartIcon as SolidHeartIcon, StarIcon } from "@heroicons/react/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/outline";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, getFirestore, DocumentReference } from "firebase/firestore";
import { app } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { Artwork } from "../Artwork";
import { handleLikeArtwork } from "./handleLikeArtwork";
import axios from "axios";
import { useAsync } from "react-async-hook";

const style = createStyles((theme, _params, getRef) => ({
  root: {
    boxShadow: theme.shadows.lg,
  },
}));

export const RecommendedCard = forwardRef<HTMLImageElement>(
  ({ src, title, text, artist, id }: any, ref) => {
    const { classes } = style();
    const nav = useNavigate();

    const [user] = useAuthState(getAuth(app));
    const [userProfile, userLoading] = useDocumentData(
      user &&
        (doc(getFirestore(app), `users/${user.uid}`) as DocumentReference<{
          likedArtworks: string[];
        }>)
    );
    const userLikedArtwork = useMemo(
      () =>
        (id &&
          userProfile &&
          (userProfile.likedArtworks || []).includes(String(id))) ||
        false,
      [userProfile, id]
    );

    const toggleHeart: React.MouseEventHandler<SVGSVGElement> = (e) => {
      e.stopPropagation();

      handleLikeArtwork({
        artworkID: String(id),
      });
    };

    return (
      <div
        style={{
          width: "317px",
          borderRadius: "12px",
        }}
        className={classes.root}
        onClick={() => nav(`/artwork/${id}`)}
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
              lineClamp={2}
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
          {userLikedArtwork ? (
            <SolidHeartIcon
              style={{
                width: 17 + 5,
                height: 15 + 5,
                color: "#DD2727",
                marginRight: "21px",
                flexShrink: 0,
              }}
              onClickCapture={toggleHeart}
            />
          ) : (
            <OutlineHeartIcon
              style={{
                width: 17 + 5,
                height: 15 + 5,
                marginRight: "21px",
                flexShrink: 0,
              }}
              onClickCapture={toggleHeart}
            />
          )}
        </div>
      </div>
    );
  }
);

import {
  Container,
  Text,
  Image,
  ActionIcon,
  createStyles,
  Affix,
  Transition,
  LoadingOverlay,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { getAuth } from "firebase/auth";
import {
  query,
  collection,
  getFirestore,
  orderBy,
  limit,
} from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { Artwork } from "./Artwork";
import { BackIcon } from "./BackIcon";
import { fetchArtwork } from "./fetchArtwork";
import { app } from "./firebaseConfig";
import { getArtistName } from "./getArtistName";
import { getImageURL } from "./getImageURL";
import { useRefCallback } from "./useRefCallback";

const useStyles = createStyles((theme, _params, getRef) => ({
  ActionIcon: {
    boxShadow: theme.shadows.lg,
  },
}));

export function RecentlyViewed() {
  const nav = useNavigate();
  const { classes } = useStyles();
  const [scroll, scrollTo] = useWindowScroll();

  const [user, authLoading] = useAuthState(getAuth(app));

  const [snapshot, loading, error] = useCollection<any>(
    (user?.uid &&
      query(
        collection(getFirestore(app), `/users/${user.uid}/history`),
        orderBy("lastAccessed", "desc"),
        limit(10)
      )) ||
      undefined
  );
  const ids = useMemo(
    () => snapshot?.docs.map((doc) => doc.id) || [],
    [snapshot]
  );
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  useEffect(() => {
    if (ids) {
      Promise.allSettled(ids.map(fetchArtwork))
        .then((e) =>
          // filter success result, and map to their values
          e.filter((e) => e.status === "fulfilled").map((e: any) => e.value)
        )
        .then(setArtworks);
    }
  }, [ids]);
  const toArtworkDetail = (id: number) => () => {
    nav(`/artwork/${id}`);
  };

  const [ref, loaded] = useRefCallback();

  const allDoneLoading = useMemo(
    () => !loading && !authLoading && loaded,
    [loading, authLoading, loaded]
  );

  return (
    <>
      <Container
        style={{
          paddingTop: 10,
          paddingLeft: 20,
          paddingRight: 20,
          position: "relative",
        }}
      >
        <LoadingOverlay
          style={{ height: "100vh" }}
          visible={!allDoneLoading}
          overlayOpacity={1}
          overlayColor="#FFF"
          loaderProps={{ color: "#111112" }}
        />
        <Affix position={{ bottom: 30, right: 22 }}>
          <Transition mounted={true} transition="slide-left" duration={300}>
            {(transitionStyles) => (
              <ActionIcon
                onClickCapture={() => scrollTo({ y: 0 })}
                className={classes.ActionIcon}
                radius={9999}
                size={70}
                style={{
                  backgroundColor: "#111112",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path
                    id="Up_Icon"
                    d="M3.377,10.67a1.029,1.029,0,0,1,0-1.591l7.714-6.75a1.419,1.419,0,0,1,1.818,0l7.714,6.75a1.028,1.028,0,0,1,0,1.591,1.419,1.419,0,0,1-1.818,0l-5.52-4.83V18.875A1.213,1.213,0,0,1,12,20a1.213,1.213,0,0,1-1.286-1.125V5.841l-5.52,4.83a1.419,1.419,0,0,1-1.818,0Z"
                    transform="translate(-3 -2)"
                    fill="#fff"
                    fillRule="evenodd"
                  />
                </svg>
              </ActionIcon>
            )}
          </Transition>
        </Affix>
        <BackIcon onClick={() => nav(-1)} />
        <Text
          style={{
            marginTop: "39px",
            fontSize: "24px",
            fontFamily: "SFProDisplay",
            fontWeight: "bold",
            color: "#000000",
            height: "29px",
            lineHeight: "28px",
            paddingBottom: "23px",
          }}
        >
          Recently Viewed
        </Text>
        <div style={{ paddingBottom: 120 }}>
          {artworks.map((artwork, index) => (
            <div key={artwork.id} onClickCapture={toArtworkDetail(artwork.id)}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "25px",
                  paddingBottom: "23px",
                  // borderBottom: "1px solid #F1F2F4",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    marginRight: 14,
                  }}
                >
                  <Text
                    style={{
                      fontSize: "13px",
                      fontFamily: "Inter",
                      fontWeight: "normal",
                      color: "#00865A",
                      minHeight: "16px",
                      lineHeight: "16px",
                    }}
                    lineClamp={1}
                  >
                    {artwork.style_title || artwork.artwork_type_title}
                  </Text>
                  <Text
                    style={{
                      fontSize: "18px",
                      fontFamily: "SFProDisplay",
                      fontWeight: "bold",
                      color: "#000000",
                      minHeight: "21px",
                      lineHeight: "20px",
                    }}
                    lineClamp={2}
                  >
                    {artwork.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: "13px",
                      fontFamily: "Inter",
                      fontWeight: "normal",
                      color: "#8A94A6",
                      minHeight: "16px",
                      lineHeight: "16px",
                    }}
                    lineClamp={1}
                  >
                    {getArtistName(artwork.artist_display)}
                  </Text>
                </div>
                <div style={{ position: "relative" }}>
                  <Image
                    width={97}
                    height={93}
                    src={getImageURL(artwork.image_id)}
                    radius={8}
                    imageRef={(el) => ref(el as any, index)}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 97,
                      height: 93,
                      borderRadius: "8px",
                      opacity: 0.2,
                      backgroundColor: "#000",
                    }}
                  />
                </div>
              </div>
              <hr
                style={{
                  margin: 0,
                  border: "none",
                  height: "1px",
                  backgroundColor: "#F1F2F4",
                }}
              />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

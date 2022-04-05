import {
  Container,
  Text,
  Image,
  ActionIcon,
  createStyles,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BackIcon } from "./BackIcon";

const useStyles = createStyles((theme, _params, getRef) => ({
  ActionIcon: {
    boxShadow: theme.shadows.lg,
  },
}));

export function RecentlyViewed() {
  const nav = useNavigate();
  const { classes } = useStyles();
  const [scroll, scrollTo] = useWindowScroll();

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
        <ActionIcon
          onClickCapture={() => scrollTo({ y: 0 })}
          className={classes.ActionIcon}
          radius={9999}
          size={70}
          style={{
            backgroundColor: "#111112",
            position: "fixed",
            bottom: "30px",
            right: "22px",
            zIndex: 2,
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
              fill-rule="evenodd"
            />
          </svg>
        </ActionIcon>
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
          {Array(10)
            .fill(1)
            .map(() => (
              <>
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
                    >
                      modern and contemporary art
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
                    >
                      Untitled (Painting)
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
                    >
                      Mark Rothko (Marcus Rothkowitz)
                    </Text>
                  </div>
                  <div style={{ position: "relative" }}>
                    <Image
                      width={97}
                      height={93}
                      src="https://picsum.photos/1200"
                      radius={8}
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
              </>
            ))}
        </div>
      </Container>
    </>
  );
}

import {
  Container,
  ActionIcon,
  Text,
  Image,
  createStyles,
  Affix,
  Transition,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { BackIcon } from "./BackIcon";

const useStyles = createStyles((theme, _params, getRef) => ({
  ActionIcon: {
    boxShadow: theme.shadows.lg,
  },
}));

export function SearchByTag() {
  const nav = useNavigate();
  const [scroll, scrollTo] = useWindowScroll();
  const { classes } = useStyles();
  const { search } = useLocation();
  const images = React.useMemo(() => {
    return Array(20)
      .fill(1)
      .map(() => Math.floor(Math.random() * 6) * 100)
      .map((width) => `https://picsum.photos/300/${width}`);
  }, []);
  const [searchParams] = useSearchParams();
  return (
    <div>
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
                ...transitionStyles,
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
          )}
        </Transition>
      </Affix>
      <Container
        style={{
          paddingTop: 10,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <BackIcon onClick={() => nav(-1)} />
        <Text
          align="center"
          style={{
            marginTop: "9px",
            fontSize: "14px",
            fontFamily: "Inter",
            fontWeight: "100",
            color: "#8A94A6",
            height: "17px",
            lineHeight: "16px",
            paddingBottom: "36px",
          }}
        >
          See 6321 results for {searchParams.get("term") || "oil in canvas"}
        </Text>
        <div style={{ columnCount: 2, columnGap: "15px" }}>
          {images.map((src, index) => (
            <MasImage src={src} key={index} />
          ))}
        </div>
      </Container>
    </div>
  );
}
const MasImage = ({ src }: { src: string }) => {
  const nav = useNavigate();
  return (
    <div
      style={{
        marginBottom: "23px",
        display: "inline-block",
      }}
      onClickCapture={() => nav("/artwork/1")}
    >
      <Image radius={12} src={src} />
      <Text
        style={{
          paddingTop: 11,

          fontFamily: "SFProDisplay",
          fontSize: 16,
          fontWeight: "bold",
          lineHeight: "20px",
        }}
      >
        Self-Portrait
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
        Vincent van Gogh
      </Text>
    </div>
  );
};

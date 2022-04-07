import {
  Affix,
  ActionIcon,
  Container,
  createStyles,
  Center,
  Image,
  Title,
  Text,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Transition } from "react-transition-group";
import { BackIcon } from "./BackIcon";
import { DiscoverCard } from "./DiscoverCard";
import { TagButton } from "./TagButton";

const useStyles = createStyles((theme, _params, getRef) => ({
  ActionIcon: {
    boxShadow: theme.shadows.lg,
  },
}));

export function ArtworkDetail() {
  const { classes } = useStyles();
  const nav = useNavigate();
  let { id } = useParams();
  return (
    <div>
      <Affix position={{ bottom: 30, right: 22 }}>
        <ActionIcon
          // onClickCapture={() => scrollTo({ y: 0 })}
          className={classes.ActionIcon}
          radius={9999}
          size={70}
          style={{
            backgroundColor: "#111112",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22.239"
            height="24.342"
            viewBox="0 0 22.239 24.342"
          >
            <path
              id="AR_Icon"
              d="M16.222,11.556l-2.444,1.222m0,0-2.444-1.222m2.444,1.222v3.056m9.778-7.944L21.111,9.111m2.444-1.222L21.111,6.667m2.444,1.222v3.056M16.222,4.222,13.778,3,11.333,4.222M4,7.889,6.444,6.667M4,7.889,6.444,9.111M4,7.889v3.056M13.778,25l-2.444-1.222M13.778,25l2.444-1.222M13.778,25V21.944m-7.333-.611L4,20.111V17.056m17.111,4.278,2.444-1.222V17.056"
              transform="translate(-2.658 -2)"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </ActionIcon>
      </Affix>
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

          <div style={{ display: "flex", gap: 32 }}>
            <CommentIcon />
            <ShareIcon />
          </div>
        </div>
      </div>
      <Center style={{ backgroundColor: "#F1F2F4" }}>
        <Image
          width={335}
          height={263}
          withPlaceholder
          style={{ padding: "68px 20px" }}
          src="https://picsum.photos/1200"
        />
      </Center>
      <Container
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 33,
        }}
      >
        <LikeIcon style={{ float: "right", paddingTop: 5 }} />
        {/* <ActionIcon
          style={{ float: "right" }}
          styles={{
            root: {
              "&:hover": {
                backgroundColor: "transparent",
              },
              border: 0,
            },
          }}
        ></ActionIcon> */}
        <Title
          style={{
            fontSize: "24px",
            fontFamily: "SFProDisplay",
            fontWeight: "bold",
            color: "#000000",
            height: "29px",
            lineHeight: "28px",
          }}
        >
          The Bedroom
        </Title>

        <Text
          style={{
            paddingTop: 4,

            fontSize: "14px",
            fontFamily: "Inter",
            fontWeight: "100",
            color: "#4E5D78",
            height: "17px",
            lineHeight: "20px",
          }}
        >
          Vincent van Gogh
        </Text>
        <div style={{ display: "flex", paddingTop: 25, gap: 8 }}>
          <FilledStar />
          <FilledStar />
          <FilledStar />
          <EmptyStar />
          <EmptyStar />
        </div>
        <hr
          style={{
            marginTop: 32,

            flexGrow: 1,
            border: "none",
            height: "1px",
            backgroundColor: "#F1F2F4",
          }}
        />
      </Container>
      <Container
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 17,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title
            style={{
              fontSize: "13px",
              fontFamily: "Inter",
              fontWeight: "bold",
              color: "#4E5D78",
              height: "16px",
              lineHeight: "16px",
              width: "max-content",
            }}
          >
            ABOUT ARTWORK
          </Title>
          <Text
            underline
            transform="uppercase"
            style={{
              fontSize: "13px",
              fontFamily: "Inter",
              fontWeight: "normal",
              color: "#8A94A6",
              lineHeight: "16px",
              height: "16px",
            }}
          >
            View More
          </Text>
        </div>
        <Text
          style={{
            paddingTop: 15,

            fontSize: "15px",
            fontFamily: "Inter",
            fontWeight: "100",
            color: "#283A5B",
            height: "39px",
            lineHeight: "20px",
          }}
        >
          Painting of bedroom, blue walls, green window, tan bed, red bedding.
        </Text>
        <hr
          style={{
            marginTop: 32,

            flexGrow: 1,
            border: "none",
            height: "1px",
            backgroundColor: "#F1F2F4",
          }}
        />
      </Container>
      <Container
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 32,
        }}
      >
        <div>
          <Text
            style={{
              fontSize: "13px",
              fontFamily: "Inter",
              fontWeight: "bold",
              color: "#4E5D78",
              height: "16px",
              lineHeight: "16px",
              paddingBottom: "15px",
            }}
          >
            RELATED TAGS
          </Text>
          <div
            style={{
              display: "flex",
              gap: "16px 6px",
              minWidth: "min-content",
              flexWrap: "wrap",
            }}
          >
            {[
              "oil in canvas",
              "oil painting",
              "Post-Impressionism",
              "interiors",
              "oil paint (paint)",
              "painting (image making)",
              "painting",
              "european painting",
              "domestic scenes",
              "Century of Progress",
            ].map((value, i) => (
              <TagButton popular={i === 0} to="/search-result">
                {value}
              </TagButton>
            ))}
          </div>
        </div>
        <hr
          style={{
            marginTop: 32,

            flexGrow: 1,
            border: "none",
            height: "1px",
            backgroundColor: "#F1F2F4",
          }}
        />
      </Container>
      <Text
        transform="uppercase"
        style={{
          marginLeft: "20px",
          marginTop: "24px",
          fontSize: "13px",
          fontFamily: "Inter",
          fontWeight: "bold",
          color: "#4E5D78",
          height: "16px",
          lineHeight: "16px",
          paddingBottom: "15px",
        }}
      >
        OTHER ARTWORKS
      </Text>
      <div
        style={{
          overflowY: "hidden",
          width: "100%",
          paddingBottom: 120,
        }}
        className="no-scrollbar"
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            paddingLeft: "20px",
            paddingRight: "20px",
            minWidth: "min-content",
          }}
        >
          {Array(4)
            .fill(1)
            .map((_, index) => (
              <DiscoverCard
                key={index}
                title="Self-Portrait"
                tag="oil on board"
                author="Vincent van Gogh"
              />
            ))}
        </div>
      </div>
    </div>
  );
}

const FilledStar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <path
      id="Path_8"
      data-name="Path 8"
      d="M9.542,3.012a1.063,1.063,0,0,1,2.047,0l1.151,3.7a1.082,1.082,0,0,0,1.022.775h3.725a1.133,1.133,0,0,1,.633,2.034l-3.013,2.285a1.152,1.152,0,0,0-.392,1.256l1.151,3.7a1.089,1.089,0,0,1-1.657,1.256L11.2,15.731a1.04,1.04,0,0,0-1.264,0L6.92,18.016A1.088,1.088,0,0,1,5.264,16.76l1.151-3.7a1.152,1.152,0,0,0-.392-1.256L3.011,9.521a1.133,1.133,0,0,1,.633-2.034H7.369a1.082,1.082,0,0,0,1.023-.775l1.151-3.7Z"
      transform="translate(-2.566 -2.236)"
    />
  </svg>
);

const EmptyStar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <path
      id="Path_9"
      data-name="Path 9"
      d="M9.542,3.012a1.063,1.063,0,0,1,2.047,0l1.151,3.7a1.082,1.082,0,0,0,1.022.775h3.725a1.133,1.133,0,0,1,.633,2.034l-3.013,2.285a1.152,1.152,0,0,0-.392,1.256l1.151,3.7a1.089,1.089,0,0,1-1.657,1.256L11.2,15.731a1.04,1.04,0,0,0-1.264,0L6.92,18.016A1.088,1.088,0,0,1,5.264,16.76l1.151-3.7a1.152,1.152,0,0,0-.392-1.256L3.011,9.521a1.133,1.133,0,0,1,.633-2.034H7.369a1.082,1.082,0,0,0,1.023-.775l1.151-3.7Z"
      transform="translate(-2.566 -2.236)"
      fill="#e1e4e8"
    />
  </svg>
);

const LikeIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="18.8"
    height="17"
    viewBox="0 0 18.8 17"
  >
    <path
      id="Like_Icon"
      d="M4.23,6.287a4.538,4.538,0,0,0,0,6.213L11.4,20l7.17-7.5a4.538,4.538,0,0,0,0-6.213,4.071,4.071,0,0,0-5.94,0L11.4,7.574,10.17,6.287a4.071,4.071,0,0,0-5.94,0Z"
      transform="translate(-2 -4)"
      fill="none"
      stroke="#111112"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    />
  </svg>
);

const CommentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="18"
    viewBox="0 0 20 18"
  >
    <path
      id="Comment_Icon"
      d="M7,8H17M7,12h4m1,8L8,16H5a2,2,0,0,1-2-2V6A2,2,0,0,1,5,4H19a2,2,0,0,1,2,2v8a2,2,0,0,1-2,2H16Z"
      transform="translate(-2 -3)"
      fill="none"
      stroke="#000"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    />
  </svg>
);
const ShareIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18.01"
    height="18.318"
    viewBox="0 0 18.01 18.318"
  >
    <path
      id="Share_Icon"
      d="M8.052,12.192a2.673,2.673,0,0,0,0-2.385m0,2.385a2.666,2.666,0,1,1,0-2.385m0,2.385,5.895,2.947M8.052,9.806l5.895-2.947m0,0A2.667,2.667,0,1,0,15.14,3.281,2.667,2.667,0,0,0,13.947,6.859Zm0,8.28a2.667,2.667,0,1,0,3.579-1.193,2.667,2.667,0,0,0-3.579,1.193Z"
      transform="translate(-2.001 -1.84)"
      fill="none"
      stroke="#000"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    />
  </svg>
);

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
import axios from "axios";
import React from "react";
import { useAsync } from "react-async-hook";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { BackIcon } from "./BackIcon";
import { getArtistName } from "./getArtistName";
import { getImageURL } from "./getImageURL";

const useStyles = createStyles((theme, _params, getRef) => ({
  ActionIcon: {
    boxShadow: theme.shadows.lg,
  },
}));

const instance = axios.create({
  baseURL: "https://api.artic.edu/api/v1",
  timeout: 10000,
});

const searchArtworkBySearchTerm = async (term: string) => {
  return (
    await instance.get("artworks/search", {
      params: {
        limit: 100,
        // just put all the author in the search list, and let the search do its thing
        // the array is for readability
        q: term,
        fields: [
          "image_id",
          "title",
          "thumbnail",
          "id",
          "artist_display",
          "term_titles",
        ].join(","),
      },
    })
  ).data.data;
};

export function SearchByTag() {
  const nav = useNavigate();
  const [scroll, scrollTo] = useWindowScroll();
  const { classes } = useStyles();
  const { search } = useLocation();
  // const images = React.useMemo(() => {
  //   return Array(20)
  //     .fill(1)
  //     .map(() => Math.floor(Math.random() * 6) * 100)
  //     .map((width) => `https://picsum.photos/300/${width}`);
  // }, []);
  const [searchParams] = useSearchParams();
  const { result } = useAsync(searchArtworkBySearchTerm, [
    searchParams.get("term") || "",
  ]);
  console.log(result);
  return (
    <div>
      {result && result.length > 0 && (
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
      )}
      <Container
        style={{
          paddingTop: 10,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <BackIcon onClick={() => nav(-1)} />

        {result && result.length > 0 && (
          <>
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
              See {result && result.length} results for{" "}
              {searchParams.get("term") || "oil in canvas"}
            </Text>
            <div style={{ columnCount: 2, columnGap: "15px" }}>
              {result.map(
                ({ image_id, title, artist_display, id }: any, index: any) => (
                  <MasImage
                    src={getImageURL(image_id)}
                    key={index}
                    {...{ title, id }}
                    artist={getArtistName(artist_display)}
                  />
                )
              )}
            </div>
          </>
        )}
      </Container>
      {result && result.length <= 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "calc(100vh - 33px)",
          }}
        >
          <Text
            align="center"
            style={{
              fontFamily: "Inter",
              fontSize: 16,
              fontWeight: "100",
              lineHeight: "20px",
              color: "#8A94A6",
              height: "max-content",
            }}
          >
            No results can be found. Please try another keywords.
          </Text>
        </div>
      )}
    </div>
  );
}
const MasImage = ({ src, title, id, artist }: any) => {
  const nav = useNavigate();
  return (
    <div
      style={{
        marginBottom: "23px",
        display: "inline-block",
      }}
      onClickCapture={() => nav(`/artwork/${id}`)}
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
};

import {
  Center,
  Container,
  createStyles,
  Image,
  Title,
  Text,
  Affix,
  LoadingOverlay,
} from "@mantine/core";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useAsync } from "react-async-hook";
import { useNavigate, useParams } from "react-router-dom";
import { BackIcon } from "./BackIcon";
import { CommentIcon } from "./CommentIcon";
import { getArtistName } from "./getArtistName";
import { ShareIcon } from "./ShareIcon";
import sanitizeHtml from "sanitize-html";
import { getArtworkDetails } from "./getArtworkDetails";
import { useToggle } from "@mantine/hooks";
import { ShareSheet } from "./ShareSheet";

const useStyles = createStyles((theme, _params, getRef) => ({
  ActionIcon: {
    boxShadow: theme.shadows.lg,
  },
  Image: {
    boxShadow: theme.shadows.lg,
  },
}));

export const instance = axios.create({
  baseURL: "https://api.artic.edu/api/v1",
  timeout: 10000,
});

function sanitizeLinks(description: any) {
  return description
    .replace(/href="(.*?)"/g, function () {
      return 'href="#"';
    })
    .replace(/target="(.*?)"/g, function () {
      return 'target="_self"';
    });
}

const searchArtwork = async (term: string) => {
  return (
    await instance.get(`artworks/search`, {
      params: {
        q: term,
        fields: ["image_id", "artist_display"].join(",").replaceAll(" ", ""),
      },
    })
  ).data.data[0];
};
const getArtist = async (artists: string) =>
  (await instance.get(`artists/${artists}`)).data.data;

const getArtistsInfo = async (artistsId: string) => {
  const getTopResult = async (term: string) =>
    (
      await instance.get(`artworks/search`, {
        params: {
          q: term,
          // fields: "id,title,artist_display,date_display,main_reference_number",
          fields: ["image_id", "artist_display", "artist_display"]
            .join(",")
            .replaceAll(" ", ""),
        },
      })
    ).data.data[0];

  const { title, description, id: artists_id } = await getArtist(artistsId);
  const { artist_display, image_id } = await getTopResult(title);
  return {
    artists_id,
    title: title,
    image_id: image_id,
    description: description ? sanitizeLinks(description) : "",
    artist_display: artist_display,
  };
};

export function AboutArtist() {
  const nav = useNavigate();
  // const [haveInformation, setHaveInformation] = useState(true);
  let { id } = useParams<{ id: string }>();
  const { result, loading: detailsLoading } = useAsync(getArtworkDetails, [
    id || "",
  ]);
  const { result: artistResult, loading: artistsLoading } = useAsync(
    getArtistsInfo,
    [(result?.artist_id && String(result?.artist_id)) || ""]
  );

  const [show, toggle] = useState(false);

  const shareLink = React.useMemo(
    () =>
      (artistResult?.artists_id &&
        `https://final-year-project-revamp.web.app/api/artist/${id}/${artistResult.artists_id}`) ||
      undefined,
    [id, artistResult]
  );

  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ShareSheet {...{ show, toggle }} shareLink={shareLink} />
      <LoadingOverlay
        visible={detailsLoading || artistsLoading}
        overlayOpacity={1}
        overlayColor="#FFF"
        loaderProps={{ color: "#111112" }}
        style={{ height: "100vh" }}
      />
      {/* <Affix
        position={{ top: 0, left: 0, right: 0 }}
        style={{ display: detailsLoading || artistsLoading ? "none" : "block" }}
      >
        <div
          ref={headerRef}
          style={{
            paddingTop: 10,
            paddingLeft: 20,
            paddingRight: 20,
            background: "#FFFFFF",
            paddingBottom: 35,
          }}
          id="header-bar"
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <BackIcon onClick={() => nav(-1)} />

            <ShareIcon onClickCapture={toggle} />
          </div>
        </div>
      </Affix> */}
      <Affix
        position={{ top: 0, left: 0, right: 0 }}
        style={{ display: detailsLoading || artistsLoading ? "none" : "block" }}
      >
        <div
          ref={headerRef}
          style={{
            paddingTop: 10,
            paddingLeft: 20,
            paddingRight: 20,
            background: "#FFFFFF",
          }}
          id="header-bar"
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <BackIcon onClick={() => nav(-1)} />

            <div style={{ display: "flex", gap: 32, paddingBottom: 24 }}>
              <ShareIcon onClickCapture={toggle} />
            </div>
          </div>
        </div>
      </Affix>
      <div
        style={{ display: detailsLoading || artistsLoading ? "none" : "block" }}
      >
        <div style={{ height: headerRef?.current?.style.height || 63 }} />
        <Affix position={{ bottom: 0, left: 0, right: 0 }} zIndex={2}>
          <div
            id="grad"
            style={{
              height: 114,
              background:
                "linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
            }}
          />
        </Affix>

        <Container
          style={{
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Title
            style={{
              fontFamily: "Inter",
              fontSize: 13,
              fontWeight: "bold",
              lineHeight: "16px",
              height: "16px",
              color: "#4E5D78",
            }}
          >
            ABOUT ARTIST
          </Title>
          <Text
            style={{
              paddingTop: 12,
              fontFamily: "SFProDisplay",
              fontSize: 18,
              fontWeight: "bold",
              lineHeight: "28px",
              height: "21px",
              color: "#000000",
              paddingBottom: 6,
            }}
            lineClamp={1}
          >
            {(artistResult && artistResult.title) || ""}
          </Text>
          <Text
            style={{
              fontSize: "14px",
              fontFamily: "Inter",
              fontWeight: "100",
              color: "#4E5D78",
              height: "17px",
              lineHeight: "20px",
            }}
          >
            {/* Italian, 1580-1654 */}
            {/* Dutch, 1853-1890 */}
            {artistResult && artistResult.artist_display.split("\n")[1]}
          </Text>
          <hr
            style={{
              marginTop: 33,
              flexGrow: 1,
              border: "none",
              height: "1px",
              backgroundColor: "#F1F2F4",
            }}
          />
          {artistResult && artistResult.description ? (
            <Text
              style={{
                paddingTop: 24 - 15,
                fontFamily: "Inter",
                fontSize: 15,
                fontWeight: "100",
                lineHeight: "20px",
                color: "#283A5B",
                paddingBottom: 120,
              }}
              sx={{
                "& p > a": {
                  color: "#283A5B !important",
                },
              }}
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(artistResult.description),
              }}
            >
              {/* {artistResult && artistResult.description} */}
            </Text>
          ) : (
            <div
              style={{
                paddingTop: 144,
                paddingBottom: 256,
                width: 205,
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <NoInformationIcon style={{ margin: "0 auto" }} />
              <Text
                style={{
                  paddingTop: 36,
                  fontFamily: "Inter",
                  fontSize: 16,
                  fontWeight: "100",
                  color: "#8A94A6",
                  lineHeight: "20px",
                }}
                align="center"
              >
                No further information
                <br />
                can be provided now.
              </Text>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

const NoInformationIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="83"
    height="115"
    viewBox="0 0 83 115"
    {...props}
  >
    <path
      id="No_Content_Icon"
      d="M17.833,2A14.112,14.112,0,0,0,4,16.375v86.25A14.112,14.112,0,0,0,17.833,117H73.167A14.112,14.112,0,0,0,87,102.625V40.913a14.664,14.664,0,0,0-4.051-10.161L59.333,6.212A13.574,13.574,0,0,0,49.553,2ZM24.75,59.5a7.193,7.193,0,0,0,0,14.375h41.5a7.193,7.193,0,0,0,0-14.375Z"
      transform="translate(-4 -2)"
      fillRule="evenodd"
    />
  </svg>
);

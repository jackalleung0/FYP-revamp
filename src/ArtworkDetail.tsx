import {
  Affix,
  ActionIcon,
  Container,
  createStyles,
  Center,
  Image,
  Title,
  Text,
  Button,
  Group,
  UnstyledButton,
} from "@mantine/core";
import { BottomSheet } from "react-spring-bottom-sheet";
import { useWindowScroll } from "@mantine/hooks";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Transition } from "react-transition-group";
import { BackIcon } from "./BackIcon";
import { CommentIcon } from "./CommentIcon";
import { DiscoverCard } from "./DiscoverCard";
import { ShareIcon } from "./ShareIcon";
import { TagButton } from "./TagButton";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { TelegramIcon } from "./TelegramIcon";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { TwitterIcon } from "./TwitterIcon";
import { NotificationIcon } from "./NotificationIcon";
import { LinkIcon } from "./LinkIcon";
import { LikeIcon } from "./LikeIcon";
import { EmptyStar } from "./EmptyStar";
import { FilledStar } from "./FilledStar";
import { useAsync } from "react-async-hook";
import { getImageURL } from "./getImageURL";
import { getArtistName } from "./getArtistName";

const useStyles = createStyles((theme, _params, getRef) => ({
  ActionIcon: {
    boxShadow: theme.shadows.lg,
  },
  Image: {
    boxShadow: theme.shadows.lg,
  },
}));

const instance = axios.create({
  baseURL: "https://api.artic.edu/api/v1",
  timeout: 10000,
});

const fetchArtwork = async (id: any) => {
  const fields = [
    "id",
    "title",
    "image_id",
    "artist_display",
    "publication_history",
    "exhibition_history",
    "provenance_text",
    "inscriptions",
    "api_model ",
    "api_link ",
    "is_boosted ",
    "alt_titles ",
    "thumbnail ",
    "main_reference_number ",
    "has_not_been_viewed_much ",
    "boost_rank ",
    "date_start ",
    "date_end ",
    "date_display ",
    "date_qualifier_title ",
    "date_qualifier_id ",
    "place_of_origin ",
    "dimensions ",
    "medium_display ",
    "inscriptions ",
    "credit_line ",
    "publication_history ",
    "exhibition_history ",
    "provenance_text ",
    "publishing_verification_level ",
    "internal_department_id ",
    "fiscal_year ",
    "fiscal_year_deaccession ",
    "is_public_domain ",
    "is_zoomable ",
    "max_zoom_window_size ",
    "copyright_notice ",
    "has_multimedia_resources ",
    "has_educational_resources ",
    "colorfulness ",
    "color ",
    "latitude ",
    "longitude ",
    "latlon ",
    "is_on_view ",
    "on_loan_display ",
    "gallery_title",
    "gallery_id ",
    "artwork_type_title ",
    "artwork_type_id ",
    "department_title ",
    "department_id ",
    "artist_id ",
    "artist_title ",
    "alt_artist_ids ",
    "artist_ids ",
    "artist_titles ",
    "category_ids ",
    "category_titles ",
    "artwork_catalogue_ids ",
    "term_titles ",
    "style_id ",
    "style_title ",
    "alt_style_ids ",
    "style_ids ",
    "style_titles ",
    "classification_id ",
    "classification_title ",
    "alt_classification_ids ",
    "classification_ids ",
    "classification_titles ",
    "subject_id ",
    "alt_subject_ids ",
    "subject_ids ",
    "subject_titles ",
    "material_id ",
    "alt_material_ids ",
    "material_ids ",
    "material_titles ",
    "technique_id ",
    "alt_technique_ids ",
    "technique_ids ",
    "technique_titles ",
    "theme_titles ",
    "image_id ",
    "alt_image_ids ",
    "alt_image_ids ",
    "document_ids ",
    "sound_ids",
    "video_ids ",
    "text_ids ",
    "section_ids ",
    "section_titles ",
    "site_ids ",
    "suggest_autocomplete_boosted ",
    "suggest_autocomplete_all ",
    "last_updated_source ",
    "last_updated ",
    "timestamp ",
  ]
    .join(",")
    .replaceAll(" ", "");

  const { data } = await instance.get<{ data: Artwork[] }>("/artworks", {
    params: {
      ids: [id].join(","),
      fields: fields,
    },
  });
  return data.data[0];
};

export function ArtworkDetail() {
  const { classes } = useStyles();
  const nav = useNavigate();
  let { id } = useParams<{ id: string }>();
  console.log(id);

  const { loading, result } = useAsync(fetchArtwork, [id]);

  const [show, setShow] = useState(false);
  const copyToClipboard = () => {
    setShow(false);
    showNotification({
      message: "Copied to clipboard",
      icon: <NotificationIcon />,
      autoClose: 2000,
      disallowClose: true,
      closeButtonProps: { style: { color: "#0BB07B", width: 16, height: 16 } },
      styles: (theme) => ({
        root: {
          backgroundColor: "#EAFCF7",
          padding: 14,
          paddingLeft: "14px !important",
          width: 293,
          height: 45,
          margin: "0 auto",
        },
        icon: {
          backgroundColor: "unset !important" as "unset",
          width: "unset",
          height: "unset",
          marginRight: 14,
        },
        description: {
          fontSize: 14,
          fontFamily: "Inter",
          fontWeight: "normal",
          lineHeight: "24px",
          color: "#00865A !important",
        },
      }),
    });
  };

  console.log(result);

  return (
    <div>
      <BottomSheet
        open={show}
        onDismiss={() => setShow(false)}
        defaultSnap={({ maxHeight }) => maxHeight * 0.95}
        expandOnContentDrag={false}
      >
        <div className="flex flex-col">
          <Text
            align="center"
            style={{
              fontFamily: "Inter",
              fontSize: 18,
              lineHeight: "28px",
              height: 22,
              fontWeight: "bold",
              paddingTop: 3,
            }}
          >
            Share Options
          </Text>

          <div
            style={{
              display: "flex",
              gap: 25 - 6 + 2,
              paddingLeft: 30 - 1 - 1,
              paddingRight: 30 - 1 - 1,
              paddingTop: 48,
              width: "max-content",
            }}
          >
            <UnstyledButton onClickCapture={copyToClipboard}>
              <div
                style={{
                  borderRadius: 99,
                  background: "#F1F2F4",
                  display: "flex",
                  alignContent: "center",
                  justifyItems: "center",
                  width: 60,
                  height: 60,
                }}
              >
                <LinkIcon
                  style={{
                    padding: 16,
                  }}
                />
              </div>
              <Text
                align="center"
                style={{
                  paddingTop: 8 - 2,
                  fontFamily: "Inter",
                  fontWeight: "100",
                  fontSize: 12,
                  lineHeight: "20px",
                  color: "#4E5D78",
                }}
              >
                Copy Link
              </Text>
            </UnstyledButton>
            <UnstyledButton>
              <TwitterIcon width={60} />
              <Text
                align="center"
                style={{
                  paddingTop: 8 - 2,
                  fontFamily: "Inter",
                  fontWeight: "100",
                  fontSize: 12,
                  lineHeight: "20px",
                  color: "#4E5D78",
                }}
              >
                Twitter
              </Text>
            </UnstyledButton>
            <UnstyledButton>
              <WhatsAppIcon />
              <Text
                align="center"
                style={{
                  paddingTop: 8 - 2,
                  fontFamily: "Inter",
                  fontWeight: "100",
                  fontSize: 12,
                  lineHeight: "20px",
                  color: "#4E5D78",
                  width: 60,
                }}
              >
                WhatsApp
              </Text>
            </UnstyledButton>
            <UnstyledButton>
              <TelegramIcon />
              <Text
                align="center"
                style={{
                  paddingTop: 8 - 2,
                  fontFamily: "Inter",
                  fontWeight: "100",
                  fontSize: 12,
                  lineHeight: "20px",
                  color: "#4E5D78",
                }}
              >
                Telegram
              </Text>
            </UnstyledButton>
          </div>

          <div
            style={{
              marginLeft: 30,
              marginRight: 30,
              marginTop: 48 - 5,
              marginBottom: 48 - 34,
            }}
          >
            <Button
              onClickCapture={() => setShow(false)}
              fullWidth
              variant="outline"
              style={{
                color: "#4E5D78",
                fontFamily: "Inter",
                fontWeight: "normal",
                fontSize: "16px",
                lineHeight: "24px",
              }}
              radius="xl"
              styles={{
                inner: { padding: 12 },
                root: {
                  height: "unset",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  borderColor: "#E1E4E8",
                },
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </BottomSheet>
      <Affix position={{ bottom: 30, right: 22 }} zIndex={2}>
        <ActionIcon
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </ActionIcon>
      </Affix>
      {!loading && result && (
        <>
          <div
            style={{
              position: "sticky",
              top: 10,
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 34,
            }}
            id="header-bar"
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <BackIcon onClick={() => nav(-1)} />

              <div style={{ display: "flex", gap: 32 }}>
                <CommentIcon />
                <ShareIcon onClickCapture={() => setShow(true)} />
              </div>
            </div>
          </div>
          <Center style={{ backgroundColor: "#F1F2F4" }}>
            <Image
              width={335}
              height={263}
              withPlaceholder
              className={classes.Image}
              style={{ margin: "68px 20px" }}
              src={getImageURL(result.image_id)}
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
              {result.title}
            </Title>

            <Text
              component={Link}
              to="about-artist"
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
              {getArtistName(result.artist_display)}
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
                component={Link}
                to="about"
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
                lineHeight: "20px",
              }}
            >
              {result.thumbnail.alt_text}
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
              paddingTop: 17,
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
                {result.term_titles.map((value, i) => (
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
              marginTop: "25px",
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
        </>
      )}
    </div>
  );
}

type Artwork = {
  id: number;
  api_model: string;
  api_link: string;
  is_boosted: true;
  title: string;
  alt_titles: string;
  thumbnail: {
    lqip: string;
    width: number;
    height: number;
    alt_text: string;
  };
  main_reference_number: string;
  has_not_been_viewed_much: false;
  boost_rank: number;
  date_start: number;
  date_end: number;
  date_display: string;
  date_qualifier_title: string;
  date_qualifier_id: any;
  artist_display: string;
  place_of_origin: string;
  dimensions: string;
  medium_display: string;
  inscriptions: any;
  credit_line: string;
  publication_history: string;
  exhibition_history: string;
  provenance_text: string;
  publishing_verification_level: string;
  internal_department_id: number;
  fiscal_year: number;
  fiscal_year_deaccession: any;
  is_public_domain: true;
  is_zoomable: true;
  max_zoom_window_size: number;
  copyright_notice: any;
  has_multimedia_resources: true;
  has_educational_resources: false;
  colorfulness: number;
  color: {
    h: number;
    l: number;
    s: number;
    percentage: number;
    population: number;
  };
  latitude: number;
  longitude: number;
  latlon: string;
  is_on_view: true;
  on_loan_display: any;
  gallery_title: string;
  gallery_id: number;
  artwork_type_title: string;
  artwork_type_id: number;
  department_title: string;
  department_id: string;
  artist_id: number;
  artist_title: string;
  alt_artist_ids: [];
  artist_ids: number[];
  artist_titles: string[];
  category_ids: string[];
  category_titles: string[];
  artwork_catalogue_ids: number[];
  term_titles: string[];
  style_id: string;
  style_title: string;
  alt_style_ids: [];
  style_ids: string[];
  style_titles: string[];
  classification_id: string;
  classification_title: string;
  alt_classification_ids: string[];
  classification_ids: string[];
  classification_titles: string[];
  subject_id: string;
  alt_subject_ids: string[];
  subject_ids: string[];
  subject_titles: string[];
  material_id: string;
  alt_material_ids: [];
  material_ids: string[];
  material_titles: string[];
  technique_id: string;
  alt_technique_ids: string[];
  technique_ids: string[];
  technique_titles: string[];
  theme_titles: string[];
  image_id: string;
  alt_image_ids: [];
  document_ids: string[];
  sound_ids: string[];
  video_ids: [];
  text_ids: [];
  section_ids: [];
  section_titles: [];
  site_ids: number[];
  suggest_autocomplete_boosted: string;
  suggest_autocomplete_all: {
    input: string[];
    weight: number;
    contexts: { groupings: string[] };
  }[];
  last_updated_source: string;
  last_updated: string;
  timestamp: string;
};

import {
  Affix,
  Center,
  Container,
  createStyles,
  Image,
  LoadingOverlay,
  Text,
  Title,
} from "@mantine/core";
import axios from "axios";
import { doc, getFirestore } from "firebase/firestore";
import React, { useMemo } from "react";
import { useAsync } from "react-async-hook";
import {
  useDocumentDataOnce,
  useDocumentOnce,
} from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { Artwork } from "./Artwork";
import { BackIcon } from "./BackIcon";
import { app } from "./firebaseConfig";
import { getImageURL } from "./getImageURL";
import { ShareIcon } from "./ShareIcon";
import { useRefCallback } from "./useRefCallback";

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

const getArtworkDetails = async (id: string) => {
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

  const { data } = await instance.get<{ data: Artwork }>(`/artworks/${id}`, {
    params: {
      // ids: [id].join(","),
      fields: fields,
    },
  });
  return data.data;
};
const titlePadd = 20;
const hrmarg = 32;
export function AboutArtwork() {
  let { id } = useParams<{ id: string }>();
  const { classes } = useStyles();
  const nav = useNavigate();
  const { result, loading } = useAsync(getArtworkDetails, [id || ""]);
  const [firebaseEntry, _loading, error, snapshot, reload] =
    useDocumentDataOnce(
      (id && doc(getFirestore(app), `/artworks/${id}`)) || undefined
    );

  const [ref, loaded] = useRefCallback();

  const allDoneLoading = useMemo(
    () => !loading && !_loading && loaded,
    [loading, _loading, loaded]
  );

  return (
    <div>
      <LoadingOverlay
        visible={!allDoneLoading}
        overlayOpacity={1}
        overlayColor="#FFF"
        loaderProps={{ color: "#111112" }}
        style={{height:"100vh"}}
      ></LoadingOverlay>
      <div
        style={{
          position: "sticky",
          top: 10,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 34,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <BackIcon onClick={() => nav(-1)} />

          <ShareIcon />
        </div>
      </div>
      <Affix position={{ bottom: 0, left: 0, right: 0 }}>
        <div
          id="grad"
          style={{
            height: 114,
            background:
              "linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
          }}
        />
      </Affix>
      <Center style={{ backgroundColor: "#F1F2F4" }}>
        <Image
          width={335}
          height={228}
          withPlaceholder
          className={classes.Image}
          style={{ margin: "36px 40px" }}
          src={result && getImageURL(result.image_id)}
          imageRef={(el) => ref(el as any, 0)}
        />
      </Center>
      <Container
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Title
          style={{
            paddingTop: 33,
            fontFamily: "Inter",
            fontSize: 13,
            fontWeight: "bold",
            lineHeight: "16px",
            height: "16px",
            color: "#4E5D78",
          }}
        >
          ABOUT ARTWORK
        </Title>
      </Container>
      {firebaseEntry && (
        <Container
          style={{
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Title
            style={{
              paddingTop: 12,
              fontFamily: "SFProDisplay",
              fontSize: 18,
              fontWeight: "bold",
              lineHeight: "28px",
              height: "21px",
              color: "#000000",
            }}
          >
            Artwork Details
          </Title>
          <Text
            style={{
              paddingTop: 27,
              fontFamily: "Inter",
              fontSize: 15,
              fontWeight: "100",
              lineHeight: "20px",
              color: "#283A5B",
            }}
          >
            {firebaseEntry.description || "No information"}
          </Text>
          <hr
            style={{
              marginTop: hrmarg,
              flexGrow: 1,
              border: "none",
              height: "1px",
              backgroundColor: "#F1F2F4",
            }}
          />
        </Container>
      )}
      {result && (
        <Container
          style={{
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Title
            style={{
              paddingTop: titlePadd,
              fontFamily: "SFProDisplay",
              fontSize: 18,
              fontWeight: "bold",
              lineHeight: "28px",
              height: "21px",
              color: "#000000",
            }}
          >
            Publication History
          </Title>
          <Text
            style={{
              paddingTop: 27,
              fontFamily: "Inter",
              fontSize: 15,
              fontWeight: "100",
              lineHeight: "20px",
              color: "#283A5B",
            }}
          >
            {result.publication_history || "No information"}
          </Text>
          <hr
            style={{
              marginTop: hrmarg,
              flexGrow: 1,
              border: "none",
              height: "1px",
              backgroundColor: "#F1F2F4",
            }}
          />
        </Container>
      )}
      {result && (
        <Container
          style={{
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Title
            style={{
              paddingTop: titlePadd,
              fontFamily: "SFProDisplay",
              fontSize: 18,
              fontWeight: "bold",
              lineHeight: "28px",
              height: "21px",
              color: "#000000",
            }}
          >
            Provenance
          </Title>
          <Text
            style={{
              paddingTop: 24,
              fontFamily: "Inter",
              fontSize: 15,
              fontWeight: "100",
              lineHeight: "20px",
              color: "#283A5B",
            }}
          >
            {result.provenance_text || "No information"}
          </Text>
          <hr
            style={{
              marginTop: hrmarg,
              flexGrow: 1,
              border: "none",
              height: "1px",
              backgroundColor: "#F1F2F4",
            }}
          />
        </Container>
      )}
      {result && (
        <Container
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 120,
          }}
        >
          <Title
            style={{
              paddingTop: titlePadd,
              fontFamily: "SFProDisplay",
              fontSize: 18,
              fontWeight: "bold",
              lineHeight: "28px",
              height: "21px",
              color: "#000000",
            }}
          >
            Exhibition History
          </Title>
          <Text
            style={{
              paddingTop: 24,
              fontFamily: "Inter",
              fontSize: 15,
              fontWeight: "100",
              lineHeight: "20px",
              color: "#283A5B",
            }}
          >
            {result.exhibition_history || "No information"}
          </Text>
          <hr
            style={{
              marginTop: hrmarg,
              flexGrow: 1,
              border: "none",
              height: "1px",
              backgroundColor: "#F1F2F4",
            }}
          />
        </Container>
      )}
    </div>
  );
}

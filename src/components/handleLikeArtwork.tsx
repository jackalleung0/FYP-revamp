import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  increment,
  setDoc,
} from "firebase/firestore";
import { app } from "../firebaseConfig";
import { Artwork } from "../Artwork";
import axios from "axios";
import { getAuth } from "firebase/auth";

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

export const handleLikeArtwork = async ({
  artworkID,
}: {
  artworkID: string;
}) => {
  if (!artworkID) return;

  const artwork = await getArtworkDetails(artworkID);
  const { currentUser } = getAuth(app);
  if (!currentUser?.uid) return;
  const { uid } = currentUser;

  // const increment = increment(1);
  // const decrement = firebase.firestore.FieldValue.increment(-1);
  // const artwork;

  const fs = getFirestore(app);
  const artworkRef = doc(fs, `artworks/${artworkID}`);
  const userRef = doc(fs, `users/${uid}`);
  const artworkRating = doc(fs, `/users/${uid}/ratings/${artworkID}`);

  const userDoc = await getDoc(userRef);

  // condition factor: like / unlike, profile existence, doc field existence
  // handle profile existence
  if (userDoc.exists()) {
    // handle field existence
    const likedArtworks: string[] = userDoc.data()!.likedArtworks || [];

    // handle like / unlike
    if (likedArtworks.includes(artworkID)) {
      const artworkIndex = likedArtworks.indexOf(artworkID);
      likedArtworks.splice(artworkIndex, 1);
      await setDoc(
        artworkRef,
        { numberOfLikes: increment(-1) },
        { merge: true }
      );

      await deleteDoc(artworkRating);
    } else {
      likedArtworks.push(artworkID);
      await setDoc(
        artworkRef,
        { numberOfLikes: increment(1) },
        { merge: true }
      );
      await setDoc(
        artworkRating,
        { rating: 1, timestamp: new Date() },
        { merge: true }
      );
    }

    // newly heart artwork have a default rating of 1
    const adjustment = likedArtworks.includes(artworkID) ? 1 : -1;

    const preferencePayload =
      artwork.term_titles.reduce(
        (acc, cur) => {
          const i = Object.keys(acc).indexOf(cur);
          if (i > -1) {
            acc[cur] = (acc[cur] || 0) + adjustment;
          } else {
            acc[cur] = adjustment;
          }
          return acc;
        },
        { ...(userDoc.data()?.preferenceTags || {}) } as {
          [key: string]: number;
        }
      ) || {};

    await setDoc(
      userRef,
      { likedArtworks, preferenceTags: preferencePayload },
      { merge: true }
    );
  } else {
    // userDoc does not exists, need to create/update a new doc
    // there should be no previous liked artwork, thus empty array
    const likedArtworks: string[] = [];

    // newly heart artwork have a default rating of 1
    const adjustment = likedArtworks.includes(artworkID) ? 1 : -1;

    const preferencePayload =
      artwork.term_titles.reduce(
        (acc, cur) => {
          const i = Object.keys(acc).indexOf(cur);
          if (i > -1) {
            acc[cur] = (acc[cur] || 0) + adjustment;
          } else {
            acc[cur] = adjustment;
          }
          return acc;
        },
        { ...(userDoc.data()?.preferenceTags || {}) } as {
          [key: string]: number;
        }
      ) || {};

    // new user should not have previous liked artwork to pop
    // thus bypass the like / dislike checking
    await setDoc(
      userRef,
      { likedArtworks, preferenceTags: preferencePayload },
      { merge: true }
    );
    await setDoc(artworkRef, { numberOfLikes: increment(1) }, { merge: true });
  }
};

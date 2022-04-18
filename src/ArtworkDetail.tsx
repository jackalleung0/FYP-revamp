import { HeartIcon as SolidHeartIcon, StarIcon } from "@heroicons/react/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/outline";
import {
  ActionIcon,
  Affix,
  Button,
  Center,
  Container,
  createStyles,
  Image,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { getAuth } from "firebase/auth";
import {
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getFirestore,
  increment,
  setDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { useAsync } from "react-async-hook";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";
import StarRatingComponent from "react-star-rating-component";
import { BackIcon } from "./BackIcon";
import { CommentIcon } from "./CommentIcon";
import { DiscoverCard } from "./DiscoverCard";
import { app } from "./firebaseConfig";
import { getArtistName } from "./getArtistName";
import { getImageURL } from "./getImageURL";
import { LinkIcon } from "./LinkIcon";
import { NotificationIcon } from "./NotificationIcon";
import { ShareIcon } from "./ShareIcon";
import { TagButton } from "./TagButton";
import { TelegramIcon } from "./TelegramIcon";
import { TwitterIcon } from "./TwitterIcon";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { fetchArtwork } from "./fetchArtwork";

const rating_weight = 0.8;

const useStyles = createStyles((theme, _params, getRef) => ({
  ActionIcon: {
    boxShadow: theme.shadows.lg,
  },
  Image: {
    boxShadow: theme.shadows.lg,
  },
  Star: {
    width: 23,
    height: 23,
    paddingRight: 1,
  },
}));

export const instance = axios.create({
  baseURL: "https://api.artic.edu/api/v1",
  timeout: 10000,
});

// artwork.artist_title
const getRelatedArtwork = async (artistName: string, currentID: string) => {
  return await instance
    .get("artworks/search", {
      params: {
        limit: 20,
        // just put all the author in the search list, and let the search do its thing
        // the array is for readability
        q: artistName,
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
    .then(({ data }) => {
      const artworks = data.data;

      //   // get artworks except current artwork
      return artworks.filter(
        (d: any) => String(d.id) !== currentID && !!d.image_id
      );
    });
};
export function ArtworkDetail() {
  const { classes } = useStyles();
  const nav = useNavigate();
  let { id } = useParams<{ id: string }>();
  const toArtwork = (id: string) => () => {
    nav(`/artwork/${id}`);
  };
  const { loading, result } = useAsync(fetchArtwork, [id]);
  const { result: recommendArtworks, loading: otherArtworkLoading } = useAsync(
    getRelatedArtwork,
    [getArtistName(result?.artist_display || ""), id || ""]
  );
  const auth = getAuth(app);
  const [user] = useAuthState(auth);

  const location = useLocation();
  React.useEffect(() => {
    // update user's history when visit this page
    // "/artwork/27992";
    console.log(location);
    if (!user) return;
    setDoc(doc(getFirestore(app), `/users/${user.uid}/history/${id}`), {
      lastAccessed: new Date(),
    });
    console.log("updated history");
  }, [location, user]);

  const [values, userDocLoading, __, snapshot] = useDocumentData(
    user &&
      (doc(
        getFirestore(app),
        `users/${user.uid}/ratings/${id}`
      ) as DocumentReference<{
        rating: number;
      }>)
  );
  const [userProfile] = useDocumentData(
    user &&
      (doc(getFirestore(app), `users/${user.uid}`) as DocumentReference<{
        likedArtworks: string[];
      }>)
  );
  const [artworkData, artworkDataLoading] = useDocumentData(
    doc(getFirestore(app), `/artworks/${id}`) as DocumentReference<{
      arURL: string;
    }>
  );

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

  const handleStarClick = async (r: number) => {
    // if (!user) return;
    // await updateDoc(doc(getFirestore(app), `users/${user.uid}/ratings/${id}`), {
    //   rating: newRating,
    // });
    if (!user) {
      return;
    }

    const fs = getFirestore(app);

    // make reference to user & artwork ratings
    const userRatingRef = doc(fs, `/users/${user.uid}/ratings/${id}`);
    const userRef = doc(fs, `/users/${user.uid}`);
    const userDoc = await getDoc(userRef);

    const ratingDoc = await getDoc(userRatingRef);

    // update users' tag preference
    // increment user preference by r points
    // TODO: check if user has already rated the artwork, may need to reduce the ratings

    // get the difference between new and old ratings
    const adjustment =
      r - ((ratingDoc.exists() && ratingDoc.data()?.rating) || 0);

    const weightedOldPreference = Object.entries(
      (userDoc.data()?.preferenceTags as {
        [key: string]: number;
      }) || {}
    ).reduce(
      (acc, [id, value]) => {
        acc[id] = value * rating_weight;
        return acc;
      },
      {} as {
        [key: string]: number;
      }
    );

    const preferencePayload =
      result?.term_titles.reduce(
        (acc, cur) => {
          const i = Object.keys(acc).indexOf(cur);
          if (i > -1) {
            acc[cur] = (acc[cur] || 0) + adjustment;
          } else {
            acc[cur] = adjustment;
          }
          return acc;
        },
        { ...weightedOldPreference } as {
          [key: string]: number;
        }
      ) || {};

    await setDoc(
      userRef,
      { preferenceTags: preferencePayload },
      { merge: true }
    );
    await setDoc(userRatingRef, { rating: r }, { merge: true });
  };

  const handleLikeArtwork = async () => {
    // const increment = increment(1);
    // const decrement = firebase.firestore.FieldValue.increment(-1);

    if (!user) return;
    if (!id) return;
    if (!result) return;

    const fs = getFirestore(app);
    const artworkRef = doc(fs, `artworks/${id}`);
    const userRef = doc(fs, `users/${user.uid}`);
    const artworkRating = doc(fs, `/users/${user.uid}/ratings/${id}`);

    const userDoc = await getDoc(userRef);

    // condition factor: like / unlike, profile existence, doc field existence

    // handle profile existence
    if (userDoc.exists()) {
      // handle field existence
      const likedArtworks: string[] = userDoc.data()!.likedArtworks || [];

      // handle like / unlike
      if (likedArtworks.includes(id)) {
        const artworkIndex = likedArtworks.indexOf(id);
        likedArtworks.splice(artworkIndex, 1);
        await setDoc(
          artworkRef,
          { numberOfLikes: increment(-1) },
          { merge: true }
        );

        await deleteDoc(artworkRating);
      } else {
        likedArtworks.push(id);
        await setDoc(
          artworkRef,
          { numberOfLikes: increment(1) },
          { merge: true }
        );
        await setDoc(artworkRating, { rating: 1 }, { merge: true });
      }

      // newly heart artwork have a default rating of 1
      const adjustment = likedArtworks.includes(id) ? 1 : -1;

      const preferencePayload =
        result.term_titles.reduce(
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
      const adjustment = likedArtworks.includes(id) ? 1 : -1;

      const preferencePayload =
        result.term_titles.reduce(
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
      await setDoc(
        artworkRef,
        { numberOfLikes: increment(1) },
        { merge: true }
      );
    }
  };

  const userLikedArtwork =
    (id && userProfile && (userProfile.likedArtworks || []).includes(id)) ||
    false;

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
      {!artworkDataLoading && artworkData && (
        <Affix position={{ bottom: 30, right: 22 }} zIndex={2}>
          <ActionIcon
            className={classes.ActionIcon}
            radius={9999}
            size={70}
            style={{
              backgroundColor: "#111112",
            }}
            id="view in 3d"
            component="a"
            target="_blank"
            href={artworkData.arURL}
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
      )}
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
            <div
              style={{ float: "right", paddingTop: 0, position: "relative" }}
              onClickCapture={handleLikeArtwork}
            >
              {userLikedArtwork ? (
                <SolidHeartIcon
                  style={{
                    width: 28,
                    height: 26,
                    right: -1,
                    position: "absolute",
                    color: "#DD2727",
                  }}
                />
              ) : (
                <OutlineHeartIcon
                  style={{
                    width: 28,
                    height: 26,
                    right: -1,
                    position: "absolute",
                  }}
                />
              )}
            </div>
            <Title
              style={{
                fontSize: "24px",
                fontFamily: "SFProDisplay",
                fontWeight: "bold",
                color: "#000000",
                lineHeight: "28px",
                paddingRight: 28 + 22,
                paddingBottom: 6,
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
                // height: "17px",
                lineHeight: "20px",
              }}
            >
              {getArtistName(result.artist_display)}
            </Text>
          </Container>
          <Container
            style={{
              paddingLeft: 17,
              paddingRight: 17,
            }}
          >
            <div
              style={{
                display: "flex",
                paddingTop: 23,
                gap: 8,
                position: "relative",
              }}
            >
              <StarRatingComponent
                name="rating"
                value={values?.rating || 0}
                editing={!!values?.rating}
                renderStarIcon={() => <StarIcon className={classes.Star} />}
                onStarClick={handleStarClick}
                starColor={"#000"}
                emptyStarColor={"#E1E4E8"}
              />
            </div>
          </Container>
          <Container
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 0,
            }}
          >
            <hr
              style={{
                marginTop: 32 - 9,

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
                  <TagButton
                    popular={i === 0}
                    to={`/search-result?term=${value}`}
                    key={i}
                  >
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
              {!otherArtworkLoading &&
                recommendArtworks &&
                recommendArtworks.map((a: any) => (
                  <DiscoverCard
                    onClickCapture={toArtwork(a.id)}
                    key={a.id}
                    src={getImageURL(a.image_id)}
                    title={a.title}
                    tag={a?.term_titles?.length > 0 ? a.term_titles[0] : ""}
                    author={getArtistName(a.artist_display)}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

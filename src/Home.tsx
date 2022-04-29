import {
  Container,
  createStyles,
  Text,
  Image,
  ActionIcon,
  Affix,
  Button,
  Transition,
  Avatar,
  UnstyledButton,
  LoadingOverlay,
} from "@mantine/core";
import React, {
  createRef,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ArrowUpIcon, HeartIcon } from "@heroicons/react/outline";
import { RecommendedCard } from "./components/RecommendedCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TagButton } from "./TagButton";
import { useSetState, useWindowScroll } from "@mantine/hooks";
import { DiscoverCard } from "./DiscoverCard";
import dayjs from "dayjs";

const useStyles = createStyles((theme, _params, getRef) => ({
  userAvatar: {
    boxShadow: theme.shadows.xl,
    borderRadius: "999px",
  },
  ActionIcon: {
    boxShadow: theme.shadows.lg,
  },
}));
import { getAuth, signOut } from "firebase/auth";
import { app } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollection,
  useCollectionData,
  useCollectionOnce,
  useDocumentData,
  useDocumentDataOnce,
  useDocumentOnce,
} from "react-firebase-hooks/firestore";
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import axios from "axios";
import { getImageURL } from "./getImageURL";
import { getArtistName } from "./getArtistName";
import { useAsync } from "react-async-hook";
import { fetchArtwork } from "./fetchArtwork";
import { Artwork } from "./Artwork";
import { useOnLoadImages } from "./hooks/useOnLoadImages";
import { useRefCallback } from "./useRefCallback";
import { getArtworkDetails } from "./getArtworkDetails";
import { UserAvatar } from "./UserAvatar";
export function Home() {
  const { classes } = useStyles();
  const nav = useNavigate();
  const auth = getAuth(app);
  const { currentUser } = auth;

  const toUserProfile = () => {
    nav("/user-profile");
  };

  const setDoneLoading = (key: string) => () =>
    _setDoneLoading({ [key]: true });
  const [doneLoading, _setDoneLoading] = useSetState({
    RecommendedForYou: false,
    NewDiscover: false,
    RecentlyViewed: false,
    LatestArtwork: false,
  });

  const location = useLocation();
  useEffect(() => {
    // set all status as false when there are location change (i.e. have page push / pop event)
    _setDoneLoading({
      RecommendedForYou: false,
      NewDiscover: false,
      RecentlyViewed: false,
      LatestArtwork: false,
    });
  }, [location]);

  const allDoneLoading = useMemo(
    () => Object.values(doneLoading).every((entry) => entry === true),
    [doneLoading]
  );

  return (
    <div>
      <LoadingOverlay
        zIndex={201}
        style={{ height: "100vh", width: "100%", position: "fixed", top: 0 }}
        visible={!allDoneLoading}
        overlayOpacity={1}
        overlayColor="#FFF"
        loaderProps={{ color: "#111112" }}
      />
      {allDoneLoading && (
        <Affix position={{ bottom: 30, right: 22 }} id="searchbutton">
          <Transition mounted={true} transition="slide-left" duration={300}>
            {(transitionStyles) => (
              <ActionIcon
                component={Link}
                to="/search"
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
                  width="22.414"
                  height="22.414"
                  viewBox="0 0 22.414 22.414"
                >
                  <path
                    id="Search_Icon"
                    d="M23,23l-6.667-6.667m2.222-5.556A7.778,7.778,0,1,1,10.778,3,7.778,7.778,0,0,1,18.556,10.778Z"
                    transform="translate(-2 -2)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </ActionIcon>
            )}
          </Transition>
        </Affix>
      )}

      <div style={{ display: allDoneLoading ? "block" : "none" }}>
        <Container
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "14px",
            }}
          >
            {currentUser?.photoURL ? (
              <Avatar
                component={UnstyledButton}
                onClick={toUserProfile}
                // onClickCapture={logout}
                src={currentUser?.photoURL}
                className={classes.userAvatar}
              />
            ) : (
              <UserAvatar className={classes.userAvatar} />
            )}
            <Bell style={{ paddingTop: "8px", paddingRight: "2px" }} />
          </div>
          <Text
            style={{
              marginTop: "19px",
              fontSize: "32px",
              fontFamily: "SFProDisplay",
              fontWeight: "bold",
              color: "#000000",
              height: "72px",
              lineHeight: "34px",
            }}
          >
            Welcome to <br />
            AR Art Gallery
          </Text>
        </Container>
        <TrendingTags />
        <RecommendedForYou onLoadChange={setDoneLoading("RecommendedForYou")} />
        <NewDiscover onLoadChange={setDoneLoading("NewDiscover")} />
        <RecentlyViewed onLoadChange={setDoneLoading("RecentlyViewed")} />
        <LatestArtwork onLoadChange={setDoneLoading("LatestArtwork")} />
      </div>
    </div>
  );
}
const LatestArtwork = ({ onLoadChange }: any) => {
  const { result, loading } = useAsync(getLatestImage, []);

  // group by date,

  const artworkDate = useMemo(() => {
    if (!result) return {};
    return result.reduce((acc, cur) => {
      const key = dayjs(cur.last_updated).format("D MMM");
      // push cur to existing arr if key exists
      if (acc[key]) {
        acc[key].push(cur);
        return acc;

        // create new key if not exists
      } else {
        acc[key] = [cur];
        return acc;
      }
    }, {} as { [key: string]: Artwork[] });
  }, [result]);

  const nav = useNavigate();
  const toArtwork = (id: any) => () => {
    nav(`/artwork/${id}`);
  };

  const [setRef, loaded] = useRefCallback();
  console.log(loaded);
  useEffect(() => {
    if (loaded && !loading) {
      onLoadChange();
    }
  }, [loaded, loading]);

  return (
    <>
      <Container
        style={{
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "100px",
        }}
      >
        <Text
          transform="uppercase"
          style={{
            fontSize: "13px",
            fontFamily: "Inter",
            fontWeight: "bold",
            color: "#4E5D78",
            height: "16px",
            lineHeight: "16px",
            paddingBottom: "16px",
          }}
        >
          Latest Artwork
        </Text>
        {Object.keys(artworkDate).map((key) => (
          <div style={{ display: "flex" }} key={key}>
            <Text
              align="center"
              style={{
                fontSize: "15px",
                fontFamily: "Inter",
                fontWeight: "normal",
                color: "#000000",
                lineHeight: "18px",

                marginTop: "3px",
                width: "34px",
                height: "37px",
                paddingRight: "12px",
              }}
            >
              {/* 19 MAR */}
              {key}
            </Text>
            <div>
              {artworkDate[key].map((artwork, index) => (
                <div key={artwork.id} onClick={toArtwork(artwork.id)}>
                  <div
                    style={{
                      paddingLeft: "14px",
                      marginBottom: "16px",

                      borderLeft: "1px solid #8A94A6",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "18px",
                        fontFamily: "SFProDisplay",
                        fontWeight: "bold",
                        color: "#000000",
                        height: "21px",
                        lineHeight: "20px",

                        marginBottom: "4px",
                      }}
                      lineClamp={1}
                    >
                      {artwork.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "100",
                        color: "#8A94A6",
                        height: "18px",
                        lineHeight: "18px",
                      }}
                    >
                      {/* 2022-03-19 12:08 */}
                      {dayjs(artwork.last_updated).format("YYYY-MM-DD HH:mm")}
                    </Text>
                  </div>
                  <div style={{ position: "relative" }}>
                    <Image
                      width={289}
                      height={210}
                      styles={{
                        image: {
                          borderRadius: "8px",
                        },
                        root: { paddingBottom: "24px" },
                      }}
                      src={getImageURL(artwork.image_id)}
                      imageRef={(el) => setRef(el as any, index)}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 289,
                        height: 210,
                        borderRadius: "8px",
                        opacity: 0.2,
                        backgroundColor: "#000",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Container>
    </>
  );
};

const getLatestImage = async () => {
  return (
    await instance.get<{ data: Artwork[] }>(`/artworks`, {
      params: { limit: 10 },
    })
  ).data.data;
};

const NewDiscover = ({ onLoadChange }: any) => {
  const nav = useNavigate();
  const toArtwork = (id: any) => () => nav(`/artwork/${id}`);

  const [snapshot, loading, error] = useCollectionOnce<{
    numberOfLikes: number;
  }>(
    query(
      collection(getFirestore(app), "/artworks"),
      orderBy("numberOfLikes", "desc"),
      limit(10)
    ) as CollectionReference<{ numberOfLikes: number }>
  );
  const [setRef, loaded] = useRefCallback();
  useEffect(() => {
    if (loaded && !loading) {
      onLoadChange();
    }
  }, [loaded, loading]);

  // useEffect(() => {
  //   if (!loading) {
  //     onLoadChange();
  //   }
  // }, [loading]);

  return (
    <>
      <Text
        transform="uppercase"
        style={{
          marginLeft: "20px",
          // marginTop: "36px",
          fontSize: "13px",
          fontFamily: "Inter",
          fontWeight: "bold",
          color: "#4E5D78",
          height: "16px",
          lineHeight: "16px",
          paddingBottom: "15px",
        }}
      >
        most popular
      </Text>
      <div
        style={{
          overflowY: "hidden",
          width: "100%",
          paddingBottom: "36px",
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
          {snapshot?.docs.map((snapshot, index) => {
            return (
              <NewDiscoverCard
                key={snapshot.id}
                id={snapshot.id}
                onClickCapture={toArtwork(snapshot.id)}
                ref={(el: HTMLImageElement) => setRef(el, index)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
const getArtworkById = async (id: string) => {
  return (await instance.get(`/artworks/${id}`)).data.data;
};

const NewDiscoverCard = forwardRef<
  HTMLImageElement,
  { id: string; onClickCapture: () => void }
>(({ id, onClickCapture }, ref) => {
  // currently, get the latest image from api
  const { result, loading } = useAsync(getArtworkById, [id]);

  return (
    (!loading && !!result && (
      <DiscoverCard
        title={result.title}
        author={getArtistName(result.artist_display)}
        src={getImageURL(result.image_id)}
        tag={result.style_title || result.artwork_type_title}
        onClickCapture={onClickCapture}
        ref={ref}
      />
    )) || <></>
  );
});

const RecentlyViewed = ({ onLoadChange }: any) => {
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
  console.log(artworks);

  useEffect(() => {
    if (ids) {
      Promise.allSettled(ids.map(fetchArtwork))
        .then((e) =>
          // filter success result, and map to their values
          e
            .filter((e) => e.status === "fulfilled")
            .map((e: any) => e.value)
            .filter(Boolean)
        )
        .then(setArtworks);
    }
  }, [ids]);
  const nav = useNavigate();
  const toArtwork = (id: any) => () => {
    nav(`/artwork/${id}`);
  };

  const [setRef, loaded] = useRefCallback();
  console.log(loaded);
  useEffect(() => {
    if ((loaded || ids.length === 0) && !authLoading && !loading) {
      onLoadChange();
    }
  }, [loaded, authLoading, loading, ids]);

  return (
    <>
      {snapshot && !snapshot?.empty && (
        <>
          <span
            style={{
              display: "flex",
              paddingBottom: "15px",
              justifyContent: "space-between",
              paddingLeft: "20px",
              paddingRight: "20px",
              alignContent: "center",
            }}
          >
            <Text
              transform="uppercase"
              style={{
                fontSize: "13px",
                fontFamily: "Inter",
                fontWeight: "bold",
                color: "#4E5D78",
                height: "16px",
                lineHeight: "16px",
              }}
            >
              Recently Viewed
            </Text>
            <Text
              component={Link}
              to="/recently-viewed"
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
          </span>
          <div
            style={{
              overflowY: "hidden",
              width: "100%",
              paddingBottom: "37px",
            }}
            className="no-scrollbar"
          >
            <div
              style={{
                display: "flex",
                gap: "12px",
                paddingLeft: "20px",
                paddingRight: "20px",
                minWidth: "min-content",
              }}
            >
              {artworks.map((artwork, index) => (
                <div
                  style={{ position: "relative" }}
                  key={index}
                  onClick={toArtwork(artwork.id)}
                >
                  <Image
                    src={getImageURL(artwork.image_id)}
                    width={196}
                    height={156}
                    styles={{
                      image: {
                        borderRadius: "8px",
                      },
                    }}
                    imageRef={(el) => setRef(el as any, index)}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 196,
                      height: 156,
                      borderRadius: "8px",
                      opacity: 0.2,
                      backgroundColor: "#000",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

const instance = axios.create({
  baseURL: "https://api.artic.edu/api/v1",
  timeout: 10000,
});

const getRecommendArtworks = async (values: any) => {
  if (!values) return [];
  const should =
    Object.entries(values.preferenceTags || {}).map(([tags, rating]) => {
      return {
        multi_match: {
          query: tags,
          fields: ["term_titles"],
          boost: rating,
        },
      };
    }) || [];

  const must_not =
    (values.likedArtworks || []).map((id: string) => ({
      multi_match: {
        query: id,
        fields: ["id"],
      },
    })) || [];

  return await instance
    .post<{
      data: {
        api_link: string;
        api_model: string;
        artist_display: string;
        id: number;
        thumbnail: {
          alt_text: string;
          height: number;
          lqip: string;
          width: number;
        };
        timestamp: string;
        title: string;
        _score: number;
      }[];
    }>("artworks/search", {
      query: {
        bool: {
          should,
          must_not,
        },
      },
      fields: [
        "api_link",
        "id",
        "artist_display",
        "thumbnail",
        "api_model",
        "id",
        "title",
        "timestamp",
      ],
      limit: 10,
    })
    .then(({ data }) => data.data)
    .then((recommendedArtworks) => {
      return Promise.all<any>(
        recommendedArtworks
          .filter(({ id }) => {
            return !(values.likedArtworks || []).includes(String(id));
          })
          .map((art) =>
            axios.get(art.api_link).then(({ data }) => {
              return {
                id: art.id,
                src:
                  (data.data.image_id && getImageURL(data.data.image_id)) || "",
                artist: getArtistName(art.artist_display),
                text: art.thumbnail.alt_text,
                title: art.title,
              };
            })
          )
      );
    });
  // .then((e) => {
  //   setRecommendedImages(e);
  // });
};

const RecommendedForYou = ({ onLoadChange }: any) => {
  const auth = getAuth(app);
  const [user] = useAuthState(auth);

  // const [recommendedImages, setRecommendedImages] = React.useState<
  //   {
  //     id: string;
  //     src: string;
  //     artist: string;
  //     text: string;
  //     title: string;
  //   }[]
  // >([]);

  // prevent the artworks from reloading when an artwork is liked
  const [values, userDocLoading, __, snapshot] = useDocumentDataOnce<{
    preferenceTags: { [key: string]: number };
    likedArtworks: string[];
  }>(
    user &&
      (doc(getFirestore(app), `users/${user.uid}`) as DocumentReference<{
        preferenceTags: { [key: string]: number };
        likedArtworks: string[];
      }>)
  );
  const { result, loading } = useAsync(getRecommendArtworks, [values]);

  const [setRef, loaded] = useRefCallback();
  useEffect(() => {
    if (loaded && !userDocLoading && !loading) {
      onLoadChange();
    }
  }, [loaded, userDocLoading, loading]);

  return (
    <>
      <Text
        transform="uppercase"
        style={{
          marginLeft: "20px",
          marginTop: "36px",
          fontSize: "13px",
          fontFamily: "Inter",
          fontWeight: "bold",
          color: "#4E5D78",
          height: "16px",
          lineHeight: "16px",
          paddingBottom: "15px",
        }}
      >
        Recommended For You
      </Text>
      {/* display recommend only if user is logged in */}
      {user && (
        <div
          style={{
            overflowY: "hidden",
            width: "100%",
            paddingBottom: "37px",
          }}
          className="no-scrollbar"
        >
          <div
            style={{
              display: "flex",
              gap: "18px",
              paddingLeft: "20px",
              paddingRight: "20px",

              minWidth: "min-content",
            }}
          >
            {result &&
              result.map(({ id, ...props }, index) => (
                <RecommendedCard
                  key={id}
                  {...props}
                  id={id}
                  ref={(el: HTMLImageElement) => setRef(el, index)}
                />
              ))}
            {/* {loading && (
              <div style={{ height: 385, width: "100%", position: "relative" }}>
                <LoadingOverlay
                  zIndex={2}
                  visible={loading}
                  loaderProps={{ color: "#000000" }}
                  overlayOpacity={0.3}
                  overlayColor="#c5c5c5"
                />
              </div>
            )} */}
          </div>
        </div>
      )}
    </>
  );
};

const TrendingTags = () => {
  const [snapshot, loading, error] = useCollectionOnce<{
    numberOfLikes: number;
  }>(
    query(
      collection(getFirestore(app), "/artworks"),
      orderBy("numberOfLikes", "desc"),
      // get the first (most) liked document
      limit(1)
    ) as CollectionReference<{ numberOfLikes: number }>
  );
  const id = snapshot?.docs[0].id;
  const { result } = useAsync(getArtworkDetails, [id || ""]);
  const tags = useMemo(
    () =>
      (result?.term_titles &&
        result?.term_titles.filter((_, index) => index < 10)) ||
      [],
    [result]
  );

  return (
    <>
      <Text
        style={{
          marginLeft: "20px",
          marginTop: "27px",
          fontSize: "13px",
          fontFamily: "Inter",
          fontWeight: "bold",
          color: "#4E5D78",
          height: "16px",
          lineHeight: "16px",
          paddingBottom: "15px",
        }}
      >
        TRENDING TAGS
      </Text>
      <div
        style={{
          overflowY: "hidden",
          width: "100%",
        }}
        className="no-scrollbar"
      >
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            gap: "6px",
            paddingLeft: "20px",
            paddingRight: "20px",
            height: "34px",
            minWidth: "min-content",
          }}
        >
          {tags.map((e, index) => (
            <TagButton
              to={`/search-result?term=${e}`}
              key={index}
              popular={index === 0}
            >
              {e}
            </TagButton>
          ))}
        </div>
      </div>
    </>
  );
};
const Bell = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        id="Notification_Icon"
        d="M19.125,20.111H26l-1.932-1.717a2.352,2.352,0,0,1-.818-1.756v-3.86a7.445,7.445,0,0,0-5.5-6.917V5.444A2.611,2.611,0,0,0,15,3a2.611,2.611,0,0,0-2.75,2.444v.417a7.452,7.452,0,0,0-5.5,6.917v3.861a2.352,2.352,0,0,1-.818,1.755L4,20.111h6.875m8.25,0v1.222A3.916,3.916,0,0,1,15,25a3.916,3.916,0,0,1-4.125-3.667V20.111m8.25,0h-8.25"
        transform="translate(-3 -2)"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

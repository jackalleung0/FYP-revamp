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
export function Home() {
  const { classes } = useStyles();
  const nav = useNavigate();
  const auth = getAuth(app);
  const { currentUser } = auth;
  const logout = async () => {
    await signOut(auth);
    nav("/", { replace: true });
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
                onClickCapture={logout}
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

  useEffect(() => {
    if (ids) {
      Promise.allSettled(ids.map(fetchArtwork))
        .then((e) =>
          // filter success result, and map to their values
          e.filter((e) => e.status === "fulfilled").map((e: any) => e.value)
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
const UserAvatar = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="39"
    height="39"
    viewBox="0 0 39 39"
    {...props}
  >
    <defs>
      <pattern
        id="pattern"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        viewBox="0 0 600 600"
      >
        <image
          width="600"
          height="600"
          xlinkHref="data:image/png;base64,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"
        />
      </pattern>
    </defs>
    <rect
      id="Front_layer_-_Style_"
      data-name="Front layer - Style 🌈"
      width="39"
      height="39"
      rx="19.5"
      fill="url(#pattern)"
    />
  </svg>
);

import { CogIcon } from "@heroicons/react/outline";
import {
  Avatar,
  createStyles,
  UnstyledButton,
  Text,
  Tabs,
  Loader,
  Container,
} from "@mantine/core";
import { getAuth, signOut } from "firebase/auth";
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  Query,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  startAfter,
  where,
} from "firebase/firestore";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAsync } from "react-async-hook";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { MasonryOptions } from "react-masonry-component";
import { useLocation, useNavigate } from "react-router-dom";
import { Artwork } from "./Artwork";
import { BackIcon } from "./BackIcon";
import { CustomSelect } from "./CustomSelect";
import { app } from "./firebaseConfig";
import { getArtistName } from "./getArtistName";
import { getArtworkDetails } from "./getArtworkDetails";
import { getImageURL } from "./getImageURL";
import { MasImage } from "./MasImage";
import { UserAvatar } from "./UserAvatar";

const useStyles = createStyles((theme, _params, getRef) => ({
  userAvatar: {
    boxShadow: theme.shadows.xl,
    borderRadius: "999px",
  },
  ActionIcon: {
    boxShadow: theme.shadows.lg,
  },
}));
const masonryOptions: MasonryOptions = {
  transitionDuration: 0,
  horizontalOrder: true,
  gutter: 15,
  columnWidth: 160,
};

export function UserProfile() {
  const { classes } = useStyles();
  const nav = useNavigate();
  const [currentUser, authLoading] = useAuthState(getAuth(app));

  const [commentedState, setCommentedState] = useState<"oldest" | "latest">(
    "oldest"
  );
  const [favouriteState, setFavouriteState] = useState<"rating" | "latest">(
    "rating"
  );

  const favouriteQuery = useMemo(() => {
    if (!currentUser || !currentUser.uid) {
      return undefined;
    }

    return query(
      collection(getFirestore(app), `/users/${currentUser.uid}/ratings`),
      favouriteState === "latest"
        ? orderBy("timestamp", "desc")
        : orderBy("rating", "desc")
    );
  }, [currentUser, favouriteState]);

  const commentQuery = useMemo(() => {
    if (!currentUser || !currentUser.uid) {
      return undefined;
    }
    return query(
      collection(getFirestore(app), `/comments`),
      where("authorID", "==", currentUser.uid),
      commentedState === "latest"
        ? orderBy("createdAt", "asc")
        : orderBy("createdAt", "asc")
    );
  }, [currentUser, commentedState]);

  //   const [snapshot, loading, error] = useCollection();
  const [result, setResult] = React.useState<Artwork[]>([]);
  const [snapshots, setSnapshots] = React.useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (result.length === 0) {
      loadFunc();
    }
    // TODO: reset result when query changes
  }, [favouriteQuery]);

  const loadFunc = useCallback(async () => {
    const _limit = 10;
    if (!favouriteQuery) return;
    let _query: Query<DocumentData>;

    // add startAfter when there are snapshot
    if (snapshots.length > 0) {
      _query = query(
        favouriteQuery,
        limit(_limit),
        startAfter(snapshots[snapshots.length - 1])
      );
    } else {
      _query = query(favouriteQuery, limit(_limit));
    }
    const snapshot = await getDocs(_query);
    setSnapshots((e) => [...e, ...snapshot.docs]);
    const ids = snapshot.docs.map((e) => e.id);
    const res = (await Promise.allSettled(ids.map(getArtworkDetails)))
      .filter((e) => e.status === "fulfilled")
      .map((e) => e.status === "fulfilled" && e.value)
      .filter(Boolean) as Artwork[];
    setResult((resul) => [...resul, ...res]);
  }, [favouriteState, favouriteQuery, result]);

  const auth = getAuth(app);
  const logout = async () => {
    await signOut(auth);
    nav("/", { replace: true });
  };

  return (
    <div>
      <div
        style={{
          paddingTop: 10,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 16,
        }}
      >
        <BackIcon onClick={() => nav(-1)} />
      </div>
      <div style={{ padding: "0 20px 36px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <CogIcon style={{ width: 18 + 2 }} onClick={logout} />
        </div>

        {!authLoading && !!currentUser?.uid ? (
          <div style={{ display: "flex", gap: 22 }}>
            <Avatar
              size={82}
              component={UnstyledButton}
              src={currentUser?.photoURL}
              className={classes.userAvatar}
            />
            <div style={{ paddingTop: 20 }}>
              <Text
                style={{
                  fontSize: "18px",
                  fontFamily: "SFProDisplay",
                  fontWeight: "bold",
                  color: "#000000",
                  height: "21px",
                  lineHeight: "28px",
                }}
              >
                {currentUser.displayName}
              </Text>
              <div style={{ height: 4 }}></div>
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
                {currentUser.email}
              </Text>
            </div>
          </div>
        ) : (
          <UserAvatar className={classes.userAvatar} />
        )}
      </div>
      <Tabs>
        <Tabs.Tab label="Favourite Collections">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "0 20px 10px",
            }}
          >
            <CustomSelect
              defaultValue="rating"
              value={favouriteState}
              onChange={(e: any) => {
                setFavouriteState(e);
                setResult([]);
                setHasMore(true);
                setSnapshots([]);
                loadFunc();
              }}
              data={[
                { value: "rating", label: "Sort By Rating" },
                { value: "latest", label: "Sort By Latest" },
              ]}
              style={{ width: 160 }}
            />
          </div>
          <Container
            style={{
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <InfiniteScroll
              dataLength={result.length} //This is important field to render the next data
              next={() => {
                loadFunc();
              }}
              hasMore={result.length % 10 === 0}
              loader={
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: 40,
                    paddingBottom: 60,
                  }}
                >
                  <Loader
                    sx={(theme) => ({
                      stroke: "#111112",
                    })}
                  />
                </div>
              }
              endMessage={<></>}
            >
              <Masonry
                className={""} // default ''
                elementType={"div"} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              >
                {result.length > 0 &&
                  result.map((doc, index) => (
                    <MasImage
                      key={index}
                      id={String(doc.id)}
                      artist={getArtistName(doc.artist_display)}
                      title={doc.title}
                      src={getImageURL(doc.image_id)}
                    />
                  ))}
              </Masonry>
            </InfiniteScroll>
          </Container>
        </Tabs.Tab>
        <Tabs.Tab label="Commented Artwork">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "0 20px 10px",
            }}
          >
            <CustomSelect
              defaultValue="rating"
              value={commentedState}
              onChange={(e: any) => e && setCommentedState(e)}
              data={[
                { value: "oldest", label: "Sort By Oldest" },
                { value: "latest", label: "Sort By Latest" },
              ]}
              style={{ width: 160 }}
            />
          </div>
          <Container
            style={{
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <InfiniteScroll
              dataLength={result.length} //This is important field to render the next data
              next={() => {
                loadFunc();
              }}
              hasMore={result.length % 10 === 0}
              loader={
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: 40,
                    paddingBottom: 60,
                  }}
                >
                  <Loader
                    sx={(theme) => ({
                      stroke: "#111112",
                    })}
                  />
                </div>
              }
              endMessage={<></>}
            >
              <Masonry
                className={""} // default ''
                elementType={"div"} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              >
                {result.length > 0 &&
                  result.map((doc, index) => (
                    <MasImage
                      key={index}
                      id={String(doc.id)}
                      artist={getArtistName(doc.artist_display)}
                      title={doc.title}
                      src={getImageURL(doc.image_id)}
                    />
                  ))}
              </Masonry>
            </InfiniteScroll>
          </Container>
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}

const CustomArtworkImage = ({ id }: { id: string }) => {
  const { result, loading } = useAsync(getArtworkDetails, [id]);
  console.log(!!result);

  return (
    <MasImage
      id={id}
      artist={(result && getArtistName(result!.artist_display)) || ""}
      title={(result && result!.title) || ""}
      src={(result && getImageURL(result!.image_id)) || ""}
    />
  );
};

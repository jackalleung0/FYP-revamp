import { CogIcon } from "@heroicons/react/outline";
import { User } from "firebase/auth";
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
    boxShadow: theme.shadows.xs,
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
  const [user, authLoading] = useAuthState(getAuth(app));

  const [commentedState, setCommentedState] = useState<"oldest" | "latest">(
    "oldest"
  );

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
          paddingBottom: 16 - 9 - 1,
        }}
      >
        <BackIcon onClick={() => nav(-1)} />
      </div>
      <div
        style={{
          paddingLeft: 20,
          paddingRight: 20 - 2,
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <CogIcon style={{ width: 18 + 2 + 4 }} onClick={logout} />
        </div>
      </div>
      <div
        style={{
          paddingTop: 2,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 31 + 1,
        }}
      >
        {!authLoading && !!user?.uid ? (
          <div style={{ display: "flex", gap: 22 }}>
            <Avatar
              size={82}
              component={UnstyledButton}
              src={user?.photoURL}
              className={classes.userAvatar}
            />
            <div style={{ paddingTop: 20 - 2 - 2 }}>
              <Text
                style={{
                  fontSize: "18px",
                  fontFamily: "SFProDisplay",
                  fontWeight: "bold",
                  color: "#000000",
                  height: "21px",
                  lineHeight: "28px",
                  marginTop: 1,
                }}
              >
                {user.displayName}
              </Text>
              <div style={{ height: 4 + 1 + 1 }}></div>
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
                {user.email}
              </Text>
            </div>
          </div>
        ) : (
          <UserAvatar className={classes.userAvatar} />
        )}
      </div>
      <Tabs
        styles={{
          tabsListWrapper: {
            borderBottomColor: "#F1F2F4 !important",
          },
          tabLabel: {
            fontSize: "15px",
            fontFamily: "Inter",
            fontWeight: "100",
            lineHeight: "20px",
          },
          tabControl: {
            width: "50%",
            padding: 0,
            color: "#8A94A6 !important",
          },
          tabInner: { paddingBottom: 9 + 1 + 1 },
          tabActive: {
            color: "#111112 !important",
            borderBottomColor: "#111112 !important",
            borderBottomWidth: 1,
          },
          body: {
            paddingTop: 8,
          },
        }}
      >
        <Tabs.Tab label="Favourite Collections">
          <FavouriteArtwork user={user} />
        </Tabs.Tab>
        <Tabs.Tab label="Commented Artwork">
          <CommentedArtwork user={user} />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}

const FavouriteArtwork = ({ user }: { user: User | undefined | null }) => {
  const [favouriteState, setFavouriteState] = useState<"rating" | "latest">(
    "latest"
  );

  const [result, setResult] = React.useState<Artwork[]>([]);
  const [latestSnapshot, setLatestSnapshot] =
    React.useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [haveNext, setHaveNext] = useState(true);

  useEffect(() => {
    if (!user) return;

    loadFunc();

    // TODO: reset result when query changes
  }, [favouriteState, user]);

  const loadFunc = async () => {
    if (!user || !user.uid) {
      return undefined;
    }
    const _limit = 10;
    const path = `/users/${user.uid}/ratings`;
    const baseQuery = query(
      collection(getFirestore(app), path),
      favouriteState === "latest"
        ? orderBy("timestamp", "desc")
        : orderBy("rating", "desc"),
      limit(_limit)
    );
    let _query: Query<DocumentData> =
      // add startAfter when there are snapshot
      latestSnapshot ? query(baseQuery, startAfter(latestSnapshot)) : baseQuery;

    const snapshot = await getDocs(_query);

    // save for pagination
    setLatestSnapshot(snapshot.docs[snapshot.docs.length - 1]);

    const ids = snapshot.docs.map((e) => e.id);

    // get artwork details
    const res = (await Promise.allSettled(ids.map(getArtworkDetails)))
      .filter((e) => e.status === "fulfilled")
      .map((e) => e.status === "fulfilled" && e.value)
      .filter(Boolean) as Artwork[];
    setResult((resul) => [...resul, ...res]);
  };

  const handleSelectChange = (e: any) => {
    if (e === favouriteState) return;
    // update select value
    setFavouriteState(e);
    // reset result
    setResult([]);
    // reset has more data
    setHaveNext(true);
    // reset firebase snapshots
    setLatestSnapshot(null);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingLeft: 20,
          paddingRight: 15,
          paddingBottom: 13,
        }}
      >
        <CustomSelect
          value={favouriteState}
          onChange={handleSelectChange}
          data={[
            { value: "latest", label: "Sort By Latest" },
            { value: "rating", label: "Sort By Rating" },
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
          next={async () => {
            await loadFunc();
          }}
          hasMore={haveNext}
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
    </>
  );
};
const CommentedArtwork = ({ user }: { user: User | undefined | null }) => {
  const [commentedState, setCommentedState] = useState<"oldest" | "latest">(
    "latest"
  );
  const [haveNext, setHaveNext] = useState(true);

  // const commentQuery = useMemo(() => {
  //   if (!user || !user.uid) {
  //     return undefined;
  //   }
  //   return query(
  //     collection(getFirestore(app), `/comments`),
  //     where("authorID", "==", user.uid),
  //     commentedState === "latest"
  //       ? orderBy("createdAt", "asc")
  //       : orderBy("createdAt", "asc")
  //   );
  // }, [user, commentedState]);

  const [result, setResult] = React.useState<Artwork[]>([]);
  const [latestSnapshot, setLatestSnapshot] =
    React.useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  useEffect(() => {
    if (!user) return;

    loadFunc();

    // TODO: reset result when query changes
  }, [commentedState, user]);

  const loadFunc = async () => {
    if (!user || !user.uid) {
      return undefined;
    }
    const _limit = 10;
    const path = `/comments`;
    const baseQuery = query(
      collection(getFirestore(app), path),
      where("authorID", "==", user.uid),
      commentedState === "latest"
        ? orderBy("createdAt", "desc")
        : orderBy("createdAt", "asc"),
      limit(_limit)
    );
    let _query: Query<DocumentData> =
      // add startAfter when there are snapshot
      latestSnapshot ? query(baseQuery, startAfter(latestSnapshot)) : baseQuery;

    const snapshot = await getDocs(_query);
    setHaveNext(!snapshot.empty);

    // save for pagination
    setLatestSnapshot(snapshot.docs[snapshot.docs.length - 1]);

    // to unique artwork, according to select status, status: latest / oldest => use latest / oldest document
    // as the firebase already sorted for us
    // we just need to check the order according to doc.artworkID
    const ids = snapshot.docs
      .filter((doc, index, arr) => {
        const competingDoc: string[] = arr
          .filter((e) => e.data().artworkID === doc.data().artworkID)
          .map((e) => e.id);

        // should include itself, will be 0 if is the latest / oldest doc
        return competingDoc.indexOf(doc.id) === 0;
      })
      .map((e) => e.data().artworkID);

    // get artwork details
    const res = (await Promise.allSettled(ids.map(getArtworkDetails)))
      .filter((e) => e.status === "fulfilled")
      .map((e) => e.status === "fulfilled" && e.value)
      .filter(Boolean) as Artwork[];
    setResult((resul) => [...resul, ...res]);
  };

  const handleSelectChange = (e: any) => {
    if (e === commentedState) return;
    // update select value
    setCommentedState(e);
    // reset result
    setResult([]);
    // reset has more data
    setHaveNext(true);
    // reset firebase snapshots
    setLatestSnapshot(null);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingLeft: 20,
          paddingRight: 15,
          paddingBottom: 13,
        }}
      >
        <CustomSelect
          defaultValue="rating"
          value={commentedState}
          onChange={handleSelectChange}
          data={[
            { value: "latest", label: "Sort By Latest" },
            { value: "oldest", label: "Sort By Oldest" },
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
          next={async () => {
            await loadFunc();
          }}
          hasMore={haveNext}
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
    </>
  );
};

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

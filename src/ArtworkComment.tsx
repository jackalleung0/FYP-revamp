import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackIcon } from "./BackIcon";
import { CustomSelect } from "./CustomSelect";
import {
  Avatar,
  createStyles,
  TextInput,
  Text,
  ActionIcon,
  Affix,
  Drawer,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { PencilIcon, XIcon } from "@heroicons/react/solid";
import {
  addDoc,
  arrayUnion,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  getDocs,
  getFirestore,
  increment,
  limit,
  orderBy,
  Query,
  query,
  QueryDocumentSnapshot,
  setDoc,
  startAfter,
  Timestamp,
  where,
} from "firebase/firestore";
import { app } from "./firebaseConfig";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useForm } from "@mantine/form";
import { useAsync } from "react-async-hook";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import {
  useCollection,
  useCollectionData,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { PageAnimation } from "./components/PageAnimation";
dayjs.extend(relativeTime);

const useStyles = createStyles((theme, _params, getRef) => ({
  userAvatar: {
    boxShadow: theme.shadows.xl,
  },
  ActionIcon: {
    boxShadow: theme.shadows.lg,
  },
}));

interface Comment {
  artworkID: string;
  author: string;
  createdAt: Timestamp;
  iconURL: string;
  message: string;
  numberOfDiscussion: number;
  authorID: string;
  participants?: string[];
}

export function ArtworkComment() {
  const { classes } = useStyles();
  const nav = useNavigate();
  const [select, setSelect] = useState<"popular" | "latest">("popular");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const [snapshots, setSnapshots] = useState<QueryDocumentSnapshot<Comment>[]>(
    []
  );
  const { id } = useParams();

  const [tempComment, setTempComment] = useState<
    { comment: Comment; id: string }[]
  >([]);

  const _query = useMemo(() => {
    if (!id) {
      return undefined;
    }
    return query(
      collection(
        getFirestore(app),
        `/comments`
      ) as CollectionReference<Comment>,
      where("artworkID", "==", id),

      select === "latest"
        ? orderBy("createdAt", "desc")
        : orderBy("numberOfDiscussion", "desc")
    );
  }, [select]);

  const loadFunc = useCallback(async () => {
    const _limit = 10;
    if (!_query) return;

    let __query =
      snapshots.length > 0
        ? query(
            _query,
            limit(_limit),
            startAfter(snapshots[snapshots.length - 1])
          )
        : query(_query, limit(_limit));

    const snapshot = await getDocs(__query);
    setSnapshots((e) => [...e, ...snapshot.docs]);
  }, [_query]);

  const { result } = useAsync(
    async () => _query && (await getDocs(_query)),
    [_query]
  );

  useEffect(() => {
    if (snapshots.length === 0) {
      loadFunc();
    }
  }, [select]);
  const [openDrawer, setOpenedDrawer] = useState(false);
  const [drawerDocID, setDrawerDocID] = useState<string>("");

  return (
    <div>
      <Affix position={{ bottom: 30, right: 22 }} zIndex={2}>
        <PageAnimation>
          <ActionIcon
            className={classes.ActionIcon}
            radius={9999}
            size={70}
            style={{
              backgroundColor: "#111112",
            }}
            id="view in 3d"
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? (
              <XIcon style={{ width: 20 + 4, color: "#FFFFFF" }} />
            ) : (
              <PencilIcon style={{ width: 20 + 4, color: "#FFFFFF" }} />
            )}
          </ActionIcon>
        </PageAnimation>
      </Affix>
      <Drawer
        position="right"
        size="100%"
        opened={openDrawer}
        onClose={() => setOpenedDrawer(false)}
        withCloseButton={false}
      >
        <DrawerComment
          onClose={() => setOpenedDrawer(false)}
          id={drawerDocID}
        />
      </Drawer>
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
      <div
        style={{
          borderBottom: "1px solid #F1F2F4",
          paddingLeft: 20,
          paddingBottom: 32,
          paddingRight: 15,
        }}
      >
        <CustomSelect
          defaultValue="popular"
          value={select}
          onChange={(e: "popular" | "latest") => {
            // do not update select when is the same value
            if (e === select) return;
            setSelect(e);
            setSnapshots([]);
            setTempComment([]);
          }}
          data={[
            { value: "popular", label: "Sort By Popular" },
            { value: "latest", label: "Sort By Latest" },
          ]}
          style={{ width: 160, float: "right" }}
        />
        <Text
          style={{
            fontSize: "24px",
            fontFamily: "SFProDisplay",
            fontWeight: "bold",
            color: "#000000",
            height: "29px",
            lineHeight: "28px",
            paddingTop: 23,
          }}
        >
          Comment
        </Text>
        <Text
          style={{
            paddingTop: 7,

            fontSize: "16px",
            fontFamily: "Inter",
            fontWeight: "100",
            color: "#4E5D78",
            height: "20px",
            lineHeight: "20px",
          }}
        >
          Number of comments: {result?.size}
        </Text>
      </div>
      {isEditMode && (
        <div
          style={{
            background: "#FCFCFD",
            padding: "22px 20px",
            borderBottom: "1px solid #F1F2F4",
          }}
        >
          <CommentInput
            onSubmit={async ({ comment }) => {
              setIsEditMode(false);

              const ref = await addDoc<Comment>(
                collection(
                  getFirestore(app),
                  "comments"
                ) as CollectionReference<Comment>,
                comment
              );

              setTempComment((e) => [...e, { comment, id: ref.id }]);
            }}
          />
        </div>
      )}
      {/* this is use to always put your recent submitted comment on top */}
      {tempComment.map(({ comment, id }, index) => (
        <Comment
          comment={comment}
          key={index}
          commentOnClick={() => {
            setOpenedDrawer(true);
            setDrawerDocID(id);
          }}
        />
      ))}
      {snapshots.map((s) => (
        <Comment
          comment={s.data()}
          key={s.id}
          commentOnClick={() => {
            setOpenedDrawer(true);
            setDrawerDocID(s.id);
          }}
        />
      ))}
      {snapshots.length === 0 && tempComment.length === 0 && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",

              paddingTop: 158,
            }}
          >
            <DiscussionIcon />
            <Text
              style={{
                paddingTop: 36,

                fontSize: "16px",
                fontFamily: "Inter",
                fontWeight: "100",
                color: "#8A94A6",
                lineHeight: "20px",
              }}
              align="center"
            >
              Start discussion by <br /> posting the first comment.
            </Text>
          </div>
        </>
      )}
    </div>
  );
}

function Comment({
  comment,
  commentOnClick,
  layer2Comment = false,
  noBorder = false,
  hideReply = false,
  id,
}: {
  comment: Comment;
  commentOnClick: () => void;
  layer2Comment?: boolean;
  noBorder?: boolean;
  hideReply?: boolean;
  id?: string;
}) {
  const { classes } = useStyles();

  const [auth] = useAuthState(getAuth(app));
  const uid = auth && auth.uid;
  const participants = comment.participants;
  const participated = useMemo(
    () => (auth && comment.participants?.includes(auth.uid)) || false,
    [uid, participants]
  );

  return (
    <div
      id={id}
      style={{
        padding: "0px 20px",
        background: layer2Comment ? "#FCFCFD" : "transparent",
      }}
    >
      <div
        style={{
          padding: "16px 0px",
          borderBottom: noBorder ? "0px" : "1px solid #F1F2F4",
        }}
      >
        <div style={{ display: "flex" }}>
          <Avatar
            radius="xl"
            size={36}
            className={classes.userAvatar}
            src={comment.iconURL}
          />
          <div style={{ paddingLeft: 12 }}>
            <Text
              style={{
                fontSize: "16px",
                fontFamily: "SFProDisplay",
                fontWeight: "bold",
                color: "#000000",
                height: "19px",
                lineHeight: "23px",
                paddingBottom: 3,
              }}
            >
              {comment.author}
            </Text>
            <Text
              style={{
                fontSize: "12px",
                fontFamily: "Inter",
                fontWeight: "100",
                color: "#0BB07B",
                height: "15px",
              }}
            >
              Online
            </Text>
            {/* <Text
              style={{
                fontSize: "12px",
                fontFamily: "Inter",
                fontWeight: "100",
                color: "#4E5D78",
                height: "15px",
              }}
            >
              Offline
            </Text> */}
          </div>
        </div>
        <Text
          style={{
            fontSize: "15px",
            fontFamily: "Inter",
            fontWeight: "100",
            color: "#283A5B",
            lineHeight: "20px",

            paddingTop: 23,
          }}
        >
          {comment.message}
        </Text>
        <div
          style={{
            paddingTop: 18,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: "12px",
              fontFamily: "Inter",
              fontWeight: "100",
              color: "#8A94A6",
              lineHeight: "20px",
              paddingTop: 2 + 1,
            }}
          >
            {dayjs(comment.createdAt.toDate()).fromNow()}
          </Text>
          {!hideReply && (
            <div
              style={{ display: "flex", alignItems: "center", gap: 8 }}
              onClick={(e) => commentOnClick()}
            >
              {auth && participated && (
                <Avatar
                  size={24}
                  src={auth.photoURL}
                  radius="xl"
                  style={{ marginRight: 5 }}
                />
              )}
              <div
                style={{
                  paddingTop: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <ReplyIcon />
                <Text
                  style={{
                    fontSize: "14px",
                    fontFamily: "SFProDisplay",
                    fontWeight: "100",
                    color: "#8A94A6",
                    // height: "16px",
                    // lineHeight: "20px",
                  }}
                >
                  {(!comment.numberOfDiscussion && "Reply") ||
                    comment.numberOfDiscussion}
                </Text>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const ReplyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 15 15"
  >
    <path
      id="Reply_Icon"
      d="M13.889,7.111h1.556A1.556,1.556,0,0,1,17,8.667v4.667a1.556,1.556,0,0,1-1.556,1.556H13.889V18l-3.111-3.111H7.667a1.551,1.551,0,0,1-1.1-.456m0,0,2.655-2.655h3.111a1.556,1.556,0,0,0,1.556-1.556V5.556A1.556,1.556,0,0,0,12.333,4H4.556A1.556,1.556,0,0,0,3,5.556v4.667a1.556,1.556,0,0,0,1.556,1.556H6.111v3.111Z"
      transform="translate(-2.5 -3.5)"
      fill="none"
      stroke="#8a94a6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
    />
  </svg>
);

const toDataURL = (url: string) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

const CommentInput = ({
  onSubmit: _onSubmit,
  layer2Comment = false,
}: {
  onSubmit: ({ comment }: { comment: Comment }) => void;
  layer2Comment?: boolean;
}) => {
  const form = useForm({
    initialValues: {
      message: "",
    },
  });

  const { id } = useParams<{ id: string }>();

  const [user] = useAuthState(getAuth(app));

  const onSubmit = form.onSubmit(async ({ message }) => {
    if (!id) return;
    if (!user) return;
    console.log(message);
    const payload: Comment = {
      artworkID: id,
      author: user.displayName || "unnamed",
      createdAt: Timestamp.fromDate(new Date()),
      iconURL: (user.photoURL && (await toDataURL(user.photoURL))) || "",
      message: message,
      numberOfDiscussion: 0,
      authorID: user.uid,
    };

    _onSubmit({ comment: payload });
    form.setValues({ message: "" });
  });

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        icon={<Avatar radius="xl" size={32} src={user?.photoURL} />}
        placeholder="Add a comment..."
        rightSection={<SendIcon onClick={onSubmit} />}
        {...form.getInputProps("message")}
        styles={{
          root: {
            borderBottom: "1px solid #8A94A6",
          },
          icon: {
            paddingLeft: 0,
            width: 32,
            height: 32,
            // paddingLeft: 17,
            // width: "min-content",
          },
          input: {
            color: "#4E5D78",
            fontSize: "14px",
            fontFamily: "Inter",
            fontWeight: "100",
            lineHeight: "24px",
            background: "transparent",

            borderWidth: 0,
            marginBottom: 7,

            paddingLeft: `${48}px !important`,
          },
          rightSection: {
            width: 22,
            height: 34,
          },
        }}
      />
    </form>
  );
};
const SendIcon = ({ ...props }: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
  >
    <path
      id="send"
      d="M19.537,10.206,3.44,2.09A.954.954,0,0,0,2.091,3.262L4.339,9.3l10.252,1.713L4.339,12.731,2.091,18.773A.912.912,0,0,0,3.44,19.855l16.1-8.116A.858.858,0,0,0,19.537,10.206Z"
      transform="translate(-2.009 -1.994)"
      fill="#b0b7c3"
    />
  </svg>
);

const DrawerComment = ({
  onClose,
  id,
}: {
  onClose: () => void;
  id: string;
}) => {
  const [user] = useAuthState(getAuth(app));
  const [snapshot, loading, error] = useCollection<Comment>(
    query(
      collection(
        getFirestore(app),
        `/comments/${id}/discussions`
      ) as CollectionReference<Comment>,
      orderBy("createdAt", "desc")
    )
  );
  const [value, _, __, ___, reload] = useDocumentDataOnce<Comment>(
    doc(getFirestore(app), `/comments/${id}`) as DocumentReference<Comment>
  );
  // const [values, loading, error, snapshot] = useCollectionData();
  // console.log(values);
  return (
    <>
      <div
        style={{
          paddingTop: 10,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 30,
        }}
        id={id}
      >
        <BackIcon onClick={() => onClose()} />
      </div>
      {value && (
        <Comment
          comment={value}
          commentOnClick={() => {}}
          noBorder
          layer2Comment
          hideReply
        />
      )}
      <div
        style={{
          background: "#FCFCFD",
          paddingTop: 14,
          paddingBottom: 26,
          paddingLeft: 20,
          paddingRight: 20,
          borderBottom: "0px",
        }}
      >
        <CommentInput
          onSubmit={async ({ comment }) => {
            await addDoc<Comment>(
              collection(
                getFirestore(app),
                `/comments/${id}/discussions`
              ) as CollectionReference<Comment>,
              comment
            );

            await setDoc(
              doc(
                getFirestore(app),
                `/comments/${id}`
              ) as DocumentReference<any>,
              {
                numberOfDiscussion: increment(1),
                participants: arrayUnion(user?.uid),
              },
              { merge: true }
            );

            // also update parent document on participants
            const path = "";

            // setTempComment((e) => [...e, { comment, id: ref.id }]);
            reload();
          }}
          layer2Comment
        />
      </div>
      <div style={{ padding: "0 16px" }}>
        {snapshot &&
          snapshot.docs.map((comment) => (
            <Comment
              id={comment.id}
              comment={comment.data()}
              commentOnClick={() => {}}
              key={comment.id}
              hideReply
            />
          ))}
      </div>
    </>
  );
};

const DiscussionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="119"
    height="112"
    viewBox="0 0 119 112"
  >
    <g id="Discussion_Icon" transform="translate(-2 -3)">
      <path
        id="Path_12"
        data-name="Path 12"
        d="M2,18.172A15.172,15.172,0,0,1,17.172,3h53.1A15.172,15.172,0,0,1,85.444,18.172V48.515A15.172,15.172,0,0,1,70.272,63.686H55.1L32.343,86.444V63.686H17.172A15.172,15.172,0,0,1,2,48.515Z"
      />
      <path
        id="Path_13"
        data-name="Path 13"
        d="M60.692,7V22.172A30.343,30.343,0,0,1,30.349,52.515H21.459l-13.4,13.4a15.094,15.094,0,0,0,7.115,1.767H30.349L53.106,90.444V67.686H68.278A15.172,15.172,0,0,0,83.45,52.515V22.172A15.172,15.172,0,0,0,68.278,7Z"
        transform="translate(37.551 24.556)"
      />
    </g>
  </svg>
);

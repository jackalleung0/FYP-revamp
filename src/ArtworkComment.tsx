import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackIcon } from "./BackIcon";
import { CustomSelect } from "./CustomSelect";
import {
  Avatar,
  createStyles,
  TextInput,
  Text,
  ActionIcon,
  Affix,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { PencilIcon, XIcon } from "@heroicons/react/solid";

const useStyles = createStyles((theme, _params, getRef) => ({
  userAvatar: {
    boxShadow: theme.shadows.xl,
  },
  ActionIcon: {
    boxShadow: theme.shadows.lg,
  },
}));

export function ArtworkComment() {
  const { classes } = useStyles();
  const nav = useNavigate();
  const [select, setSelect] = useState<"popular" | "latest">("popular");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  return (
    <div>
      <Affix position={{ bottom: 30, right: 22 }} zIndex={2}>
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
      </Affix>
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
          display: "flex",
          justifyContent: "flex-end",
          padding: "0 20px 10px",
        }}
      >
        <CustomSelect
          defaultValue="popular"
          value={select}
          onChange={(e: "popular" | "latest") => setSelect(e)}
          data={[
            { value: "popular", label: "Sort By Popular" },
            { value: "latest", label: "Sort By Latest" },
          ]}
          style={{ width: 160 }}
        />
      </div>
      <div
        style={{ padding: "0 20px 33px", borderBottom: "1px solid #F1F2F4" }}
      >
        <Text
          style={{
            fontSize: "24px",
            fontFamily: "SFProDisplay",
            fontWeight: "bold",
            color: "#000000",
            height: "29px",
            lineHeight: "28px",
          }}
        >
          Comment
        </Text>
        <Text
          style={{
            paddingTop: 8,

            fontSize: "16px",
            fontFamily: "Inter",
            fontWeight: "100",
            color: "#4E5D78",
            height: "20px",
            lineHeight: "20px",
          }}
        >
          Number of comments: {10}
        </Text>
      </div>
      {isEditMode && <CommentInput />}
      <Comment />
    </div>
  );
}

function Comment() {
  const { classes } = useStyles();
  return (
    <div style={{ padding: "0px 20px" }}>
      <div
        style={{
          padding: "16px 0px",
          borderBottom: "1px solid #F1F2F4",
        }}
      >
        <div style={{ display: "flex" }}>
          <Avatar radius="xl" size={36} className={classes.userAvatar} />
          <div style={{ paddingLeft: 12 }}>
            <Text
              style={{
                fontSize: "16px",
                fontFamily: "SFProDisplay",
                fontWeight: "bold",
                color: "#000000",
                height: "19px",

                paddingTop: 2,
                paddingBottom: 2,
              }}
            >
              Filipa Gaspar
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

            paddingTop: 22,
          }}
        >
          This painting keeps getting better all the time every time I take a
          look at it.
        </Text>
        <div
          style={{
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: "15px",
              fontFamily: "Inter",
              fontWeight: "100",
              color: "#8A94A6",
              lineHeight: "20px",
            }}
          >
            Posted a month ago
          </Text>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
              2
            </Text>
          </div>
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

const CommentInput = () => {
  return (
    <div
      style={{
        background: "#FCFCFD",
        padding: "22px 20px",
        borderBottom: "1px solid #F1F2F4",
      }}
    >
      <TextInput
        icon={<Avatar radius="xl" size={32} />}
        placeholder="Add a comment..."
        rightSection={<SendIcon />}
        styles={{
          root: {
            borderBottom: "1px solid #8A94A6",
          },
          // icon: {
          //   paddingLeft: 17,
          //   width: "min-content",
          // },
          input: {
            color: "#4E5D78",
            fontSize: "14px",
            fontFamily: "Inter",
            fontWeight: "100",
            lineHeight: "24px",
            // height:17,

            // borderRadius: 0,
            borderWidth: 0,
            marginBottom: 11,
            // backgroundColor: "#F1F2F4",

            // padding: 0,
            // borderLeft: 16,
            // height: "50px",
            // paddingTop: 2,
            paddingLeft: `${32 + 16}px !important`,
          },
        }}
      />
    </div>
  );
};
const SendIcon = () => (
  <svg
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

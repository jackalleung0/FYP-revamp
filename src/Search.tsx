import {
  createStyles,
  Container,
  ActionIcon,
  Text,
  TextInput,
  Affix,
  Transition,
} from "@mantine/core";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { BackIcon } from "./BackIcon";
import { TagButton } from "./TagButton";
const useStyles = createStyles((theme, _params, getRef) => ({
  ActionIcon: {
    boxShadow: theme.shadows.lg,
  },
}));

export function Search() {
  const { classes } = useStyles();

  const nav = useNavigate();
  return (
    <div>
      <Affix position={{ bottom: 30, right: 22 }}>
        <Transition mounted={true} transition="slide-left" duration={300}>
          {(transitionStyles) => (
            <ActionIcon
              className={classes.ActionIcon}
              component={Link}
              to="/home"
              radius={9999}
              size={70}
              style={{
                backgroundColor: "#111112",
                ...transitionStyles,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <path
                  id="Home_Icon"
                  d="M12.884,2.366a1.25,1.25,0,0,0-1.768,0l-8.75,8.75a1.25,1.25,0,1,0,1.768,1.768l.366-.366V20.75A1.25,1.25,0,0,0,5.75,22h2.5A1.25,1.25,0,0,0,9.5,20.75v-2.5A1.25,1.25,0,0,1,10.75,17h2.5a1.25,1.25,0,0,1,1.25,1.25v2.5A1.25,1.25,0,0,0,15.75,22h2.5a1.25,1.25,0,0,0,1.25-1.25V12.517l.366.366a1.25,1.25,0,1,0,1.768-1.768l-8.75-8.75Z"
                  transform="translate(-2 -2)"
                  fill="#fff"
                />
              </svg>
            </ActionIcon>
          )}
        </Transition>
      </Affix>
      <Container
        style={{
          paddingTop: "10px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <BackIcon onClick={() => nav(-1)} />
        <Text
          style={{
            marginTop: "40px",
            fontSize: "32px",
            fontFamily: "SFProDisplay",
            fontWeight: "bold",
            color: "#000000",
            height: "72px",
            lineHeight: "34px",
          }}
        >
          Search
        </Text>

        <TextInput
          placeholder="Search artworks & artists..."
          icon={<SearchIcon />}
          styles={{
            root: {
              borderRadius: "8px",
            },
            icon: {
              paddingLeft: "18px",
              width: "min-content",
            },
            input: {
              color: "#0A1F44",
              fontSize: "16px",
              fontFamily: "Inter",
              fontWeight: 100,
              lineHeight: "24px",

              borderRadius: "8px",
              borderWidth: 0,
              backgroundColor: "#F1F2F4",

              padding: 0,
              borderLeft: 10,
              height: "50px",
              paddingTop: 2,
              paddingLeft: "46px !important",
            },
          }}
        />

        <div>
          <Text
            style={{
              marginTop: "37px",
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
              display: "flex",
              gap: "16px 6px",
              minWidth: "min-content",
              flexWrap: "wrap",
            }}
          >
            {[
              "oil in canvas",
              "painting",
              "women",
              "Post-Impressionism",
              "domestic scenes",
              "interiors",
              "abstract figure",
              "leisure",
              "modern and contemporary art",
            ].map((value, i) => (
              <TagButton popular={i === 0} to="/search-by-tag">
                {value}
              </TagButton>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15.453"
    height="16.166"
    viewBox="0 0 15.453 16.166"
    style={{ color: "black" }}
  >
    <path
      id="_Icon_style"
      data-name="🎨 Icon style"
      d="M14.487,16.166a.938.938,0,0,1-.682-.3L10.81,12.737a6.512,6.512,0,0,1-4.049,1.409A6.93,6.93,0,0,1,0,7.073,6.93,6.93,0,0,1,6.761,0a6.93,6.93,0,0,1,6.761,7.073,7.228,7.228,0,0,1-1.346,4.236l2.995,3.133a1.045,1.045,0,0,1,0,1.429A.939.939,0,0,1,14.487,16.166ZM6.761,2.021a4.95,4.95,0,0,0-4.83,5.052,4.95,4.95,0,0,0,4.83,5.052A4.95,4.95,0,0,0,11.59,7.073,4.95,4.95,0,0,0,6.761,2.021Z"
      fill="#0a1f44"
    />
  </svg>
);

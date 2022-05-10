import {
  createStyles,
  Container,
  ActionIcon,
  Text,
  TextInput,
  Affix,
  Transition,
  Button,
  Image,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  useNavigate,
  Link,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { BackIcon } from "./BackIcon";
import { TagButton } from "./TagButton";
import { useAnimation, motion } from "framer-motion";
const useStyles = createStyles((theme, _params, getRef) => ({
  ActionIcon: {
    boxShadow: theme.shadows.lg,
  },
}));

const scaleY = {
  in: { opacity: 1, transform: "scaleY(1)" },
  out: { opacity: 1, transform: "scaleY(0)" },
  common: { transformOrigin: "top" },
  transitionProperty: "transform, opacity",
};

import { useDebouncedValue, useElementSize, useInterval } from "@mantine/hooks";
import { searchArtworkBySearchTerm } from "./searchArtworkBySearchTerm";
import { useAsync } from "react-async-hook";
import { getImageURL } from "./getImageURL";
import { getArtistName } from "./getArtistName";
import {
  query,
  collection,
  getFirestore,
  orderBy,
  limit,
  CollectionReference,
} from "firebase/firestore";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { app } from "./firebaseConfig";
import { getArtworkDetails } from "./getArtworkDetails";
import { PageAnimation } from "./components/PageAnimation";

export function Search() {
  const { classes } = useStyles();

  // const isFocus = true;
  const [isFocus, setIsFocus] = React.useState(false);

  const nav = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const form = useForm({
    initialValues: {
      term: "",
    },
  });
  const isSearchMode = isFocus || !!form.values.term;
  const [debouncedTerm] = useDebouncedValue(form.values.term, 200);
  const { result } = useAsync(searchArtworkBySearchTerm, [debouncedTerm, 20]);

  const toArtwork = (id: string) => () => {
    nav(`/artwork/${id}`);
  };

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
  const { result: fav_artwork } = useAsync(getArtworkDetails, [id || ""]);
  const tags = useMemo(
    () =>
      (fav_artwork?.term_titles &&
        fav_artwork?.term_titles.filter((_, index) => index < 10)) ||
      [],
    [fav_artwork]
  );

  const navControl = useAnimation();
  const searchControl = useAnimation();
  const trendingTagsControl = useAnimation();
  const searchRow = useAnimation();
  const { ref: navRef, height: _navHeight } = useElementSize();
  const { ref: searchRef, height: _searchHeight } = useElementSize();

  const [navHeight, setNavHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  useEffect(() => {
    setNavHeight((e) => Math.max(e, _navHeight));
    setSearchHeight((e) => Math.max(e, _searchHeight));
  }, [_navHeight, _searchHeight]);

  useEffect(() => {
    const fun = async () => {
      if (navHeight === 0) return;
      if (searchHeight === 0) return;
      const duration = 0.3;
      if (isSearchMode) {
        navControl.start({
          opacity: 0,
          transition: { duration },
        });
        trendingTagsControl.start({
          opacity: 0,
          transition: { duration },
        });
        await searchControl.start({
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          transition: { duration },
        });
        trendingTagsControl.set({
          display: "none",
        });
        navControl.set({
          display: "none",
        });
      } else {
        searchControl.start({
          left: 0,
          right: 0,
          position: "absolute",
          top: navHeight,
          transition: { duration },
        });
        navControl.start({
          opacity: 1,
          transition: { duration },
        });
        trendingTagsControl.start({
          opacity: 1,
          transition: { duration },
        });
        navControl.set({
          display: "block",
        });
        trendingTagsControl.set({
          display: "block",
          paddingTop: searchHeight,
        });
      }
    };
    fun();
  }, [isSearchMode, searchHeight, navHeight]);

  // const [time, setTime] = useState(0);
  // useEffect(() => {
  //   const timer = setInterval(() => setTime((e) => e + 1), 1000);
  //   () => clearInterval(timer);
  // }, []);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <Affix position={{ bottom: 30, right: 22 }}>
        <Transition
          mounted={!isSearchMode}
          transition="slide-left"
          duration={300}
        >
          {(transitionStyles) => (
            <PageAnimation>
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
            </PageAnimation>
          )}
        </Transition>
      </Affix>

      <motion.div animate={navControl} ref={navRef}>
        <Container
          style={{
            paddingTop: 10,
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
              height: "58px",
              lineHeight: "34px",
            }}
          >
            Search
          </Text>
        </Container>
      </motion.div>

      <motion.div animate={searchControl} ref={searchRef} style={{ zIndex: 2 }}>
        <Container
          style={{
            paddingTop: 14,
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <form
            style={{ display: "flex", alignItems: "center" }}
            onSubmit={form.onSubmit((values) => {
              console.log(values);
              nav(`/search-result?term=${values.term}`);
            })}
          >
            <TextInput
              placeholder={isSearchMode ? "" : "Search artworks & artists..."}
              icon={<SearchIcon />}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              {...form.getInputProps("term")}
              styles={{
                root: {
                  borderRadius: "8px",
                  flexGrow: 1,
                },
                icon: {
                  paddingLeft: 17,
                  width: "min-content",
                },
                input: {
                  color: "#8A94A6",
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
            <Transition
              mounted={isSearchMode}
              transition="fade"
              duration={400}
              timingFunction="ease"
            >
              {(styles) => (
                <Button
                  variant="subtle"
                  styles={{
                    root: {
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                      border: 0,
                      paddingRight: 0,
                    },
                  }}
                  onClick={() => {
                    form.setFieldValue("term", "");
                    // console.log((form.values.term = ""))
                  }}
                >
                  <Text
                    style={{
                      color: "#4E5D78",
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontWeight: "normal",
                      ...styles,
                    }}
                  >
                    Cancel
                  </Text>
                </Button>
              )}
            </Transition>
          </form>
        </Container>
      </motion.div>
      <motion.div animate={trendingTagsControl} id="trend-tags">
        <Container
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <div>
            <Text
              style={{
                paddingTop: "37px",
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
              {tags.map((value, i) => (
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
        </Container>
      </motion.div>
      {result && (
        <Container
          id="search-result"
          style={{
            paddingTop: searchHeight,
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          {result.map((artwork: any) => (
            <>
              <div
                onClick={toArtwork(artwork.id)}
                style={{
                  display: "flex",
                  gap: 18,
                  paddingTop: 16,
                  paddingBottom: 15,
                }}
              >
                <Image
                  width={58}
                  height={46}
                  withPlaceholder
                  src={artwork.image_id && getImageURL(artwork.image_id)}
                />
                <div>
                  <Text
                    style={{
                      paddingTop: 3,
                      fontSize: "16px",
                      fontFamily: "Inter",
                      fontWeight: "normal",
                      color: "#111112",
                      height: 20,
                      paddingBottom: 4,
                    }}
                    lineClamp={1}
                  >
                    {artwork.title || "(Untitled)"}
                  </Text>
                  <Text
                    style={{
                      fontSize: "12px",
                      fontFamily: "Inter",
                      fontWeight: "100",
                      color: "#8A94A6",
                      height: 15,
                      paddingBottom: 4,
                    }}
                    lineClamp={1}
                  >
                    {getArtistName(artwork.artist_display)}
                  </Text>
                </div>
              </div>
              <hr
                style={{
                  margin: 0,
                  border: "none",
                  height: "1px",
                  backgroundColor: "#F1F2F4",
                }}
              />
            </>
          ))}
        </Container>
      )}
    </div>
  );
}

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <path
      id="_Icon_style"
      data-name="🎨 Icon style"
      d="M15,16a.993.993,0,0,1-.707-.293l-3.1-3.1a7,7,0,1,1,1.414-1.414l3.1,3.1A1,1,0,0,1,15,16ZM7,2a5,5,0,1,0,5,5A5.006,5.006,0,0,0,7,2Z"
      fill="#0a1f44"
    />
  </svg>
);

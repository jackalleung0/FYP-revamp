import {
  Container,
  ActionIcon,
  Text,
  createStyles,
  Affix,
  Transition,
  LoadingOverlay,
  Loader,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAsync } from "react-async-hook";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { BackIcon } from "./BackIcon";
import { getArtistName } from "./getArtistName";
import { getImageURL } from "./getImageURL";
import { useRefCallback } from "./useRefCallback";

const useStyles = createStyles((theme, _params, getRef) => ({
  ActionIcon: {
    boxShadow: theme.shadows.lg,
  },
}));

export const instance = axios.create({
  baseURL: "https://api.artic.edu/api/v1",
  timeout: 10000,
});

export const searchArtworkBySearchTerm = async (
  term: string,
  from: number,
  limit = 10
) => {
  if (!term) return [];
  const result = await instance.get("artworks/search", {
    params: {
      limit,
      from,
      // just put all the author in the search list, and let the search do its thing
      // the array is for readability
      q: term,
      fields: [
        "image_id",
        "title",
        "thumbnail",
        "id",
        "artist_display",
        "term_titles",
      ].join(","),
    },
  });
  console.log(result.data.pagination);
  return result.data; // ensure there are image_id for search result
};
import Masonry, { MasonryOptions } from "react-masonry-component";
import { MasImage } from "./MasImage";
import { PageAnimation } from "./components/PageAnimation";

export function SearchByTag() {
  const nav = useNavigate();
  const [scroll, scrollTo] = useWindowScroll();
  const { classes } = useStyles();
  const { search } = useLocation();
  // const images = React.useMemo(() => {
  //   return Array(20)
  //     .fill(1)
  //     .map(() => Math.floor(Math.random() * 6) * 100)
  //     .map((width) => `https://picsum.photos/300/${width}`);
  // }, []);
  const [searchParams] = useSearchParams();
  // const { result, loading: resultLoading } = useAsync(
  //   searchArtworkBySearchTerm,
  //   [searchParams.get("term") || ""]
  // );

  // const [ref, imageLoaded] = useRefCallback();

  // const loading = resultLoading || (result?.length > 0 && !imageLoaded);

  const [result, setResult] = React.useState<any[]>([]);
  const [totalResult, setTotalResult] = useState<number>();
  // const [hasMore, setHasMore] = useState(true);
  const [doneFirstLoading, setDoneFirstLoading] = useState(false);
  const [{ total_pages, current_page }, setPagination] = useState({
    total_pages: 0,
    current_page: 0,
  });
  const loadFunc = async () => {
    const r = await searchArtworkBySearchTerm(
      searchParams.get("term") || "",
      result.length
    );
    setDoneFirstLoading(true);
    setTotalResult(r.pagination.total);
    setResult((e) => [...e, ...r.data]);
    // setHasMore(r.pagination.total_pages >= r.pagination.current_page);

    setPagination(r.pagination);
    // console.log({
    //   hasMore,
    //   t: r.pagination.total_pages,
    //   c: r.pagination.current_page,
    // });
  };

  useEffect(() => {
    if (result.length === 0) {
      loadFunc();
    }
  }, []);

  const masonryOptions: MasonryOptions = {
    transitionDuration: 0,
    horizontalOrder: true,
    gutter: 15,
    columnWidth: 160,
  };

  return (
    <div>
      {/* <LoadingOverlay
        zIndex={201}
        visible={loading}
        overlayOpacity={1}
        overlayColor="#FFF"
        loaderProps={{ color: "#111112" }}
      /> */}
      <div>
        {result.length > 0 && (
          <Affix position={{ bottom: 30, right: 22 }}>
            <Transition mounted={true} transition="slide-left" duration={300}>
              {(transitionStyles) => (
                <PageAnimation style={{ overflow: "visible" }}>
                  <ActionIcon
                    onClickCapture={() => scrollTo({ y: 0 })}
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
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                    >
                      <path
                        id="Up_Icon"
                        d="M3.377,10.67a1.029,1.029,0,0,1,0-1.591l7.714-6.75a1.419,1.419,0,0,1,1.818,0l7.714,6.75a1.028,1.028,0,0,1,0,1.591,1.419,1.419,0,0,1-1.818,0l-5.52-4.83V18.875A1.213,1.213,0,0,1,12,20a1.213,1.213,0,0,1-1.286-1.125V5.841l-5.52,4.83a1.419,1.419,0,0,1-1.818,0Z"
                        transform="translate(-3 -2)"
                        fill="#fff"
                        fillRule="evenodd"
                      />
                    </svg>
                  </ActionIcon>
                </PageAnimation>
              )}
            </Transition>
          </Affix>
        )}
        <Container
          style={{
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <div
            style={{
              marginTop: 10,
            }}
          >
            <BackIcon onClick={() => nav(-1)} />
          </div>

          {result && result.length > 0 && (
            <>
              <Text
                align="center"
                style={{
                  marginTop: "9px",
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "100",
                  color: "#8A94A6",
                  height: "17px",
                  lineHeight: "16px",
                  paddingBottom: "36px",
                }}
              >
                See {totalResult} results for{" "}
                {searchParams.get("term") || "oil in canvas"}
              </Text>
              <InfiniteScroll
                dataLength={result.length} //This is important field to render the next data
                next={loadFunc}
                hasMore={total_pages > current_page}
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
                  {result
                    .filter((e) => !!e.image_id)
                    .map(
                      (
                        { image_id, title, artist_display, id }: any,
                        index: any
                      ) => (
                        <MasImage
                          src={getImageURL(image_id)}
                          key={index}
                          {...{ title, id }}
                          artist={getArtistName(artist_display)}
                          // ref={(el: HTMLImageElement) => ref(el, index)}
                        />
                      )
                    )}
                </Masonry>
              </InfiniteScroll>
            </>
          )}
        </Container>
        {!(total_pages > current_page) && result.length > 0 && (
          <Text
            align="center"
            style={{
              fontSize: "12px",
              fontFamily: "Inter",
              fontWeight: 100,
              color: "#4E5D78",
              height: "15px",
              paddingTop: 40,
              marginBottom: 50,
            }}
          >
            No More Result
          </Text>
        )}
        {doneFirstLoading && result.length <= 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "calc(100vh - 33px)",
            }}
          >
            <Text
              align="center"
              style={{
                fontFamily: "Inter",
                fontSize: 16,
                fontWeight: "100",
                lineHeight: "20px",
                color: "#8A94A6",
                height: "max-content",
              }}
            >
              No results can be found. Please try another keywords.
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}

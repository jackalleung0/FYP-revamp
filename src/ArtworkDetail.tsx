import {
  Affix,
  ActionIcon,
  Container,
  createStyles,
  Center,
  Image,
  Title,
  Text,
  Button,
  Group,
  UnstyledButton,
} from "@mantine/core";
import { BottomSheet } from "react-spring-bottom-sheet";
import { useWindowScroll } from "@mantine/hooks";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Transition } from "react-transition-group";
import { BackIcon } from "./BackIcon";
import { CommentIcon } from "./CommentIcon";
import { DiscoverCard } from "./DiscoverCard";
import { ShareIcon } from "./ShareIcon";
import { TagButton } from "./TagButton";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme, _params, getRef) => ({
  ActionIcon: {
    boxShadow: theme.shadows.lg,
  },
  Image: {
    boxShadow: theme.shadows.lg,
  },
}));

export function ArtworkDetail() {
  const { classes } = useStyles();
  const nav = useNavigate();
  let { id } = useParams();
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
            }}
          >
            Share Options
          </Text>

          <div
            style={{
              display: "flex",
              gap: 29,
              paddingLeft: 31,
              paddingRight: 31,
              paddingTop: 50,
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
                  width: 56,
                  height: 56,
                }}
              >
                <LinkIcon
                  style={{
                    padding: 14,
                  }}
                />
              </div>
              <Text
                align="center"
                style={{
                  paddingTop: 8,
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
              <TwitterIcon width={56} fit="contain" />
              <Text
                align="center"
                style={{
                  paddingTop: 8,
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
              <div
                style={{
                  borderRadius: 99,
                  background: "#1DA1F2",
                  display: "flex",
                  alignContent: "center",
                  justifyItems: "center",
                  width: 56,
                  height: 56,
                }}
              >
                <WhatsAppIcon
                  style={{
                    padding: 14,
                  }}
                />
              </div>
              <Text
                align="center"
                style={{
                  paddingTop: 8,
                  fontFamily: "Inter",
                  fontWeight: "100",
                  fontSize: 12,
                  lineHeight: "20px",
                  color: "#4E5D78",
                  width: 56,
                }}
              >
                WhatsApp
              </Text>
            </UnstyledButton>{" "}
            <UnstyledButton>
              <div
                style={{
                  borderRadius: 99,
                  background: "#1DA1F2",
                  display: "flex",
                  alignContent: "center",
                  justifyItems: "center",
                  width: 56,
                  height: 56,
                }}
              >
                <TelegramIcon />
              </div>
              <Text
                align="center"
                style={{
                  paddingTop: 8,
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
              marginLeft: 33,
              marginRight: 33,
              marginTop: 50,
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
      <Affix position={{ bottom: 30, right: 22 }} zIndex={2}>
        <ActionIcon
          className={classes.ActionIcon}
          radius={9999}
          size={70}
          style={{
            backgroundColor: "#111112",
          }}
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </ActionIcon>
      </Affix>
      <div
        style={{
          position: "sticky",
          top: 10,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 34,
        }}
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
          src="https://picsum.photos/1200"
        />
      </Center>
      <Container
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 33,
        }}
      >
        <LikeIcon style={{ float: "right", paddingTop: 5 }} />
        {/* <ActionIcon
          style={{ float: "right" }}
          styles={{
            root: {
              "&:hover": {
                backgroundColor: "transparent",
              },
              border: 0,
            },
          }}
        ></ActionIcon> */}
        <Title
          style={{
            fontSize: "24px",
            fontFamily: "SFProDisplay",
            fontWeight: "bold",
            color: "#000000",
            height: "29px",
            lineHeight: "28px",
          }}
        >
          The Bedroom
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
            height: "17px",
            lineHeight: "20px",
          }}
        >
          Vincent van Gogh
        </Text>
        <div style={{ display: "flex", paddingTop: 25, gap: 8 }}>
          <FilledStar />
          <FilledStar />
          <FilledStar />
          <EmptyStar />
          <EmptyStar />
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
            height: "39px",
            lineHeight: "20px",
          }}
        >
          Painting of bedroom, blue walls, green window, tan bed, red bedding.
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
            {[
              "oil in canvas",
              "oil painting",
              "Post-Impressionism",
              "interiors",
              "oil paint (paint)",
              "painting (image making)",
              "painting",
              "european painting",
              "domestic scenes",
              "Century of Progress",
            ].map((value, i) => (
              <TagButton popular={i === 0} to="/search-result">
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
          {Array(4)
            .fill(1)
            .map((_, index) => (
              <DiscoverCard
                key={index}
                title="Self-Portrait"
                tag="oil on board"
                author="Vincent van Gogh"
              />
            ))}
        </div>
      </div>
    </div>
  );
}

const FilledStar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <path
      id="Path_8"
      data-name="Path 8"
      d="M9.542,3.012a1.063,1.063,0,0,1,2.047,0l1.151,3.7a1.082,1.082,0,0,0,1.022.775h3.725a1.133,1.133,0,0,1,.633,2.034l-3.013,2.285a1.152,1.152,0,0,0-.392,1.256l1.151,3.7a1.089,1.089,0,0,1-1.657,1.256L11.2,15.731a1.04,1.04,0,0,0-1.264,0L6.92,18.016A1.088,1.088,0,0,1,5.264,16.76l1.151-3.7a1.152,1.152,0,0,0-.392-1.256L3.011,9.521a1.133,1.133,0,0,1,.633-2.034H7.369a1.082,1.082,0,0,0,1.023-.775l1.151-3.7Z"
      transform="translate(-2.566 -2.236)"
    />
  </svg>
);

const EmptyStar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <path
      id="Path_9"
      data-name="Path 9"
      d="M9.542,3.012a1.063,1.063,0,0,1,2.047,0l1.151,3.7a1.082,1.082,0,0,0,1.022.775h3.725a1.133,1.133,0,0,1,.633,2.034l-3.013,2.285a1.152,1.152,0,0,0-.392,1.256l1.151,3.7a1.089,1.089,0,0,1-1.657,1.256L11.2,15.731a1.04,1.04,0,0,0-1.264,0L6.92,18.016A1.088,1.088,0,0,1,5.264,16.76l1.151-3.7a1.152,1.152,0,0,0-.392-1.256L3.011,9.521a1.133,1.133,0,0,1,.633-2.034H7.369a1.082,1.082,0,0,0,1.023-.775l1.151-3.7Z"
      transform="translate(-2.566 -2.236)"
      fill="#e1e4e8"
    />
  </svg>
);

const LikeIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="18.8"
    height="17"
    viewBox="0 0 18.8 17"
  >
    <path
      id="Like_Icon"
      d="M4.23,6.287a4.538,4.538,0,0,0,0,6.213L11.4,20l7.17-7.5a4.538,4.538,0,0,0,0-6.213,4.071,4.071,0,0,0-5.94,0L11.4,7.574,10.17,6.287a4.071,4.071,0,0,0-5.94,0Z"
      transform="translate(-2 -4)"
      fill="none"
      stroke="#111112"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    />
  </svg>
);

const LinkIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="28"
    height="28"
    viewBox="0 0 28 28"
    {...props}
  >
    <image
      id="URL_Icon"
      width="28"
      height="28"
      xlinkHref="data:image/png;base64,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"
    />
  </svg>
);

const TwitterIcon = ({ ...props }) => (
  <Image
    width={56}
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAA+KElEQVR42u29eZhdRZn4fyEoqLhAZJL0Od1NMAIGRCBuow6CbD8ERBDckVXA0RFEBXVGg2yC208cR8RxRomMOq1jMOmuup3upMkeQpuQnSQkIWv3rTp9+97e+/ZS36dOWAJ00ttdzvL5PM/nD3lkSZ1z6q1b9db7JhIAEGhmNJrXlM/TZWXVqdPLhXdBmVSfdIS+yRH6TleqH7hCPewI/QdHqL+5QtW5Qi1zhG50hN7qCL3DkSr9MoXKuVKbA7V/7dX/P739+X9Go/1n2n+2/Xf4/y6pfukKdb8r9R3+f4tUV5UnvfOdZOpd9r810WCO4MkBAAAchMli33FlQp1RLvXH3KT3FVeqBxypHnOFanCk2uBKrV4ZrEOkcoRab/8srlS/t382+2csE/pSu5iZMmfvW3kDAAAgmlSZCRW1TVPtr+MyqW9xhPqxI9VsR6h1jtRdIQ7uedGOgSP1Wn9MpPqRI/XNZdI7r1I2HZ+YaQ7nBQIAgMDjb9NL7zxHqltdqR9xpV7iCt0R9yA/9sWB6n1+F6TKkfou/5hBtpxiF1W8bQAAUHT8M3nZcopT433BFfohP9BL3UnQLtLCYH++wgZXqFl2sVUuUh+aMmfv63kzAQAgf1SZCW5N8ztdqW50pP6N3a52heojEAfM/c9kjSP0f7pC3eDWtpzKEQIAAIyYacJ7kyPUR12h73OFWuBK1UaADe0RQtaVqt6R+l6nRl008XH9Rt5wAADwsUHBntv7GepSLxnqihxGRdX/fE7BIzafgFsIAAAxwq3a9Tr/vrpQP3SlXu0KNUhgjO2CYMCVepUj1IP+zYOGHUfxhQAARAhbnMYWrNlfyEZ3E/jw4FcSVa0r9Dds3gdfDgBAyLC/5PxtfZuhL9ROghuOcYfgOXtcYAsXsTsAABBQyuqyE12hrneEepy795j/Wwa6w5Hqr+Uyda2bzBzLFwcAUEJsEtfzd/HnkryHxUwm9BNGpbq1QqopfIkAAEVgan3zJFek/sWRevHzSVwEJCzxzQK90JX6y7avA18oAEAesZn79toWv/QxFDsDQt9EzQEAgLHSYI4oS6pLXKH/l6Y5GEI7Han/6Eh1Mb0LAABGQJnUJ9nGL2TvY3R6F+h99kaKI5pP4wsHADgAu13q1KgvukItI2BgxF1iexUc15A6mi8fAGLLlKQ+2ZbgdaRKExgwZvkCbX5J4mTqXcwEABALpleZ1+5P6FN1BAFE/4ig0SYO2mRXZggAiBzl83SZ7crmSq2Y9BGHLDaUcoS+h9oCABCNbX6pzvS3OqnBjzjSNsa9rtRVZbLlH5lBACBczDSHOyJ1pSv0UiZ0xHE1KFrsSO8K+00xsQBAYPHP9/3SvGoTkzdiXhcC22zpYZoSAUCg8K/xSXWrI9UeJmvEgiYMNts6GZWzW9/CzAMAJcN2RbNJS45QGSZnxKLmCbQ6Un+/ojpzDDMRABQN23rX/gqxkxCTMWJJbw6021oatCgGgILit9+1gZ9f/IjBWwgI/ZDtlslMBQB5w5YtdYS+k8CPGI4dgRPq0m9m5gKAMeNn9Qt9k008YnJFDNNCQHl20c6tAQAYHQ3mCL85j1S7mUwRQ70Q2OkKdT0tiQFgWMqkd54j9VomT8RILQQ2OTXqImY4AHgVFcKb7kpdw2SJGOkcgbnlIvU2ZjwASLhzPccR+reuVANMkIixqCrY4wj14DThvYkZECCGzGg0r7HV+57vS87EiBjHREGpbiU/ACBO5/xCn+tItYFJEBFdqVe51eosZkaACGPP/mybUSY8RBwqP6CitmkqMyVA9Lb7v+MI3c1Eh4iHyA/ocqW+w14FZuYECPt2f3XqdEfoRiY3RByFa1yh38MMChBC3Kpdr/ObhEjVz2SGiGNIEuyz/QUm1Ta9gRkVICzBv1qd5Uq9mUkMEfNwLLDNFghjZgUIMJWzW9/iSv2IK9QgExci5tkq2wqcmRYgaGf9Ql/qSLWHSQoRC7YbIHSzU+N9gRkXIAjb/XM9x17fYXJCxOItBNTjFVJNYQYGKFXwF97ltpoXExIiFj83QLW6Qn2amRigmIHfZvgL/RCTECIG4LbArOMaUkczMwMUmPIa/W4y/BExYLkB28tkyz8yQwMUAmMOs407HKl6mXAQMYh1Axyp76K5EEAemVKXrnCkfoJJBhFDsBBYRk8BgDzgiNSVjlAtTCyIGKJbAhlX6M8xgwOMgWnCe5NNrmEyQcQQ5wb8lgRBgFFQJvVJjlQbmEAQMQJuLpctpzCzAwxDudQf87fPmDQQMTKqNnucyQwPMBRVZoLfvY86/ogYzeTAQVu/JNFgjmDCB3ieKXP2vtURah6TBCJGv4KgfmJqffMkZn4g+Et1piP0DiYGRIzRkcBup9p7HxEAYovtquVI3cVkgIgx3AnocWrUF4kEECumiS1HulL/mkkAEckNULNsfxMiA0Se8nm6zJFqJR8+IuKLRwIrKqtTk4kQEFnc2pZTXaF28rEjIr7ySEDtKatOnU6kgMhRJr3zuN+PiDhMvYAadRERA6Lzyz+Zus4RKsfHjYg4bE6A7Sp4M5EDwo3fwlffxUeNiDjahYB+yM6hBBIIHTbT35HqMT5kRMQxW1XZsOMoIgqEaMs/c6ytdsXHi4g47p2ApbZaKpEFAk9FdfMJrlCb+HAREfN0Q0Dorc489XYiDAT4l7/3XldqxQeLiJj3RUBzRa2eQaSBwOFIfbYjVZYPFRGxYMcB7U5Sn0PEgcBQJvSljtDdfKCIiAW3s1x4FxB5oPS//IX+vL23ykeJiFi0qoG9rvAuJwJBCYO/+por1CAfJCJisXMCVK68Rn2KSATFT/iT+pt8hIiIJS0d3O8KdQMRCYq57X8nHx4iYiBKBw86Qt1GZIJiZPtT2hcRMXgLgZlEKCjkL/97+NAQEQN7JPAAkQryf+Yv9H18XIiIgS8YdDcRC/jlj4gYz0XAt4hckIdf/up7fFCIiOGyXKrbiWAw9uCf1F/nQ0JEDOntgBr1RSIZjGHbX93GR4SIGO46ARQLgtFe9buaCn+IiNGoGGj7tRDZYFjKpb6M2v6IiBFaBEjV69Soi4hwcPBf/jX6I3T1Q0SMpJ1utTqLSAdDJPx577W9pvlIEBEjexyQqajVM4h48CIVtU1TXaFTfCCIiJFXu8nUNCIfJNxk5lhXqGf4KBARY3NFcFNFdeYYImCMmV5lXutKNZ8PAhExbomBeuE0seVIImEcMeYwV6hZfAiIiLFdBPzRxgICYty2/mnug4jIIkDqu4iIsQr+6npefEREtEXfyoR3DZExDnf9pT7bFoXgxUdExBerBUrvPCJklK/7CW+6I1UrLzwiIr6iWmDWrWl+J5EyisFfqimuUDt50RERceidAL2jsjo1mYgZISobdhzlSLWSFxwREQ+tWs71wGid+/+GlxoREUeYGPgrImcUgr/QN/FCIyLiKBcBNxBBw3zdL+m915G6h5cZERFHmQ/QXV6j300kDSFlddmJNqGDFxkREce4C7Bzypy9byWihokqM8GRqpYXGBERx5kUWG9jCoE1NEl/6ke8tIiImJ+dAH0fkTUM5/41+uO2tCMvLSIi5ukoYNARqSuJsEE+95f6JL+aEy8sIiLm9yigzVaTJdIGkGnCe5Mr1DO8pIiIWJCbAVJtOK4hdTQRN2hb/0LN4gVFRMTCLgL0b4i4gSr2k7qSFxMREYtheY36FJE3EMHfcx2hWngpERGxSEcBrVPq0hVE4FIy0xzuCrWAFxIREYt8FLCQ+gAlpFyof+VFRETEEnkHkbgEVNTqGY5UvbyAiIhYkl0AoXK25wwRuYhMqm16A1f+EBGx9IsAvZWrgcVM/JP6N7x4iIgYCIV6mMhclPv+3uW8cIiIGKirgVJfRoQuZPCf6zmuUB4vGyIiBkxdIdUUInXB7vyrx3nJEBExmEcBuppIXZhSv5/mBUNExECb1J8lYucz+CczxzpCN/NyISJiwBMCvan1zZOI3PlaAEj1O14sREQMSX2Ax4nc+Tj3T+pzXKEGeakQETE8i4DUlUTwcTBlzt7XO1I/y8uEiIghKxDUXFGdOYZIPuasf/0TXiRERKRAUKyy/vV7XKn6eYkQETGcqoGyZOoDRPTR0GCOcKVexcuDiIghTwhcN6PRvIbAPuJa/+o7vDiIiBiRfIA7iewjoFyk3uYI3c1Lg4iIEbFzcnW6kgg//J3/ObwsiIgYMf9MhD/kr3/vAl4SRESMpqkLifRDML3KvNYV6hleEEREjGQugFQbSQgcMvHP+zYvCCIiRtlyqW4n4h947j/Xc1yh23k5EBEx4rsAWZoF0ewHERHj6SNEfr/ZT+pdtloSLwQiIsZD1e/WNL+TX/9C1fEyICJizBYB82Md/MuS6hJeAkRE5FpgzOr92ysRvACIiBjLhECh1iWqzIQ4tvq9iRcAERHjfS0wdW2sgn9lw46jXKF28fARETHmuQDPTRNbjoxR4p/+Bg8dEcfiCbWe+fCitLliRcbcuCpr7ljfbu5c327ue6bD3L+5w3x3Y4f/v7+6ps189qmMOX9Jq3lnvcfYYZBrA3w1FsF/4uP6ja7QKR46Ig7nBxam/UD+6x1dZomXM/u6B8ygGRutuUGzqrXP/GF3t79AuHBpq6lMMsYYCJWNjXE4+7+Hh42IQ/mOOs//VT9rZ7d5rrPfFJpMbtCI5l7z7fXt5swFLTwDLOVRwL9FOvhPmbP3ra5UbTxoRHzBt8/zzNfWtpnlLTnTN2hKxsCgMStacubbG9r9hQjPBot8IyBTUZ05Jsolfx/gQSOi9eJlreb3u7pNeymj/kHo6h80VXt6zEVLWyP9DKbW2ix03sXg5ALo70ez6E9ddiK//hHjfuVJmy+uypp12T4TFmzugU0mjNqzuLYxa6qbengvg5UMmI3kLoAr1P08YMT4+pmVGbMmE57A/0oWezk/cTDsz+GsRWlTr3r9P5O9OcG7GbhdgLuiFfyTmWP59Y8Y38C/OsSB/5V5An/a3W1mhDBh8IwFLX5y5QsnLvbP8r4GEh/JBSh05r/U9/JgEePlafNbzP/t7TFRpLN/0PxwS6c5PgTXCE+u88zPnu30/5sPxCY88p4GVKFmRiL4TxPemxypWnmoiPHxy0+3Ga93wEQdu7Nht9SD+AxOnOeZuzd1mJaDPIdvrW/nXQ1uLkD6uIbU0VG49/8tHihiPLRb43XPny/HBXtjwF4dLA/QL/4fbO445AKsrW/Q///xzgZ5FyD1LyH/9b/lSEfofTxMxOhrS/OqngETVxaoXnP6/NKdqdsjlx9v7TTp3PDXKh/e3sU7G/hcAL3dds0N89n/zTzIcGvLsFZQLhWH8V83tJsAXucvOnu6B/zeA8Uce9sXwdZT6O4f2QOwz+m9JP+F5SjgqnBG/yozwRV6Cw8xvJ67OG3snPKLbfxawKF9W61nqvZ0E/kPwBY2uqYxW9Bxt4vyqxuz/nHLwCgXXn/dy93/EC0AVob07D91JQ8w3C7UOX/CsPPLl1a3MSb4Mk+p98zfW/uI+ENgF84zN+b/jv27G1rMj7Z0mt1dYztqsd9y1KsbRq54lkh9KIyFf5bx8MKrrXz2ymtPxd7axGBf8QtTNb9S8bud3eNODrS9Ev756Tb/137/OI9ZqPwXyl2A2aEK/hW1egYPLtwubcm9avLY1dVPX3X0E92eae8nuo+Qx3aNfhFg6wvYYwS7Xd/Rn5/kityAMR9cmOYdDl9NgMHJ1d47QrT9r/6HBxdeL1jSeshyqMeTFBhbbTW5zQT/UfOH3cMvAuyRyi2r28xf9vaYbC7/GZW/3kEuT4gXAQ+HIviXz9NljlS9PLTwOlz1NiaSeHpqvWe2dhD8x8pvX3EcUJnU5pJlreb+zR3+jlshb1FkcoP+8+M9Du2VwO6p9c2TQnD2r+/jgYV7ks+NIL/o21QRi5W2beyyIY6FYHTM2tVtvr+pw8xL9frFeIrFdzfS9IfywEUo/ONKrXhY4dWWBx1pUxTb1pUxi4f2HBvCycp0jloekVgA6JSNsUEu+/t5HlS4XTGKX3m28MjlKzKMW8R9cEsnUTSk2DLFHyLxL0KqzwR5+38pDyi8vqehZdRFRWzZ0Q8vYoKJqjesyhoK/IWXf9vAUV20rgTqhQH99d98Gg8o3H5zXfuYJpndXf3mzAWUFo2atrFPOkf4DytLvFxgGhRhHq1tOTWIhX8e5uGE2zlNY+/dvqmtz0wnyzg61cekNvNj1tUvSuztHihpYyIsaC7AQ4EK/rZvsSNVlocTXm2SUMs4+7fbXxzT5rEIiII2axzCic3NodxvlK8Eqsyk2qY3BGf7v0Z9kQcTbi9c2pqXycf2D7ANYhjT8Hr24vSIO8tB8PjK0/TtiP4OXera4Gz/S7WchxLP8/+hsH3RT2ARENqtf3ttDMLJL7dTpItkwCJSJvVJtlYxDyXczsrzPW/buMQWj2Fsw+WXnm4jioaUP+7uzmvS38XLWrnhE9yiQINuMjUtCHX/f8gDCb9PZ/Lf2Y2dgHBpj27sjQ4IHzaBtzJPxX7OXZw2c5t6/J0gbhEEehfg3tJG/wZzhCP0Ph5G+BMAewYKc+Zb09xD8yAK/kAIgv9VT2b8EsV2JrBViu1CgO8iyAsAtSdRZSaUbvtf6Et5EOH3vQ0tBZ2g7CKAnYBga+s4dJD4F8rgP54Ftv0ub13TZtZlX74D+B/byCUIh6kLS5j8p6t4AOH3E09mCj5RLfJy5iSuCAbW/36ui2gaMmyQHmuN/48uazW/29ltWoco9GSPgd7OtxqWXYDHShL8Jz6u3+hI3cVDCL9fW1ucxC+bZ/AuipMETtuHnl//4cFuz9tbO2O53mmPeTa3HzzPw74Fn1lJf48QFQXqsHV4SrD9713DA4iGP91avLPfZzv6zfsaWAQEyR9spuhPWMjmBkccoO3RwGXLW83Pn+00W9pHltxpd4L4JsJmCRoEOVLVMvDR8NGdxW31uq97wJxDglEgtFc1m7oHiKwh4Ml0zrz/iZZDJvPaxD3bAKg21Wva+gZHvThn6z+UC4A5RQ3+k2qb/sEVqo+Bj0gPgH09RZ/MbJOZjy2nXGmpvW0t9/7DsOX/4ObOl2X622D/wYVpv1uj/YW/2MuZ9r7Bcf07LlnG9xjS0sC5srrsxGL++v8qAx8dbYJeKejsHzQ3raJsaSldm+0jwgZ8y//eZzrM7Wvb/aO6/9vb4z+zrjznbPxkayffQ4gtk/qWYmb/L2HQo+O6EgYBO439eGsnBUdKoK3yBmB3Dyqp1RH2Y4D5RQn+ldWpya5UAwx4dNzWUfrqb9VNPZw/FtmfbKXwT9xRPQPmjAUk5UZgAdBvj+YL/+tf6H9msKNlUMq/bmjrO2SSE+bXkWaGQ3RzC65YwZW/CC0CbixG57/5DHS0DFIWuP1FQnJg4T1/SSsRMObc80wH30KkkgG1LOzd/7rsRLL/o6fXG6xrYLYvgU164tkUzp9vY/s/zvx1bw95NxG8DVBRnTmmcL/+k6nrGOjomc4FswrcX/b2UD64QNrjFognja19fudHvoMolgbWVxey9e/fGOTomeoJbiEYW5zkgiUcCeTT6fWeGaDybyzZ3TVgTqccd5T9c0GC/zSx5UhX6HYGmCTAUhwJzNzIeWW+vKYxSySMIbZQ0PkspqPeG6DdxupC/Pr/KAMcTbd2hCMb3FYsPLmOrcvxarvIQbzIDRjzuaeyvP+xKArknVeI6n+/ZHCj6ZpMeM6Dn+vsN5dyS2BcPtWaIyLGCHvc86WnqbgZI///Qlz/e46BjabzVW+oJjRbBfXh7V0kMo3BafM8/9cgxIdvb+BGTcwSAbflefu/+TQGNrpW7ekO5cRmdwOufJJCJqPxoqXc/48TD26hxn8cnZLUJ+ez9v8dDGp0tb+mw4rdDXhkR5f/y5ZnOby3rKb7X1z41fYu3vn41gS4LY/lf1Udgxpdv7exI/STne1ncDllTYf1gc0dREaCP0bfmvw0/2nYcZQjdRcDGl2/EJFrYTbZ6dGd3ebUenYDDuafdncTHQn+GP3rgB15uQ5YLrwLGNBoe1bE2sK25vbXDaDF6at9Ms0NgCjz6x0Ef3wxGfDsfFz/+xGDGW2PT2q/M1jUWJvtM5dxZfBlNvdwBSCq/Ps2gj++bBfgvny0/32awYy+GyNaG96ua+Y29Zj3NlD+1DZ/oQRwNN/x++jsh6/aAVArx9n8J3OsK9UAg8nZcNixZVDvfaYj1rcFTpznES0jht25+xqdM3FI1UDl7Na3jH0BUKM/ziDGw+9saI/FhKl7B8z9mztiWUTINoGB6NA7MGhuWkWFPzzkLsDF47n//1MGMR5+dFm8CsTYBkj2l1OcEgU/sDBN1IwImdyg+QRFsHD4egAPjuf8/+8MYjy0gdBOKnFjV1e/uXN9PBYCtq0yROOdPXtxmnkLR3IMsGKM7X+9N7lS9TOA8THZ3BvbSdUmQdqGKcdHeCHw8eUZomfI+Xtrn3+Uw3yFI7sJoPomPq7fSPtfHNZ/i0kewHBHA3dt6ohk2+FPrWQBEGZqmnsoeY2jv/2T9M4fS/nf+xm8ePlBzohfJJsbNP+xrcu8O0LXB+2ZMYST5S05U0FhKxxTHoC+eywLgAUMXvxcl+1jtj0A2zr3z3t6/PPzsD9bWxQJwomtZcH8hGO8CVA7uug/0xzuSJVl8OKnbR8KQ2MrC9oSw2HtNXDxMhYALAAwhjcBMjamj+L8v/k0Bo6+ADA0Xf2D/q6A3VIv5xYAsADAgFshvOkjXwDUqC8yaPF1JQ1jRsz2zn6/xW4YcgU+spjFHQsAjOltgOtH0QBI/4ZBi6+2QA6MDltj3x4R/HRrp/mnhWl2d4AFAAbJR0azAFjLgMXXt8/zTFsfXWPGw5pMn78z8OFFwVkMvKeBUsAsADCeOwD66REF/8qGHUfZ4gEMWry1fcUhP2xp7zcPPdtprliRMVNrS/dMT6j1DMs6FgAYy0TAnI3tI+gA6L2XAUN7pp2jdXxBEggXeTn/qOAzKzNFrzyYzbEECCOP72MBgONzilRnjmT7/2YGC61Ve7qZeQuMDci1qV7zvY0dfkOmEwrcpfDZjn4GPYTYWyfMSTjORMAbRlIA6FcMFlrPXpQ2pAIUFzve67N95o+7u/0WzR9b3prX8q/zUr0Mcgj5w+5u5iQc7zHAL0awA6BWMlj4gnbigdIvCp5p7zf/t7fH/Hhrp/nqmja/qt9YmsLYXAQIH4/uZAGA404EXHro6F9lJjhSdzFYeGAuQHc/2wBBpaN/0Gxo6zOyudf8anuXX6nQLhCubsz6lf/e/0T6ZY2Nbl7dxqCFkP/c0cV8hONdALQfsiJgWY06kYHCV/pzfjWGHpvQmeoZ8HvJQ/h4eDsLAMxDRcDapqmHOP/3LmeQ8JXaM+idnQQOgFJhj26Yi3C8liXVJQddAJQL9a8MEg6l3VIGgNLwwy0sADAv3nGIJkDqfxggPJh/29fDTAxQAv5tQztzEOZB9buDHwFIvZoBwoM5vd4ze7qpDgRQbP5lTRtzEI7/KqBUK4eO/jPN4dwAwOG0LXAHuBQAUFS+0Jhl/sH83AQw5rBXxX+bHcgA4Uj8xTb6BAAUk8tXZJh7ME8FgTz31QmASe98BgdHdJUkqc18RUU5gGJx9uI0cw/m6RhAnz3EDQD9JQYHR+op9Z7ZwdVAgKJwxoIW5h3MVyLgjUPdAPgxA4Oj8UML00b3khQIUGjeVuAmURirBcAPhloAPM7AxM/xtqO1zWq6KBUMUDDa+waZqzCf/nmoBcB6BiZ+2vawX1yVNeXj+GfYDOUcGwEABWFLez9zFebT1S+P/sYc5krdycDEzxcCd2Nrn/ncU2O/anRNY9b0cD8QIO8s8nLMVZjPI4C2l8X/yWLfcQxKPM3mXh6012T6zI2rsn6m/2j/WXYBQedAgPxStYdWwJjnm1zVmWNeXABMkepMBiWeNvcMvXff1D1gfrq107xrlD3nbU4AiYEA+eNnNALCvNcCaD7tpSuAUl/GoMTT7cNc5esdGDSiudfctKptxJnI9nbAdq4IAuSFb62nDwDmvSTwxS/1AEh6X2FQ4un6bN+IJyKbjTy3qcd8c127eW/DoXcG3lnvmSc0xYIAxsu1lAHGPGvr/hx4A+BBBiWeLmvJjXlieq6z38zZ12PufabDfHplxrz/ifTLrhXaPIIfbek0pAUAjJ0LlrQyV2GeewKo+2kDjKZqT35b/Npgv7d7wKzN9vmLC7sLsKuL4wCAsWDXzifNowgQ5v0mwO9fOgIQqoEBiac20Q8Agsm+7gHmKSzEAqD+pR0AqTYyIPH09rXtzLIAAWUxNQCwILcA1LoDjwBaGJR4+sknM8yyAAFl1k5qAGAhcgB0yg/+MxrNa1yhBhmUePq+hhZmWYCActemDuYpLMQRwECiwRyRcOd6DoMRbyncAxBMruYKIBbIqfXNkxJlQp3BYMTb+Yr7+gBB5IML08xRWLhqgOXCu4DB4CYAAAQL22a7Msn8hIWxTOhzE+U16lMMRry1nfwAIFjYDp3MT1iwHYBk6hMJR+qbGYx4axv+UKwPIFhwAwALnAh4Y8IR+lsMBD6d6WPGBQgQtucGcxMW8CrgNxKuVD9gMPAn5AEABIqLltIDAAuZBKjvsWWAH2Yw0E42ABAMcgPGnFBLDwAsaDXAX9gjgD8wGFgutWnqph4AQBBYlyUBEAu8AJDqMXsEMIfBQOvvd3Uz8wIEgD/tJgEQC74AmG0XAPUMBlovW84xAEAQIAEQi7AAqE24Qi9lMPAFt7T3M/sClJizF1EBEAueBLgo4Uq9msHAF7x7UwezL0AJaekd8HNymI+wwAuARrsA2Mxg4AueNr/F9A5QFgigVMjmXuYiLMYRwEZ7DXAXg4EH+vi+HmZhgBJxNy2AsTg7ADvsDoBiMPBAz1mcNmwCAJSGS5ZRAAiLsgBoTjhSpRkMfKW1KVoEAxQb2wFwai3zDxajFLDy7DXANgYDX+nFy7gSCFBsFnk55h8sVg5Aqz0C6GQwcCif0OwCABSTe5/h/B+L1gyo3bYD7mEwcCg/sjht+sgFACga5y3h/B+LtQOgu+wtgD4GAw/mozspDwxQDGwvDu7/YxGbAeXsAmCQwcCDeUq95xcmAYDC8kfq/2NRVQMsAHBYv7OhndkZoMDcsrqN+QaLvgDgCAAPaWVSm6dac8zQAAWif9D4u23MN1jUIwCSAHEkfnBh2rSTEQhQEOwCm3kGi58EyDVAHKHfWMdRAEAhuI/rf1iKa4AUAsLRWN1EnwCAfHMW7X+xFIWAKAWMo+0WuKurnxkbIE9sbOtjbsFSlQKmGRCOzrMXp00b+QAAeeFHWzqZV7A0zYBoB4xj8erGrJ+5DADjw3bfZE7BEiwA/HbAmxkMHIsPbu5k9gYYB9s6+plLsFQ5ABvtAmA1g4Fj9Vfbu5jFAcbIz59l+x9LtgPQmHCFXspg4Fi1tcv/Zxf9AgDGwoVLaf6DJVsALLLXAOsZDGQRAFBcnmln+x9LegRQaxcAcxgMzEe54L/spUYAwEj5/iaK/2BJFwCzE47Qf2AwMF87AT/dSmIgwHDYW7RnLGhh3sBSLgAes4WAfslgYD79+rp2Q5kAgINTp3qZK7DUvQB+busA3M9gYL69pjFL8yCAg3AzrX+x9EmAd9trgHcwGFgI3/9E2qxq7WO2BziA1tygOaGW1r9YYpP66zYH4CYGAwulnej++7kuw14AwH4e3dnN3IBB6AVwfaJMqk8yGFhob1iVNV7vALM/xJ7zl3D3H4OQA+BdkShPeuczGFgMp9d75r+e6zIDbAdATFnRkmMuwEBYJvS5ibLq1OkMBhbTi5a2mjUZcgMgfnyJ5D8MirUtpyYqpJrCYGCxPT6pzbc3tJt93RwLQDxo7hnw33u+fwyCk2qb/iGRaDBHuFINMCBYCqfWanPn+nbTxEIAIs5PttL4B4Oi6k9UmQkJiyu1ZkCwlL6t1jP/uqHdbG7vJ1JA5LAlMc6k8h8GpwZAc+IFHKk2MCgYpByBx3Z1m85+sgUhGvxtXw/fNgbJNS8uAFyhFjAgGMRbA7evbTeiudd0sBiAEPOx5Vz9w0DVAKh7aQdAqP9hUDDoBYVuWtXGEQGEjmVc/cPgLQBmvbQDINUDDArmo/RvZTJ/Ad8eBdjGQr/d2W3WZvtoMASh5HNPZZkfMGBFgPS9BywA9JcZFByvv9ze5TcAatC9fsGfuzd1mC8/3eY3PvnMyozv5SsyfmD/+PL9//uW1W3ma2vbzP2bO8ysXd3+3/tsRz/BHiKBXbgyN2AAFwA3v7gAKJf6YwwK5iN5DwBe4hYK/2AgbwGoj764ACgT6gwGBfPhtg7O6AEsz3X25+1IDDHvVQBfXADUZScyKJgPf/ZsJzM/gDHmm+vamRMwmEnVdek3Jw7ElbqTgcHxetaiNK1/Ifbs6R7wE1mZEzB45/8qm3gljlDrGBzMhwt1jggAsebr/PrH4Lrq1QsAqWYzMJgPr23MEgEgttg8GJr+YICtGmoB8CMGBvNhOcmAEGNo+YsBLwJ0/6sWAGVS38LgYL68a1MHkQBix7psn78AZg7AAC8AbnjVAqA86Z3P4GC+tN39aPELcePqRqr+YeCLAJ39qgVARW3TVAYH8+n3NrILAPFhZZqa/xiGIkCe+6oFQGKmOdyRuosBwnzuAuxjFwBigL36astc891jsLf/dXvCmMMSQ2GvBzBImE/vXN9OdIDIM3tfD987hqEE8JOJg+FI9RiDhPm0IqnN6kwfEQIiS1f/oHlfQwvfO4ZgAaB/e6gFwHcYJMy3H13WagYoDwgR5cHNnXznGBa/edAFgFujP84AYSH8/a5uIgVEjp2d/X6uC984hqQM8MUHXQCU1agTGSQshKfWe0b1kBAI0eLGVVz7wxAdydY2TT3oAiBRZSbQFAgL5WefytAoCCLDYo9rfxiyGwAzzeGJQ+FKtYLBwkL5m+e6iBwQenoHBs3Zi9N80ximAkCLE8PhCvUwg4WF0rZI3dDGrQAINz/aQuIfhm4B8PNhFwCO0DcxWFhIz16UNm19HAZAOHmmvd9MreU7xtD1ALh+2AVAeY1+N4OFxcgHYA0AYcNeZ/34cir+YfgsE+qMYRcA08SWIx2hcgwY0isA4OXYHBa+XQzh9b9eG9sTI8GVeg2DhsXw0Z3UB4BwsLtrwJw0jzv/GEpXJ0aKK/WvGTAsVqngv+ztIbpA4Pn8U9z5x9Ce/z888gWAUDcwaFgsK5Pab6YCEFRsJUu+VQyr5TJ17cgXALUtpzJoWEyPT2pT08wiAILHsx395kS2/jHETknqk0e8ALDVghyhMgwcFnsngJwACBL2psqly1v5PjHMCYCtw1YAHKIiYD2Dh6Vw5sYOugdCIPjB5g6+SQz3AkBomRgtjtT3MnhYKr/ydJvpYRUAJWR5S85PUuV7xJBXALxr9AuAGnURg4el9JzFabO5vZ9IBEUnmxs073+ihe8Qw18ASHrnjXoBMPFx/UZXqD4GEEupvXf9f1wThCJzy+o2vj+MwPa/yk2qbXpDYiw4Uj3FIGIQvHVNm2npHSAyQcH59Q6q/WFk7v8vS4wVR+ifMIgYFE+p98xju7oNmQFQKJ5qzflXUvneMBqqB8a8ACiX+jIGEIPmVU9mzCZaCkOeae4ZMGcs4NwfI3UE8NExLwDcZOZYV6oBBhKDV9lK++e0tkgLwHix9/2vWEGXP4zUr//+ytmtb0mMB1fqVQwkBrl40NfWtpst3BaAcWA7U/I9YcR+/T+ZGC+OUA8ymBgGr3wyY+Y09ZgcuYIwCv66t4fvB6N4///ecS8A7B1CBhPDpD3HtdUEl7XkTD8Zg3AIVqZz5m211PnHSN4A+PC4FwCVDTuOcqTuYkAxjJ42v8Xcvrbd3xnY283WALzEjs5+//3gO8HoBX/dMU1sOTKRDxyh5jGoGAXf3dBibl7dZh7e3mVkc69Zn+0z7X1sE8SNdG7QnLUozTeBUV0AzE3kC1fqbzKoGGXfWe/5AeGipa3+NcMvrW4zmsJDkaR3YNBcTsY/Rvr8X301fwuA2pZTGVSMi3YhwK2CaGL3er66hjK/GG3LpD4pkU8cobczsBh1r/97liOBCPMA7X0x+tn/zybyjSPUvzO4GFVt+ddfbOuizHCEeYQa/xiL+//6J3lfALjJ1P/H4GIUfV9Di38dDKLLn3Z3+9Ujed8x8guAGv2RvC8A7JUCV6o2Bhij5I2rsiaT43d/lLHtpCto8IPxSP7LTq8yr00UAkeqvzLIGAXfUbe/syBEm2RzL939ME7X//43USjKZepaBhnD7uefypp9FAWKPIu8nDmBKn8Yr/P/zxdsAWA7CzlS9TLQGEZPrfdM1Z4eImMMWOLlzLR5BH+M1fZ/b0V15phEIaEqIIZNm/x121oK+8SF+aqX4I9x3P6vThQaR+qbGWwMU1GfxR4Z/nHB9nzgzB9jaTJ1XcEXAFPrmye5UvUz4BhkbZOX3+7sNtT0iddVv0qCP8by17/qmzJn71sTxcCReiGDjkF0aq32WwFnudoXKx7d2c1VP4xx8p+alygWbtL7CoOOQavk9/V17WYP2f2x4+fbOvkGMO7Z/zcVbQEwWew7zm45MPAYhMB/+9p2s7OT5j1xo3/QmO9tpLY/kv1fVpedmCgmjtCSwcdS+bZaz3xzXbt5jsAfSzr6B811f8/yLSALAKEeTxQbR+qrGXwsRXLf/Zs7TBNb/bGluWfAXLS0le8B0V5zrlGfKvoCYFJt0xtcoTt4AFgM7YRvS/d295PcF2fWZ/vMuxta+CYQ99/977CxOFEKHKn/xEPAQm7z37K6zS/pCvCE7jUn11HgB/GA63+zEqXCkepiHgLmO6nP1ur/854e084lfjDG2LfgV9u7uOOP+Mrt/6R3fskWAIkqM8GVajcPAsejndivejLj3+X2KNcLB9DWN2huWEWyH+KrVbttDE6UEleqB3gQOFrfPs/zs7jtuT41+uFg5/0fWpjme0Ec+u7/3YlSU1ajTnSFGuSB4HDn+Z98MmN+9mynWZnOUaIXDskfd3f77wzfDuKQZ/+D5SL1tkQQcIVeykPBA33/Ey1+Ap89u13RkjM9A0R8GJ6u/kHztbXtfEOIh14ANCSCgivUDTyUYHhikdugnj6/xVz5ZMZ8a327+a/nuvyMfbb0YSxsaOsz5y5myx9x2O3/Gu8LgVkAHNeQOtqRKsuDKb1nLGgxVXt6TGNrn7+N+sMtneYb69r98/ZLl7f69+nPXpQ2H1i43xkLWswp9Z7vmQtaXvzrFyxpNZctbzXXNGbNrWva/AY7P93a6Xdcs0F+a0c/d/IhL9jX6N+3dfmNnPiGEYct/ds6Zc7e1yeChCPVf/BwgqPdfk/TEQ8Czq6ufvOJJzN8s4gjL/7zs0TQqBDedJIBg6Xdnk829xJlIHDYpam9AXLSPBL9EEd191+2nJIIIo7Ui3lAwfOfn24zqR7O5SEY7OseMJ99il/9iKFO/hviNsDneEjB9B11np+kx7E9lAp79dO+g5TzRRzjr/9SNP4ZKdPEliNdqRUPKrhesqzVL7ACUEyeTOfMeUvo4Ic4jsI/zdOrzGsTQcZWJ+JhBduKpDa3rW3juh4UnNbcoH+DpII6/ojj3f6fmQg6FVJNcaTq5YEFX5uAZa/29VKkB/KMfaX+srfHnDaf1r2I47/6p3sqq1OTE2HAler3PLTw+E8L06Y2xW0ByA8LVK9fR4JvCzFv2///nQgLU6Q6k4cWPj+2vNUs8XJEMBgTqzN9fr8HviXE/FpWnTo9ESa4EhheP7MyY9aSKAgjxFaFtIWnyvl2EAugmp8IG470ruDBhbnYhDY3r27z67MDDMWe7gFz+9p2U0mCH2Lhfv0LfWnoFgCJmeZwR6oNPMBo7AjY3gIAluc6+/3M/mlU8UMsdN3/jTaWJsIIXQKj5adXZsgRiDEr0zlz/d+zXOlDLNYCIEhd/0bLjEbzGleoXTzIaHnh0la/jjvdAONxna9O9ZrLV5Dch1jks//dgS/8M4LywN/gQUZT22zI1hGgoFD0aO8bNLN2dfuto3nXEUuy/X9rIuxMfFy/0ZEqzQONrifUeuYrT7eZZS05w55AuHmqNecn9p3I+T5iCe/9q5bjGlJHJ6KAI/X3eajxKSpkdwX2drMrEBayuUH/SIfiPYiB2f7/biIqnFCXfrMjVSsPNT4en9R+wtjcph5yBQJIbmB/xT7bKtru4PDOIgbm13+mcnbrWxJRwhH6Hh5uPLXXxWyhGJtM1sdaoGTYng/2Gdy5vt28ixr9iMFUqO8looZd0bALgDZx8Jvr2s28VC87A0Wgq3/Q1DT3mC8/3WZOruOXPiK//kt3I+A+HjK+oE00u3FV1lTt6eEmQR55tqPf/G5nt7lhVda8nWQ+xDD9+p+ZiCplddmJjlRZHjQO5QcWpv3taZs30M5ZwYixiyc7Znbs3v8EW/uIIb32l47sr/8DqgPO5GHjSK4W2s5yP97aaRp0r2ljQeBjR2FbR795fF+P+d7GDvORxdzTR4zGAsD7diLq2LuNjtDNPHAcjbb87LmL0+aO9e3mT7u7/W6FuRicGuzo7Ddz9vWYe57p8BdE7+AcHzGCW/86ZWvmJOKAI9RtPHTMx1XD85e0mlvXtJlHdnSZJ3Sv36gmbJsFNjt/S3u/qU31+n+Ob61vN59amTHT6wn2iDHxy4m4YOsbO0Jv56FjoRYGZy1Km2sas+auTR3mP3d0+b+ibTObXV39fsAtFj0Dg2Zf94C/Y2Hv3f95T495ePv+IG+bK9kze5rrIMY581/vmCa2HJmIE65Q1/PwsVTae/B2kXDJslbz2acyfp0Cm0R33zMd5gebO8x/bOt60d/v6vYr5dna+C/8tR9u6TT3b+4w39/U4f99VvvPuO7vWfPx5Rm/IiLX7hBx2AVAmDv+jZkqM8GVeg0vACIixtTVNhYm4oiT1OfwAiAiYkzv/X84EWccqWbzIiAiYswy//83EXcqqptPcKTu4YVARMSYJP51V8qm4xPgXwt8kJcCERFjsgC4h8j/PLYAgiP0Pl4MRESMdPCXao8tiEfkf/m1wBt4ORARMeK//j9PxH8lM83hjlQreUEQETGaqhUJYw4j4A/VLTCZ+oAr1CAvCSIiRuzK32C5SH2ISH/IowD9v7wsiIgYsQXALCL8MEyuTlc6UnfxwiAiYkTu/Le7cz2HCD+ia4H6Tl4aRESMRuKfuo3IPlIazBGO0I28OIiIGPJrfytjW+9/7H0CUu9yhMrxAiEiYkjP/fvKhDqDiE6FQEREjNedfyr+jflGQNWu1zlCb+VFQkTEkLm5smHHUUTycXUL1GdTGwAREcN059+p0R8hgudnEfBfvFSIiBiSBcDDRO48cUJd+s22gQIvFiIiBvzcf1/l7Na3ELnzugugruLlQkTEYP/69y4nYhdmETCbFwwREQPqn4nUBaJCqimu1JqXDBERg/XLX6em1jdPIlIXkHKpL+NlQ0TEIGX9lwl9KRG6GPUBpH6Elw4REYOR+Kd+QWQuElPm7H29K9QmXjxERCxp8Jdqo41JROZiLgKkOtORqpcXEBERSxP8dU9Zdep0InJJegXob/ESIiJiKSyX6nYicamYaQ53pZrPi4iIiEU+959nYxCBuJQJgXM9xxGqhRcSERGLdO6fLku2lBOBA1EgyLuClxIREYu0ALiKyBusfIDf8mIiImKBfYSIGzCOa0gd7Ui1gZcTERELlPW/dlJt0xuIuAGkrEad6AiV4UVFRMQ8b/u3usnUNCJtgCmX+mO2LCMvLCIi5kUbU+jyF5KbAULdz0uLiIh52vr/PpE1RPUBHKElLy4iIo77vn+VmUBgDdMuQDJzrCP0dl5gREQcm+q5KXP2vpWIGsakwOrU6Y7UXbzEiIg4ul/+uruiVs8gkoa6SJC+mpcZERFHZTJ1HRE0GkmBv+KFRkTEEZ77/zuRMyJME1uOdKVawYuNiIiHvvKnl06vMq8lckaIyurUZJvQwQuOiIgHOfffPrW+eRIRM4JMrvbeYbs48aIjIuIrtv0zbm3LqUTKaOcDfNiRuocXHhERnw/+uTKhzyVCxmERINVnKBeMiIg2Fjg13heIjPG6Hvh9Xn5ExNgX+/kuETFuGHOYK9WjvPyIiLFN+vuDjQUExBgyo9G8xpWqng8BETFmwV/qJ+wVcSJhjDmhLv1mR6h1fBCIiHEJ/mpDRXXmGCIgJCpl0/GO0M18GIiIkf/l3zS5Ol1J5IMXsU0f/HugfCCIiFH95d9qm8QR8eBVlMmWf3SFbudDQUSMnJ3lUv0TkQ4OvggQ+lzbBpKPBRExMtv+XU5Sn0OEg2FxZepCqgUiIkakyl9SXUJkgxHjSO8KV6g+PiBExNAW+el3hfo0EQ3GcBzgXeNKNcBHhIgYMv1y7+pGIhmM4zhAf5mPCRExZMFf6H8mgsH4jwOEuo2PChExNCV+7yRyQR4XAfoePixExMBn/N9FxIJCLALu5ANDRAxs0t8DRCooZE7AHXxkiIiBC/609YUi3A6Q+hZuByAiBiPhz5HqViITFG8nQOjPUScAEbHE9/yTqeuISFCCnQD1SVtlio8QEbHYyX6q1xGpK4lEULrEQKkutnWm+SAREYuW6d9TLvVlRCAIwHGA+rArVRsfJiJioc/8dUeZ9M4j8kCQcgLe4wjVwgeKiFiwbf/WsmTqA0QcCBwVtXqGI3QzHyoiYt63/ZvKhDqDSAMBXgQ0TXWk2sgHi4iYr9K+av3k6nQlEQaCvwiozhzjCrWADxcRcdxX/eZXzm59C5EFQsP0KvNaV6pH+XgREcf6y1//1s6lRBQIH8YcZhtT7O9LzceMiDjy6n76LjuHEkgg1JQJ7xpbtIIPGxFxBAV+pL6ayAGRwanRH7FXWPjAEREPGvzTjtRnEzEgesmBwpvuCL2DDx0R8VXn/dsnV3vvIFJAZKmsTk12pVrOB4+I+GJ1v6WTapv+gQgB0afBHOFK9QAfPiKifoRMf4hfXoDQn3el7mQCQMQYbvl3u0JdTySA2FJWnTrdnn0xISBijK757bT9U4gAwCKgLjvRETrJxICIMVC4ycyxzPwAL2CLBgl9pyvVABMEIkaxuI/NfUrMNIcz4QMMtRuQVJdQLwARI3a/P+sK73JmeIDhkgPnqbc7Qq1j4kDECPzy38T9foBRcFxD6mhH6v9iAkHEEPvrSbVNb2BGBxjLboD0rnCF8phIEDFEW/6trlCfZgYHGCe2eqAjtGRiQcTgq+rduZ7DzA2QL/zWwupWR+oeJhhEDF5hH5XzW/iS5Q9QGNzallMdqdcy4SBigLb8N5YJdQYzNEChFwFVu17nCv3Q/nu1TD6IWNIs/1kk+gEUeyEgUxc6UjcxCSFiCVRlQl/KTAxQIiqkmuII9TcmI0Qs3q9+/Zep9c2TmIEBAoAj1VWu1JrJCRELd9avmxyRupIZFyBgTKpt+gd7HsdEhYh5r+Nv5xaa+AAEfDdApK4kNwAR8xT8n3Gr1VnMrAAh4YS69Jv9mwJS9TOJIeIYAn+f7d5X2bDjKGZUgBAyRaozHaEbmdAQcRSuqqjVM5hBAULOjEbzGkfoO12pO5nYEPEQ2f0djlC3JarMBGZOgAhh63OTJIiIQyb5SV01uTpdyUwJEGGcpD7HEWodEx8iOlI9NaUm9UFmRoC40GCO8JsLCZVhEkSMZfOevY7QN9G8ByCm2GpertSPcFsAMS6BX3c7Ut9L/X4A8JmS1CfbM0AmSMRIJ/nNrahtmsqMBwCvokx657lCP81kiRita30U8wGA4akyE9xk6jpXqueYOBFDvd2/3anxvsA5PwCMiulV5rU2SYiywoihU9vaH1TxA4BxYZOF7GTiSNXKxIoYZFWbLd87TXhvYuYCgLwx8XH9RhYCiMEN/BXVmWOYqQCgGAuBNBMvIoEfAGJG5ezWt7hCzXSEamEiRixq6V7Pleq7tusnMxEAlG4h0LDjKJtp7PcNZ3JGLGDZXt3kSH0XgR8AgsVMc3iZ0Je6Qi9lskbM63W+rbZ09zSx5UgmGgAINOUi9SFHqtmuVANM4Ihj3upfYBfVCWMOY1YBgFBRUd18giv0Q67UnUzoiCPqztdry3I71d77mEEAIPRMFvuOc4X6nit0ikkeccht/mZ7vm8bdDFjAEDk8KsLSnWVK1SdK9QgEz8S+HWjrbjpVu16HTMEAMSCMqlPsneY919pIhBgnIK+yvhtuGua38lMAACxxZYaLpepax2hF7ErgBFO6Bt0pH7CXpmdMmfv6/nyAQAO3BVItpT7VQaF3k7QwIgk9e3xd7qSqWl84QAAwzHTHO7K1IWOVI+5QncQSDB0JXqFmlWe9M6nFS8AwBixlQb9AkP2atT+K1IEGAxi0O+3ya12i/+4htTRfLkAAPk8IqjLTnSkvtmVar4/4RJ4sLTn+n37g776opvMHMsXCgBQBOyEu78HgZ7LzgAW9Ze+1EtsaV7u7AMAlBjbmdCR+mpX6L/sb5FKoMK8JvJl/SMooT9PIx4AgKBSZSbYXgQ289qRaiMBDMfYeW+bvatv809sASs+LACAkDElqU92hLrNlbqGGwV48PN83e4KXW239stq1Il8OQAAEWJ/KWJ9tivU/Y5UT5FIGO+zfEeqlY7U97pCfZhf+QAAMcJe1yqT3nm2CYufzU0yYbQDvtCNtjul34+CrH0AADhwQVAuvAscoe92pKp9vmY7wTOciXutjtBJu7izizxbcpo3HAAARsZMc3iF8Ka7ydR1fvMWoZ92hMoRYAPXXMc+k9WuUL+yfSUmV3vvSBhzGC8wAADkjRmN5jXlsuWU52sQPGTvhPsJZATioiXr7d/KV7Nswp5/44NWugAAUCrK5+my/fkE6lZ/t8AuDKhJMJ5reD2OVBv2l4DWd9lze7vworY+AAAEH2MO8zscJvU5rlQ3+l3h/GJFejWLgxcL7Kx2pf6zK9UP7BjZWxqO8Fy28AEAILJUVGeOcWua31mWVJeUC/0lV+j77Na2K1W9I9Q6R+hmV6qBEGbcD9j/dvtnsH8W/88k9H1lUt9i/6z2z2yrN/IGAAAAHIwqM6GyOjXZBk2nRn/EEakr/d0Eob9h77A7Qv3Ctk12pPrr/quMevHzZ+Sb/Gp2QnmOVOmX1F1DbLd3Hfj/2f/3+H/vJvvPcoRe9Pw1yb/6/y7/32nvz+tvuELd4CRTn7D/bX5gr05NZpseIPj8P1Iz7cqv4pBLAAAAAElFTkSuQmCC"
  />
);
const WhatsAppIcon = ({ ...props }) => (
  <Image
    width={56}
    src="data:image/png;base64,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"
  />
);

const TelegramIcon = ({ ...props }) => (
  <Image
    {...props}
    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOnVybCgjU1ZHSURfMV8pO30KCS5zdDF7ZmlsbDojRkZGRkZGO30KCS5zdDJ7ZmlsbDojRDJFNEYwO30KCS5zdDN7ZmlsbDojQjVDRkU0O30KPC9zdHlsZT48Zz48bGluZWFyR3JhZGllbnQgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJTVkdJRF8xXyIgeDE9IjI1NiIgeDI9IjI1NiIgeTE9IjAiIHkyPSI1MTAuMTMyMiI+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojNDFCQ0U3Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojMjJBNkRDIi8+PC9saW5lYXJHcmFkaWVudD48Y2lyY2xlIGNsYXNzPSJzdDAiIGN4PSIyNTYiIGN5PSIyNTYiIHI9IjI1NiIvPjxnPjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zODAuNiwxNDcuM2wtNDUuNywyMzAuNWMwLDAtNi40LDE2LTI0LDguM2wtMTA1LjUtODAuOUwxNjcsMjg2LjdsLTY0LjYtMjEuN2MwLDAtOS45LTMuNS0xMC45LTExLjIgICAgYy0xLTcuNywxMS4yLTExLjgsMTEuMi0xMS44bDI1Ni44LTEwMC43QzM1OS41LDE0MS4yLDM4MC42LDEzMS45LDM4MC42LDE0Ny4zeiIvPjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xOTcuMiwzNzUuMmMwLDAtMy4xLTAuMy02LjktMTIuNGMtMy44LTEyLjEtMjMuMy03Ni4xLTIzLjMtNzYuMWwxNTUuMS05OC41YzAsMCw5LTUuNCw4LjYsMCAgICBjMCwwLDEuNiwxLTMuMiw1LjRjLTQuOCw0LjUtMTIxLjgsMTA5LjctMTIxLjgsMTA5LjciLz48cGF0aCBjbGFzcz0ic3QzIiBkPSJNMjQ1LjgsMzM2LjJsLTQxLjcsMzguMWMwLDAtMy4zLDIuNS02LjgsMC45bDgtNzAuNyIvPjwvZz48L2c+PC9zdmc+"
  />
);

const NotificationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    viewBox="0 0 17 17"
  >
    <path
      id="_Icon_style"
      data-name="🎨 Icon style"
      d="M8.5,17A8.5,8.5,0,1,1,17,8.5,8.51,8.51,0,0,1,8.5,17Zm0-9.775a.851.851,0,0,0-.851.85V11.9a.85.85,0,1,0,1.7,0V8.075A.851.851,0,0,0,8.5,7.225Zm0-2.975a.85.85,0,1,0,.85.85A.851.851,0,0,0,8.5,4.25Z"
      transform="translate(0 0)"
      fill="#0bb07b"
    />
  </svg>
);

import {
  ActionIcon,
  Affix,
  Checkbox,
  CheckboxProps,
  Container,
  createStyles,
  Image,
  LoadingOverlay,
  SimpleGrid,
  Text,
  Transition,
} from "@mantine/core";
import axios from "axios";
import { getAuth } from "firebase/auth";
import {
  doc,
  DocumentReference,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useAsync } from "react-async-hook";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { BackIcon } from "./BackIcon";
import { app } from "./firebaseConfig";
import { useOnLoadImages } from "./hooks/useOnLoadImages";
import { UserProfile } from "./types";

const useStyles = createStyles((theme, _params, getRef) => ({
  ActionIcon: {
    boxShadow: theme.shadows.lg,
  },
}));

const instance = axios.create({
  baseURL: "https://api.artic.edu/api/v1",
  timeout: 10000,
});

const fetchArtworks = async () =>
  instance
    .get("artworks/search", {
      params: {
        fields: ["id", "title", "image_id"].join(",").replaceAll(" ", ""),
      },
    })
    .then(({ data }) => data.data);

export function SelectArtwork() {
  const { classes } = useStyles();

  const toggleArtwork = (index: string | number) => () => {
    const copy = [...selectedArtwork];
    const i = copy.indexOf(index);
    if (i !== -1) {
      copy.splice(i, 1);
    }
    console.log(`${index} onclick`);
    selectedArtwork.includes(index)
      ? setSelectedArtwork(copy)
      : setSelectedArtwork((e) => [...e, index]);
  };

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const imagesLoaded = useOnLoadImages(wrapperRef);
  const nav = useNavigate();

  const { loading, result } = useAsync(fetchArtworks, []);

  const auth = getAuth(app);
  const [user] = useAuthState(auth);

  const [value, docLoading, error, snapshot, reload] =
    useDocumentDataOnce<UserProfile>(
      user &&
        (doc(
          getFirestore(app),
          `users/${user.uid}`
        ) as DocumentReference<UserProfile>)
    );

  useEffect(() => {
    console.log(value);
    if (value) {
      setSelectedArtwork(value.likedArtworks);
    }
  }, [value, docLoading]);

  const [selectedArtwork, setSelectedArtwork] = React.useState<string[]>([]);

  const addToFavorite = (likedArtworks: string[]) => async () => {
    if (!snapshot) {
      console.error("there are no user snapshot");
      return;
    }

    await setDoc(
      snapshot.ref,
      // unset the gettingStartedSteps, to prevent user get directed to this page again
      { likedArtworks, skipGettingStarted: true },
      { merge: true }
    );

    nav("/home");
  };

  return (
    <Container
      style={{
        paddingTop: "10px",
        paddingLeft: 0,
        paddingRight: 0,
        position: "relative",
        height: "100%",
      }}
    >
      <Affix position={{ bottom: 30, right: 22 }}>
        <Transition mounted={true} transition="slide-left" duration={300}>
          {(transitionStyles) =>
            selectedArtwork.length > 0 ? (
              <ActionIcon
                className={classes.ActionIcon}
                // component={Link}
                // to="/home"
                onClickCapture={addToFavorite(selectedArtwork)}
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
                  style={{ transform: "rotate(90deg)" }}
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
            ) : (
              <></>
            )
          }
        </Transition>
      </Affix>
      <div
        style={{
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
          Start with your <br />
          favourite artwork
        </Text>
      </div>
      <div
        style={{
          paddingLeft: "16px",
          paddingRight: "16px",
          marginTop: "46px",
          position: "relative",
        }}
      >
        <SimpleGrid cols={2} spacing={13} ref={wrapperRef}>
          {!loading &&
            result.map(({ image_id, id, title }: any, index: any) => (
              <ArtworkCheckBox
                key={index}
                src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`}
                alt={title}
                onClick={toggleArtwork(String(id))}
                onChange={() => {}}
                checked={selectedArtwork.includes(String(id))}
              />
            ))}
        </SimpleGrid>
      </div>
      <LoadingOverlay
        visible={!imagesLoaded}
        overlayOpacity={0.6}
        overlayColor="#FFF"
        loaderProps={{ color: "#111112" }}
      />
    </Container>
  );
}
type ArtworkCheckBox = CheckboxProps & React.RefAttributes<HTMLInputElement>;
function ArtworkCheckBox({ src, alt, ...props }: ArtworkCheckBox): JSX.Element {
  const ref = React.useRef<any>();
  return (
    <div
      style={{
        position: "relative",
        width: "165px",
        height: "144px",
      }}
      onClick={() => ref?.current?.click()}
    >
      <div style={{ position: "relative" }}>
        <Image
          width={165}
          height={144}
          radius={8}
          withPlaceholder
          src={src ? src : undefined}
          alt={alt}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 165,
            height: 144,
            borderRadius: "8px",
            opacity: 0.2,
            backgroundColor: "#000",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          width: "165px",
          height: "144px",
          top: "0",
          opacity: 0,
          borderRadius: "8px",
          ...(props.checked
            ? { opacity: 0.5, backgroundColor: "#CFF8EB" }
            : {}),
        }}
      />
      <Checkbox
        radius={100}
        icon={CheckIcon}
        {...props}
        checked={props.checked || false}
        ref={ref}
        onClick={(ev) => {
          ev.stopPropagation();
          props.onClick && props.onClick(ev);
        }}
        style={{
          position: "absolute",
          right: "8px",
          top: "8px",
        }}
        styles={{
          root: {
            width: "30px",
            height: "30px",
          },
          inner: {
            width: "30px",
            height: "30px",
          },
          input: {
            border: 0,
            width: "30px",
            height: "30px",
            "&:checked": {
              background: "#CFF8EB",
            },
          },
        }}
      />
    </div>
  );
}

function CheckIcon({
  indeterminate,
  className,
}: {
  indeterminate: boolean;
  className: string;
}) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="7.143"
      viewBox="0 0 10 7.143"
    >
      <path
        id="Path_5"
        data-name="Path 5"
        d="M12.791,5.209a.714.714,0,0,1,0,1.01L7.076,11.934a.714.714,0,0,1-1.01,0L3.209,9.077a.714.714,0,1,1,1.01-1.01l2.352,2.352,5.209-5.209A.714.714,0,0,1,12.791,5.209Z"
        transform="translate(-3 -5)"
        fill="#0bb07b"
        fillRule="evenodd"
      />
    </svg>
  );
}

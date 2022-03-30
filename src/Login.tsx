import {
  ActionIcon,
  Button,
  Center,
  Container,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { Link } from "react-router-dom";
function BackIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19.214"
      height="16.828"
      viewBox="0 0 19.214 16.828"
    >
      <path
        id="Back_Icon"
        d="M13,21,6,14m0,0,7-7M6,14H22.8"
        transform="translate(-4.586 -5.586)"
        fill="none"
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </svg>
  );
}
function EyeIcon({ reveal, size }: { reveal: boolean; size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18.333"
      height="13.333"
      viewBox="0 0 18.333 13.333"
    >
      <path
        id="_Icon_style"
        data-name="🎨 Icon style"
        d="M9.166,13.333a9.023,9.023,0,0,1-5.707-1.908A11.57,11.57,0,0,1,0,6.667,11.57,11.57,0,0,1,3.459,1.908,9.023,9.023,0,0,1,9.166,0a9.023,9.023,0,0,1,5.707,1.908,11.57,11.57,0,0,1,3.459,4.759,11.57,11.57,0,0,1-3.459,4.759A9.023,9.023,0,0,1,9.166,13.333Zm0-10.834a4.167,4.167,0,1,0,4.167,4.167A4.171,4.171,0,0,0,9.166,2.5Zm0,6.667a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,9.166,9.166Z"
        fill="#0a1f44"
      />
    </svg>
  );
}

export function Login() {
  return (
    <>
      <Container style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <ActionIcon>
          <BackIcon />
        </ActionIcon>
        <Text
          style={{
            marginTop: "44px",
            fontSize: "32px",
            fontFamily: "SFProDisplay",
            fontWeight: "bold",
            color: "#000000",
            height: "38px",
            lineHeight: "34px",
          }}
        >
          Sign In
        </Text>
        <TextInput
          label="Email"
          style={{
            marginTop: "48px",
          }}
          styles={{
            label: {
              marginBottom: "6px",
              height: "17px",
              lineHeight: "20px",
              color: "#4E5D78",
              fontSize: "14px",
              fontFamily: "Inter",
              fontWeight: "normal",
            },
            input: {
              color: "#0A1F44",
              fontSize: "16px",
              fontFamily: "Inter",
              fontWeight: "lighter",
              lineHeight: "24px",
              borderColor: "#E1E4E8",
              borderRadius: "4px",
              borderWidth: "1px",
              input: {
                height: "50px",
              },
              height: "50px",
            },
          }}
        />
        <PasswordInput
          visibilityToggleIcon={EyeIcon}
          label="Password"
          style={{ marginTop: "16px" }}
          styles={{
            label: {
              marginBottom: "6px",
              height: "17px",
              lineHeight: "20px",
              color: "#4E5D78",
              fontSize: "14px",
              fontFamily: "Inter",
              fontWeight: "normal",
            },
            input: {
              color: "#0A1F44",
              fontSize: "16px",
              fontFamily: "Inter",
              fontWeight: "lighter",
              lineHeight: "24px",
              borderColor: "#E1E4E8",
              borderRadius: "4px",
              borderWidth: "1px",
              input: {
                height: "50px",
              },
              height: "50px",
            },
            visibilityToggle: {
              marginRight: "8px",
              "&:hover": { backgroundColor: "transparent" },
            },
          }}
        />
        <Text
          align="right"
          style={{
            color: "#4E5D78",
            marginTop: "16px",
            fontSize: "13px",
            fontFamily: "Inter",
            fontWeight: "normal",
            lineHeight: "20px",
            height: "16px",
          }}
        >
          Forgot Password?
        </Text>
        <Button
          fullWidth
          style={{
            fontSize: "15px",
            height: "49px",
            marginTop: "24px",
            backgroundColor: "#111112",
            fontFamily: "Inter",
            fontWeight: "bold",
            borderRadius: "4px",
          }}
          styles={{
            root: {
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
          }}
        >
          Sign In
        </Button>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            height: "19px",
            marginTop: "20px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="132"
            height="1"
            viewBox="0 0 132 1"
          >
            <path
              id="Path_1"
              data-name="Path 1"
              d="M0,0H132"
              transform="translate(0 0.5)"
              fill="#fff"
              stroke="#8a94a6"
              stroke-width="1"
            />
          </svg>
          <Text
            style={{
              marginLeft: "29px",
              marginRight: "29px",
              color: "#8A94A6",
              height: "19px",
              fontSize: "15px",
              fontFamily: "Inter",
              fontWeight: "lighter",
              lineHeight: "20px",
            }}
          >
            or
          </Text>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="132"
            height="1"
            viewBox="0 0 132 1"
          >
            <path
              id="Path_1"
              data-name="Path 1"
              d="M0,0H132"
              transform="translate(0 0.5)"
              fill="#fff"
              stroke="#8a94a6"
              stroke-width="1"
            />
          </svg>
        </span>
        <Button
          leftIcon={<GoogleIcon />}
          variant="outline"
          fullWidth
          style={{
            fontSize: "15px",
            height: "49px",
            marginTop: "24px",
            // backgroundColor: "#111112",
            fontFamily: "Inter",
            fontWeight: "bold",
            borderRadius: "4px",
            borderColor: "#111112",
            color: "#111112",
          }}
          styles={{
            root: {
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
            leftIcon: { left: "16px", position: "absolute" },
          }}
        >
          Sign In with Google
        </Button>
        <Button
          fullWidth
          style={{
            fontSize: "15px",
            height: "49px",
            marginTop: "16px",
            backgroundColor: "#B0B7C3",
            fontFamily: "Inter",
            fontWeight: "bold",
            borderRadius: "4px",
            color: "#FFF",
          }}
          styles={{
            root: {
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
          }}
        >
          Sign In with Apple
        </Button>
        <Button
          fullWidth
          style={{
            fontSize: "15px",
            height: "49px",
            marginTop: "16px",
            backgroundColor: "#B0B7C3",
            fontFamily: "Inter",
            fontWeight: "bold",
            borderRadius: "4px",
            color: "#FFF",
          }}
          styles={{
            root: {
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
          }}
        >
          Sign In with Facebook
        </Button>
        <Center style={{ display: "flex", paddingTop: "35px" }}>
          <Text
            color={"#4E5D78"}
            style={{
              fontSize: "12px",
              fontFamily: "Inter",
              fontWeight: 100,
              height: "15px",
            }}
          >
            By signing up you agree to our&nbsp;
          </Text>

          <Text
            underline
            style={{
              fontSize: "12px",
              fontFamily: "Inter",
              fontWeight: 100,
              color: "#4E5D78",
              height: "15px",
            }}
            variant="link"
            component={Link}
            to="/"
          >
            Privacy Policy and Terms
          </Text>
          <Text
            color={"#4E5D78"}
            style={{
              fontSize: "12px",
              fontFamily: "Inter",
              fontWeight: 100,
              height: "15px",
            }}
          >
            .
          </Text>
        </Center>
      </Container>
    </>
  );
}
function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="29"
      height="29"
      viewBox="0 0 29 29"
    >
      <image
        id="icons8-google-192_-xxxhdpi_"
        data-name="icons8-google-192(-xxxhdpi)"
        width="29"
        height="29"
        xlinkHref="data:image/png;base64,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"
      />
    </svg>
  );
}

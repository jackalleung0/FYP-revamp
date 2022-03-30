import { Button, Center, Container, Text } from "@mantine/core";
import { Link } from "react-router-dom";

function IphoneXIcon() {
  return (
    <svg
      id="iPhoneX"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="219"
      height="438"
      viewBox="0 0 219 438"
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="0.5"
          x2="0.5"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stop-color="#f1f2f4" />
          <stop offset="1" stop-color="#ececec" />
        </linearGradient>
      </defs>
      <path
        id="Case"
        d="M29.511,0H189.489A29.273,29.273,0,0,1,219,29.03V408.97A29.273,29.273,0,0,1,189.489,438H29.511A29.273,29.273,0,0,1,0,408.97V29.03A29.273,29.273,0,0,1,29.511,0Z"
        fill="#fff"
      />
      <path
        id="Bezel"
        d="M23.882,0H182.923A23.8,23.8,0,0,1,206.8,23.712V402.092A23.8,23.8,0,0,1,182.923,425.8H23.882A23.8,23.8,0,0,1,0,402.092V23.712A23.8,23.8,0,0,1,23.882,0Z"
        transform="translate(6.098 6.098)"
        fill="url(#linear-gradient)"
      />
      <path
        id="Screen"
        d="M163.928,401.413H18.484A18.658,18.658,0,0,1,0,382.628V18.786A18.658,18.658,0,0,1,18.484,0H38.07a3.341,3.341,0,0,1,2.544,2.556c.08.358.164.826.26,1.368.186,1.042.418,2.336.762,3.642.445,1.69,2.41,7.211,9.013,7.281,2.491.026,18.019.032,30.608.032,23.157,0,49.728-.019,50.972-.032,6.6-.069,8.568-5.59,9.013-7.281.345-1.31.576-2.6.762-3.645.1-.544.181-1.009.26-1.365A3.235,3.235,0,0,1,144.786,0h19.142a18.658,18.658,0,0,1,18.484,18.786V382.628A18.658,18.658,0,0,1,163.928,401.413Z"
        transform="translate(18.293 18.294)"
        fill="#fff"
      />
    </svg>
  );
}
function CarosuelIcon() {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <svg
        style={{ width: "10px" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="#111112"
          d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z"
        />
      </svg>
      <svg
        style={{ width: "10px" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="#f1f2f4"
          d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z"
        />
      </svg>
      <svg
        style={{ width: "10px" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="#f1f2f4"
          d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z"
        />
      </svg>
    </div>
  );
}
export function LandingPage() {
  return (
    <Container style={{ paddingLeft: "20px", paddingRight: "20px" }}>
      <Center style={{ paddingTop: "24px" }}>
        <IphoneXIcon />
      </Center>
      <Center style={{ paddingTop: "16px" }}>
        <CarosuelIcon />
      </Center>
      <Center>
        <Text
          align="center"
          style={{
            paddingTop: "30px",
            fontFamily: "Inter",
            fontWeight: "bold",
            fontSize: "26px",
            lineHeight: "30px",
          }}
        >
          Get Started by <br />
          Creating an Account
        </Text>
      </Center>
      <Button
        fullWidth
        style={{
          fontSize: "15px",
          height: "49px",
          marginTop: "24px",
          backgroundColor: "#111112",
          fontFamily: "Inter",
          fontWeight: "bold",
        }}
      >
        Sign Up
      </Button>
      <Center style={{ display: "flex", paddingTop: "30px" }}>
        <Text
          color={"#4E5D78"}
          style={{
            fontSize: "16px",
            fontFamily: "Inter",
            fontWeight: "Regular",
          }}
        >
          Already have an account?
        </Text>
        <Text
          underline
          style={{
            marginLeft: "10px",
            fontSize: "15px",
            fontFamily: "Inter",
            fontWeight: "Medium",
            color:"#0BB07B"
          }}
          variant="link"
          component={Link}
          to='/login'
        >
          Sign In
        </Text>
      </Center>
    </Container>
  );
}

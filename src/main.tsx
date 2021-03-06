import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "react-spring-bottom-sheet/dist/style.css";
import Rout from "./Routes";
import { NotificationsProvider } from "@mantine/notifications";

function Root() {
  return (
    <MantineProvider
      theme={{
        // Override any other properties from default theme
        fontFamily: "Open Sans, sans serif",
        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
        focusRing: "never",
      }}
    >
      <NotificationsProvider
        position="top-right"
        limit={1}
        style={{ marginTop: 31 }}
      >
        <Rout />
      </NotificationsProvider>
      {/* <App /> */}
    </MantineProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);

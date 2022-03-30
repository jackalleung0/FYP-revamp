import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { MantineProvider } from "@mantine/core";

function Root() {
  return (
    <MantineProvider
      theme={{
        // Override any other properties from default theme
        fontFamily: "Open Sans, sans serif",
        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
      }}
    >
      <App />
    </MantineProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);

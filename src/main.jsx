import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/reset.css";
import "./styles/general.css";
import "./styles/main-page/general.css";
import "./styles/main-page/news-block.css";
import "./styles/main-page/header.css";
import "./styles/main-page/footer.css";
import App from "./App.jsx";

import { ThemeProvider, createTheme } from "@mui/material/styles"; // Import the necessary ThemeProvider

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
);

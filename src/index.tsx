import { createGlobalStyle } from "styled-components";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
  }
`;

const container = document.getElementById("app");
const root = createRoot(container!);

root.render(
  <>
    <GlobalStyle />
    <App />
  </>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Self-hosted fonts (replaces the render-blocking Google Fonts request that used
// to live in index.html). Only the weights actually used are imported:
//   Bricolage Grotesque 600 for headings; 500/700 for the odd bold/medium.
//   Source Serif 4 400 + italic for body copy; 500 for medium emphasis.
//   IBM Plex Mono 400/500 for eyebrows, labels, and metadata.
import "@fontsource/bricolage-grotesque/500.css";
import "@fontsource/bricolage-grotesque/600.css";
import "@fontsource/bricolage-grotesque/700.css";
import "@fontsource/source-serif-4/400.css";
import "@fontsource/source-serif-4/400-italic.css";
import "@fontsource/source-serif-4/500.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

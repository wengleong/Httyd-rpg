import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Install the window.storage shim before the game component mounts.
import "./storage.js";
import HttydRpg from "./HttydRpg.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HttydRpg />
  </StrictMode>
);

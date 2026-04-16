import { focusGroupKeyUX, startKeyUX } from "keyux";
import { applySearchHighlight } from "../Search/highlight";

function initKeyUX() {
  startKeyUX(window, [focusGroupKeyUX()]);
}

initKeyUX();
applySearchHighlight();

document.addEventListener("astro:after-swap", initKeyUX);
document.addEventListener("astro:page-load", applySearchHighlight);

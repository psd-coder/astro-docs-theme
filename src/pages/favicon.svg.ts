import type { APIRoute } from "astro";
import { icon } from "virtual:theme-integration-config";
import { svgIconResponse } from "../utils/icon";

export const GET: APIRoute = () => svgIconResponse(icon.faviconPath);

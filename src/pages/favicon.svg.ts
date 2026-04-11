import type { APIRoute } from "astro";
import { faviconPath } from "virtual:theme-integration-config";
import { svgIconResponse } from "../utils/icon";

export const GET: APIRoute = () => svgIconResponse(faviconPath);

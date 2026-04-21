import type { APIRoute } from "astro";
import { meta } from "virtual:theme-integration-config";
import { svgIconResponse } from "../utils/icon";

export const GET: APIRoute = () => svgIconResponse(meta.icon.faviconPath);

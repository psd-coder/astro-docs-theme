import type { APIRoute } from "astro";
import { icon } from "virtual:theme-integration-config";
import { pngIconResponse } from "../utils/icon";

export const GET: APIRoute = () => pngIconResponse(icon.manifestIconPath, 512);

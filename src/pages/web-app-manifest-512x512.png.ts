import type { APIRoute } from "astro";
import { manifestIconPath } from "virtual:theme-integration-config";
import { pngIconResponse } from "../utils/icon";

export const GET: APIRoute = () => pngIconResponse(manifestIconPath, 512);

import type { APIRoute } from "astro";
import { meta } from "virtual:theme-integration-config";
import { icoIconResponse } from "../utils/icon";

export const GET: APIRoute = () => icoIconResponse(meta.icon.faviconPath!);

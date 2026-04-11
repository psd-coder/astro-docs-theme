import type { APIRoute } from "astro";
import { faviconPath } from "virtual:theme-integration-config";
import { icoIconResponse } from "../utils/icon";

export const GET: APIRoute = () => icoIconResponse(faviconPath!);

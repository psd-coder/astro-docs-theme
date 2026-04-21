import type { APIRoute } from "astro";
import { icon } from "virtual:theme-integration-config";
import { icoIconResponse } from "../utils/icon";

export const GET: APIRoute = () => icoIconResponse(icon.faviconPath!);

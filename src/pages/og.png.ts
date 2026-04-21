import { template } from "virtual:theme-og-template";
import { meta } from "virtual:theme-integration-config";
import { createOgImageRoute } from "../utils/ogImage";

export const GET = createOgImageRoute({ image: meta.og.image, template });

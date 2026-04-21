import { template } from "virtual:theme-twitter-template";
import { meta } from "virtual:theme-integration-config";
import { createOgImageRoute } from "../utils/ogImage";

export const GET = createOgImageRoute({ image: meta.twitter.image, template });

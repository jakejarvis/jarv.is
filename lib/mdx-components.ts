import dynamic from "next/dynamic";

// Bundle these components by default:
export { default as Image } from "../components/Image/Image";
export { default as Figure } from "../components/Figure/Figure";
// `code` is intentionally lowercase here -- replaces `<code>` tag from remark
export { default as code } from "../components/CodeBlock/CodeBlock";

// All of these components are technically passed into all posts, but next/dynamic ensures they're loaded only
// when they're referenced in the individual mdx files.
export const Video = dynamic(() => import("../components/Video/Video"));
export const Tweet = dynamic(() => import("../components/TweetEmbed/TweetEmbed"));
export const Gist = dynamic(() => import("../components/GistEmbed/GistEmbed"));
export const OctocatLink = dynamic(() => import("../components/OctocatLink/OctocatLink"));

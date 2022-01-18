import dynamic from "next/dynamic";

// Bundle these components by default:
export { default as Image } from "./Image";
export { default as Figure } from "./Figure";
// `code` is intentionally lowercase here -- replaces `<code>` tag from remark
export { default as code } from "./CodeBlock";

// All of these components are technically passed into all posts, but next/dynamic ensures they're loaded only
// when they're referenced in the individual mdx files.
export const Video = dynamic(() => import("./Video"));
export const Tweet = dynamic(() => import("./TweetEmbed"));
export const Gist = dynamic(() => import("./GistEmbed"));
export const OctocatLink = dynamic(() => import("./OctocatLink"));

import dynamic from "next/dynamic";

// Pass these by default:
export { default as Image } from "./Image";
export { default as Figure } from "./Figure";
// `code` is intentionally lowercase here -- replaces `<code>` tag from remark
export { default as code } from "../code-block/Code";

// NOTE: All of these components are technically passed into all posts, but next/dynamic ensures they're loaded only
// when they're referenced in the individual mdx files.
export const Video = dynamic(() => import("./Video"));
export const Tweet = dynamic(() => import("./Tweet"));
export const Gist = dynamic(() => import("./Gist"));
export const OctocatLink = dynamic(() => import("./OctocatLink"));

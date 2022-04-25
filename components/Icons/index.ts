// Icons from various packs, imported directly from the package's SVG files instead of their exports so they're all
// processed consistently via svgr/webpack into React components.
// NOTE: each package's path inside ./node_modules *must* be listed in svgr's webpack config in next.config.js.

// feather icons: https://feathericons.com/
export { default as ContactIcon } from "feather-icons/dist/icons/mail.svg";
export { default as DateIcon } from "feather-icons/dist/icons/calendar.svg";
export { default as EditIcon } from "feather-icons/dist/icons/edit.svg";
export { default as HomeIcon } from "feather-icons/dist/icons/home.svg";
export { default as NotesIcon } from "feather-icons/dist/icons/edit-3.svg";
export { default as ProjectsIcon } from "feather-icons/dist/icons/code.svg";
export { default as TagIcon } from "feather-icons/dist/icons/tag.svg";
export { default as ViewsIcon } from "feather-icons/dist/icons/eye.svg";

// octicons: https://primer.style/octicons/
export { default as CheckOcticon } from "@primer/octicons/build/svg/check-16.svg";
export { default as ClipboardOcticon } from "@primer/octicons/build/svg/paste-16.svg";
export { default as ForkOcticon } from "@primer/octicons/build/svg/repo-forked-16.svg";
export { default as HeartIcon } from "@primer/octicons/build/svg/heart-fill-16.svg";
export { default as MarkdownIcon } from "@primer/octicons/build/svg/markdown-16.svg";
export { default as OctocatOcticon } from "@primer/octicons/build/svg/mark-github-16.svg";
export { default as StarOcticon } from "@primer/octicons/build/svg/star-16.svg";
export { default as XOcticon } from "@primer/octicons/build/svg/x-16.svg";

// simple icons: https://simpleicons.org/
export { default as NextjsLogo } from "simple-icons/icons/nextdotjs.svg";
export { default as FathomLogo } from "simple-icons/icons/fathom.svg";

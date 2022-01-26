// Icons from various packs, imported directly from the package's SVG files instead of their exports so they're all
// processed consistently via svgr/webpack into React components.
// NOTE: each node_modules/ directory *must* be listed in svgr's webpack config in next.config.js.

// feather icons: https://feathericons.com/
export { default as ContactIcon } from "../../node_modules/feather-icons/dist/icons/mail.svg";
export { default as DateIcon } from "../../node_modules/feather-icons/dist/icons/calendar.svg";
export { default as EditIcon } from "../../node_modules/feather-icons/dist/icons/edit.svg";
export { default as HomeIcon } from "../../node_modules/feather-icons/dist/icons/home.svg";
export { default as MoonIcon } from "../../node_modules/feather-icons/dist/icons/moon.svg";
export { default as NotesIcon } from "../../node_modules/feather-icons/dist/icons/edit-3.svg";
export { default as ProjectsIcon } from "../../node_modules/feather-icons/dist/icons/code.svg";
export { default as SunIcon } from "../../node_modules/feather-icons/dist/icons/sun.svg";
export { default as TagIcon } from "../../node_modules/feather-icons/dist/icons/tag.svg";
export { default as ViewsIcon } from "../../node_modules/feather-icons/dist/icons/eye.svg";

// octicons: https://primer.style/octicons/
export { default as CheckOcticon } from "../../node_modules/@primer/octicons/build/svg/check-16.svg";
export { default as ClipboardOcticon } from "../../node_modules/@primer/octicons/build/svg/paste-16.svg";
export { default as ForkOcticon } from "../../node_modules/@primer/octicons/build/svg/repo-forked-16.svg";
export { default as OctocatOcticon } from "../../node_modules/@primer/octicons/build/svg/mark-github-16.svg";
export { default as StarOcticon } from "../../node_modules/@primer/octicons/build/svg/star-16.svg";
export { default as XOcticon } from "../../node_modules/@primer/octicons/build/svg/x-16.svg";

// emoji from Twemoji: https://twemoji.twitter.com/
export { default as HeartIcon } from "../../node_modules/twemoji/assets/svg/2764.svg";
export { default as SendIcon } from "../../node_modules/twemoji/assets/svg/1f4e4.svg";

// simple icons: https://simpleicons.org/
export { default as NextjsLogo } from "../../node_modules/simple-icons/icons/nextdotjs.svg";

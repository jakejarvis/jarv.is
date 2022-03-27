// support webfonts statically imported by webpack via custom config in next.config.js:

declare module "*.woff" {
  const content: string;
  export default content;
}

declare module "*.woff2" {
  const content: string;
  export default content;
}

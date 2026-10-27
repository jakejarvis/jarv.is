import fs from "node:fs";
import path from "node:path";

import { imageSize } from "image-size";

type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

/**
 * Adds intrinsic `width` and `height` attributes to markdown images with relative `src`s (co-located with the MDX
 * file), so the `img` MDX component can size them without layout shift. Must run before `rehype-mdx-import-media`.
 */
export const rehypeImageSize = () => (tree: HastNode, file: { path?: string }) => {
  if (!file.path) return;
  const dir = path.dirname(file.path);

  const visit = (node: HastNode) => {
    if (node.type === "element" && node.tagName === "img" && node.properties) {
      const { src, width } = node.properties;
      if (typeof src === "string" && /^\.\.?\//.test(src) && width === undefined) {
        const dimensions = imageSize(fs.readFileSync(path.resolve(dir, src)));
        node.properties.width = dimensions.width;
        node.properties.height = dimensions.height;
      }
    }
    node.children?.forEach(visit);
  };

  visit(tree);
};

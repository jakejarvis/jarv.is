import { Image as UnpicImage, type ImageProps } from "@unpic/react/base";
import {
  transform,
  type CloudflareOptions,
  type CloudflareOperations,
} from "unpic/providers/cloudflare";

const Image = (props: Omit<ImageProps<CloudflareOperations, CloudflareOptions>, "transformer">) => {
  return (
    <UnpicImage
      transformer={transform}
      options={{
        domain: "jarv.is",
      }}
      {...props}
    />
  );
};

export { Image };
export type { ImageProps };

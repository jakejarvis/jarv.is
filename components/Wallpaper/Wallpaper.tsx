import { useEffect, useRef } from "react";
import { styled } from "../../stitches.config";
import type { ComponentProps } from "react";
import type { VariantProps } from "@stitches/react";

const Wrapper = styled("main", {
  width: "100%",
  minHeight: "400px",

  variants: {
    tile: {
      true: {
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      },
    },
  },
});

export type WallpaperProps = ComponentProps<typeof Wrapper> & {
  image: string;
  tile?: boolean;
};

const Wallpaper = ({ image, tile, className, ...rest }: WallpaperProps) => {
  const bgRef = useRef<VariantProps<typeof Wrapper>>(null);

  useEffect(() => {
    // @ts-ignore
    bgRef.current.style.backgroundImage = `url(${image})`;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper
      className={className}
      tile={tile}
      // @ts-ignore
      ref={bgRef}
      {...rest}
    />
  );
};

export default Wallpaper;

import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

const Video = ({
  src,
  autoPlay,
  className,
  children,
  ...rest
}: Omit<Partial<ComponentPropsWithoutRef<"video">>, "src"> & {
  src: string | string[] | undefined;
}) => {
  return (
    <video
      {...(typeof src === "string" ? { src } : {})}
      {...(autoPlay
        ? {
            preload: "auto",
            controls: false,
            autoPlay: true,
            playsInline: true, // safari autoplay workaround
            loop: true,
            muted: true,
          }
        : {
            preload: "metadata",
            controls: true,
          })}
      crossOrigin="anonymous"
      className={cn("mx-auto block h-auto max-h-[500px] w-full", className)}
      {...rest}
    >
      {Array.isArray(src) &&
        src.map((file) => {
          const extension = file.split(".").pop();

          if (extension === "vtt") {
            return <track key={file} kind="subtitles" src={file} srcLang="en" label="English" default />;
          } else {
            return <source key={file} src={file} type={`video/${extension}`} />;
          }
        })}

      {children}
    </video>
  );
};

export default Video;

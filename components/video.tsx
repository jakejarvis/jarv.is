import { cn } from "@/lib/utils";

const Video = ({
  src,
  autoPlay,
  className,
  children,
  ...rest
}: Omit<Partial<React.ComponentProps<"video">>, "src"> & {
  src: string | string[] | undefined;
}) => {
  return (
    <video
      {...(typeof src === "string" ? { src } : {})}
      {...(autoPlay
        ? {
            autoPlay: true,
            preload: "auto",
            controls: false,
            playsInline: true, // safari autoplay workaround
            loop: true,
            muted: true,
          }
        : {
            autoPlay: false,
            preload: "metadata",
            controls: true,
            playsInline: true,
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

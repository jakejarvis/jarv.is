import ReactPlayer from "react-player/lazy";
import type { ReactPlayerProps } from "react-player";

const Video = (props: ReactPlayerProps) => (
  <div style={{ position: "relative", paddingTop: "56.25%" }}>
    <ReactPlayer width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }} {...props} />
  </div>
);

export default Video;

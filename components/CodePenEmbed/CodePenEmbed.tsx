import clsx from "clsx";
import IFrame from "../IFrame";

import styles from "./CodePenEmbed.module.css";

export type CodePenEmbedProps = {
  username: string;
  id: string;
  height?: number;
  defaultTab?: string;
  preview?: boolean;
  editable?: boolean;
  className?: string;
};

const CodePenEmbed = ({
  username,
  id,
  height = 500,
  defaultTab = "html",
  preview = true,
  editable = false,
  className,
}: CodePenEmbedProps) => {
  return (
    <div className={clsx(styles.wrapper, className)} style={{ height }}>
      <IFrame
        src={`https://codepen.io/${username}/embed/${id}/?${new URLSearchParams({
          "default-tab": `${defaultTab},result`,
          preview: `${!!preview}`,
          editable: `${!!editable}`,
        })}`}
        height={height}
        allowScripts
        noScroll
      />
    </div>
  );
};

export default CodePenEmbed;

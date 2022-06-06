import IFrame from "../IFrame";
import { useHasMounted } from "../../hooks/use-has-mounted";
import { useTheme } from "../../hooks/use-theme";
import { styled } from "../../lib/styles/stitches.config";

const Wrapper = styled("div", {
  width: "100%",
});

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
  const hasMounted = useHasMounted();
  const { activeTheme } = useTheme();

  return (
    <Wrapper className={className} css={{ height }}>
      {hasMounted && (
        <IFrame
          src={`https://codepen.io/${username}/embed/${id}/?${new URLSearchParams({
            "theme-id": activeTheme === "dark" ? activeTheme : "light",
            "default-tab": `${defaultTab},result`,
            preview: `${!!preview}`,
            editable: `${!!editable}`,
          })}`}
          height={height}
          allowScripts
          noScroll
        />
      )}
    </Wrapper>
  );
};

export default CodePenEmbed;

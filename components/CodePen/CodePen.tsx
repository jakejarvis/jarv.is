export type CodePenProps = {
  username: string;
  id: string;
  height?: number;
  defaultTab?: string;
  preview?: boolean;
  editable?: boolean;
};

const CodePen = ({
  username,
  id,
  height = 500,
  defaultTab = "html",
  preview = true,
  editable = false,
}: CodePenProps) => {
  return (
    <iframe
      src={`https://codepen.io/${username}/embed/${id}/?${new URLSearchParams({
        "default-tab": `${defaultTab},result`,
        preview: `${!!preview}`,
        editable: `${!!editable}`,
      })}`}
      scrolling="no"
      sandbox="allow-same-origin allow-scripts allow-popups allow-top-navigation-by-user-activation"
      style={{ height: `${height}px`, width: "100%", border: "0" }}
    />
  );
};

export default CodePen;

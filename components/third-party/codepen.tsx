const CodePen = ({
  username,
  id,
  height = 500,
  defaultTab = "html",
  preview = true,
  editable = false,
}: {
  username: string;
  id: string;
  height?: number;
  defaultTab?: string;
  preview?: boolean;
  editable?: boolean;
}) => {
  return (
    <iframe
      src={`https://codepen.io/${username}/embed/${id}/?${new URLSearchParams({
        "default-tab": `${defaultTab},result`,
        preview: `${!!preview}`,
        editable: `${!!editable}`,
      })}`}
      style={{ height: `${height}px`, width: "100%", border: "0", overflow: "hidden" }}
    />
  );
};

export default CodePen;

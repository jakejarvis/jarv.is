import { cn } from "@/lib/utils";

const CodePen = ({
  username,
  id,
  defaultTab = "html",
  preview = true,
  editable = false,
  className,
  ...rest
}: {
  username: string;
  id: string;
  defaultTab?: string;
  preview?: boolean;
  editable?: boolean;
} & React.ComponentProps<"iframe">) => {
  return (
    <iframe
      src={`https://codepen.io/${username}/embed/${id}/?${new URLSearchParams({
        "default-tab": `${defaultTab},result`,
        preview: `${!!preview}`,
        editable: `${!!editable}`,
      })}`}
      className={cn("h-[500px] w-full overflow-hidden border-none", className)}
      {...rest}
    />
  );
};

export default CodePen;

import reactToText from "react-to-text";
import { LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const HeadingAnchor = ({ id, title, className }: { id: string; title: string; className?: string }) => {
  return (
    <a
      href={`#${id}`}
      className={cn(
        "text-muted-foreground hover:text-primary ml-2 inline-block px-2 align-baseline hover:no-underline",
        className
      )}
      aria-hidden="true"
      tabIndex={-1}
    >
      <LinkIcon className="inline-block size-4 align-baseline" />
      <span className="sr-only">Permalink to &ldquo;{reactToText(title)}&rdquo;</span>
    </a>
  );
};

export default HeadingAnchor;

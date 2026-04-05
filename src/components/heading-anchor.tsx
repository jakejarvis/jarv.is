import { LinkIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const HeadingAnchor = ({
  id,
  title,
  className,
}: {
  id: string;
  title: string;
  className?: string;
}) => (
  <a
    href={`#${id}`}
    className={cn(
      "ml-2 inline-block px-2 align-baseline text-muted-foreground hover:text-primary hover:no-underline",
      className,
    )}
    aria-hidden="true"
    tabIndex={-1}
  >
    <LinkIcon className="inline-block size-[0.75em] align-baseline" />
    <span className="sr-only">Permalink to &ldquo;{title}&rdquo;</span>
  </a>
);

export { HeadingAnchor };

import { codeToHtml } from "shiki";
import reactToText from "react-to-text";
import CopyButton from "@/components/copy-button";
import { cn } from "@/lib/utils";
import type { ComponentProps, ComponentPropsWithoutRef } from "react";

const CodeBlock = async ({
  lineNumbers = false,
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"pre"> & {
  lineNumbers?: boolean;
}) => {
  // escape hatch if this code wasn't meant to be highlighted
  if (!children || typeof children !== "object" || !("props" in children)) {
    return (
      <pre className={className} {...rest}>
        {children}
      </pre>
    );
  }

  const codeProps = children.props as ComponentProps<"code">;
  const codeString = reactToText(codeProps.children).trim();

  // the language set in the markdown is passed as a className
  const lang = codeProps.className?.split("language-")[1] ?? "";

  const codeHighlighted = await codeToHtml(codeString, {
    lang,
    themes: {
      light: "material-theme-lighter",
      dark: "material-theme-darker",
    },
  });

  return (
    <div className={cn("bg-muted/35 relative rounded-lg border-2 font-mono", className)}>
      <div
        className={cn(
          "grid max-h-[500px] w-full overflow-x-auto p-4 **:bg-transparent! md:max-h-[650px] dark:**:text-[var(--shiki-dark)]! [&_pre]:whitespace-normal",
          "[&_.line]:inline-block [&_.line]:min-w-full [&_.line]:py-1 [&_.line]:leading-none [&_.line]:whitespace-pre [&_.line]:after:hidden",
          lineNumbers &&
            "[&_.line]:before:text-muted-foreground [counter-reset:line] [&_.line]:before:mr-5 [&_.line]:before:inline-block [&_.line]:before:w-5 [&_.line]:before:text-right [&_.line]:before:content-[counter(line)] [&_.line]:before:[counter-increment:line]"
        )}
        data-language={lang}
        dangerouslySetInnerHTML={{ __html: codeHighlighted }}
      />
      <CopyButton
        source={codeString}
        className="text-foreground/85 hover:text-primary bg-muted/10 absolute top-0 right-0 size-10 rounded-tr-lg rounded-bl-lg border-b-2 border-l-2 p-0 backdrop-blur-xs *:[svg]:my-auto *:[svg]:inline-block *:[svg]:size-4.5 *:[svg]:align-text-bottom"
      />
    </div>
  );
};

export default CodeBlock;

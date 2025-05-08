import { codeToHtml } from "shiki";
import reactToText from "react-to-text";
import { CodeIcon } from "lucide-react";
import CopyButton from "@/components/copy-button";
import { cn } from "@/lib/utils";
import type { ComponentProps, ComponentPropsWithoutRef } from "react";

const CodeBlock = async ({
  showLineNumbers = false,
  showCopyButton = true,
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"pre"> & {
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
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

  const getFullLang = (lang: string) => {
    // replace the file extension with the full language name when it makes sense to
    switch (lang.toLowerCase()) {
      case "js":
        return "JavaScript";
      case "jsx":
        return "JavaScript (JSX)";
      case "ts":
        return "TypeScript";
      case "tsx":
        return "TypeScript (JSX)";
      case "sh":
      case "bash":
      case "zsh":
        return "Shell";
      case "py":
        return "Python";
      case "md":
        return "Markdown";
      case "mdx":
        return "Markdown (MDX)";
      default:
        return lang;
    }
  };

  const fullLang = getFullLang(lang);

  return (
    <div className={cn("bg-muted/35 relative isolate rounded-lg border-2 font-mono", className)}>
      <div
        className={cn(
          "grid max-h-[500px] w-full overflow-x-auto p-4 **:bg-transparent! data-language:pt-9 md:max-h-[650px] dark:**:text-[var(--shiki-dark)]! [&_pre]:whitespace-normal",
          "[&_.line]:inline-block [&_.line]:min-w-full [&_.line]:py-1 [&_.line]:leading-none [&_.line]:whitespace-pre [&_.line]:after:hidden",
          "data-line-numbers:[&_.line]:before:text-muted-foreground data-line-numbers:[counter-reset:line] data-line-numbers:[&_.line]:[counter-increment:line] data-line-numbers:[&_.line]:before:mr-5 data-line-numbers:[&_.line]:before:inline-block data-line-numbers:[&_.line]:before:w-5 data-line-numbers:[&_.line]:before:text-right data-line-numbers:[&_.line]:before:content-[counter(line)]"
        )}
        data-language={lang || undefined}
        data-line-numbers={showLineNumbers || undefined}
        dangerouslySetInnerHTML={{ __html: codeHighlighted }}
      />
      {fullLang && (
        <span className="text-foreground/75 bg-muted/40 absolute top-0 left-0 flex items-center rounded-tl-md rounded-br-lg border-r-2 border-b-2 py-[5px] pr-[10px] font-mono text-xs font-medium tracking-wide uppercase backdrop-blur-xs select-none">
          <CodeIcon className="stroke-primary/90 mr-[8px] ml-[10px] inline-block size-[14px]" /> <span>{fullLang}</span>
        </span>
      )}
      {showCopyButton && (
        <CopyButton
          source={codeString}
          className="text-foreground/75 hover:text-primary bg-muted/40 absolute top-0 right-0 size-10 rounded-tr-md rounded-bl-lg border-b-2 border-l-2 p-0 backdrop-blur-xs select-none [&_svg]:my-auto [&_svg]:inline-block [&_svg]:size-4.5 [&_svg]:align-text-bottom"
        />
      )}
    </div>
  );
};

export default CodeBlock;

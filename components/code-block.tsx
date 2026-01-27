import { CodeIcon, TerminalIcon } from "lucide-react";
import { cacheLife } from "next/cache";
import CopyButton from "@/components/copy-button";
import { cn } from "@/lib/utils";
import reactToText from "react-to-text";
import { codeToHtml } from "shiki";

interface CodeBlockProps extends React.ComponentProps<"pre"> {
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
}

const renderHighlightedCode = async (codeString: string, lang: string) => {
  "use cache";
  cacheLife("max");

  const html = await codeToHtml(codeString, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return html;
};

const CodeBlock = async (props: CodeBlockProps) => {
  const { showLineNumbers = false, showCopyButton = true, children, className } = props;

  // escape hatch if this code wasn't meant to be highlighted
  if (!children || typeof children !== "object" || !("props" in children)) {
    return <pre {...props}>{children}</pre>;
  }

  const codeProps = children.props as React.ComponentProps<"code">;
  const codeString = reactToText(codeProps.children).trim();

  // the language set in the markdown is passed as a className
  const lang = codeProps.className?.split("language-")[1] ?? "";

  const html = await renderHighlightedCode(codeString, lang);

  return (
    <div className={cn("bg-muted/35 relative isolate rounded-lg border-2 font-mono shadow", className)}>
      <div
        className={cn(
          "grid max-h-[500px] w-full overflow-x-auto overscroll-x-none p-4 **:bg-transparent! data-language:pt-10 md:max-h-[650px] dark:**:text-[var(--shiki-dark)]! [&_pre]:whitespace-normal",
          "[&_.line]:inline-block [&_.line]:min-w-full [&_.line]:py-1 [&_.line]:leading-none [&_.line]:whitespace-pre [&_.line]:after:hidden",
          "data-line-numbers:[&_.line]:before:text-muted-foreground data-line-numbers:[counter-reset:line] data-line-numbers:[&_.line]:[counter-increment:line] data-line-numbers:[&_.line]:before:mr-5 data-line-numbers:[&_.line]:before:inline-block data-line-numbers:[&_.line]:before:w-5 data-line-numbers:[&_.line]:before:text-right data-line-numbers:[&_.line]:before:content-[counter(line)]"
        )}
        data-language={lang || undefined}
        data-line-numbers={showLineNumbers || undefined}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {lang && (
        <span className="[&_svg]:stroke-primary/90 text-foreground/75 bg-muted/40 absolute top-0 left-0 z-10 flex items-center gap-[8px] rounded-tl-md rounded-br-lg border-r-2 border-b-2 px-[10px] py-[5px] font-mono text-xs font-medium tracking-wide uppercase backdrop-blur-sm select-none [&_svg]:size-[14px] [&_svg]:shrink-0">
          {["sh", "bash", "zsh", "shell"].includes(lang) ? (
            <>
              <TerminalIcon />
              <span>Shell</span>
            </>
          ) : (
            <>
              <CodeIcon />
              <span>{lang}</span>
            </>
          )}
        </span>
      )}
      {showCopyButton && (
        <CopyButton
          value={codeString}
          className="text-foreground/75 hover:text-primary bg-muted/40 absolute top-0 right-0 z-10 size-10 rounded-tr-md rounded-bl-lg border-b-2 border-l-2 p-0 backdrop-blur-sm select-none [&_svg]:my-auto [&_svg]:inline-block [&_svg]:size-4.5 [&_svg]:align-text-bottom"
        />
      )}
    </div>
  );
};

export default CodeBlock;

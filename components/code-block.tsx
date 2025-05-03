import { codeToHtml } from "shiki";
import CopyButton from "@/components/copy-button";
import { cn } from "@/lib/utils";
import type { JSX } from "react";

export type CodeBlockProps = JSX.IntrinsicElements["pre"] & {
  lineNumbers?: boolean;
};

const CodeBlock = async (props: CodeBlockProps) => {
  // escape hatch if this code wasn't meant to be highlighted
  if (!props.children || typeof props.children !== "object" || !("props" in props.children)) {
    return <code {...props} />;
  }

  const codeProps = props.children.props as JSX.IntrinsicElements["code"];
  const codeRaw = String(codeProps.children).trim();
  const lang = codeProps.className?.split("language-")[1] ?? "";

  const codeHighlighted = await codeToHtml(codeRaw.trim(), {
    lang,
    themes: {
      light: "material-theme-lighter",
      dark: "material-theme-darker",
    },
  });

  return (
    <div
      className={cn(
        "bg-muted/35 border-border relative my-4 w-full rounded-lg border-2 font-mono [font-variant-ligatures:none]",
        props.className
      )}
    >
      <div
        className={cn(
          "grid w-full overflow-x-auto p-4 text-sm leading-none [counter-reset:line] dark:**:text-[var(--shiki-dark)]! [&_.line]:inline-block [&_.line]:min-w-full [&_.line]:py-1 [&_.line]:whitespace-pre [&_.line]:after:hidden [&>pre]:bg-transparent! [&>pre]:whitespace-normal",
          props.lineNumbers &&
            "[&_.line]:before:text-muted-foreground [&_.line]:before:mr-4 [&_.line]:before:inline-block [&_.line]:before:w-5 [&_.line]:before:text-right [&_.line]:before:content-[counter(line)] [&_.line]:before:[counter-increment:line]"
        )}
        data-language={lang}
        dangerouslySetInnerHTML={{ __html: codeHighlighted }}
      />
      <CopyButton
        source={codeRaw}
        className="border-border text-foreground/85 hover:text-primary bg-muted/10 absolute top-0 right-0 size-[40px] rounded-tr-lg rounded-bl-lg border-b-2 border-l-2 p-0 backdrop-blur-xs [&>svg]:my-auto [&>svg]:inline-block [&>svg]:size-[18px] [&>svg]:align-middle"
      />
    </div>
  );
};

export default CodeBlock;

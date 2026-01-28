import { codeToHtml } from "shiki";
import { cacheLife } from "next/cache";
import CopyButton from "@/components/copy-button";
import { cn, getTextContent } from "@/lib/utils";

interface CodeBlockProps extends React.ComponentProps<"pre"> {
  showLineNumbers?: boolean;
}

const renderCode = async (code: string, lang: string): Promise<string> => {
  "use cache";
  cacheLife("max");

  return codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
  });
};

const CodeBlock = async ({ children, className, showLineNumbers = true, ...props }: CodeBlockProps) => {
  // Escape hatch for non-code pre blocks
  if (!children || typeof children !== "object" || !("props" in children)) {
    return (
      <pre className={className} {...props}>
        {children}
      </pre>
    );
  }

  const codeProps = children.props as React.ComponentProps<"code">;
  const codeString = getTextContent(codeProps.children).trim();
  const lang = codeProps.className?.split("language-")[1] ?? "text";

  const html = await renderCode(codeString, lang);

  return (
    <div className="group not-prose relative">
      <CopyButton
        value={codeString}
        className="absolute top-2 right-2 z-10 opacity-0 transition-opacity group-hover:opacity-100"
      />
      <div
        data-slot="code-block"
        data-lang={lang}
        data-line-numbers={showLineNumbers || undefined}
        className={cn(
          "bg-code text-code-foreground overflow-x-auto overflow-y-hidden rounded-xl text-[13px] leading-normal outline-none",
          "[&_span]:!bg-transparent [&_span[style*='color']]:dark:!text-(--shiki-dark)",
          "[&_pre]:m-0 [&_pre]:rounded-xl [&_pre]:!bg-transparent",
          "[&_code]:white-space-pre [&_code]:grid [&_code]:min-w-full [&_code]:px-4 [&_code]:py-3.5 [&_code]:[counter-reset:line]",
          "[&_.line]:min-h-1lh [&_.line]:inline-block [&_.line]:w-full [&_.line]:py-0.5",
          "data-[line-numbers]:[&_.line]:before:text-code-number data-[line-numbers]:[&_.line]:before:mr-6 data-[line-numbers]:[&_.line]:before:inline-block data-[line-numbers]:[&_.line]:before:w-5 data-[line-numbers]:[&_.line]:before:text-right data-[line-numbers]:[&_.line]:before:content-[counter(line)] data-[line-numbers]:[&_.line]:before:[counter-increment:line]",
          className
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default CodeBlock;

import { codeToHtml } from "shiki";
import { cacheLife } from "next/cache";
import CopyButton from "@/components/copy-button";
import reactToText from "react-to-text";

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
  const codeString = reactToText(codeProps.children).trim();
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
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default CodeBlock;

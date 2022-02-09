import classNames from "classnames/bind";
import CopyButton from "../CopyButton/CopyButton";

import styles from "./CodeBlock.module.css";
const cx = classNames.bind(styles);

type CodeBlockProps = JSX.IntrinsicElements["code"] & {
  forceBlock?: boolean;
};

const CodeBlock = ({ forceBlock, className, children, ...rest }: CodeBlockProps) => {
  // detect if this input has already been touched by prism.js via rehype
  const prismEnabled = className?.split(" ").includes("code-highlight");

  if (prismEnabled || forceBlock) {
    // full multi-line code blocks with copy-to-clipboard button
    // automatic if highlighted by prism, otherwise can be forced (rather than inlined) with `forceBlock={true}`
    return (
      <div className={styles.block}>
        <CopyButton source={children} className={styles.copy_btn} />
        <code
          className={cx({ code: true, highlight: prismEnabled }, className?.replace("code-highlight", "").trim())}
          {...rest}
        >
          {children}
        </code>
      </div>
    );
  } else {
    // inline code in paragraphs, headings, etc. (not highlighted)
    return (
      <code className={classNames(styles.code, styles.inline, className)} {...rest}>
        {children}
      </code>
    );
  }
};

export default CodeBlock;

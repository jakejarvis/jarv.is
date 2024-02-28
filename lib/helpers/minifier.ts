import { trimLines } from "trim-lines";
import stripComments from "strip-comments";

// do some _very_ rudimentary JS minifying.
export const minifier = (source: string): string => {
  // save the first line for later, it might be important?
  const firstLine = source.split("\n")[0];

  // remove JS comments
  source = stripComments(source, {
    block: false,
    keepProtected: true,
  });
  // remove indentation
  source = trimLines(source);
  // remove newlines
  source = source.replace(/\n/g, "");

  // restore JSX flags if they were there at the beginning
  if (firstLine.startsWith("/*@jsx")) {
    source = `${firstLine}${source}`;
  }

  return source;
};

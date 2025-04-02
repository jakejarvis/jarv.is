import hash from "@emotion/hash";

// a little hacky-hack to have react combine all of these css var declarations into a single <style> tag up top. see:
// https://react.dev/reference/react-dom/components/style#rendering-an-inline-css-stylesheet
export const setRootCssVariables = (vars: Record<string, string>) => {
  const root = Object.entries(vars)
    .map(([key, value]) => `--${key}:${value}`)
    .join(";");

  return {
    href: hash(root),
    dangerouslySetInnerHTML: { __html: `:root{${root}}` },
  };
};

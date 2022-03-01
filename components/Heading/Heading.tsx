import innerText from "react-innertext";
import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";

const Anchor = styled("a", {
  margin: "0 0.25em",
  padding: "0 0.25em",
  color: "$mediumLight",
  fontWeight: 300,
  textDecoration: "none",
  opacity: 0, // overridden on hover below (except on small screens)

  "&::before": {
    // pound sign `#`, done here to keep content DOM cleaner
    content: "\\0023",
  },

  "&:hover": {
    color: "$link",
  },

  // don't require hover to show anchor link on small (likely touch) screens
  "@mobile": {
    opacity: 1,
  },
});

const H = styled("h1", {
  marginTop: "1em",
  marginBottom: "0.5em",
  lineHeight: 1.5,

  // offset (approximately) with sticky header so jumped-to content isn't hiding behind it.
  // note: use rem so it isn't based on the heading's font size.
  scrollMarginTop: "5.5rem",

  "@mobile": {
    scrollMarginTop: "6.5rem",
  },

  [`&:hover ${Anchor}`]: {
    opacity: 1,
  },

  variants: {
    underline: {
      true: {
        paddingBottom: "0.25em",
        borderBottom: "1px solid $kindaLight",
      },
    },
  },
});

export type HeadingProps = ComponentProps<typeof H> & {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

const Heading = ({ as, id, className, children, ...rest }: HeadingProps) => {
  return (
    <H as={as} className={className} underline={as === "h2"} id={id} {...rest}>
      {children}

      {/* add anchor link to H2s and H3s. ID is already generated by rehype-slug. `#` character inserted via CSS. */}
      {id && (as === "h2" || as === "h3") && (
        <Anchor href={`#${id}`} title={`Jump to "${innerText(children)}"`} tabIndex={-1} aria-hidden={true} />
      )}
    </H>
  );
};

export const H1 = (props: Omit<HeadingProps, "as">) => <Heading as="h1" {...props} />;
export const H2 = (props: Omit<HeadingProps, "as">) => <Heading as="h2" {...props} />;
export const H3 = (props: Omit<HeadingProps, "as">) => <Heading as="h3" {...props} />;
export const H4 = (props: Omit<HeadingProps, "as">) => <Heading as="h4" {...props} />;
export const H5 = (props: Omit<HeadingProps, "as">) => <Heading as="h5" {...props} />;
export const H6 = (props: Omit<HeadingProps, "as">) => <Heading as="h6" {...props} />;

export default Heading;

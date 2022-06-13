import Link from "../Link";
import Time from "../Time";
import { styled } from "../../lib/styles/stitches.config";
import type { ReactElement } from "react";
import type { NoteFrontMatter } from "../../types";

const Section = styled("section", {
  fontSize: "1.1em",
  lineHeight: 1.1,
  margin: "2.4em 0",

  "&:first-of-type": {
    marginTop: 0,
  },

  "&:last-of-type": {
    marginBottom: 0,
  },

  "@medium": {
    margin: "1.8em 0",
  },
});

const Year = styled("h2", {
  fontSize: "2.2em",
  marginTop: 0,
  marginBottom: "0.5em",

  "@medium": {
    fontSize: "2em",
  },
});

const List = styled("ul", {
  listStyleType: "none",
  margin: 0,
  padding: 0,
});

const Post = styled("li", {
  display: "flex",
  lineHeight: 1.75,
  marginBottom: "1em",

  "&:last-of-type": {
    marginBottom: 0,
  },
});

const PostDate = styled(Time, {
  width: "5.25em",
  flexShrink: 0,
  color: "$medium",
});

export type NotesListProps = {
  notesByYear: {
    [year: string]: NoteFrontMatter[];
  };
};

const NotesList = ({ notesByYear }: NotesListProps) => {
  const sections: ReactElement[] = [];

  Object.entries(notesByYear).forEach(([year, notes]) => {
    sections.push(
      <Section key={year}>
        <Year>{year}</Year>
        <List>
          {notes.map(({ slug, date, title, htmlTitle }) => (
            <Post key={slug}>
              <PostDate date={date} format="MMM D" />
              <span>
                <Link
                  href={{
                    pathname: "/notes/[slug]/",
                    query: { slug },
                  }}
                  dangerouslySetInnerHTML={{ __html: htmlTitle || title }}
                />
              </span>
            </Post>
          ))}
        </List>
      </Section>
    );
  });

  // grouped notes enter this component ordered chronologically -- we want reverse chronological
  const reversed = sections.reverse();

  return <>{reversed}</>;
};

export default NotesList;

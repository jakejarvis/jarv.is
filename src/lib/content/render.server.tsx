import "@tanstack/react-start/server-only";
import { notFound } from "@tanstack/react-router";
import { renderServerComponent } from "@tanstack/react-start/rsc";
import type { MDXContent } from "mdx/types";

import { GitHubProjects } from "@/components/github-projects";
import { mdxComponents } from "@/components/mdx-components";

type MdxModule = {
  default: MDXContent;
  /** From YAML frontmatter, exported by remark-mdx-frontmatter. */
  frontmatter?: {
    title?: string;
    description?: string;
  };
};

// lazy, so each request only loads the one module it renders
const notes = import.meta.glob<MdxModule>("/notes/*/index.mdx");
const pages = import.meta.glob<MdxModule>("/src/content/pages/*/index.mdx");

const render = async (load: () => Promise<MdxModule>) => {
  const { default: Content, frontmatter } = await load();

  return {
    frontmatter: {
      title: frontmatter?.title,
      description: frontmatter?.description,
    },
    Body: await renderServerComponent(<Content components={mdxComponents} />),
  };
};

/** Renders a post's body (notes/<slug>/index.mdx) as a React Server Component. */
export const renderNote = async (slug: string) => {
  const load = notes[`/notes/${slug}/index.mdx`];
  if (!load) throw notFound();
  return render(load);
};

/** Renders a standalone page's body (src/content/pages/<name>/index.mdx) as a React Server Component. */
export const renderPage = async (name: string) => {
  const load = pages[`/src/content/pages/${name}/index.mdx`];
  if (!load) throw notFound();
  return render(load);
};

/** Renders the /projects page body (live GitHub data) as a React Server Component. */
export const renderProjects = async () => ({
  Body: await renderServerComponent(<GitHubProjects />),
});

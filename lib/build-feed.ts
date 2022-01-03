import { Feed } from "feed";
import { getAllNotes } from "./parse-notes";
import * as config from "./config";

export const buildFeed = () => {
  const baseURL = config.baseURL || "http://localhost:3000"; // necessary for local testing
  const feed = new Feed({
    id: `${baseURL}/`,
    link: `${baseURL}/`,
    title: config.siteName,
    description: config.longDescription,
    copyright: "https://creativecommons.org/licenses/by/4.0/",
    updated: new Date(),
    image: `${baseURL}/static/images/me.jpg`,
    feedLinks: {
      rss: `${baseURL}/feed.xml`,
      atom: `${baseURL}/feed.atom`,
    },
    author: {
      name: config.authorName,
      link: baseURL,
      email: "jake@jarv.is",
    },
  });

  const notes = getAllNotes();
  notes.forEach((note: any) => {
    feed.addItem({
      title: note.title,
      link: `${baseURL}/notes/${note.slug}/`,
      guid: `${baseURL}/notes/${note.slug}/`,
      description: note.description,
      image: note.image ? `${baseURL}${note.image}` : "",
      author: [
        {
          name: config.authorName,
          link: baseURL,
        },
      ],
      date: new Date(note.date),
    });
  });

  return feed;
};

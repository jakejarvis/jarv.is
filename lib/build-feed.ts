import { Feed } from "feed";
import * as config from "./config";

export const buildFeed = (notes: any[]) => {
  const feed = new Feed({
    id: `${config.baseURL}/`,
    link: `${config.baseURL}/`,
    title: config.siteName,
    description: config.longDescription,
    copyright: "https://creativecommons.org/licenses/by/4.0/",
    updated: new Date(),
    image: `${config.baseURL}/static/images/me.jpg`,
    feedLinks: {
      rss: `${config.baseURL}/feed.xml`,
      atom: `${config.baseURL}/feed.atom`,
    },
    author: {
      name: config.authorName,
      link: config.baseURL,
      email: "jake@jarv.is",
    },
  });

  notes.forEach((note: { title: any; slug: any; description: any; image: any; date: string | number | Date }) => {
    feed.addItem({
      title: note.title,
      link: `${config.baseURL}/notes/${note.slug}/`,
      guid: `${config.baseURL}/notes/${note.slug}/`,
      description: note.description,
      image: note.image ? `${config.baseURL}${note.image}` : "",
      author: [
        {
          name: config.authorName,
          link: config.baseURL,
        },
      ],
      date: new Date(note.date),
    });
  });

  return feed;
};

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  // comments, views and post stats are fetched (and cached) in the browser with TanStack Query
  const queryClient = new QueryClient();

  return createRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
    Wrap: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });
};

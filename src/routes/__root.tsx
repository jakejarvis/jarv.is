import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import siteConfig from "@/lib/config/site";

import "@/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: `${siteConfig.name} – ${siteConfig.tagline}`,
      },
      {
        name: "description",
        content: siteConfig.description,
      },
    ],
    links: [
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: `${siteConfig.name} (RSS)`,
        href: "/feed.xml",
      },
      {
        rel: "alternate",
        type: "application/atom+xml",
        title: `${siteConfig.name} (Atom)`,
        href: "/feed.atom",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function NotFoundComponent() {
  return (
    <RootDocument>
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="font-medium text-4xl">404</h1>
        <p className="mt-2 text-muted-foreground">Page not found.</p>
      </div>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-background font-sans text-foreground antialiased">
        <Providers>
          <Header />
          <div className="mx-auto mt-4 w-full max-w-4xl px-5">
            <main>{children}</main>
          </div>
          <Footer />
          <Toaster position="bottom-center" hotkey={[]} />
        </Providers>
        <Scripts />
      </body>
    </html>
  );
}

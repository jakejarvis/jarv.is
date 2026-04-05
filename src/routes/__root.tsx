import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "next-themes";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import siteConfig from "@/lib/config/site";

import appCss from "@/styles.css?url";

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
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "manifest",
        href: "/manifest.webmanifest",
      },
      {
        rel: "icon",
        href: "/favicon.ico",
        type: "image/x-icon",
        sizes: "48x48",
      },
      {
        rel: "icon",
        href: "/icon.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        rel: "apple-touch-icon",
        href: "/apple-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
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
        <h1 className="text-4xl font-medium">404</h1>
        <p className="text-muted-foreground mt-2">Page not found.</p>
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
      <body className="bg-background text-foreground font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Header />
            <div className="mx-auto mt-4 w-full max-w-[720px] px-5">
              <main>{children}</main>
            </div>
            <Footer />
            <Toaster position="bottom-center" hotkey={[]} />
          </TooltipProvider>
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}

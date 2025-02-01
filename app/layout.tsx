import clsx from "clsx";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "../contexts/ThemeContext";
import Layout from "../components/Layout";

import { GeistMono, GeistSans } from "../lib/styles/fonts";

import "modern-normalize/modern-normalize.css";
import "../lib/styles/theme.css";
import "../lib/styles/global.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx(GeistMono.variable, GeistSans.variable)} suppressHydrationWarning>
      <head>
        <script>
          {/* unminified: https://gist.github.com/jakejarvis/79b0ec8506bc843023546d0d29861bf0 */}
          {`(()=>{try{const e=document.documentElement,t="undefined"!=typeof Storage?window.localStorage.getItem("theme"):null,a=(t&&"dark"===t)??window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";e.dataset.theme=a,e.style.colorScheme=a}catch(e){}})()`}
        </script>
      </head>
      <body>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}

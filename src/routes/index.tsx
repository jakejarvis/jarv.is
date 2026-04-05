import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="prose prose-neutral dark:prose-invert prose-sm max-w-none">
      <h1 className="font-medium text-2xl">
        Hi there! I&rsquo;m Jake.{" "}
        <span className="ml-0.5 inline-block origin-[65%_80%] text-2xl motion-safe:animate-wave">
          👋
        </span>
      </h1>

      <h2 className="font-normal">
        I&rsquo;m a frontend web developer based in the Boston area.
      </h2>

      <p>
        I specialize in using TypeScript, React, and Next.js to make lightweight
        frontends with dynamic and powerful backends.
      </p>

      <p>This page is being served by TanStack Start + Vite 8.</p>
    </div>
  );
}

import { cn } from "@/lib/utils";

const CommentsWrapper = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <section id="comments" className={cn("isolate mt-8 mb-10 min-h-36 w-full border-t-2 pt-8", className)}>
      <div className="mx-auto w-full max-w-3xl space-y-6 text-base leading-normal [&_p]:my-auto">{children}</div>
    </section>
  );
};

export default CommentsWrapper;

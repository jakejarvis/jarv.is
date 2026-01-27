import Button from "@/components/ui/button";
import Video from "@/components/video";
import Link from "@/components/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: null,
  openGraph: {},
  alternates: {
    canonical: null,
  },
};

const Page = () => {
  return (
    <>
      <Video
        src="https://ijyxfbpcm3itvdly.public.blob.vercel-storage.com/not-found-SAtLyNyc7gVhveYxr6o1ITd9CSXo5X.mp4"
        autoPlay
        className="mt-6 aspect-[16/11] max-w-[480px] rounded-lg"
      />

      <div className="mt-6 text-center">
        <h1 className="my-2 text-2xl font-semibold md:text-3xl">Page Not Found</h1>

        <Button className="mt-4 mb-0 text-[15px] leading-none" size="lg" asChild>
          <Link href="/">Go home?</Link>
        </Button>
      </div>
    </>
  );
};

export default Page;

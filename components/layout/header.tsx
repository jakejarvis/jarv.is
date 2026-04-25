"use client";

import { AtSignIcon, ExternalLinkIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import avatarImg from "@/app/avatar.jpg";
import { Menu } from "@/components/layout/menu";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import authorConfig from "@/lib/config/author";
import siteConfig from "@/lib/config/site";
import { cn } from "@/lib/utils";

const contactIconClassName = "text-muted-foreground size-4";

const contactLinks = [
  {
    label: "Email",
    value: authorConfig.email,
    href: `mailto:${authorConfig.email}`,
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        {...props}
      >
        {/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}
        <path
          fill="currentColor"
          d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"
        />
      </svg>
    ),
    external: false,
  },
  {
    label: "GitHub",
    value: `@${authorConfig.social.github}`,
    href: `https://github.com/${authorConfig.social.github}`,
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        {...props}
      >
        {/* Icon from Simple Icons by Simple Icons Collaborators - https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md */}
        <path
          fill="currentColor"
          d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
        />
      </svg>
    ),
    external: true,
  },
  {
    label: "Bluesky",
    value: `@${authorConfig.social.bluesky}`,
    href: `https://bsky.app/profile/${authorConfig.social.bluesky}`,
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        {...props}
      >
        {/* Icon from Simple Icons by Simple Icons Collaborators - https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md */}
        <path
          fill="currentColor"
          d="M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037c-.856 3.061-3.978 3.842-6.755 3.37c4.854.826 6.089 3.562 3.422 6.299c-5.065 5.196-7.28-1.304-7.847-2.97c-.104-.305-.152-.448-.153-.327c0-.121-.05.022-.153.327c-.568 1.666-2.782 8.166-7.847 2.97c-2.667-2.737-1.432-5.473 3.422-6.3c-2.777.473-5.899-.308-6.755-3.369C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026"
        />
      </svg>
    ),
    external: true,
  },
  {
    label: "Mastodon",
    value: authorConfig.social.mastodon,
    href: `https://${authorConfig.social.mastodon}`,
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        {...props}
      >
        {/* Icon from Simple Icons by Simple Icons Collaborators - https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md */}
        <path
          fill="currentColor"
          d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127C.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611c.118 1.24.325 2.47.62 3.68c.55 2.237 2.777 4.098 4.96 4.857c2.336.792 4.849.923 7.256.38q.398-.092.786-.213c.585-.184 1.27-.39 1.774-.753a.06.06 0 0 0 .023-.043v-1.809a.05.05 0 0 0-.02-.041a.05.05 0 0 0-.046-.01a20.3 20.3 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.6 5.6 0 0 1-.319-1.433a.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546c.376 0 .75 0 1.125-.01c1.57-.044 3.224-.124 4.768-.422q.059-.011.11-.024c2.435-.464 4.753-1.92 4.989-5.604c.008-.145.03-1.52.03-1.67c.002-.512.167-3.63-.024-5.545m-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976c-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35c-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102q0-1.965 1.011-3.12c.696-.77 1.608-1.164 2.74-1.164c1.311 0 2.302.5 2.962 1.498l.638 1.06l.638-1.06c.66-.999 1.65-1.498 2.96-1.498c1.13 0 2.043.395 2.74 1.164q1.012 1.155 1.012 3.12z"
        />
      </svg>
    ),
    external: true,
  },
  {
    label: "Twitter",
    value: `@${authorConfig.social.twitter}`,
    href: `https://x.com/${authorConfig.social.twitter}`,
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        {...props}
      >
        {/* Icon from Simple Icons by Simple Icons Collaborators - https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md */}
        <path
          fill="currentColor"
          d="M14.234 10.162L22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299l-.929-1.329L3.076 1.56h3.182l5.965 8.532l.929 1.329l7.754 11.09h-3.182z"
        />
      </svg>
    ),
    external: true,
  },
  {
    label: "Instagram",
    value: `@${authorConfig.social.instagram}`,
    href: `https://www.instagram.com/${authorConfig.social.instagram}/`,
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        {...props}
      >
        {/* Icon from Simple Icons by Simple Icons Collaborators - https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md */}
        <path
          fill="currentColor"
          d="M7.03.084c-1.277.06-2.149.264-2.91.563a5.9 5.9 0 0 0-2.124 1.388a5.9 5.9 0 0 0-1.38 2.127C.321 4.926.12 5.8.064 7.076s-.069 1.688-.063 4.947s.021 3.667.083 4.947c.061 1.277.264 2.149.563 2.911c.308.789.72 1.457 1.388 2.123a5.9 5.9 0 0 0 2.129 1.38c.763.295 1.636.496 2.913.552c1.278.056 1.689.069 4.947.063s3.668-.021 4.947-.082c1.28-.06 2.147-.265 2.91-.563a5.9 5.9 0 0 0 2.123-1.388a5.9 5.9 0 0 0 1.38-2.129c.295-.763.496-1.636.551-2.912c.056-1.28.07-1.69.063-4.948c-.006-3.258-.02-3.667-.081-4.947c-.06-1.28-.264-2.148-.564-2.911a5.9 5.9 0 0 0-1.387-2.123a5.9 5.9 0 0 0-2.128-1.38c-.764-.294-1.636-.496-2.914-.55C15.647.009 15.236-.006 11.977 0S8.31.021 7.03.084m.14 21.693c-1.17-.05-1.805-.245-2.228-.408a3.7 3.7 0 0 1-1.382-.895a3.7 3.7 0 0 1-.9-1.378c-.165-.423-.363-1.058-.417-2.228c-.06-1.264-.072-1.644-.08-4.848c-.006-3.204.006-3.583.061-4.848c.05-1.169.246-1.805.408-2.228c.216-.561.477-.96.895-1.382a3.7 3.7 0 0 1 1.379-.9c.423-.165 1.057-.361 2.227-.417c1.265-.06 1.644-.072 4.848-.08c3.203-.006 3.583.006 4.85.062c1.168.05 1.804.244 2.227.408c.56.216.96.475 1.382.895s.681.817.9 1.378c.165.422.362 1.056.417 2.227c.06 1.265.074 1.645.08 4.848c.005 3.203-.006 3.583-.061 4.848c-.051 1.17-.245 1.805-.408 2.23c-.216.56-.477.96-.896 1.38a3.7 3.7 0 0 1-1.378.9c-.422.165-1.058.362-2.226.418c-1.266.06-1.645.072-4.85.079s-3.582-.006-4.848-.06m9.783-16.192a1.44 1.44 0 1 0 1.437-1.442a1.44 1.44 0 0 0-1.437 1.442M5.839 12.012a6.161 6.161 0 1 0 12.323-.024a6.162 6.162 0 0 0-12.323.024M8 12.008A4 4 0 1 1 12.008 16A4 4 0 0 1 8 12.008"
        />
      </svg>
    ),
    external: true,
  },
  {
    label: "LinkedIn",
    value: `/in/${authorConfig.social.linkedin}`,
    href: `https://www.linkedin.com/in/${authorConfig.social.linkedin}/`,
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        {...props}
      >
        {/* Icon from Simple Icons by Simple Icons Collaborators - https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md */}
        <path
          fill="currentColor"
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.06 2.06 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"
        />
      </svg>
    ),
    external: true,
  },
  {
    label: "Medium",
    value: `@${authorConfig.social.medium}`,
    href: `https://medium.com/@${authorConfig.social.medium}`,
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        {...props}
      >
        {/* Icon from Simple Icons by Simple Icons Collaborators - https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md */}
        <path
          fill="currentColor"
          d="M4.21 0A4.2 4.2 0 0 0 0 4.21v15.58A4.2 4.2 0 0 0 4.21 24h15.58A4.2 4.2 0 0 0 24 19.79v-1.093a5 5 0 0 1-.422.02c-2.577 0-4.027-2.146-4.09-4.832a8 8 0 0 1 .022-.708c.093-1.186.475-2.241 1.105-3.022a3.9 3.9 0 0 1 1.395-1.1c.468-.237 1.127-.367 1.664-.367h.023q.151 0 .303.01V4.211A4.2 4.2 0 0 0 19.79 0Zm.198 5.583h4.165l3.588 8.435l3.59-8.435h3.864v.146l-.019.004c-.705.16-1.063.397-1.063 1.254h-.003l.003 10.274c.06.676.424.885 1.063 1.03l.02.004v.145h-4.923v-.145l.019-.005c.639-.144.994-.353 1.054-1.03V7.267l-4.745 11.15h-.261L6.15 7.569v9.445c0 .857.358 1.094 1.063 1.253l.02.004v.147H4.405v-.147l.019-.004c.705-.16 1.065-.397 1.065-1.253V6.987c0-.857-.358-1.094-1.064-1.254l-.018-.004zm19.25 3.668c-1.086.023-1.733 1.323-1.813 3.124H24V9.298a1.4 1.4 0 0 0-.342-.047m-1.862 3.632c-.1 1.756.86 3.239 2.204 3.634v-3.634z"
        />
      </svg>
    ),
    external: true,
  },
  {
    label: "Facebook",
    value: authorConfig.social.facebook,
    href: `https://www.facebook.com/${authorConfig.social.facebook}`,
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        {...props}
      >
        {/* Icon from Simple Icons by Simple Icons Collaborators - https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md */}
        <path
          fill="currentColor"
          d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978c.401 0 .955.042 1.468.103a9 9 0 0 1 1.141.195v3.325a9 9 0 0 0-.653-.036a27 27 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.7 1.7 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103l-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647"
        />
      </svg>
    ),
    external: true,
  },
] as const;

const ContactPopover = () => (
  <Popover
    // fixes tooltip flakiness when a link is behind the popover window
    modal="trap-focus"
  >
    <PopoverTrigger
      openOnHover
      delay={0}
      render={<Button variant="ghost" size="icon" aria-label="Open contact links" />}
    >
      <AtSignIcon aria-hidden="true" />
    </PopoverTrigger>
    <PopoverContent align="end" className="max-h-(--available-height) overflow-y-auto">
      <PopoverHeader className="mt-1 px-1">
        <PopoverTitle>Get in touch:</PopoverTitle>
        <PopoverDescription className="sr-only">Email and social links.</PopoverDescription>
      </PopoverHeader>

      <nav aria-label="Contact links" className="flex flex-col gap-1">
        {contactLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={`me${link.external ? " noopener noreferrer" : ""}`}
            className="hover:bg-muted focus-visible:border-ring focus-visible:ring-ring/50 flex items-center gap-2 rounded-md px-1.5 py-1.5 no-underline transition-colors outline-none focus-visible:ring-3"
          >
            <Tooltip disableHoverablePopup>
              <TooltipTrigger>
                <link.Icon className={contactIconClassName} aria-hidden="true" />
              </TooltipTrigger>
              <TooltipContent sideOffset={8}>{link.label}</TooltipContent>
            </Tooltip>
            <span className="block min-w-0 flex-1 truncate text-[13px] leading-normal">
              {link.value}
            </span>
            {link.external ? (
              <ExternalLinkIcon className="text-muted-foreground/70 size-3.5" aria-hidden="true" />
            ) : null}
          </a>
        ))}
      </nav>
    </PopoverContent>
  </Popover>
);

const Header = ({ className }: { className?: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      data-scrolled={isScrolled}
      style={{ viewTransitionName: "persistent-nav" }}
      className={cn(
        "sticky top-0 z-50 w-full",
        "motion-safe:transition-[background-color,backdrop-filter,border-color]",
        "motion-safe:duration-200",
        "bg-background/0 backdrop-blur-none",
        "data-[scrolled=true]:bg-background/80",
        "data-[scrolled=true]:backdrop-blur-md",
        "data-[scrolled=true]:border-border/70 data-[scrolled=true]:border-b",
        className,
      )}
    >
      <header className="mt-2 flex w-full items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            rel="author"
            transitionTypes={pathname === "/" ? undefined : ["nav-lateral"]}
            aria-label={siteConfig.name}
            className={cn(
              "hover:text-foreground/85 flex shrink-0 items-center",
              "gap-2.5 pr-2 hover:no-underline",
            )}
          >
            <Image
              src={avatarImg}
              alt={`Photo of ${siteConfig.name}`}
              className="border-ring/30 size-7 rounded-full border"
              width={40}
              height={40}
              quality={75}
              priority
            />
            <span
              className={cn(
                "text-[17.5px] font-medium tracking-[-0.0375em] whitespace-nowrap",
                "max-md:sr-only",
              )}
            >
              {siteConfig.name}
            </span>
          </Link>
          <Separator orientation="vertical" className="!h-7" />
          <Menu />
        </div>

        <div className="flex items-center gap-2.5">
          <ContactPopover />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
            className="group"
          >
            <SunIcon className="group-hover:stroke-orange-600 dark:hidden" aria-hidden="true" />
            <MoonIcon
              className="not-dark:hidden group-hover:stroke-yellow-400"
              aria-hidden="true"
            />
          </Button>
        </div>
      </header>
    </div>
  );
};

export { Header };

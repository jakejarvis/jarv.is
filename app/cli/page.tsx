import Content from "../../components/Content";
import PageTitle from "../../components/PageTitle";
import Link from "../../components/Link";
import Image from "../../components/Image";
import Blockquote from "../../components/Blockquote";
import CodeBlock from "../../components/CodeBlock";
import { H2 } from "../../components/Heading";
import { UnorderedList, ListItem } from "../../components/List";
import type { Metadata } from "next";

import cliImg from "../../public/static/images/cli/screenshot.png";

export const metadata: Metadata = {
  title: "CLI",
  description: "AKA, the most useless Node module ever published, in history, by anyone, ever.",
  openGraph: {
    title: "CLI",
    images: [cliImg.src],
  },
};

export default function Page() {
  return (
    <>
      <PageTitle>🤖 CLI</PageTitle>

      <Content>
        <Blockquote>
          The <Link href="/">Jake Jarvis</Link> CLI (aka the most useless Node module ever published, in history, by
          anyone, ever).
        </Blockquote>

        <Image src={cliImg} href="https://www.npmjs.com/package/@jakejarvis/cli" alt="Terminal Screenshot" priority />

        <H2 id="usage">Usage</H2>
        <CodeBlock withCopyButton>npx @jakejarvis/cli</CodeBlock>

        <H2 id="inspired-by">Inspired by</H2>
        <UnorderedList>
          <ListItem>
            <Link href="https://github.com/sindresorhus/sindresorhus-cli">@sindresorhus/sindresorhus-cli</Link>
          </ListItem>
          <ListItem>
            <Link href="https://github.com/yg/ygcodes">@yg/ygcodes</Link>
          </ListItem>
        </UnorderedList>

        <H2 id="built-with">Built with</H2>
        <UnorderedList>
          <ListItem>
            <Link href="https://github.com/vadimdemedes/ink">ink</Link> - React for interactive command-line apps
          </ListItem>
          <ListItem>
            <Link href="https://github.com/sindresorhus/meow">meow</Link> - CLI helper
          </ListItem>
        </UnorderedList>
        <p>
          <Link href="https://github.com/jakejarvis/jakejarvis/tree/main/cli">View source on GitHub.</Link>
        </p>

        <H2 id="license">License</H2>
        <p>
          MIT &copy; <Link href="/">Jake Jarvis</Link>, <Link href="https://sindresorhus.com">Sindre Sorhus</Link>
        </p>
      </Content>
    </>
  );
}

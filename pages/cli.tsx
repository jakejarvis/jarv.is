import { NextSeo } from "next-seo";
import Content from "../components/Content/Content";
import PageTitle from "../components/PageTitle/PageTitle";
import Link from "../components/Link/Link";
import Image from "../components/Image/Image";
import Blockquote from "../components/Blockquote/Blockquote";
import CodeBlock from "../components/CodeBlock/CodeBlock";
import { H2 } from "../components/Heading/Heading";
import { UnorderedList, ListItem } from "../components/List/List";

import cliImg from "../public/static/images/cli/screenshot.png";

const CLI = () => (
  <>
    <NextSeo
      title="CLI"
      description="AKA, the most useless Node module ever published, in history, by anyone, ever."
      openGraph={{
        title: "CLI",
      }}
    />

    <PageTitle>🤖 CLI</PageTitle>

    <Content>
      <Blockquote>
        <p>
          The <Link href="https://jarv.is/">Jake Jarvis</Link> CLI (aka the most useless Node module ever published, in
          history, by anyone, ever).
        </p>
      </Blockquote>

      <a href="https://www.npmjs.com/package/@jakejarvis/cli" target="_blank" rel="noopener noreferrer">
        <Image src={cliImg} alt="Terminal Screenshot" priority />
      </a>

      <H2>Usage</H2>
      <CodeBlock className="code-highlight">npx @jakejarvis/cli</CodeBlock>

      <H2>Inspired by</H2>
      <UnorderedList>
        <ListItem>
          <Link href="https://github.com/sindresorhus/sindresorhus-cli">@sindresorhus/sindresorhus-cli</Link>
        </ListItem>
        <ListItem>
          <Link href="https://github.com/yg/ygcodes">@yg/ygcodes</Link>
        </ListItem>
      </UnorderedList>

      <H2>Built with</H2>
      <UnorderedList>
        <ListItem>
          <Link href="https://github.com/vadimdemedes/ink">ink</Link> - React for interactive command-line apps
        </ListItem>
        <ListItem>
          <Link href="https://github.com/sindresorhus/meow">meow</Link> - CLI helper
        </ListItem>
      </UnorderedList>
      <p>
        <Link href="https://github.com/jakejarvis/jakejarvis/tree/main/cli" target="_blank" rel="noreferrer">
          View source on GitHub.
        </Link>
      </p>

      <H2>License</H2>
      <p>
        MIT &copy; <Link href="https://jarv.is/">Jake Jarvis</Link>,{" "}
        <Link href="https://sindresorhus.com">Sindre Sorhus</Link>
      </p>
    </Content>
  </>
);

export default CLI;

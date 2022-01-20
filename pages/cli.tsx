import Image from "next/image";
import { NextSeo } from "next-seo";
import Content from "../components/Content/Content";
import PageTitle from "../components/PageTitle/PageTitle";
import Blockquote from "../components/Blockquote/Blockquote";
import CodeBlock from "../components/CodeBlock/CodeBlock";
import { H2 } from "../components/Heading/Heading";
import { BotIcon } from "../components/Icons";

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

    <PageTitle>
      <BotIcon /> CLI
    </PageTitle>

    <Content>
      <Blockquote>
        <p>
          The{" "}
          <a href="https://jarv.is/" target="_blank" rel="noopener noreferrer">
            Jake Jarvis
          </a>{" "}
          CLI (aka the most useless Node module ever published, in history, by anyone, ever).
        </p>
      </Blockquote>

      <a
        className="no-underline"
        href="https://www.npmjs.com/package/@jakejarvis/cli"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={cliImg} placeholder="blur" alt="Terminal Screenshot" priority />
      </a>

      <H2>Usage</H2>
      <CodeBlock className="code-highlight">npx @jakejarvis/cli</CodeBlock>

      <H2>Inspired by</H2>
      <ul>
        <li>
          <a href="https://github.com/sindresorhus/sindresorhus-cli" target="_blank" rel="noopener noreferrer">
            @sindresorhus/sindresorhus-cli
          </a>
        </li>
        <li>
          <a href="https://github.com/yg/ygcodes" target="_blank" rel="noopener noreferrer">
            @yg/ygcodes
          </a>
        </li>
      </ul>

      <H2>Built with</H2>
      <ul>
        <li>
          <a href="https://github.com/vadimdemedes/ink" target="_blank" rel="noopener noreferrer">
            ink
          </a>{" "}
          - React for interactive command-line apps
        </li>
        <li>
          <a href="https://github.com/sindresorhus/meow" target="_blank" rel="noopener noreferrer">
            meow
          </a>{" "}
          - CLI helper
        </li>
      </ul>
      <p>
        <a href="https://github.com/jakejarvis/jakejarvis/tree/main/cli" target="_blank" rel="noreferrer">
          View source on GitHub.
        </a>
      </p>

      <H2>License</H2>
      <p>
        MIT ©{" "}
        <a href="https://jarv.is/" target="_blank" rel="noopener noreferrer">
          Jake Jarvis
        </a>
        ,{" "}
        <a href="https://sindresorhus.com" target="_blank" rel="noopener noreferrer">
          Sindre Sorhus
        </a>
      </p>
    </Content>
  </>
);

export default CLI;

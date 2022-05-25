import { NextSeo } from "next-seo";
import Content from "../components/Content";
import PageTitle from "../components/PageTitle";
import Link from "../components/Link";
import IFrame from "../components/IFrame";
import { FathomLogo } from "../components/Icons";
import { styled } from "../lib/styles/stitches.config";
import { fathomSiteId, siteDomain } from "../lib/config";

const PoweredBy = styled("p", {
  textAlign: "center",
  marginBottom: 0,
  fontWeight: 475,
});

const FathomIcon = styled(FathomLogo, {
  width: "1.2em",
  height: "1.2em",
  verticalAlign: "-0.2em",
  margin: "0 0.15em",
  fill: "$text",
});

const Stats = () => {
  return (
    <>
      <NextSeo
        title="Stats"
        openGraph={{
          title: "Stats",
        }}
      />

      <PageTitle>📈 Stats</PageTitle>

      <Content>
        <PoweredBy>
          Powered by{" "}
          <Link href="https://usefathom.com/ref/ZEYG0O" underline={false}>
            <FathomIcon /> Fathom Analytics
          </Link>
        </PoweredBy>

        <IFrame
          src={`https://app.usefathom.com/share/${fathomSiteId}/${siteDomain}`}
          title="Fathom Analytics dashboard"
          height={600}
          allowScripts
        />
      </Content>
    </>
  );
};

export default Stats;

import { NextSeo } from "next-seo";
import Content from "../components/Content";
import PageTitle from "../components/PageTitle";
import Link from "../components/Link";
import Image from "../components/Image";
import CodeInline from "../components/CodeInline";
import { H2 } from "../components/Heading";
import { UnorderedList, ListItem } from "../components/List";

import desktopImg from "../public/static/images/uses/ventura.png";

const Uses = () => {
  return (
    <>
      <NextSeo
        title="/uses"
        description="Things I use daily."
        openGraph={{
          title: "/uses",
        }}
      />

      <PageTitle>/uses 💻</PageTitle>

      <Content>
        <p>
          <del>I regularly get messages asking about which tools I use to work.</del>
        </p>
        <p>
          Nobody has asked me what I use. Ever. But here's a list of my daily drivers and necessities anyways, mostly
          revolving around my Apple sheepy-ness. Inspired by <Link href="https://uses.tech/">many, many others</Link>.
          ❤️
        </p>

        <Image src={desktopImg} href={desktopImg.src} alt="My mess of a desktop." priority />

        <H2 id="hardware">🍎 Hardware</H2>
        <UnorderedList>
          <ListItem>
            <Link href="https://browser.geekbench.com/v5/cpu/8124907">
              <strong>MacBook Air</strong> (2020)
            </Link>
            <UnorderedList>
              <ListItem>Apple M1 (8‑core CPU, 8‑core GPU) 🏎️💨</ListItem>
              <ListItem>16 GB RAM</ListItem>
              <ListItem>1 TB SSD</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <Link href="https://browser.geekbench.com/v5/cpu/1074682">
              <strong>MacBook Pro 15"</strong> (Mid-2018)
            </Link>
            <UnorderedList>
              <ListItem>
                Core i9 @ 2.9 GHZ, <Link href="https://www.youtube.com/watch?v=Dx8J125s4cg">theoretically 🔥🧯🚒</Link>
              </ListItem>
              <ListItem>32 GB RAM</ListItem>
              <ListItem>1 TB SSD</ListItem>
              <ListItem>Radeon Pro 560X – 4 GB</ListItem>
              <ListItem>
                Most importantly, I haven't touched it since M1 stole my heart (for a third of the price). 💔
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <strong>iPhone 13 Pro</strong>
            <UnorderedList>
              <ListItem>512 GB in Graphite 😎</ListItem>
              <ListItem>
                <Link href="https://www.apple.com/shop/product/MM2J3ZM/A/iphone-13-pro-silicone-case-with-magsafe-abyss-blue">
                  Abyss Blue Silicone Case
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.apple.com/shop/product/MHLR3ZM/A/iphone-leather-wallet-with-magsafe-saddle-brown">
                  Saddle Brown Leather "Wallet"
                </Link>
              </ListItem>
              <ListItem>
                Belkin's MagSafe{" "}
                <Link href="https://www.apple.com/shop/product/HPBJ2ZM/A/belkin-car-vent-mount-pro-with-magsafe">
                  Car Vent Mount Pro
                </Link>{" "}
                is awesome too, btw.
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <strong>iPad Pro 10.5"</strong>
            <UnorderedList>
              <ListItem>256 GB in Space Gray</ListItem>
              <ListItem>Smart Keyboard &amp; Apple Pencil</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <strong>Apple Watch Series 6</strong> (GPS)
            <UnorderedList>
              <ListItem>Aluminum – Space Gray</ListItem>
              <ListItem>40mm (I have incredibly small wrists.)</ListItem>
              <ListItem>
                Usually with the{" "}
                <Link href="https://www.apple.com/shop/product/MLL02ZM/A/42mm-midnight-blue-sport-band-s-m-m-l">
                  Midnight Blue sport band
                </Link>
                , 🏳️‍🌈{" "}
                <Link href="https://www.apple.com/shop/product/MQ4F2AM/A/38mm-pride-edition-woven-nylon">
                  Pride Edition woven nylon band
                </Link>
                , or employee 🏋️{" "}
                <Link href="https://www.macrumors.com/2018/04/03/apple-employees-rewards-challenge/">
                  Close Your Rings Challenge woven nylon band
                </Link>
                .
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <strong>Google Pixel 4a</strong>
            <UnorderedList>
              <ListItem>For some recreational Android development and experimentation.</ListItem>
              <ListItem>
                Activated on <Link href="https://fi.google.com/">Google Fi</Link> during rare trips.
              </ListItem>
              <ListItem>
                Really just putting this here in a futile effort to prove I'm not a <em>complete</em> Apple sheep. 🐑
              </ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>

        <H2 id="development">💾 Development</H2>
        <UnorderedList>
          <ListItem>
            <Link href="https://iterm2.com/">
              <strong>iTerm 2</strong>
            </Link>
            <UnorderedList>
              <ListItem>
                My various{" "}
                <Link href="https://github.com/jakejarvis/dotfiles/blob/main/zsh/aliases.zsh">ZSH aliases</Link> and{" "}
                <Link href="https://github.com/jakejarvis/dotfiles/blob/main/zsh/functions.zsh">functions</Link> are in{" "}
                <Link href="https://github.com/jakejarvis/dotfiles">
                  my <CodeInline>.dotfiles</CodeInline> repository.
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://ohmyz.sh/">Oh My ZSH</Link>
                <UnorderedList>
                  <ListItem>
                    <Link href="https://github.com/zsh-users/zsh-autosuggestions">zsh-autosuggestions</Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://github.com/zsh-users/zsh-syntax-highlighting">zsh-syntax-highlighting</Link>
                  </ListItem>
                </UnorderedList>
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <Link href="https://code.visualstudio.com/">
              <strong>Visual Studio Code</strong>
            </Link>
            <UnorderedList>
              <ListItem>
                <Link href="https://github.com/jakejarvis/dotfiles/tree/main/vscode">All of my settings.</Link>
              </ListItem>
              <ListItem>
                Themes:
                <UnorderedList>
                  <ListItem>
                    <Link href="https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme">
                      GitHub Dark theme
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme">
                      Material Icon theme
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://developer.apple.com/fonts/">SF Mono font</Link>
                  </ListItem>
                </UnorderedList>
              </ListItem>
              <ListItem>
                Extensions:
                <UnorderedList>
                  <ListItem>
                    <Link href="https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig">
                      EditorConfig
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint">
                      ESLint
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github">
                      GitHub Pull Requests
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://marketplace.visualstudio.com/items?itemName=GitHub.remotehub">
                      GitHub Repositories
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost">
                      Import Cost
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx">MDX</Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode">
                      Prettier
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack">
                      Remote Development Pack
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint">
                      Stylelint
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://marketplace.visualstudio.com/items?itemName=ms-vscode.wordcount">
                      Word Count
                    </Link>
                  </ListItem>
                </UnorderedList>
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <Link href="https://brew.sh/">
              <strong>Homebrew</strong>
            </Link>
            <UnorderedList>
              <ListItem>
                <Link href="https://github.com/jakejarvis/dotfiles/blob/main/Brewfile">
                  View my messy <CodeInline>Brewfile</CodeInline> dump
                </Link>{" "}
                with all of my installed packages.
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <Link href="https://developer.apple.com/xcode/">
              <strong>Xcode</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.docker.com/products/docker-desktop">
              <strong>Docker Desktop</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.parallels.com/products/desktop/">
              <strong>Parallels Desktop Pro</strong>
            </Link>
            <UnorderedList>
              <ListItem>
                Switched from VMware Fusion when Parallels beat them to the punch with{" "}
                <Link href="https://www.parallels.com/blogs/parallels-desktop-m1/">M1 support</Link>.
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <Link href="https://www.sketch.com/">
              <strong>Sketch</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.adobe.com/creativecloud.html">
              <strong>Adobe Creative Cloud</strong>
            </Link>
            <UnorderedList>
              <ListItem>
                Still on the $20/month{" "}
                <Link href="https://www.adobe.com/creativecloud/buy/students.html">Student Plan</Link>, somehow. 🤫 Will
                need to re-evaulate once I'm kicked off; it's hard to justify spending almost 3x that...
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <Link href="https://panic.com/transmit/">
              <strong>Transmit</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.sequelpro.com/">
              <del>Sequel Pro</del>
            </Link>{" "}
            →{" "}
            <Link href="https://tableplus.com/">
              <strong>TablePlus</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://robomongo.org/">
              <del>Robo 3T</del>
            </Link>{" "}
            →{" "}
            <Link href="https://tableplus.com/">
              <strong>TablePlus</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://imageoptim.com/mac">
              <strong>ImageOptim</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://sipapp.io/">
              <strong>Sip</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://localwp.com/">
              <strong>Local</strong>
            </Link>{" "}
            for WordPress development.
          </ListItem>
        </UnorderedList>

        <H2 id="browsing">🌎 Browsing</H2>
        <UnorderedList>
          <ListItem>
            <Link href="https://www.mozilla.org/en-US/firefox/new/">
              <strong>Firefox</strong>
            </Link>{" "}
            🦊
            <UnorderedList>
              <ListItem>
                <Link href="https://github.com/jakejarvis/dotfiles/blob/main/firefox/user.js">
                  My default <CodeInline>user.js</CodeInline> settings.
                </Link>
              </ListItem>
              <ListItem>
                Extensions:
                <UnorderedList>
                  <ListItem>
                    <Link href="https://support.1password.com/cs/1password-classic-extension/">1Password Classic</Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://addons.mozilla.org/en-US/firefox/addon/betterttv/">BetterTTV</Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://addons.mozilla.org/en-US/firefox/addon/darkreader/">Dark Reader</Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://addons.mozilla.org/en-US/firefox/addon/decentraleyes/">Decentraleyes</Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://addons.mozilla.org/en-US/firefox/addon/mailvelope/">Mailvelope</Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://addons.mozilla.org/en-US/firefox/addon/react-devtools/">
                      React Developer Tools
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://addons.mozilla.org/en-US/firefox/addon/octolinker/">OctoLinker</Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://addons.mozilla.org/en-US/firefox/addon/privacy-badger17/">Privacy Badger</Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/">uBlock Origin</Link>
                  </ListItem>
                </UnorderedList>
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <Link href="https://www.google.com/chrome/browser/?extra=devchannel">
              <strong>Google Chrome</strong>
            </Link>{" "}
            😈
            <UnorderedList>
              <ListItem>
                For testing only! See more of <Link href="#cloud">my de-Googling efforts below</Link>.
              </ListItem>
              <ListItem>
                Extensions:
                <UnorderedList>
                  <ListItem>
                    <Link href="https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc?hl=en">
                      AMP Validator
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?h1=en">
                      Lighthouse
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en">
                      React Developer Tools
                    </Link>
                  </ListItem>
                </UnorderedList>
              </ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>

        <H2 id="macos">💻 macOS</H2>
        <UnorderedList>
          <ListItem>
            <Link href="https://1password.com/">
              <strong>1Password</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.obdev.at/products/littlesnitch/index.html">
              <strong>Little Snitch</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://bjango.com/mac/istatmenus/">
              <strong>iStat Menus</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.backblaze.com/">
              <strong>Backblaze</strong>
            </Link>{" "}
            <Link href="https://secure.backblaze.com/r/00x84e">(referral link)</Link>
          </ListItem>
          <ListItem>
            <Link href="https://github.com/billycastelli/Silicon-Info">
              <strong>Silicon Info</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.corecode.io/macupdater/">
              <strong>MacUpdater</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://freemacsoft.net/appcleaner/">
              <strong>AppCleaner</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://gpgtools.org/">
              <strong>GPG Suite</strong>
            </Link>
          </ListItem>
          <ListItem>
            <del>VLC</del> →{" "}
            <Link href="https://iina.io/">
              <strong>IINA</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://transmissionbt.com/">
              <strong>Transmission</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://roaringapps.com/app/amphetamine">
              <strong>Amphetamine</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://coconut-flavour.com/coconutbattery/">
              <strong>coconutBattery</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://theunarchiver.com/">
              <strong>The Unarchiver</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://unshaky.nestederror.com/">
              <strong>Unshaky</strong>
            </Link>{" "}
            ⌨️ (on my 2018 MBP)
            <UnorderedList>
              <ListItem>
                Toooo &nbsp;lzy too vist &nbsp;&nbsp;the&nbsp; Aple Stre geeniusses oonce &nbsp;agin&nbsp; to fiix
                tthe&nbsp; keeybbbboord. 😒🦋
              </ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>

        <H2 id="ios">📱 iOS</H2>
        <p>I have far too many apps to count, but here the essentials that have earned a spot on my home screen:</p>
        <UnorderedList>
          <ListItem>
            <Link href="https://apps.apple.com/app/id568903335">
              <strong>1Password</strong> (beta)
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://apps.apple.com/app/id323229106">
              <strong>Waze</strong> (beta)
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://apps.apple.com/app/id585027354">
              <strong>Google Maps</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://apps.apple.com/app/id1193350206">
              <strong>YouTube TV</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://apps.apple.com/app/id317951436">
              <strong>SiriusXM</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://apps.apple.com/app/id379693831">
              <strong>Audible</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://apps.apple.com/app/id414834813">
              <strong>Pocket Casts</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://apps.apple.com/app/id1488977981">
              <strong>Sonos</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://apps.apple.com/app/id383457673">
              <strong>Plex</strong> (beta)
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://apps.apple.com/app/id985746746">
              <strong>Discord</strong>
            </Link>
          </ListItem>
        </UnorderedList>

        <H2 id="cloud">☁️ Cloud</H2>
        <p>
          I've been making recent efforts to <Link href="https://www.stallman.org/google.html">de-Google</Link> my life,
          with mixed results...
        </p>
        <UnorderedList>
          <ListItem>
            <del>Gmail</del> →{" "}
            <Link href="https://www.fastmail.com/">
              <strong>Fastmail</strong>
            </Link>{" "}
            <Link href="https://ref.fm/u20274504">(referral link)</Link> &amp;{" "}
            <Link href="https://en.wikipedia.org/wiki/Apple_Mail">
              <strong>Mail.app</strong>
            </Link>
          </ListItem>
          <ListItem>
            <del>Google Drive</del> → <del>Dropbox</del> →{" "}
            <Link href="https://www.icloud.com/iclouddrive">
              <strong>iCloud Drive</strong>
            </Link>
            <UnorderedList>
              <ListItem>
                <Link href="/notes/dropping-dropbox/">Read why.</Link>
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <del>Google Docs</del> →{" "}
            <Link href="https://products.office.com/en-us/mac/microsoft-office-for-mac">
              <strong>Microsoft Office</strong>
            </Link>{" "}
            (hey, it works 🤷)
          </ListItem>
          <ListItem>
            <del>Google Photos</del> →{" "}
            <Link href="https://www.icloud.com/photos/">
              <strong>iCloud Photos</strong>
            </Link>
          </ListItem>
          <ListItem>
            <del>Google Analytics</del> →{" "}
            <Link href="https://usefathom.com/">
              <strong>Fathom Analytics</strong>
            </Link>{" "}
            <Link href="https://usefathom.com/ref/ZEYG0O">(referral link)</Link>
          </ListItem>
          <ListItem>
            <del>Google Public DNS</del> →{" "}
            <Link href="https://1.1.1.1/dns/">
              <strong>Cloudflare's 1.1.1.1</strong>
            </Link>{" "}
            on my home network.
          </ListItem>
          <ListItem>
            <del>GoDaddy</del> → <del>Google Domains</del> →{" "}
            <Link href="https://www.cloudflare.com/products/registrar/">
              <strong>Cloudflare Registrar</strong>
            </Link>{" "}
            (and{" "}
            <Link href="https://isnic.is/en/">
              <strong>ISNIC</strong>
            </Link>{" "}
            for this domain, of course 🇮🇸)
          </ListItem>
        </UnorderedList>

        <p>Other geeky stuff:</p>
        <UnorderedList>
          <ListItem>
            <Link href="https://vercel.com/">
              <strong>Vercel</strong>
            </Link>{" "}
            and{" "}
            <Link href="https://www.netlify.com/">
              <strong>Netlify</strong>
            </Link>{" "}
            for "serverless" sites.
          </ListItem>
          <ListItem>
            <Link href="https://www.digitalocean.com/">
              <strong>DigitalOcean</strong>
            </Link>{" "}
            <Link href="https://m.do.co/c/afcf288a7dac">(referral link)</Link> and{" "}
            <Link href="https://www.linode.com/">
              <strong>Linode</strong>
            </Link>{" "}
            <Link href="https://www.linode.com/?r=0c5aeace9bd591be9fbf32f96f58470295f1ee05">(referral link)</Link> for
            virtual Linux servers.
          </ListItem>
          <ListItem>
            <Link href="https://dnsimple.com/">
              <strong>DNSimple</strong>
            </Link>{" "}
            <Link href="https://dnsimple.com/r/eb6ced548f1e0a">(referral link)</Link> and{" "}
            <Link href="https://www.cloudflare.com/">
              <strong>Cloudflare</strong>
            </Link>{" "}
            for domain DNS.
          </ListItem>
          <ListItem>
            <Link href="https://www.backblaze.com/">
              <strong>Backblaze</strong>
            </Link>{" "}
            <Link href="https://secure.backblaze.com/r/00x84e">(referral link)</Link> for off-site Mac backups.
          </ListItem>
          <ListItem>
            <Link href="https://gitea.io/en-us/">
              <strong>Gitea</strong>
            </Link>{" "}
            as a <Link href="https://git.jarv.is/">self-hosted</Link> Git backup/mirror.
          </ListItem>
          <ListItem>
            <Link href="https://tailscale.com/">
              <strong>Tailscale</strong>
            </Link>{" "}
            and{" "}
            <Link href="https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/">
              <strong>Cloudflare Tunnel</strong>
            </Link>{" "}
            to access my home network and VPSes from anywhere.
          </ListItem>
        </UnorderedList>

        <H2 id="iot">
          🏠 Internet of <del>Things</del> <Link href="/notes/shodan-search-queries/">Crap</Link>
        </H2>
        <UnorderedList>
          <ListItem>
            <Link href="https://www.tp-link.com/us/home-networking/wifi-router/archer-ax90/">
              <strong>TP-Link Archer AX90</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.amazon.com/dp/B00HWML468/">
              <strong>Dell Inspiron 3647</strong>
            </Link>
            , upgraded to a Core i7-4790S and 16 GB of memory to dress it up as a <em>really</em> crappy{" "}
            <Link href="https://www.vmware.com/products/esxi-and-esx.html">
              <strong>VMware ESXi</strong>
            </Link>{" "}
            server, running a few Ubuntu VMs with:
            <UnorderedList>
              <ListItem>
                <Link href="https://www.plex.tv/">Plex</Link>
              </ListItem>
              <ListItem>
                <Link href="https://sonarr.tv/">Sonarr</Link>{" "}
              </ListItem>
              <ListItem>
                <Link href="https://radarr.video/">Radarr</Link>
              </ListItem>
              <ListItem>
                <Link href="https://transmissionbt.com/">Transmission</Link> (via web client)
              </ListItem>
              <ListItem>
                <Link href="https://homebridge.io/">Homebridge</Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.wireguard.com/">WireGuard</Link>
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <Link href="https://www2.meethue.com/en-us">
              <strong>Philips Hue</strong>
            </Link>{" "}
            color bulbs, dimmer switches, etc.
          </ListItem>
          <ListItem>
            2x{" "}
            <Link href="https://www.ecobee.com/en-us/smart-thermostats/smart-wifi-thermostat/">
              <strong>ecobee3 lite</strong>
            </Link>{" "}
            smart thermostats (HomeKit support was a must.)
          </ListItem>
          <ListItem>
            2x{" "}
            <Link href="https://www.sonos.com/en-us/shop/one.html">
              <strong>Sonos One</strong>
            </Link>{" "}
            (with Alexa turned off...allegedly.)
          </ListItem>
          <ListItem>
            2x{" "}
            <Link href="https://www.apple.com/apple-tv-4k/">
              <strong>Apple TV 4K</strong> (2021)
            </Link>
          </ListItem>
        </UnorderedList>
      </Content>
    </>
  );
};

export default Uses;

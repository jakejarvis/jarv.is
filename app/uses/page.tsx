import Content from "../../components/Content";
import PageTitle from "../../components/PageTitle";
import Link from "../../components/Link";
import Image from "../../components/Image";
import CodeInline from "../../components/CodeInline";
import { H2 } from "../../components/Heading";
import { UnorderedList, ListItem } from "../../components/List";
import type { Metadata, Route } from "next";

import desktopImg from "../../public/static/images/uses/desktop.png";

export const metadata: Metadata = {
  title: "/uses",
  description: "Things I use daily.",
  openGraph: {
    title: "/uses",
    images: [desktopImg.src],
  },
};

export default function Page() {
  return (
    <>
      <PageTitle>/uses</PageTitle>

      <Content>
        <p>
          <del>I regularly get messages asking about which tools I use to work.</del>
        </p>
        <p>
          Nobody has asked me what I use. Ever. But here's a list of my daily drivers and necessities anyways, mostly
          revolving around my Apple sheepy-ness. Inspired by <Link href="https://uses.tech/">many, many others</Link>.
          ❤️
        </p>

        <Image src={desktopImg} href={desktopImg.src as Route} alt="My mess of a desktop." priority />

        <H2 id="hardware">
          <span style={{ marginRight: "0.45em" }}>🚘</span>
          Daily Drivers
        </H2>
        <UnorderedList>
          <ListItem>
            <Link href="https://browser.geekbench.com/v6/cpu/4493541">
              <strong>MacBook Pro</strong> (14-inch)
            </Link>
            <UnorderedList>
              <ListItem>Apple M3 Pro (12‑core CPU, 18‑core GPU) 🏎️💨</ListItem>
              <ListItem>36 GB RAM</ListItem>
              <ListItem>1 TB SSD</ListItem>
              <ListItem>Space Black 🖤</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <strong>iPhone 15 Pro</strong>
            <UnorderedList>
              <ListItem>512 GB in Natural Titanium</ListItem>
              <ListItem>
                <Link href="https://a.co/d/5ixA4kx">TORRAS Magnetic Shockproof Case</Link> (surprisingly nice, also in
                Natural Titanium)
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
                Activated on <Link href="https://fi.google.com/">Google Fi</Link> (
                <Link href="https://g.co/fi/r/4X38K6">referral link</Link>) during rare trips.
              </ListItem>
              <ListItem>
                Really just putting this here in a futile effort to prove I'm not a <em>complete</em> Apple sheep. 🐑
              </ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>

        <H2 id="homelab">
          <span style={{ marginRight: "0.45em" }}>🧪</span>
          Homelab
        </H2>
        <UnorderedList>
          <ListItem>
            <Link href="https://store.ui.com/us/en/collections/unifi-dream-router/products/udr">
              <strong>UniFi Dream Router</strong>
            </Link>
            , plus:
            <UnorderedList>
              <ListItem>
                2x{" "}
                <Link href="https://store.ui.com/us/en/collections/unifi-switching-utility-mini/products/usw-flex-mini">
                  Switch Flex Mini
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://store.ui.com/us/en/products/unifi-smart-power">SmartPower Plug</Link>{" "}
                <em>
                  (<Link href="https://www.youtube.com/watch?v=iW1tHr4Y_cI">It's Comcastic!™</Link>)
                </em>
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <Link href="https://www.synology.com/en-us/products/DS224+">
              <strong>Synology DiskStation DS224+</strong>
            </Link>
            <UnorderedList>
              <ListItem>
                2x recertified{" "}
                <Link href="https://serverpartdeals.com/products/western-digital-ultrastar-dc-hc550-wuh721816ale6l4-0f38462-16tb-7-2k-rpm-sata-6gb-s-512e-512mb-3-5-se-manufacturer-recertified-hdd">
                  16TB WD Ultrastar
                </Link>{" "}
                drives
              </ListItem>
              <ListItem>
                <Link href="https://www.plex.tv/personal-media-server/">
                  <strong>Plex</strong>
                </Link>{" "}
                (installed as a package via{" "}
                <Link href="https://github.com/michealespinola/syno.plexupdate">
                  <CodeInline>syno.plexupdate</CodeInline>
                </Link>{" "}
                for hardware encoding)
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            A <strong>🥧 Raspberry Pi</strong> <Link href="https://a.co/d/bmii52A">cluster</Link> with:
            <UnorderedList>
              <ListItem>
                1x <Link href="https://www.raspberrypi.com/products/raspberry-pi-4-model-b/">Raspberry Pi 4B</Link>, 8GB
                RAM
              </ListItem>
              <UnorderedList>
                <ListItem>
                  Running <Link href="https://www.home-assistant.io/">Home Assistant OS</Link> with a{" "}
                  <Link href="https://www.home-assistant.io/skyconnect/">SkyConnect USB Dongle</Link>
                </ListItem>
              </UnorderedList>
              <ListItem>
                2x <Link href="https://www.raspberrypi.com/products/raspberry-pi-5/">Raspberry Pi 5</Link>, 4GB RAM
              </ListItem>
              <UnorderedList>
                <ListItem>
                  Running{" "}
                  <Link href="https://github.com/jakejarvis/dotfiles/tree/main/lab">a few Docker containers</Link>,
                  including:
                  <UnorderedList>
                    <ListItem>
                      <Link href="https://nextcloud.com/">Nextcloud</Link>
                    </ListItem>
                    <ListItem>
                      <Link href="https://sonarr.tv/">Sonarr</Link>, <Link href="https://radarr.video/">Radarr</Link>,{" "}
                      <Link href="https://www.bazarr.media/">Bazarr</Link>,{" "}
                      <Link href="https://github.com/Prowlarr/Prowlarr">Prowlarr</Link>
                    </ListItem>
                    <ListItem>
                      <Link href="https://www.qbittorrent.org/">qBittorrent</Link> (web client)
                    </ListItem>
                    <ListItem>
                      <Link href="https://tautulli.com/">Tautulli</Link>
                    </ListItem>
                    <ListItem>
                      <Link href="https://www.wireguard.com/">WireGuard</Link>
                    </ListItem>
                    <ListItem>
                      <Link href="https://traefik.io/traefik/">Traefik</Link>
                    </ListItem>
                    <ListItem>
                      <Link href="https://www.authelia.com/">Authelia</Link>
                    </ListItem>
                  </UnorderedList>
                </ListItem>
                <ListItem>Full post with more details coming soon!</ListItem>
              </UnorderedList>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <strong>An overpowered custom homelab server</strong>, powered by an{" "}
            <Link href="https://www.asus.com/commercial-motherboard/q87me/">ASUS Q87M-E</Link> board,{" "}
            <Link href="https://www.intel.com/content/www/us/en/products/sku/80808/intel-core-i74790s-processor-8m-cache-up-to-4-00-ghz/specifications.html">
              i7-4790S
            </Link>
            , 32 GB of RAM, 2x recertified{" "}
            <Link href="https://serverpartdeals.com/products/hgst-ultrastar-he10-0f27612-huh721008ale604-8tb-7-2k-rpm-sata-6gb-s-512e-256mb-cache-3-5-se-manufacturer-recertified-hdd">
              16TB WD Ultrastar
            </Link>{" "}
            drives, and <Link href="https://www.proxmox.com/en/proxmox-virtual-environment/overview">Proxmox VE</Link>,
            in a cheap <Link href="https://www.thermaltakeusa.com/versa-h22.html">Thermaltake Versa H22</Link> case with
            expensive <Link href="https://noctua.at/en/nf-a12x25-pwm">Noctua 🤎</Link> fans.
          </ListItem>
        </UnorderedList>

        <H2 id="development">
          <span style={{ marginRight: "0.45em" }}>💾</span>
          Development
        </H2>
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

        <H2 id="browsing">
          <span style={{ marginRight: "0.45em" }}>🌎</span>
          Browsing
        </H2>
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

        <H2 id="macos">
          <span style={{ marginRight: "0.45em" }}>💻</span>
          macOS
        </H2>
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
            (<Link href="https://secure.backblaze.com/r/00x84e">referral link</Link>)
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
            <Link href="https://www.tunabellysoftware.com/tgpro/">
              <strong>TG Pro</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://coconut-flavour.com/coconutbattery/">
              <strong>coconutBattery</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.keka.io/en/">
              <strong>Keka</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://tapbots.com/ivory/mac/">
              <strong>Ivory</strong>
            </Link>
          </ListItem>
        </UnorderedList>

        <H2 id="ios">
          <span style={{ marginRight: "0.45em" }}>📱</span>
          iOS
        </H2>
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
            <Link href="https://apps.apple.com/app/id414834813">
              <strong>Pocket Casts</strong>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://apps.apple.com/app/id945077360">
              <strong>Sling TV</strong>
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
          <ListItem>
            <Link href="https://apps.apple.com/app/id1057750338">
              <strong>UniFi</strong>
            </Link>{" "}
            and{" "}
            <Link href="https://apps.apple.com/app/id1385561119">
              <strong>WiFiman</strong>
            </Link>
          </ListItem>
        </UnorderedList>

        <H2 id="cloud">
          <span style={{ marginRight: "0.45em" }}>☁️</span>
          Cloud
        </H2>
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
            (<Link href="https://ref.fm/u20274504">referral link</Link>) &amp;{" "}
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
                <Link href={"/notes/dropping-dropbox/" as Route}>Read why.</Link>
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
            (<Link href="https://usefathom.com/ref/ZEYG0O">referral link</Link>)
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
            (<Link href="https://m.do.co/c/afcf288a7dac">referral link</Link>) and{" "}
            <Link href="https://www.linode.com/">
              <strong>Linode</strong>
            </Link>{" "}
            (<Link href="https://www.linode.com/?r=0c5aeace9bd591be9fbf32f96f58470295f1ee05">referral link</Link>) for
            virtual Linux servers.
          </ListItem>
          <ListItem>
            <Link href="https://dnsimple.com/">
              <strong>DNSimple</strong>
            </Link>{" "}
            (<Link href="https://dnsimple.com/r/eb6ced548f1e0a">referral link</Link>) and{" "}
            <Link href="https://www.cloudflare.com/">
              <strong>Cloudflare</strong>
            </Link>{" "}
            for domain DNS.
          </ListItem>
          <ListItem>
            <Link href="https://www.backblaze.com/">
              <strong>Backblaze</strong>
            </Link>{" "}
            (<Link href="https://secure.backblaze.com/r/00x84e">referral link</Link>) for off-site Mac backups.
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
            <Link href="https://developers.cloudflare.com/cloudflare-one/">
              <strong>Cloudflare Zero Trust</strong>
            </Link>{" "}
            to access my home network and VPSes from anywhere.
          </ListItem>
        </UnorderedList>

        <H2 id="iot">
          <span style={{ marginRight: "0.45em" }}>🏠</span>
          Internet of <del>Things</del> <Link href={"/notes/shodan-search-queries/" as Route}>Crap</Link>
        </H2>
        <UnorderedList>
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
            </Link>
          </ListItem>
          <ListItem>
            2x{" "}
            <Link href="https://www.sonos.com/en-us/shop/one.html">
              <strong>Sonos One</strong>
            </Link>{" "}
            (with Alexa turned off...hopefully? 🤫)
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
}

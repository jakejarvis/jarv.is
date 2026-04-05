import { createFileRoute } from "@tanstack/react-router";

import desktopImg from "@/app/uses/desktop.png";
import { PageTitle } from "@/components/layout/page-title";
import { createHead } from "@/lib/head";

export const Route = createFileRoute("/uses")({
  head: () =>
    createHead({
      title: "/uses",
      description: "Things I use daily.",
      canonical: "/uses",
    }),
  component: UsesPage,
});

function UsesPage() {
  return (
    <>
      <PageTitle canonical="/uses">Uses</PageTitle>

      <div className="prose prose-neutral dark:prose-invert prose-sm max-w-none">
        <p>
          <del>I regularly get messages asking about which tools I use to work.</del>
        </p>
        <p>
          Nobody has asked me what I use. Ever. But here&apos;s a list of my daily drivers and
          necessities anyways, mostly revolving around my Apple sheepy-ness. Inspired by{" "}
          <a href="https://uses.tech/" target="_blank" rel="noopener noreferrer">
            many, many others
          </a>
          .
        </p>

        {/* biome-ignore lint/performance/noImgElement: not using Next.js Image */}
        <img src={desktopImg} alt="My mess of a desktop." />

        <h2>Daily Drivers</h2>

        <ul>
          <li>
            <a
              href="https://browser.geekbench.com/v6/cpu/4493541"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>MacBook Pro</strong> (14-inch)
            </a>
            <ul>
              <li>Apple M3 Pro (12-core CPU, 18-core GPU)</li>
              <li>36 GB RAM</li>
              <li>1 TB SSD</li>
              <li>Space Black</li>
            </ul>
          </li>
          <li>
            <strong>iPhone 15 Pro</strong>
            <ul>
              <li>512 GB in Natural Titanium</li>
              <li>
                <a href="https://a.co/d/75zuyyY" target="_blank" rel="noopener noreferrer">
                  Anker MagGo Matte case
                </a>{" "}
                (surprisingly nice!)
              </li>
            </ul>
          </li>
          <li>
            <strong>iPad Pro 10.5&quot;</strong>
            <ul>
              <li>256 GB in Space Gray</li>
              <li>Smart Keyboard &amp; Apple Pencil</li>
            </ul>
          </li>
          <li>
            <strong>Apple Watch Series 9</strong> (Cellular + GPS)
            <ul>
              <li>Aluminum &ndash; Midnight</li>
              <li>41mm (I have incredibly small wrists.)</li>
              <li>
                Usually with the{" "}
                <a
                  href="https://www.apple.com/shop/product/MLL02ZM/A/42mm-midnight-blue-sport-band-s-m-m-l"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Midnight Blue sport band
                </a>
                ,{" "}
                <a
                  href="https://www.apple.com/shop/product/MQ4F2AM/A/38mm-pride-edition-woven-nylon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pride Edition woven nylon band
                </a>
                , or employee{" "}
                <a
                  href="https://www.macrumors.com/2018/04/03/apple-employees-rewards-challenge/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Close Your Rings Challenge woven nylon band
                </a>
                .
              </li>
            </ul>
          </li>
        </ul>

        <h2>Homelab</h2>

        <ul>
          <li>
            <a
              href="https://store.ui.com/us/en/products/udm-se"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>UniFi Dream Machine SE</strong>
            </a>
            , plus:
            <ul>
              <li>
                <a
                  href="https://store.ui.com/us/en/products/usw-enterprise-8-poe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Switch Enterprise 8 PoE
                </a>
              </li>
              <li>
                2x{" "}
                <a
                  href="https://store.ui.com/us/en/products/u7-pro"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  U7 Pro access points
                </a>
              </li>
              <li>
                2x{" "}
                <a
                  href="https://store.ui.com/us/en/products/usw-flex-2-5g-5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Switch Flex Mini 2.5G
                </a>
              </li>
              <li>
                <a
                  href="https://store.ui.com/us/en/products/uci"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  UCI modem
                </a>{" "}
                <em>
                  (
                  <a
                    href="https://www.youtube.com/watch?v=iW1tHr4Y_cI"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    It&apos;s Comcastic!&trade;
                  </a>
                  )
                </em>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="https://www.synology.com/en-us/products/DS224+"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Synology DiskStation DS224+</strong>
            </a>
            <ul>
              <li>
                2x recertified{" "}
                <a
                  href="https://serverpartdeals.com/products/western-digital-ultrastar-dc-hc550-wuh721816ale6l4-0f38462-16tb-7-2k-rpm-sata-6gb-s-512e-512mb-3-5-se-manufacturer-recertified-hdd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  16TB WD Ultrastar
                </a>{" "}
                drives
              </li>
              <li>
                <a
                  href="https://www.plex.tv/personal-media-server/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>Plex</strong>
                </a>{" "}
                (installed as a package via{" "}
                <a
                  href="https://github.com/michealespinola/syno.plexupdate"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <code>syno.plexupdate</code>
                </a>{" "}
                for hardware encoding)
              </li>
            </ul>
          </li>
          <li>
            2x{" "}
            <a
              href="https://www.servethehome.com/dell-optiplex-7060-micro-tinyminimicro-at-65w-tdp-cpu-overview/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Dell Optiplex 7060 Micro</strong>
            </a>{" "}
            mini PCs
            <ul>
              <li>
                Both are running{" "}
                <a
                  href="https://www.proxmox.com/en/products/proxmox-virtual-environment/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>Proxmox VE</strong>
                </a>{" "}
                with various VMs and LXC containers spread between the two, including:
                <ul>
                  <li>
                    <a
                      href="https://www.home-assistant.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Home Assistant
                    </a>
                  </li>
                  <li>
                    <a href="https://homebridge.io/" target="_blank" rel="noopener noreferrer">
                      Homebridge
                    </a>
                  </li>
                  <li>
                    <a href="https://www.scrypted.app/" target="_blank" rel="noopener noreferrer">
                      Scrypted
                    </a>
                  </li>
                  <li>
                    <a href="https://gethomepage.dev/" target="_blank" rel="noopener noreferrer">
                      Homepage
                    </a>
                  </li>
                  <li>
                    <a href="https://about.gitea.com/" target="_blank" rel="noopener noreferrer">
                      Gitea
                    </a>
                  </li>
                  <li>
                    <a href="https://immich.app/" target="_blank" rel="noopener noreferrer">
                      Immich
                    </a>
                  </li>
                  <li>
                    <a href="https://sonarr.tv/" target="_blank" rel="noopener noreferrer">
                      Sonarr
                    </a>
                    ,{" "}
                    <a href="https://radarr.video/" target="_blank" rel="noopener noreferrer">
                      Radarr
                    </a>
                    ,{" "}
                    <a href="https://www.bazarr.media/" target="_blank" rel="noopener noreferrer">
                      Bazarr
                    </a>
                    ,{" "}
                    <a
                      href="https://github.com/Prowlarr/Prowlarr"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Prowlarr
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.qbittorrent.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      qBittorrent
                    </a>{" "}
                    (web client)
                  </li>
                  <li>
                    <a href="https://tautulli.com/" target="_blank" rel="noopener noreferrer">
                      Tautulli
                    </a>
                  </li>
                  <li>
                    <a href="https://traefik.io/traefik/" target="_blank" rel="noopener noreferrer">
                      Traefik
                    </a>
                  </li>
                  <li>
                    <a href="https://www.authelia.com/" target="_blank" rel="noopener noreferrer">
                      Authelia
                    </a>
                  </li>
                </ul>
              </li>
              <li>Full post with more details coming soon!</li>
            </ul>
          </li>
        </ul>

        <h2>Development</h2>

        <ul>
          <li>
            <a href="https://iterm2.com/" target="_blank" rel="noopener noreferrer">
              <strong>iTerm 2</strong>
            </a>
            <ul>
              <li>
                My various{" "}
                <a
                  href="https://github.com/jakejarvis/dotfiles/blob/main/zsh/aliases.zsh"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ZSH aliases
                </a>{" "}
                and{" "}
                <a
                  href="https://github.com/jakejarvis/dotfiles/blob/main/zsh/functions.zsh"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  functions
                </a>{" "}
                are in{" "}
                <a
                  href="https://github.com/jakejarvis/dotfiles"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  my <code>.dotfiles</code> repository.
                </a>
              </li>
              <li>
                <a href="https://ohmyz.sh/" target="_blank" rel="noopener noreferrer">
                  Oh My ZSH
                </a>
                <ul>
                  <li>
                    <a
                      href="https://github.com/zsh-users/zsh-autosuggestions"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      zsh-autosuggestions
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/zsh-users/zsh-syntax-highlighting"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      zsh-syntax-highlighting
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">
              <strong>Visual Studio Code</strong>
            </a>
            <ul>
              <li>
                <a
                  href="https://github.com/jakejarvis/dotfiles/tree/main/vscode"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  All of my settings.
                </a>
              </li>
              <li>
                Themes:
                <ul>
                  <li>
                    <a
                      href="https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub Dark theme
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Material Icon theme
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://developer.apple.com/fonts/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      SF Mono font
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                Extensions:
                <ul>
                  <li>
                    <a
                      href="https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      EditorConfig
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ESLint
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub Pull Requests
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Import Cost
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      MDX
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Prettier
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Stylelint
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a href="https://brew.sh/" target="_blank" rel="noopener noreferrer">
              <strong>Homebrew</strong>
            </a>
            <ul>
              <li>
                <a
                  href="https://github.com/jakejarvis/dotfiles/blob/main/Brewfile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View my messy <code>Brewfile</code> dump
                </a>{" "}
                with all of my installed packages.
              </li>
            </ul>
          </li>
          <li>
            <a href="https://developer.apple.com/xcode/" target="_blank" rel="noopener noreferrer">
              <strong>Xcode</strong>
            </a>
          </li>
          <li>
            <a
              href="https://www.docker.com/products/docker-desktop"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Docker Desktop</strong>
            </a>
          </li>
          <li>
            <a
              href="https://www.parallels.com/products/desktop/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Parallels Desktop Pro</strong>
            </a>
            <ul>
              <li>
                Switched from VMware Fusion when Parallels beat them to the punch with{" "}
                <a
                  href="https://www.parallels.com/blogs/parallels-desktop-m1/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  M1 support
                </a>
                .
              </li>
            </ul>
          </li>
          <li>
            <a href="https://www.sketch.com/" target="_blank" rel="noopener noreferrer">
              <strong>Sketch</strong>
            </a>
          </li>
          <li>
            <a
              href="https://www.adobe.com/creativecloud.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Adobe Creative Cloud</strong>
            </a>
            <ul>
              <li>
                Still on the $20/month{" "}
                <a
                  href="https://www.adobe.com/creativecloud/buy/students.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Student Plan
                </a>
                , somehow. Will need to re-evaulate once I&apos;m kicked off; it&apos;s hard to
                justify spending almost 3x that...
              </li>
            </ul>
          </li>
          <li>
            <a href="https://panic.com/transmit/" target="_blank" rel="noopener noreferrer">
              <strong>Transmit</strong>
            </a>
          </li>
          <li>
            <del>
              <a href="https://www.sequelpro.com/" target="_blank" rel="noopener noreferrer">
                Sequel Pro
              </a>
            </del>{" "}
            &rarr;{" "}
            <a href="https://tableplus.com/" target="_blank" rel="noopener noreferrer">
              <strong>TablePlus</strong>
            </a>
          </li>
          <li>
            <del>
              <a href="https://robomongo.org/" target="_blank" rel="noopener noreferrer">
                Robo 3T
              </a>
            </del>{" "}
            &rarr;{" "}
            <a href="https://tableplus.com/" target="_blank" rel="noopener noreferrer">
              <strong>TablePlus</strong>
            </a>
          </li>
          <li>
            <a href="https://imageoptim.com/mac" target="_blank" rel="noopener noreferrer">
              <strong>ImageOptim</strong>
            </a>
          </li>
          <li>
            <a href="https://sipapp.io/" target="_blank" rel="noopener noreferrer">
              <strong>Sip</strong>
            </a>
          </li>
          <li>
            <a href="https://localwp.com/" target="_blank" rel="noopener noreferrer">
              <strong>Local</strong>
            </a>{" "}
            for WordPress development.
          </li>
        </ul>

        <h2>Browsing</h2>

        <ul>
          <li>
            <a
              href="https://www.mozilla.org/en-US/firefox/new/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Firefox</strong>
            </a>
            <ul>
              <li>
                <a
                  href="https://github.com/jakejarvis/dotfiles/blob/main/firefox/user.js"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  My default <code>user.js</code> settings.
                </a>
              </li>
              <li>
                Extensions:
                <ul>
                  <li>
                    <a
                      href="https://1password.com/downloads/browser-extension"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      1Password
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://addons.mozilla.org/en-US/firefox/addon/darkreader/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Dark Reader
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://addons.mozilla.org/en-US/firefox/addon/react-devtools/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      React Developer Tools
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://addons.mozilla.org/en-US/firefox/addon/octolinker/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      OctoLinker
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://addons.mozilla.org/en-US/firefox/addon/privacy-badger17/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Badger
                    </a>
                  </li>
                  <li>
                    <a href="https://raindrop.io/" target="_blank" rel="noopener noreferrer">
                      Raindrop.io
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      uBlock Origin
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>

        <h2>macOS</h2>

        <ul>
          <li>
            <a href="https://1password.com/" target="_blank" rel="noopener noreferrer">
              <strong>1Password</strong>
            </a>
          </li>
          <li>
            <a
              href="https://www.obdev.at/products/littlesnitch/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Little Snitch</strong>
            </a>
          </li>
          <li>
            <a href="https://bjango.com/mac/istatmenus/" target="_blank" rel="noopener noreferrer">
              <strong>iStat Menus</strong>
            </a>
          </li>
          <li>
            <a href="https://www.backblaze.com/" target="_blank" rel="noopener noreferrer">
              <strong>Backblaze</strong>
            </a>{" "}
            (
            <a
              href="https://secure.backblaze.com/r/00x84e"
              target="_blank"
              rel="noopener noreferrer"
            >
              referral link
            </a>
            )
          </li>
          <li>
            <a href="https://raindrop.io/" target="_blank" rel="noopener noreferrer">
              <strong>Raindrop.io</strong>
            </a>
          </li>
          <li>
            <a href="https://www.corecode.io/macupdater/" target="_blank" rel="noopener noreferrer">
              <strong>MacUpdater</strong>
            </a>
          </li>
          <li>
            <a href="https://freemacsoft.net/appcleaner/" target="_blank" rel="noopener noreferrer">
              <strong>AppCleaner</strong>
            </a>
          </li>
          <li>
            <a href="https://gpgtools.org/" target="_blank" rel="noopener noreferrer">
              <strong>GPG Suite</strong>
            </a>
          </li>
          <li>
            <del>VLC</del> &rarr;{" "}
            <a href="https://iina.io/" target="_blank" rel="noopener noreferrer">
              <strong>IINA</strong>
            </a>
          </li>
          <li>
            <a href="https://transmissionbt.com/" target="_blank" rel="noopener noreferrer">
              <strong>Transmission</strong>
            </a>
          </li>
          <li>
            <a
              href="https://roaringapps.com/app/amphetamine"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Amphetamine</strong>
            </a>
          </li>
          <li>
            <a
              href="https://www.tunabellysoftware.com/tgpro/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>TG Pro</strong>
            </a>
          </li>
          <li>
            <a href="https://www.keka.io/en/" target="_blank" rel="noopener noreferrer">
              <strong>Keka</strong>
            </a>
          </li>
        </ul>

        <h2>iOS</h2>

        <p>
          I have far too many apps to count, but here the essentials that have earned a spot on my
          home screen:
        </p>

        <ul>
          <li>
            <a
              href="https://apps.apple.com/app/id568903335"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>1Password</strong> (beta)
            </a>
          </li>
          <li>
            <a
              href="https://apps.apple.com/app/id323229106"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Waze</strong> (beta)
            </a>
          </li>
          <li>
            <a
              href="https://apps.apple.com/app/id414834813"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Pocket Casts</strong>
            </a>
          </li>
          <li>
            <a
              href="https://apps.apple.com/app/id1021913807"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Raindrop.io</strong>
            </a>
          </li>
          <li>
            <a
              href="https://apps.apple.com/app/id383457673"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Plex</strong> (beta)
            </a>
          </li>
          <li>
            <a
              href="https://apps.apple.com/app/id985746746"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Discord</strong>
            </a>
          </li>
          <li>
            <a
              href="https://apps.apple.com/app/id1057750338"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>UniFi</strong>
            </a>{" "}
            and{" "}
            <a
              href="https://apps.apple.com/app/id1385561119"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>WiFiman</strong>
            </a>
          </li>
        </ul>

        <h2>Cloud</h2>

        <p>
          I&apos;ve been making recent efforts to <a href="/zip">de-Google</a> my life, with mixed
          results...
        </p>

        <ul>
          <li>
            <del>Gmail</del> &rarr;{" "}
            <a href="https://www.fastmail.com/" target="_blank" rel="noopener noreferrer">
              <strong>Fastmail</strong>
            </a>{" "}
            (
            <a href="https://ref.fm/u20274504" target="_blank" rel="noopener noreferrer">
              referral link
            </a>
            ) &amp;{" "}
            <a
              href="https://en.wikipedia.org/wiki/Apple_Mail"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Mail.app</strong>
            </a>
          </li>
          <li>
            <del>Google Drive</del> &rarr; <del>Dropbox</del> &rarr;{" "}
            <a href="https://www.icloud.com/iclouddrive" target="_blank" rel="noopener noreferrer">
              <strong>iCloud Drive</strong>
            </a>
            <ul>
              <li>
                <a href="/notes/dropping-dropbox">Read why.</a>
              </li>
            </ul>
          </li>
          <li>
            <del>Google Docs</del> &rarr;{" "}
            <a
              href="https://products.office.com/en-us/mac/microsoft-office-for-mac"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Microsoft Office</strong>
            </a>{" "}
            (hey, it works)
          </li>
          <li>
            <del>Google Photos</del> &rarr;{" "}
            <a href="https://www.icloud.com/photos/" target="_blank" rel="noopener noreferrer">
              <strong>iCloud Photos</strong>
            </a>{" "}
            and{" "}
            <a href="https://immich.app/" target="_blank" rel="noopener noreferrer">
              <strong>Immich</strong>
            </a>
          </li>
          <li>
            <del>Google Analytics</del> &rarr;{" "}
            <a href="https://usefathom.com/" target="_blank" rel="noopener noreferrer">
              <strong>Fathom Analytics</strong>
            </a>{" "}
            (
            <a href="https://usefathom.com/ref/ZEYG0O" target="_blank" rel="noopener noreferrer">
              referral link
            </a>
            )
          </li>
          <li>
            <del>Google Public DNS</del> &rarr;{" "}
            <a href="https://1.1.1.1/dns/" target="_blank" rel="noopener noreferrer">
              <strong>Cloudflare&apos;s 1.1.1.1</strong>
            </a>{" "}
            on my home network.
          </li>
          <li>
            <del>GoDaddy</del> &rarr; <del>Google Domains</del> &rarr;{" "}
            <a
              href="https://www.cloudflare.com/products/registrar/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Cloudflare Registrar</strong>
            </a>{" "}
            (and{" "}
            <a href="https://isnic.is/en/" target="_blank" rel="noopener noreferrer">
              <strong>ISNIC</strong>
            </a>{" "}
            for this domain, of course)
          </li>
        </ul>

        <p>Other geeky stuff:</p>

        <ul>
          <li>
            <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">
              <strong>Vercel</strong>
            </a>{" "}
            and{" "}
            <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">
              <strong>Netlify</strong>
            </a>{" "}
            for &quot;serverless&quot; sites.
          </li>
          <li>
            <a href="https://www.digitalocean.com/" target="_blank" rel="noopener noreferrer">
              <strong>DigitalOcean</strong>
            </a>{" "}
            (
            <a href="https://m.do.co/c/afcf288a7dac" target="_blank" rel="noopener noreferrer">
              referral link
            </a>
            ) and{" "}
            <a href="https://www.linode.com/" target="_blank" rel="noopener noreferrer">
              <strong>Linode</strong>
            </a>{" "}
            (
            <a
              href="https://www.linode.com/?r=0c5aeace9bd591be9fbf32f96f58470295f1ee05"
              target="_blank"
              rel="noopener noreferrer"
            >
              referral link
            </a>
            ) for virtual Linux servers.
          </li>
          <li>
            <a href="https://dnsimple.com/" target="_blank" rel="noopener noreferrer">
              <strong>DNSimple</strong>
            </a>{" "}
            (
            <a
              href="https://dnsimple.com/r/eb6ced548f1e0a"
              target="_blank"
              rel="noopener noreferrer"
            >
              referral link
            </a>
            ) and{" "}
            <a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">
              <strong>Cloudflare</strong>
            </a>{" "}
            for domain DNS.
          </li>
          <li>
            <a href="https://www.backblaze.com/" target="_blank" rel="noopener noreferrer">
              <strong>Backblaze</strong>
            </a>{" "}
            (
            <a
              href="https://secure.backblaze.com/r/00x84e"
              target="_blank"
              rel="noopener noreferrer"
            >
              referral link
            </a>
            ) for off-site Mac backups.
          </li>
          <li>
            <a href="https://gitea.io/en-us/" target="_blank" rel="noopener noreferrer">
              <strong>Gitea</strong>
            </a>{" "}
            as a{" "}
            <a href="https://git.jrvs.io/" target="_blank" rel="noopener noreferrer">
              self-hosted
            </a>{" "}
            Git backup/mirror.
          </li>
          <li>
            <a href="https://tailscale.com/" target="_blank" rel="noopener noreferrer">
              <strong>Tailscale</strong>
            </a>{" "}
            to access my home network and VPSes from anywhere.
          </li>
        </ul>

        <h2>
          Internet of <del>Things</del> Crap
        </h2>

        <ul>
          <li>
            <a href="https://www2.meethue.com/en-us" target="_blank" rel="noopener noreferrer">
              <strong>Philips Hue</strong>
            </a>{" "}
            color bulbs, dimmer switches, etc.
          </li>
          <li>
            2x{" "}
            <a
              href="https://www.ecobee.com/en-us/smart-thermostats/smart-wifi-thermostat/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>ecobee3 lite</strong>
            </a>
          </li>
          <li>
            2x{" "}
            <a
              href="https://www.sonos.com/en-us/shop/one.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Sonos One</strong>
            </a>{" "}
            (with Alexa turned off...hopefully?)
          </li>
          <li>
            2x{" "}
            <a href="https://www.apple.com/apple-tv-4k/" target="_blank" rel="noopener noreferrer">
              <strong>Apple TV 4K</strong> (2021)
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

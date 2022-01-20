import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import Content from "../components/Content/Content";
import PageTitle from "../components/PageTitle/PageTitle";
import { H2 } from "../components/Heading/Heading";
import { LaptopIcon } from "../components/Icons";

import desktopImg from "../public/static/images/uses/bigsur.png";

const Uses = () => (
  <>
    <NextSeo
      title="/uses"
      description="Things I use daily."
      openGraph={{
        title: "/uses",
      }}
    />

    <PageTitle>
      /uses <LaptopIcon />
    </PageTitle>

    <Content>
      <p>
        <del>I regularly get messages asking about which tools I use to work.</del>
      </p>
      <p>
        Nobody has asked me what I use. Ever. But here's a list of my daily drivers and necessities anyways, mostly
        revolving around my Apple sheepy-ness. Inspired by{" "}
        <a href="https://uses.tech/" target="_blank" rel="noopener noreferrer">
          many, many others
        </a>
        . ❤️
      </p>

      <Image src={desktopImg} placeholder="blur" alt="My mess of a desktop." priority />

      <H2>🍎 Hardware</H2>
      <ul>
        <li>
          <a href="https://browser.geekbench.com/v5/cpu/8124907" target="_blank" rel="noopener noreferrer">
            <strong>MacBook Air</strong> (2020)
          </a>
          <ul>
            <li>Apple M1 (8‑core CPU, 8‑core GPU) 🏎️💨</li>
            <li>16 GB RAM</li>
            <li>1 TB SSD</li>
          </ul>
        </li>
        <li>
          <a href="https://browser.geekbench.com/v5/cpu/1074682" target="_blank" rel="noopener noreferrer">
            <strong>MacBook Pro 15"</strong> (Mid-2018)
          </a>
          <ul>
            <li>
              Core i9 @ 2.9 GHZ,{" "}
              <a href="https://www.youtube.com/watch?v=Dx8J125s4cg" target="_blank" rel="noopener noreferrer">
                theoretically 🔥🧯🚒
              </a>
            </li>
            <li>32 GB RAM</li>
            <li>1 TB SSD</li>
            <li>Radeon Pro 560X – 4 GB</li>
            <li>Most importantly, I haven't touched it since M1 stole my heart (for a third of the price). 💔</li>
          </ul>
        </li>
        <li>
          <strong>iPhone 13 Pro</strong>
          <ul>
            <li>512 GB in Graphite 😎</li>
            <li>
              <a
                href="https://www.apple.com/shop/product/MM2J3ZM/A/iphone-13-pro-silicone-case-with-magsafe-abyss-blue"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abyss Blue Silicone Case
              </a>
            </li>
            <li>
              <a
                href="https://www.apple.com/shop/product/MHLR3ZM/A/iphone-leather-wallet-with-magsafe-saddle-brown"
                target="_blank"
                rel="noopener noreferrer"
              >
                Saddle Brown Leather "Wallet"
              </a>
            </li>
            <li>
              Belkin's MagSafe{" "}
              <a
                href="https://www.apple.com/shop/product/HPBJ2ZM/A/belkin-car-vent-mount-pro-with-magsafe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Car Vent Mount Pro
              </a>{" "}
              is awesome too, btw.
            </li>
          </ul>
        </li>
        <li>
          <strong>iPad Pro 10.5"</strong>
          <ul>
            <li>256 GB in Space Gray</li>
            <li>Smart Keyboard &amp; Apple Pencil</li>
          </ul>
        </li>
        <li>
          <strong>Apple Watch Series 6</strong> (GPS)
          <ul>
            <li>Aluminum – Space Gray</li>
            <li>40mm (I have incredibly small wrists.)</li>
            <li>
              Usually with the{" "}
              <a
                href="https://www.apple.com/shop/product/MLL02ZM/A/42mm-midnight-blue-sport-band-s-m-m-l"
                target="_blank"
                rel="noopener noreferrer"
              >
                Midnight Blue sport band
              </a>
              , 🏳️‍🌈{" "}
              <a
                href="https://www.apple.com/shop/product/MQ4F2AM/A/38mm-pride-edition-woven-nylon"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pride Edition woven nylon band
              </a>
              , or employee 🏋️{" "}
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
        <li>
          <strong>Google Pixel 4a</strong>
          <ul>
            <li>For some recreational Android development and experimentation.</li>
            <li>
              Activated on{" "}
              <a href="https://fi.google.com/" target="_blank" rel="noopener noreferrer">
                Google Fi
              </a>{" "}
              during rare trips.
            </li>
            <li>
              Really just putting this here in a futile effort to prove I'm not a <em>complete</em> Apple sheep. 🐑
            </li>
          </ul>
        </li>
      </ul>

      <H2>💾 Development</H2>
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
              <a href="https://github.com/jakejarvis/dotfiles" target="_blank" rel="noopener noreferrer">
                my <code>.dotfiles</code> repository.
              </a>
            </li>
            <li>
              <a href="https://ohmyz.sh/" target="_blank" rel="noopener noreferrer">
                Oh My ZSH
              </a>
              <ul>
                <li>
                  <a href="https://github.com/zsh-users/zsh-autosuggestions" target="_blank" rel="noopener noreferrer">
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
                  <a href="https://github.com/adobe-fonts/source-code-pro" target="_blank" rel="noopener noreferrer">
                    Source Code Pro font
                  </a>
                </li>
              </ul>
            </li>
            <li>
              Extensions:
              <ul>
                <li>
                  <a
                    href="https://marketplace.visualstudio.com/items?itemName=bungcip.better-toml"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Better TOML
                  </a>
                </li>
                <li>
                  <a
                    href="https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Docker
                  </a>
                </li>
                <li>
                  <a
                    href="https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-duplicate"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Duplicate action
                  </a>
                </li>
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
                  <a href="https://copilot.github.com/" target="_blank" rel="noopener noreferrer">
                    GitHub Copilot
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
                    href="https://marketplace.visualstudio.com/items?itemName=GitHub.remotehub"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Repositories
                  </a>
                </li>
                <li>
                  <a
                    href="https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Share
                  </a>
                </li>
                <li>
                  <a
                    href="https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    markdownlint
                  </a>
                </li>
                <li>
                  <a
                    href="https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    npm
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
                    href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Remote Development Pack
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
                <li>
                  <a
                    href="https://marketplace.visualstudio.com/items?itemName=ms-vscode.wordcount"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Word Count
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
          <a href="https://www.docker.com/products/docker-desktop" target="_blank" rel="noopener noreferrer">
            <strong>Docker Desktop</strong>
          </a>
        </li>
        <li>
          <a href="https://www.parallels.com/products/desktop/" target="_blank" rel="noopener noreferrer">
            <strong>Parallels Desktop Pro</strong>
          </a>
          <ul>
            <li>
              Switched from VMware Fusion when Parallels beat them to the punch with{" "}
              <a href="https://www.parallels.com/blogs/parallels-desktop-m1/" target="_blank" rel="noopener noreferrer">
                M1 support
              </a>
              .
            </li>
          </ul>
        </li>
        <li>
          <a href="https://tailscale.com/" target="_blank" rel="noopener noreferrer">
            <strong>Tailscale</strong>
          </a>
          <ul>
            <li>
              For connecting to remote servers and my <a href="#home">"homelab"</a> without exposing ports to the world.
              Highly recommended!
            </li>
          </ul>
        </li>
        <li>
          <a href="https://www.sketch.com/" target="_blank" rel="noopener noreferrer">
            <strong>Sketch</strong>
          </a>
        </li>
        <li>
          <a href="https://www.adobe.com/creativecloud.html" target="_blank" rel="noopener noreferrer">
            <strong>Adobe Creative Cloud</strong>
          </a>
          <ul>
            <li>
              Still on the $20/month{" "}
              <a href="https://www.adobe.com/creativecloud/buy/students.html" target="_blank" rel="noopener noreferrer">
                Student Plan
              </a>
              , somehow. 🤫 Will need to re-evaulate once I'm kicked off; it's hard to justify spending almost 3x
              that...
            </li>
          </ul>
        </li>
        <li>
          <a href="https://panic.com/transmit/" target="_blank" rel="noopener noreferrer">
            <strong>Transmit</strong>
          </a>
        </li>
        <li>
          <a href="https://www.getpostman.com/" target="_blank" rel="noopener noreferrer">
            <strong>Postman</strong>
          </a>
        </li>
        <li>
          <a href="https://www.browserstack.com/" target="_blank" rel="noopener noreferrer">
            <strong>BrowserStack</strong>
          </a>{" "}
          &amp;{" "}
          <a href="https://percy.io/" target="_blank" rel="noopener noreferrer">
            <strong>Percy</strong>
          </a>
        </li>
        <li>
          <a href="https://www.sequelpro.com/" target="_blank" rel="noopener noreferrer">
            <del>Sequel Pro</del>
          </a>{" "}
          →{" "}
          <a href="https://tableplus.com/" target="_blank" rel="noopener noreferrer">
            <strong>TablePlus</strong>
          </a>
        </li>
        <li>
          <a href="https://robomongo.org/" target="_blank" rel="noopener noreferrer">
            <del>Robo 3T</del>
          </a>{" "}
          →{" "}
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

      <H2>🌎 Browsing</H2>
      <ul>
        <li>
          <a href="https://www.mozilla.org/en-US/firefox/developer/" target="_blank" rel="noopener noreferrer">
            <strong>Firefox</strong>
          </a>{" "}
          🦊
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
              Add-ons:
              <ul>
                <li>
                  <a
                    href="https://support.1password.com/cs/1password-classic-extension/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    1Password Classic
                  </a>
                </li>
                <li>
                  <a
                    href="https://addons.mozilla.org/en-US/firefox/addon/betterttv/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    BetterTTV
                  </a>
                </li>
                <li>
                  <a
                    href="https://addons.mozilla.org/en-US/firefox/addon/cookie-editor/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cookie Editor
                  </a>
                </li>
                <li>
                  <a
                    href="https://addons.mozilla.org/en-US/firefox/addon/decentraleyes/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Decentraleyes
                  </a>
                </li>
                <li>
                  <a
                    href="https://addons.mozilla.org/en-US/firefox/addon/facebook-container/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook Container
                  </a>
                </li>
                <li>
                  <a
                    href="https://addons.mozilla.org/en-US/firefox/addon/multi-account-containers/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Firefox Multi-Account Containers
                  </a>
                </li>
                <li>
                  <a
                    href="https://addons.mozilla.org/en-US/firefox/addon/https-everywhere/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    HTTPS Everywhere
                  </a>
                </li>
                <li>
                  <a
                    href="https://addons.mozilla.org/en-US/firefox/addon/mailvelope/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mailvelope
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
        <li>
          <a href="https://www.google.com/chrome/browser/?extra=devchannel" target="_blank" rel="noopener noreferrer">
            <strong>Google Chrome</strong>
          </a>{" "}
          😈
          <ul>
            <li>
              For testing only! See more of <a href="#cloud">my de-Googling efforts below</a>.
            </li>
            <li>
              Add-ons:
              <ul>
                <li>
                  <a
                    href="https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    AMP Validator
                  </a>
                </li>
                <li>
                  <a
                    href="https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?h1=en"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Lighthouse
                  </a>
                </li>
                <li>
                  <a
                    href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    React Developer Tools
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>

      <H2>💻 macOS</H2>
      <ul>
        <li>
          <a href="https://1password.com/" target="_blank" rel="noopener noreferrer">
            <strong>1Password</strong>
          </a>
        </li>
        <li>
          <a href="https://www.obdev.at/products/littlesnitch/index.html" target="_blank" rel="noopener noreferrer">
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
          <a href="https://secure.backblaze.com/r/00x84e" target="_blank" rel="noopener noreferrer">
            (referral link)
          </a>
        </li>
        <li>
          <a href="https://github.com/billycastelli/Silicon-Info" target="_blank" rel="noopener noreferrer">
            <strong>Silicon Info</strong>
          </a>
        </li>
        <li>
          <a href="https://www.corecode.io/macupdater/" target="_blank" rel="noopener noreferrer">
            <strong>MacUpdater</strong>
          </a>
        </li>
        <li>
          <a href="https://unshaky.nestederror.com/" target="_blank" rel="noopener noreferrer">
            <strong>Unshaky</strong>
          </a>{" "}
          ⌨️ (on my 2018 MBP)
          <ul>
            <li>
              Toooo &nbsp;lzy too vist &nbsp;&nbsp;the&nbsp; Aple Stre geeniusses oonce &nbsp;agin&nbsp; to fiix
              tthe&nbsp; keeybbbboord. 😒🦋
            </li>
          </ul>
        </li>
        <li>
          <a href="https://daisydiskapp.com/" target="_blank" rel="noopener noreferrer">
            <strong>DaisyDisk</strong>
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
          <del>VLC</del> →{" "}
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
          <a href="https://www.paragon-software.com/us/home/ntfs-mac/#" target="_blank" rel="noopener noreferrer">
            <strong>Paragon NTFS</strong>
          </a>
        </li>
        <li>
          <a href="https://roaringapps.com/app/amphetamine" target="_blank" rel="noopener noreferrer">
            <strong>Amphetamine</strong>
          </a>
        </li>
        <li>
          <a href="https://coconut-flavour.com/coconutbattery/" target="_blank" rel="noopener noreferrer">
            <strong>coconutBattery</strong>
          </a>
        </li>
        <li>
          <a href="https://theunarchiver.com/" target="_blank" rel="noopener noreferrer">
            <strong>The Unarchiver</strong>
          </a>
        </li>
        <li>
          <a href="https://www.intuitibits.com/products/wifi-explorer/" target="_blank" rel="noopener noreferrer">
            <strong>WiFi Explorer</strong>
          </a>
        </li>
        <li>
          <a href="https://parsec.app/" target="_blank" rel="noopener noreferrer">
            <strong>Parsec</strong>
          </a>
        </li>
      </ul>

      <H2>📱 iOS</H2>
      <p>I have far too many apps to count, but here the essentials that have earned a spot on my home screen:</p>
      <ul>
        <li>
          <a href="https://apps.apple.com/app/id568903335" target="_blank" rel="noopener noreferrer">
            <strong>1Password</strong> (beta)
          </a>
        </li>
        <li>
          <a href="https://apps.apple.com/app/id323229106" target="_blank" rel="noopener noreferrer">
            <strong>Waze</strong> (beta)
          </a>
        </li>
        <li>
          <a href="https://apps.apple.com/app/id585027354" target="_blank" rel="noopener noreferrer">
            <strong>Google Maps</strong>
          </a>
        </li>
        <li>
          <a href="https://apps.apple.com/app/id517329357" target="_blank" rel="noopener noreferrer">
            <strong>Dark Sky</strong>
          </a>
        </li>
        <li>
          <a href="https://apps.apple.com/app/id731629156" target="_blank" rel="noopener noreferrer">
            <strong>Xfinity Stream</strong>
          </a>
        </li>
        <li>
          <a href="https://apps.apple.com/app/id317951436" target="_blank" rel="noopener noreferrer">
            <strong>SiriusXM</strong>
          </a>
        </li>
        <li>
          <a href="https://apps.apple.com/app/id379693831" target="_blank" rel="noopener noreferrer">
            <strong>Audible</strong>
          </a>
        </li>
        <li>
          <a href="https://apps.apple.com/app/id414834813" target="_blank" rel="noopener noreferrer">
            <strong>Pocket Casts</strong>
          </a>
        </li>
        <li>
          <a href="https://apps.apple.com/app/id1488977981" target="_blank" rel="noopener noreferrer">
            <strong>Sonos</strong>
          </a>
        </li>
        <li>
          <a href="https://apps.apple.com/app/id383457673" target="_blank" rel="noopener noreferrer">
            <strong>Plex</strong> (beta)
          </a>
        </li>
        <li>
          <a href="https://apps.apple.com/app/id1212616790" target="_blank" rel="noopener noreferrer">
            <strong>Microsoft To-Do</strong>
          </a>{" "}
          (RIP Wunderlist 🙏)
        </li>
        <li>
          <a href="https://apps.apple.com/app/id985746746" target="_blank" rel="noopener noreferrer">
            <strong>Discord</strong>
          </a>
        </li>
      </ul>

      <H2>☁️ Cloud</H2>
      <p>
        I've been making recent efforts to{" "}
        <a href="https://www.stallman.org/google.html" target="_blank" rel="noopener noreferrer">
          de-Google
        </a>{" "}
        my life, with mixed results...
      </p>
      <ul>
        <li>
          <del>Gmail</del> →{" "}
          <a href="https://www.fastmail.com/" target="_blank" rel="noopener noreferrer">
            <strong>Fastmail</strong>
          </a>{" "}
          <a href="https://ref.fm/u20274504" target="_blank" rel="noopener noreferrer">
            (referral link)
          </a>{" "}
          &amp;{" "}
          <a href="https://en.wikipedia.org/wiki/Apple_Mail" target="_blank" rel="noopener noreferrer">
            <strong>Mail.app</strong>
          </a>
        </li>
        <li>
          <del>Google Drive</del> → <del>Dropbox</del> →{" "}
          <a href="https://www.icloud.com/iclouddrive" target="_blank" rel="noopener noreferrer">
            <strong>iCloud Drive</strong>
          </a>
          <ul>
            <li>
              <Link href="/notes/dropping-dropbox/">
                <a>Read why.</a>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <del>Google Docs</del> →{" "}
          <a
            href="https://products.office.com/en-us/mac/microsoft-office-for-mac"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Microsoft Office</strong>
          </a>{" "}
          (hey, it works 🤷)
        </li>
        <li>
          <del>Google Photos</del> →{" "}
          <a href="https://www.icloud.com/photos/" target="_blank" rel="noopener noreferrer">
            <strong>iCloud Photos</strong>
          </a>
        </li>
        <li>
          <del>Google Analytics</del> →{" "}
          <a href="https://www.netlify.com/products/analytics/" target="_blank" rel="noopener noreferrer">
            <strong>Netlify Analytics</strong>
          </a>{" "}
          <Link href="/notes/netlify-analytics-review/">
            <a>(my review)</a>
          </Link>
        </li>
        <li>
          <del>Google Public DNS</del> →{" "}
          <a href="https://1.1.1.1/dns/" target="_blank" rel="noopener noreferrer">
            <strong>Cloudflare's 1.1.1.1</strong>
          </a>{" "}
          on my home network.
        </li>
        <li>
          <del>GoDaddy</del> → <del>Google Domains</del> →{" "}
          <a href="https://www.cloudflare.com/products/registrar/" target="_blank" rel="noopener noreferrer">
            <strong>Cloudflare Registrar</strong>
          </a>{" "}
          (and{" "}
          <a href="https://isnic.is/en/" target="_blank" rel="noopener noreferrer">
            <strong>ISNIC</strong>
          </a>{" "}
          for this domain, of course 🇮🇸)
        </li>
      </ul>
      <p>Other geeky stuff:</p>
      <ul>
        <li>
          <a href="https://dnsimple.com/" target="_blank" rel="noopener noreferrer">
            <strong>DNSimple</strong>
          </a>{" "}
          <a href="https://dnsimple.com/r/eb6ced548f1e0a" target="_blank" rel="noopener noreferrer">
            (referral link)
          </a>{" "}
          &amp;{" "}
          <a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">
            <strong>Cloudflare</strong>
          </a>{" "}
          for domain DNS.
        </li>
        <li>
          <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">
            <strong>Netlify</strong>
          </a>{" "}
          and{" "}
          <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">
            <strong>Vercel</strong>
          </a>{" "}
          for static sites.
        </li>
        <li>
          <a href="https://www.linode.com/" target="_blank" rel="noopener noreferrer">
            <strong>Linode</strong>
          </a>{" "}
          <a
            href="https://www.linode.com/?r=0c5aeace9bd591be9fbf32f96f58470295f1ee05"
            target="_blank"
            rel="noopener noreferrer"
          >
            (referral link)
          </a>{" "}
          and{" "}
          <a href="https://www.digitalocean.com/" target="_blank" rel="noopener noreferrer">
            <strong>DigitalOcean</strong>
          </a>{" "}
          <a href="https://m.do.co/c/afcf288a7dac" target="_blank" rel="noopener noreferrer">
            (referral link)
          </a>{" "}
          for virtual Linux servers.
        </li>
        <li>
          <a href="https://www.backblaze.com/" target="_blank" rel="noopener noreferrer">
            <strong>Backblaze</strong>
          </a>{" "}
          <a href="https://secure.backblaze.com/r/00x84e" target="_blank" rel="noopener noreferrer">
            (referral link)
          </a>{" "}
          for off-site MacBook backups.
        </li>
        <li>
          <a href="https://gitea.io/en-us/" target="_blank" rel="noopener noreferrer">
            <strong>Gitea</strong>
          </a>{" "}
          as a{" "}
          <a href="https://code.jarv.is/" target="_blank" rel="noopener noreferrer">
            self-hosted
          </a>{" "}
          Git backup/mirror.
        </li>
        <li>
          <a href="https://www.plex.tv/" target="_blank" rel="noopener noreferrer">
            <strong>Plex</strong>
          </a>{" "}
          +{" "}
          <a href="https://sonarr.tv/" target="_blank" rel="noopener noreferrer">
            <strong>Sonarr</strong>
          </a>{" "}
          +{" "}
          <a href="https://radarr.video/" target="_blank" rel="noopener noreferrer">
            <strong>Radarr</strong>
          </a>
        </li>
      </ul>

      <H2>
        🏠 Internet of <del>Things</del>{" "}
        <Link href="/notes/shodan-search-queries/">
          <a>Crap</a>
        </Link>
      </H2>
      <ul>
        <li>
          <a href="https://www.synology.com/en-us/products/RT2600ac" target="_blank" rel="noopener noreferrer">
            <strong>Synology RT2600ac</strong>
          </a>
        </li>
        <li>
          <a href="https://www.synology.com/en-us/products/DS218+" target="_blank" rel="noopener noreferrer">
            <strong>Synology DiskStation DS218+</strong>
          </a>
        </li>
        <li>
          <a href="https://www.amazon.com/dp/B00HWML468/" target="_blank" rel="noopener noreferrer">
            <strong>Dell Inspiron 3647</strong>
          </a>
          , slightly upgraded and running{" "}
          <a href="https://www.vmware.com/products/esxi-and-esx.html" target="_blank" rel="noopener noreferrer">
            <strong>VMware ESXi</strong>
          </a>
          , as a really, <em>really</em> crappy home server.
        </li>
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
          </a>{" "}
          smart thermostats (HomeKit support was a must.)
        </li>
        <li>
          2x{" "}
          <a href="https://www.sonos.com/en-us/shop/one.html" target="_blank" rel="noopener noreferrer">
            <strong>Sonos One</strong>
          </a>{" "}
          (with Alexa turned off...allegedly.)
        </li>
        <li>
          <a href="https://petcube.com/play/" target="_blank" rel="noopener noreferrer">
            <strong>Petcube Play</strong>
          </a>{" "}
          😻
        </li>
      </ul>
    </Content>

    {/* TODO: use OrderedList component */}
    <style jsx global>{`
      ul {
        margin-left: 1.5em;
        padding-left: 0;
      }

      li {
        padding-left: 0.25em;
      }
    `}</style>
  </>
);

export default Uses;

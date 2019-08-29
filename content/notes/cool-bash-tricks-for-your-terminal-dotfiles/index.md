---
title: "Cool Bash Tricks for Your Terminal's \"Dotfiles\""
date: 2018-12-10 20:01:50-0400
description: "Bashfiles usually contain shortcuts compatible with Bash terminals to automate convoluted commands. Here's a summary of the ones I find most helpful that you can add to your own .bash_profile or .bashrc file."
tags:
  - Dotfiles
  - Hacks
  - macOS
  - Programming
  - Terminal
  - Tutorial
aliases:
  - /2018/12/10/cool-bash-tricks-for-your-terminal-dotfiles/
image: "terminal_icon.jpg"
draft: false
---


{{< image src="images/terminal_icon.jpg" width="500" alt="Terminal.app on macOS" >}}


You may have noticed the recent trend of techies [posting their "dotfiles" on GitHub](https://github.com/topics/dotfiles) for the world to see. These usually contain shortcuts compatible with Bash terminals to automate convoluted commands that, I'll admit, I needed to Google every single time.

My [full dotfiles are posted at this Git repository](https://git.jarv.is/jake/dotfiles), but here's a summary of the ones I find most helpful that you can add to your own .bash_profile or .bashrc file.


* * *


Check your current IP address (IPv4 or IPv6):

```
alias ip4="dig +short myip.opendns.com A @resolver1.opendns.com"
alias ip6="dig +short -6 myip.opendns.com AAAA @resolver1.ipv6-sandbox.opendns.com"
```

Check your current local IP address:

```
alias iplocal="ipconfig getifaddr en0"
```

Check, clear, set ([Google DNS](https://developers.google.com/speed/public-dns/) or [Cloudflare DNS](https://1.1.1.1/) or custom), and flush your computer's DNS, overriding your router:

```
alias dns-check="networksetup -setdnsservers Wi-Fi"
alias dns-clear="networksetup -getdnsservers Wi-Fi"

alias dns-set-cloudflare="dns-set 1.1.1.1 1.0.0.1"
alias dns-set-google="dns-set 8.8.8.8 8.8.4.4"
alias dns-set-custom="networksetup -setdnsservers Wi-Fi "   # example: dns-set-custom 208.67.222.222 208.67.220.220

alias dns-flush="sudo killall -HUP mDNSResponder; sudo killall mDNSResponderHelper; sudo dscacheutil -flushcache"
```

Start a simple local web server in current directory:

```
alias serve="python -c 'import SimpleHTTPServer; SimpleHTTPServer.test()'"
```

Test your internet connection's speed (uses 100MB of data):

```
alias speed="wget -O /dev/null http://cachefly.cachefly.net/100mb.test"
```

Query DNS records of a domain:

```
alias digg="dig @8.8.8.8 +nocmd any +multiline +noall +answer"   # example: digg google.com
```

Make a new directory and change directories into it.

```
mkcdir() {
    mkdir -p -- "$1" &&
    cd -P -- "$1"
}
```

Unhide and rehide hidden files and folders on macOS:

```
alias unhide="defaults write com.apple.finder AppleShowAllFiles -bool true && killall Finder"
alias rehide="defaults write com.apple.finder AppleShowAllFiles -bool false && killall Finder"
```

Force empty trash on macOS:

```
alias forcetrash="sudo rm -rf ~/.Trash /Volumes/*/.Trashes"
```

Quickly lock your screen on macOS:

```
alias afk="/System/Library/CoreServices/Menu\ Extras/User.menu/Contents/Resources/CGSession -suspend"
```

Update Homebrew packages, global NPM packages, Ruby Gems, and macOS in all one swoop:

```
alias update="brew update; brew upgrade; brew cleanup; npm install npm -g; npm update -g; sudo gem update --system; sudo gem update; sudo gem cleanup; sudo softwareupdate -i -a;"
```

Copy your public key to the clipboard:

```
alias pubkey="more ~/.ssh/id_rsa.pub | pbcopy | echo '=> Public key copied to pasteboard.'"
```

Undo the most recent commit in current Git repo:

```
alias gundo="git push -f origin HEAD^:master"
```

Un-quarantine an "unidentified developer's" application [blocked by Gatekeeper](https://support.apple.com/en-us/HT202491) on macOS's walled <del>prison</del> garden:

```
alias unq="sudo xattr -rd com.apple.quarantine"
```

Quickly open a Bash prompt in a running Docker container:

```
docker-bash() {
    docker exec -ti $1 /bin/bash
}
```

Pull updates for all Docker images with the tag "latest":

```
docker images --format "{{.Repository}}:{{.Tag}}" | grep :latest | xargs -L1 docker pull
```

This odd hack is needed to run any of these aliases as sudo:

```
alias sudo="sudo "
```


* * *


[View all of my dotfiles here](https://git.jarv.is/jake/dotfiles) or [check out other cool programmers' dotfiles over at this amazing collection](https://dotfiles.github.io/).

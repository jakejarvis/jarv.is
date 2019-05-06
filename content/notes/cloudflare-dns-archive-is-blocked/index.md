---
title: "Does Cloudflare's 1.1.1.1 DNS Block Archive.is?"
date: 2019-05-06 09:35:12-0400
description: "Short answer: no. Quite the opposite, actually -- Archive.is is intentionally blocking 1.1.1.1 users. Here's why."
tags:
  - Cloudflare
  - DNS
  - Networking
  - Temper Tantrums
draft: false
---

**tl;dr:** No. Quite the opposite -- [Archive.is](https://archive.is/) is intentionally blocking 1.1.1.1 users.

![](images/archive-is.png)

A [recent post on Hacker News](https://news.ycombinator.com/item?id=19828317) pointed out what I've noticed for a long time -- the [Archive.is](https://archive.is/) (aka [Archive.today](https://archive.today/)) website archiver appears unresponsive when I'm on my home network, where I use Cloudflare's fantastic public DNS service, [1.1.1.1](https://1.1.1.1/). I didn't connect the two variables until I read this post, where somebody noticed that the Archive.is domain resolves for Google's 8.8.8.8 DNS, but not 1.1.1.1.

Matthew Prince, the CEO & Co-Founder of Cloudflare (who's also [very active](https://news.ycombinator.com/user?id=eastdakota) on Hacker News), responded to the observation [with a detailed explanation](https://news.ycombinator.com/item?id=19828702) of what's happening behind-the-scenes, revealing that the owners of Archive.is are actively refusing to resolve their own website for 1.1.1.1 users because Cloudflare's DNS offers ***too much*** privacy. Excerpts below:

> Archive.is’s authoritative DNS servers return bad results to 1.1.1.1 when we query them. I’ve proposed we just fix it on our end but our team, quite rightly, said that too would violate the integrity of DNS and the privacy and security promises we made to our users when we launched the service. [...] The archive.is owner has explained that he returns bad results to us because we don’t pass along the EDNS subnet information. This information leaks information about a requester’s IP and, in turn, sacrifices the privacy of users. 

Essentially, Archive.is throws a hissy-fit and returns a bogus CNAME when Cloudflare doesn't provide them with geolocation info on you via the dated and optional [EDNS IP subnet standard](https://tools.ietf.org/html/rfc6891). The owner of Archive.is has even [admitted this](https://twitter.com/archiveis/status/1018691421182791680) with a questionable claim about the lack of EDNS information causing him "so many troubles."

<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">&quot;Having to do&quot; is not so direct here.<br>Absence of EDNS and massive mismatch (not only on AS/Country, but even on the continent level) of where DNS and related HTTP requests come from causes so many troubles so I consider EDNS-less requests from Cloudflare as invalid.</p>&mdash; archive.today (@archiveis) <a href="https://twitter.com/archiveis/status/1018691421182791680?ref_src=twsrc%5Etfw">July 16, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

I left the [following reply](https://news.ycombinator.com/item?id=19828898) to Matthew:

> Honestly, Cloudflare choosing not to hastily slap a band-aid on a problem like this just makes me feel more compelled to continue using 1.1.1.1.
> 
> I hesitate to compare this to Apple calling themselves "courageous" when removing the headphone jack, but in this case, I think the word is appropriate. I'll happily stand behind you guys if you take some PR hits while forcing the rest of the industry to make DNS safer – since it is understandable, admittedly, for users to conclude that "Cloudflare is blocking websites, sound the alarms!" at first glance.

Sure, it's annoying that I'll need to use a VPN or change my DNS resolvers to use a pretty cool (and otherwise convenient) archiving service. But I'm more happy to see that Cloudflare is playing the privacy long-game, even at the risk of their users concluding that they're blocking websites accessible to everyone else on the internet.

[**Learn how to switch your DNS to 1.1.1.1 here.**](https://1.1.1.1/dns/)
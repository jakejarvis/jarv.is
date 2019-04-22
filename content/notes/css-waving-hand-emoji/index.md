---
title: "Animated Waving Hand Emoji 👋 Using CSS"
date: 2019-04-22T09:20:10-04:00
description: "How to make the 👋 waving hand emoji actually wave using pure CSS animation!"
tags:
  - CSS
  - Animation
  - Emoji
  - Keyframes
  - Cool Tricks
draft: false
---

If you examine [my homepage](https://jarv.is/) long enough, you might notice the 👋 hand emoji at the top subtly waving at you. This was easily accomplished using a few lines of CSS with a feature called [`@keyframes`](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) -- no bulky GIFs involved, and no messy JS or jQuery overkill required.

Below are the code snippets you can grab and customize to make your own 
["waving hand" 👋](https://emojipedia.org/waving-hand-sign/) emojis ***actually wave***, and a [CodePen playground](https://codepen.io/jakejarvis/pen/pBZWZw) for live testing.

<iframe height="400" style="width: 100%;" scrolling="no" title="Waving Hand Emoji w/ CSS Keyframes" src="https://codepen.io/jakejarvis/embed/pBZWZw/?height=400&theme-id=light&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>

### CSS:

```
span#wave {
  animation-name: wave-animation;    /* refers to the name of your @keyframes element below */
  animation-duration: 2.5s;          /* change to speed up or slow down */
  animation-iteration-count: infinite;    /* never stop waving! */
  transform-origin: 70% 70%;
  display: inline-block;
}

@keyframes wave-animation {
    0% { transform: rotate(  0.0deg); }
   10% { transform: rotate(-10.0deg); }    /* these three values can be played with to make the waving more or less extreme */
   20% { transform: rotate( 12.0deg); }
   30% { transform: rotate(-10.0deg); }
   40% { transform: rotate(  9.0deg); }
   50% { transform: rotate(  0.0deg); }    /* reset for 50% of the time to pause */
  100% { transform: rotate(  0.0deg); }
}
```

### HTML:

```
<span id="wave">👋</span>
```

That's it! Different hand variations and skin tones can be [found on 📕Emojipedia](https://emojipedia.org/search/?q=waving+hand).

👋🏼 Toodles!
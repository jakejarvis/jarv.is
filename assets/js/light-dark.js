/* jshint esversion: 6, indent: 2, browser: true */

// inspired by https://codepen.io/kevinpowell/pen/EMdjOV

// lightbulb toggle re-appears now that we know user has JS enabled
const toggle = document.querySelector('button#dark-mode-toggle');
toggle.style.visibility = "visible";

// check for preset `dark_mode_pref` in localStorage
let pref = localStorage.getItem('dark_mode_pref');

// check for OS dark mode setting
// https://gist.github.com/Gioni06/eb5b28343bcf5793a70f6703004cf333#file-darkmode-js-L47
const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const isSystemLight = window.matchMedia("(prefers-color-scheme: light)").matches;

// keep track of current state, no matter how we get there...
let currentlyDark = false;

const activateDarkMode = function() {
  document.body.classList.remove('light');
  document.body.classList.add('dark');
  currentlyDark = true;
};

const activateLightMode = function() {
  document.body.classList.remove('dark');
  document.body.classList.add('light');
  currentlyDark = false;
};

// if user already explicitly enabled dark mode in the past, turn it back on.
if (pref === 'true') {
  activateDarkMode();
}

// user has never clicked the button, so go by their OS preference until/if they do so
if (pref !== "true" && pref !== "false") {
  if (isSystemDark) activateDarkMode();
  if (isSystemLight) activateLightMode();

  // real-time switching if supported by OS/browser
  // TODO: these keep listening even when the parent condition becomes false (until refresh or new page)
  window.matchMedia("(prefers-color-scheme: dark)").addListener(e => e.matches && activateDarkMode());
  window.matchMedia("(prefers-color-scheme: light)").addListener(e => e.matches && activateLightMode());
}

// handle toggle click
toggle.addEventListener("click", function() {
  // get current preference, if there is one
  let pref = localStorage.getItem("dark_mode_pref");

  // switch to the opposite theme & save preference in local storage
  if (pref !== "true") {
    activateDarkMode();
    localStorage.setItem("dark_mode_pref", "true");
  } else {
    activateLightMode();
    localStorage.setItem("dark_mode_pref", "false");
  }
});

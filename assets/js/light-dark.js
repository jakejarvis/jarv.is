// check for preset `dark_mode` in localStorage
var pref = localStorage.getItem('dark_mode');
var toggle = document.querySelector('button#dark-mode-toggle');

// lightbulb toggle re-appears now that we know user has JS enabled
toggle.style.visibility = "visible";

var enableDarkMode = function() {
  document.body.classList.remove('light');
  document.body.classList.add('dark');

  localStorage.setItem('dark_mode', 'true');
};

var disableDarkMode = function() {
  document.body.classList.remove('dark');
  document.body.classList.add('light');

  localStorage.removeItem('dark_mode');
};

// if the user already enabled dark mode,
// turn it on.
if (pref === 'true') {
  enableDarkMode();
}

// handle toggle click
toggle.addEventListener('click', function() {
  // get current dark_mode preference
  pref = localStorage.getItem('dark_mode');

  // if dark mode was disabled, turn it on
  if (pref !== 'true') {
    enableDarkMode();
  // if dark mode was enabled, turn it off
  } else {
    disableDarkMode();
  }
});

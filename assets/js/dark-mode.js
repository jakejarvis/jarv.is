/*! Dark mode switcheroo | MIT License | jrvs.io/darkmode */

(function () {
  // improve variable mangling when minifying
  var win = window;
  var doc = win.document;
  var body = doc.body;
  var classes = body.classList;
  var storage = localStorage;

  // check for preset `dark_mode_pref` preference in local storage
  var pref_key = 'dark_mode_pref';
  var pref = storage.getItem(pref_key);

  // change CSS via these <body> classes:
  var dark = 'dark';
  var light = 'light';

  // which class is <body> set to initially?
  var default_theme = light;

  // use an element with class `dark-mode-toggle` to trigger swap when clicked
  var toggle = doc.querySelector('.dark-mode-toggle');

  // keep track of current state no matter how we got there
  var active = default_theme === dark;

  // receives a class name and switches <body> to it
  var activateTheme = function (theme) {
    classes.remove(dark, light);
    classes.add(theme);
    active = theme === dark;
  };

  // if user already explicitly toggled in the past, restore their preference
  if (pref === dark) activateTheme(dark);
  if (pref === light) activateTheme(light);

  // user has never clicked the button, so go by their OS preference until/if they do so
  if (!pref) {
    // returns media query selector syntax
    var prefers = function (theme) {
      return '(prefers-color-scheme: ' + theme + ')';
    };

    // check for OS dark/light mode preference and switch accordingly
    // default to `default_theme` set above if unsupported
    if (win.matchMedia(prefers(dark)).matches) activateTheme(dark);
    else if (win.matchMedia(prefers(light)).matches) activateTheme(light);
    else activateTheme(default_theme);

    // real-time switching if supported by OS/browser
    win.matchMedia(prefers(dark)).addListener(function (e) {
      if (e.matches) activateTheme(dark);
    });
    win.matchMedia(prefers(light)).addListener(function (e) {
      if (e.matches) activateTheme(light);
    });
  }

  // don't freak out if page happens not to have a toggle
  if (toggle) {
    // toggle re-appears now that we know user has JS enabled
    toggle.style.visibility = 'visible';

    // handle toggle click
    toggle.addEventListener(
      'click',
      function () {
        // switch to the opposite theme & save preference in local storage
        if (active) {
          activateTheme(light);
          storage.setItem(pref_key, light);
          // send event to SA
          sa_event('triggered_light_mode'); // eslint-disable-line no-undef
        } else {
          activateTheme(dark);
          storage.setItem(pref_key, dark);
          // send event to SA
          sa_event('triggered_dark_mode'); // eslint-disable-line no-undef
        }
      },
      true
    );
  }
})();

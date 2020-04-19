// https://codepen.io/kevinpowell/pen/EMdjOV

// check for saved 'darkMode' in localStorage
let darkMode = localStorage.getItem('dark_mode');

const darkModeToggle = document.querySelector('button#dark-mode-toggle');

const enableDarkMode = () => {
  document.body.classList.remove('light');
  document.body.classList.add('dark');

  localStorage.setItem('dark_mode', 'true');
}

const disableDarkMode = () => {
  document.body.classList.remove('dark');
  document.body.classList.add('light');

  localStorage.removeItem('dark_mode');
}

// If the user already visited and enabled darkMode
// start things off with it on
if (darkMode === 'true') {
  enableDarkMode();
}

// When someone clicks the button
darkModeToggle.addEventListener('click', () => {
  // get their dark_mode setting
  darkMode = localStorage.getItem('dark_mode');

  // if dark mode was disabled, turn it on
  if (darkMode !== 'true') {
    enableDarkMode();
  // if dark mode was enabled, turn it off
  } else {
    disableDarkMode();
  }
});

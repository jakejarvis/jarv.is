// store preference in local storage
export const storageKey = "dark";

// use the body class as a hint to what the theme was set to outside of the button component
// there's probably (definitely) a cleaner way to do this..?
export const isDark = () => document.body.classList?.contains("dark");

// sets appropriate `<body class="...">`
export const setDarkClass = (dark) => {
  if (dark) {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
  }
};

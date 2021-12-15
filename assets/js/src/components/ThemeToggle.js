import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { isDark, setDarkClass, setDarkPref } from "../utils/theme.js";

// react components:
import BulbOn from "../assets/bulb-on.svg";
import BulbOff from "../assets/bulb-off.svg";

const ThemeToggle = () => {
  // sync button up with theme state after initialization
  const [dark, setDark] = useState(isDark());

  useEffect(() => {
    setDarkClass(dark);
  }, [dark]);

  const handleToggle = () => {
    // only update the local storage preference if the user explicitly presses the lightbulb
    setDarkPref(!dark);

    // set theme to the opposite of current theme
    setDark(!dark);
  };

  return (
    <button
      onClick={handleToggle}
      title={dark ? "Toggle Light Mode" : "Toggle Dark Mode"}
      aria-label={dark ? "Toggle Light Mode" : "Toggle Dark Mode"}
    >
      {dark ? <BulbOff /> : <BulbOn />}
    </button>
  );
};

export default ThemeToggle;

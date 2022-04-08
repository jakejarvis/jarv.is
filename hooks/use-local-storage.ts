import { useState, useEffect } from "react";

export const useLocalStorage = (key: string) => {
  const [value, setValue] = useState(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentValue: any;
    try {
      currentValue = window.localStorage.getItem(key);
    } catch (e) {} // eslint-disable-line no-empty

    return currentValue;
  });

  useEffect(() => {
    if (value !== null) {
      window.localStorage?.setItem(key, value);
    }
  }, [key, value]);

  return [value, setValue];
};

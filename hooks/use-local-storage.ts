import { useState, useEffect } from "react";

export const useLocalStorage = (key: string, allowNull = false) => {
  const [value, setValue] = useState(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentValue: any;
    try {
      currentValue = window.localStorage.getItem(key);
    } catch (e) {} // eslint-disable-line no-empty

    return currentValue;
  });

  useEffect(() => {
    // don't write null values to storage unless specified
    if (value !== null || allowNull) {
      window.localStorage?.setItem(key, value);
    }
  }, [key, value, allowNull]);

  return [value, setValue];
};

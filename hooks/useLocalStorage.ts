// Modified from https://github.com/streamich/react-use/blob/e53ca94a0b1f20270b0f75dc2ca1fecf1e119dde/src/useLocalStorage.ts

import { useCallback, useState, useRef, useLayoutEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

type ParserOptions<T> =
  | {
      raw: true;
    }
  | {
      raw: false;
      serializer: (value: T) => string;
      deserializer: (value: string) => T;
    };

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
  options?: ParserOptions<T>
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void] => {
  if (typeof window === "undefined" || typeof window.Storage === "undefined") {
    return [initialValue as T, noop, noop];
  }

  if (!key) {
    throw new Error("useLocalStorage key may not be falsy");
  }

  const deserializer = options ? (options.raw ? (value: unknown) => value : options.deserializer) : JSON.parse;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const initializer = useRef((key: string) => {
    try {
      const serializer = options ? (options.raw ? String : options.serializer) : JSON.stringify;
      const localStorageValue = window.localStorage.getItem(key);

      if (localStorageValue !== null) {
        return deserializer(localStorageValue);
      } else {
        initialValue && window.localStorage.setItem(key, serializer(initialValue));
        return initialValue;
      }
    } catch (error) {
      // If user is in private mode or has storage restriction
      // localStorage can throw. JSON.parse and JSON.stringify
      // can throw, too.
      return initialValue;
    }
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState<T | undefined>(() => initializer.current(key));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => setState(initializer.current(key)), [key]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const set: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (valOrFunc) => {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-types
        const newState = typeof valOrFunc === "function" ? (valOrFunc as Function)(state) : valOrFunc;

        if (typeof newState === "undefined") {
          return;
        }

        let value: string;

        if (options) {
          if (options.raw) {
            if (typeof newState === "string") {
              value = newState;
            } else {
              value = JSON.stringify(newState);
            }
          } else if (options.serializer) {
            value = options.serializer(newState);
          } else {
            value = JSON.stringify(newState);
          }
        } else {
          value = JSON.stringify(newState);
        }

        window.localStorage.setItem(key, value);
        setState(deserializer(value));
      } catch (error) {
        // If user is in private mode or has storage restriction
        // localStorage can throw. Also JSON.stringify can throw.
      }
    },
    [key, setState] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setState(undefined);
    } catch (error) {
      // If user is in private mode or has storage restriction
      // localStorage can throw.
    }
  }, [key, setState]);

  return [state, set, remove];
};

export default useLocalStorage;

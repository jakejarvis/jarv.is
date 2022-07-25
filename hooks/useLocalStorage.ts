// Modified from https://github.com/streamich/react-use/blob/e53ca94a0b1f20270b0f75dc2ca1fecf1e119dde/src/useLocalStorage.ts

import { useCallback, useState, useRef, useLayoutEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const useLocalStorage = <T>(
  key: string,
  initialValue?: T
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, typeof noop] => {
  if (typeof window === "undefined" || typeof window.Storage === "undefined") {
    return [initialValue as T, noop, noop];
  }

  // TODO: make these customizable:
  const serializer = String;
  const deserializer = (value: any) => value; // eslint-disable-line @typescript-eslint/no-explicit-any

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const initializer = useRef((key: string) => {
    try {
      const localStorageValue = window.localStorage.getItem(key);

      if (localStorageValue !== null) {
        return deserializer(localStorageValue);
      } else {
        initialValue && window.localStorage.setItem(key, serializer(initialValue));
        return initialValue;
      }
    } catch (error) {
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
        const newState = valOrFunc instanceof Function ? valOrFunc(state) : valOrFunc;

        if (typeof newState === "undefined") {
          return;
        }

        const value = typeof newState === "string" ? newState : JSON.stringify(newState);

        window.localStorage.setItem(key, value);
        setState(deserializer(value));
      } catch (error) {} // eslint-disable-line no-empty
    },
    [key, setState] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setState(undefined);
    } catch (error) {} // eslint-disable-line no-empty
  }, [key, setState]);

  return [state, set, remove];
};

export default useLocalStorage;

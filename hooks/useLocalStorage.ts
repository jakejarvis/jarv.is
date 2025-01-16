// Modified from https://github.com/streamich/react-use/blob/e53ca94a0b1f20270b0f75dc2ca1fecf1e119dde/src/useLocalStorage.ts

import { useCallback, useState, useRef } from "react";
import type { Dispatch, SetStateAction } from "react";

const noop = () => {};

const useLocalStorage = <T = string>(
  key: string,
  initialValue?: T
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void] => {
  if (typeof window === "undefined" || typeof window.Storage === "undefined") {
    // immediately return a "dummy" hook instead of throwing an error if localStorage isn't available, either in the
    // browser or because this hook is being called server-side.
    return [initialValue as T, noop, noop];
  }

  // TODO: make these customizable (e.g. `JSON.stringify()` and `JSON.parse()`)
  const serializer = (value: T | undefined) => String(value);
  const deserializer = (value: string) => value as unknown as T;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const initializer = useRef((key: string) => {
    try {
      // deserialize and return existing value if it's already been set
      const storedValue = window.localStorage.getItem(key);
      if (storedValue !== null) {
        return deserializer(storedValue);
      }

      // item hasn't been set, but immediately set it to initialValue if provided
      if (initialValue) {
        window.localStorage.setItem(key, serializer(initialValue));
        return initialValue;
      }
    } catch (
      error // eslint-disable-line @typescript-eslint/no-unused-vars
    ) {
      return initialValue;
    }
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState<T | undefined>(() => initializer.current(key));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const set: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (valOrFunc) => {
      try {
        // we need to support both T and (prevState: T) => T
        const newState = valOrFunc instanceof Function ? valOrFunc(state) : valOrFunc;

        window.localStorage.setItem(key, serializer(newState));
        setState(newState);
      } catch (error) {
        console.error(`failed to set localStorage item '${key}':`, error);
      }
    },
    [key, state] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setState(undefined);
    } catch (error) {} // eslint-disable-line no-empty, @typescript-eslint/no-unused-vars
  }, [key]);

  return [state, set, remove];
};

export default useLocalStorage;

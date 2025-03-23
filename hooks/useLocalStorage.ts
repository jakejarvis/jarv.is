// Modified from https://github.com/streamich/react-use/blob/e53ca94a0b1f20270b0f75dc2ca1fecf1e119dde/src/useLocalStorage.ts

import { useCallback, useState, useRef } from "react";
import type { Dispatch, SetStateAction } from "react";

const useLocalStorage = <T = string>(
  key: string,
  initialValue?: T
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void] => {
  const serializer = (value: T | undefined) => String(value);
  const deserializer = (value: string) => value as unknown as T;

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

  const [state, setState] = useState<T | undefined>(() => initializer.current(key));

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

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setState(undefined);
    } catch (error) {} // eslint-disable-line no-empty, @typescript-eslint/no-unused-vars
  }, [key]);

  return [state, set, remove];
};

export default useLocalStorage;

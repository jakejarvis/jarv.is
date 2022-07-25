import { useEffect } from "react";
import { useFirstMountState } from "./use-first-mount-state";

// identical to `useEffect()` but ignores the first invocation
export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useFirstMountState();

  useEffect(() => {
    if (!isFirstMount) {
      return effect();
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};

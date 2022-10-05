import hexToRgba from "hex-to-rgba";
import mem from "mem";

// removes spaces from default hex-to-rgba output and caches the result
const memoized = mem((color: string, alpha?: number) => hexToRgba(color, alpha).replace(/\s/g, ""), {
  cacheKey: (arguments_) => arguments_.join(","), // https://github.com/sindresorhus/mem#caching-strategy
});

export default memoized;

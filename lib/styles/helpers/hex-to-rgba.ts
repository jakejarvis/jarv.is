// hex -> rgba, pulled from https://github.com/sindresorhus/hex-rgb/blob/main/index.js#L29
const hex2rgba = (hex: string, alpha: number) => {
  const number = Number.parseInt(hex.replace(/^#/, ""), 16);
  const red = number >> 16;
  const green = (number >> 8) & 255;
  const blue = number & 255;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

export default hex2rgba;

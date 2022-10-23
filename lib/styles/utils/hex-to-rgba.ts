import hexToRgbaOrig from "hex-to-rgba";

// removes spaces from default hex-to-rgba output
const hexToRgba = (color: string, alpha?: number) => hexToRgbaOrig(color, alpha).replace(/\s/g, "");

export default hexToRgba;

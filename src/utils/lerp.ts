const lerpFloat = (start: number, end: number, alpha: number): number => (1 - alpha) * start + alpha * end;

/**
 *
 * @param start 24bit RGB color
 * @param end 24bit RGB color
 * @param alpha position in LERP, between 0 an 1
 */
const lerpHexRGB = (start: number, end: number, alpha: number): number => {
  const r: number = lerpFloat((start >> 16) & 0xff, (end >> 16) & 0xff, alpha);
  const g: number = lerpFloat((start >> 8) & 0xff, (end >> 8) & 0xff, alpha);
  const b: number = lerpFloat((start >> 0) & 0xff, (end >> 0) & 0xff, alpha);
  return (r << 16) + (g << 8) + b;
};

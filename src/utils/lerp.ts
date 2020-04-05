const lerpFloat = (start: number, end: number, alpha: number): number => (1 - alpha) * start + alpha * end;

const lerpHexRGB = (start: number, end: number, alpha: number): number => {
  const r: number = lerpFloat((start >> 16) & 0xff, (end >> 16) & 0xff, 0);
  const g: number = lerpFloat((start >> 8) & 0xff, (end >> 8) & 0xff, 0);
  const b: number = lerpFloat((start >> 0) & 0xff, (end >> 0) & 0xff, 0);
  return (r << 16) + (g << 8) + b;
};

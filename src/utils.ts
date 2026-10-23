export const denormalizeRangeValue = (
  value: number,
  min: number,
  max: number,
): number => (max - min) * value + min;

export const normalizeRangeValue = (
  value: number,
  min: number,
  max: number,
): number => (value - min) / (max - min);

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

/* Type-safe alternatives to the builtin `Object` functions:
 *   - Object.keys        = typedObjectKeys
 *   - Object.values      = typedObjectValues
 *
 * mapObjectEntries to combine:
 *   - Object.entries     = typedObjectEntries
 *   - Object.fromEntries = typedFromEntries
 *
 * For motivation, see: https://www.totaltypescript.com/iterate-over-object-keys-in-typescript
 *
 * Note that these utilities are not necessarily safe to use because of the dynamic nature of JavaScript. You should
 * only use them if you are certain that your types are annotated correctly and that an object's property keys are not
 * dynamically added or removed at runtime without the types reflecting that.
 *
 * Source:             https://gist.github.com/JosXa/a76b4e4cde1ef8ac7092a1dff670aa68
 * Author:             Joscha Götzer (https://github.com/JosXa)
 * Licensed under MIT: https://gist.github.com/JosXa/d5bfe624b35c8b905029a614d68b3c06
 */

type KeyValuePair = [PropertyKey, unknown];

type EntriesOf<T> = Required<{
  [K in keyof T]: [K, T[K]];
}>[keyof T][];

type ObjectFromEntries<T> = T extends readonly [
  infer Key extends PropertyKey,
  infer Value,
][]
  ? { [key in Key]: Value }
  : never;

/**
 * Like Object.keys, but ensures the result matches the literal keys of the passed-in object.
 * Normally, Object.keys returns `string[]`.
 */
export function typedObjectKeys<const T extends object>(
  obj: T,
): (keyof typeof obj)[] {
  return Object.keys(obj) as (keyof typeof obj)[];
}

/**
 * Like Object.entries, but ensures the result matches the literal keys and values of the passed-in object.
 * Normally, Object.entries returns `[string, T][]`.
 */
export function typedObjectEntries<const T extends object>(
  obj: T,
): EntriesOf<T> {
  return Object.entries(obj) as EntriesOf<T>;
}

/**
 * Like Object.values, but works with any object-like type (even interfaces).
 */
export function typedObjectValues<const T extends object>(
  obj: T,
): Array<T[keyof T]> {
  return Object.values(obj) as Array<T[keyof T]>;
}

/**
 * Reconstructs an object from an array of [key, value] pairs, ensuring the result matches the literal keys and values
 * of the original object type. This is a type-safe version of Object.fromEntries.
 */
export function typedFromEntries<const T extends KeyValuePair>(
  entries: T[],
): ObjectFromEntries<T[]> {
  return Object.fromEntries(entries) as ObjectFromEntries<T[]>;
}

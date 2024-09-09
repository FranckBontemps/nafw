export type TRecord = Record<string | number | symbol, unknown>;

export function isRecord(input: unknown): input is TRecord {
  const isObject = typeof input === 'object';
  const isArray = Array.isArray(input);
  const isFunction = input instanceof Function;
  const isDate = input instanceof Date;
  const isRegExp = input instanceof RegExp;
  const isNull = input == null;

  return isObject && !isArray && !isFunction && !isDate && !isRegExp && !isNull;
}

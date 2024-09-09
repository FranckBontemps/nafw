export function isFunction(input: unknown): input is (...args: any[]) => any {
  return typeof input == 'function';
}

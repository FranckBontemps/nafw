import { OkResult } from "./OkResult.js";
import { OkValResult } from "./OkValResult.js";

export type Ok = OkResult;

export type OkVal<TValue> = OkValResult<TValue>;

/**
 * Returns an empty successful result.
 */
function ok(value?: undefined): Ok;

/**
 * Returns a successful result with a typed value.
 * @param value The value to return.
 */
function ok<T>(value: T): OkVal<T>;

function ok<T>(value?: T): Ok | OkVal<T> {
  if (value !== undefined) {
    return new OkValResult(value);
  } else {
    return new OkResult();
  }
}

/**
 * An "Ok" result represents an operation that has been successfully completed.
 * The result may include a value.
 */
export const Ok = ok;

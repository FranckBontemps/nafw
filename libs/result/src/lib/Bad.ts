import { BadResult, type BadReason } from "./BadResult.js";
import { BadValResult } from "./BadValResult.js";
import type { ForbidAny } from "./types/ForbidAny.js";

export type Bad<TReason extends BadReason> = BadResult<TReason>;

export type BadVal<TReason extends BadReason, TValue> = BadValResult<TReason, TValue>;

/**
 * Returns a failed result with a typed string or number reason.
 * @param reason A typed string or number reason describing why the operation has failed.
 * @param value
 */
function bad<TReason extends BadReason>(reason: ForbidAny<TReason>, value?: undefined): Bad<TReason>;

function bad<TReason extends BadReason, TValue>(
  reason: ForbidAny<TReason>,
  value: TValue,
): BadVal<TReason, TValue>;

function bad<TReason extends BadReason, TValue>(
  reason: ForbidAny<TReason>,
  value?: TValue,
): BadVal<TReason, TValue> | Bad<TReason> {
  if (value !== undefined) {
    return new BadValResult(
      reason,
      value,
    );
  } else {
    return new BadResult(
      reason,
    );
  }
}

/**
 * A "Bad" result represents an operation that has failed, whose origin is known or which was predictable.
 * The result contains a reason describing why the operation has failed.
 * Note: any exceptional errors that cannot be compensated should not be represented as a result, but thrown as an exception (e.g.: a database transaction has failed, a request failed due to a network error, etc).
 */
export const Bad = bad;

import type { ForbidAny } from "./types/ForbidAny.js";
import type { MatchBadInput, MatchBadResult } from "./types/MatchBad.js";
import { OkResult } from "./OkResult.js";
import { BadValResult } from "./BadValResult.js";
import { type BadReason, BadResult } from "./BadResult.js";
import { OkValResult } from "./OkValResult.js";
import { Ok, type OkVal } from "./Ok.js";
import { Bad, type BadVal } from "./Bad.js";

export type ResultLike = { success: boolean; };

export abstract class Result {
  abstract unwrap(): unknown;

  abstract matchBad(
    map: MatchBadInput<this>,
  ): MatchBadResult<this, MatchBadInput<this>>;

  static Bad<TReason extends BadReason>(reason: ForbidAny<TReason>): BadResult<TReason>;
  static Bad<TReason extends BadReason, TValue>(reason: ForbidAny<TReason>, value: TValue): BadValResult<TReason, TValue>;
  static Bad<TReason extends BadReason, TValue>(reason: ForbidAny<TReason>, value?: TValue): BadValResult<TReason, TValue> | BadResult<TReason> {
    return value !== undefined ? new BadValResult(reason, value) : new BadResult(reason);
  }

  static Ok(): OkResult;
  static Ok<TValue>(value?: TValue): OkValResult<TValue>;
  static Ok<TValue>(value?: TValue): OkValResult<TValue> | OkResult {
    return value !== undefined ? new OkValResult(value) : new OkResult();
  }


  /**
   * This function encapsulates a promise function to return a result:
   * - Ok if it resolves with the value inside.
   * - Bad EROR_DURING_EXECUTION with the error as the value if it rejects.
   *
   * @param fn A promised function
   * @returns A promise function that returns the value if it resolves, otherwise the caught error as Bad reason ERROR_DURING_EXECUTION
   *
   * @todo It should accept asynchrone or synchrone functions.
   */
  static wrapPromiseToResult<TParameters extends Array<any>, TPromiseValue>(
    fn: (...args: TParameters) => PromiseLike<TPromiseValue>,
  ): (...args: TParameters) => Promise<OkVal<TPromiseValue> | BadVal<'EXECUTION_ERROR', unknown>> {
    const wrappedFunction = async (
      ...args: TParameters
    ) => {
      try {
        const value = await fn(...args);
        return Ok(value);
      } catch (e: unknown) {
        return Bad('EXECUTION_ERROR', e);
      }
    };

    return wrappedFunction;
  }

  static isResult(result: unknown): result is ResultLike {
    return result != null
      && typeof result === "object"
      && 'success' in result
      && typeof result.success === "boolean";
  }

  static isBad(result: unknown): result is Bad<string> {
    return Result.isResult(result)
      && !result.success === false
      && 'reason' in result
      && result.reason != null
      && typeof result.reason === 'string';
  }
}








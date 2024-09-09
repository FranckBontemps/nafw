import type { AnyResult } from "../types/AnyResult.js";
import { Result } from "../Result.js";

export class ResultError extends Error {
  public readonly result: AnyResult;

  static create(result: AnyResult): ResultError {
    let reason: string | undefined = 'NO_SPECIFIED_REASON';

    const isBadResult = Result.isBad(result)
    if (isBadResult) {
      reason = result.reason;
    }

    return new ResultError(`RESULT_ERROR with reason: ${reason}`, result);
  }

  static createWithCustomMessage(message: string, result: AnyResult): ResultError {
    return new ResultError(message, result);
  }

  constructor(message: string, result: AnyResult) {
    super(message);

    this.result = result;
  }
}

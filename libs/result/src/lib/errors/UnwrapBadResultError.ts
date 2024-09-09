import { ResultError } from "./ResultError.js";
import type { AnyBadResult } from "../types/AnyBadResult.js";

export class UnwrapBadResultError extends ResultError {
  constructor(result: AnyBadResult) {
    super(`Cannot unwrap ${result.constructor.name} with reason: "${result.reason}"`, result);
  }
}

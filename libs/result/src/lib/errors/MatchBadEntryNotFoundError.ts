import type { AnyResult } from "../types/AnyResult.js";
import { ResultError } from "./ResultError.js";


export class MatchBadEntryNotFoundError extends ResultError {
  constructor(entry: string, result: AnyResult) {
    super(`Entry "${entry}" not found`, result);
  }
}

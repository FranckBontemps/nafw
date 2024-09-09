import type { MatchBadInput, MatchBadResult } from "./types/MatchBad.js";
import { Result } from "./Result.js";
import { UnwrapBadResultError } from "./errors/UnwrapBadResultError.js";
import { MatchBadEntryNotFoundError } from "./errors/MatchBadEntryNotFoundError.js";
import { isFunction } from "./utils/isFunction.js";
import { isRecord } from "./utils/isRecord.js";

export type BadReason = string;

export class BadResult<TReason extends BadReason> extends Result {
  public readonly success = false as const;
  public readonly hasValue = false as const;

  constructor(
    public readonly reason: TReason,
  ) {
    super();
  }

  unwrap(): never {
    throw new UnwrapBadResultError(this);
  }

  matchBad(
    map: MatchBadInput<this>,
  ): MatchBadResult<this, MatchBadInput<this>> {
    const key = this.reason;

    // todo improve typing to avoid this current narrowing
    const isValidMap = isRecord(map);
    if (!isValidMap) {
      throw new Error('Input "map" cannot be process: doesn\'t have a valid type');
    }

    const entry = map[key];

    if (!entry) {
      throw new MatchBadEntryNotFoundError(key, this);
    }

    // todo improve typing to avoid this current narrowing
    const isValidEntry = isFunction(entry);
    if (!isValidEntry) {
      throw new Error(`Entry "${key}" cannot be process: doesn't have a valid type`);
    }

    return entry(this);
  }
}

import { Result } from "./Result.js";
import type { MatchBadInput, MatchBadResult } from "./types/MatchBad.js";

// todo OkValResult should extends OkResult
export class OkValResult<TValue> extends Result {
  public readonly success = true as const;
  public readonly hasValue = true as const;

  constructor(
    public readonly value: TValue,
  ) {
    super();
  }

  unwrap(): TValue {
    return this.value;
  }

  override matchBad(
    map: MatchBadInput<this>,
  ): MatchBadResult<this, MatchBadInput<this>> {
    throw new Error('NOT_IMPLEMENTED');
  }
}

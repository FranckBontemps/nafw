import type { MatchBadInput, MatchBadResult } from "./types/MatchBad.js";
import { Result } from "./Result.js";

export class OkResult extends Result {
  public readonly success = true as const;
  public readonly hasValue = false as const;

  unwrap(): void {
    // an OkResult return void when unwrapped
  }

  override matchBad(
    map: MatchBadInput<this>,
  ): MatchBadResult<this, MatchBadInput<this>> {
    throw new Error('NOT_IMPLEMENTED');
  }
}

import { expect } from "vitest";
import type { BadResult } from "../lib/BadResult.js";
import { Result } from "../lib/Result.js";

describe('Result.matchBad - TESTS', () => {
  it('should select specific callback by reason with Bad', () => {
    const result = Result.Bad('SOMETHING_WRONG') as BadResult<'SOMETHING_WRONG'> | BadResult<'ANOTHER_SOMETHING_WRONG'>;

    const unwrap = result.matchBad({
      'SOMETHING_WRONG': () => 'SOMETHING_WRONG',
      'ANOTHER_SOMETHING_WRONG': () => 'ANOTHER_SOMETHING_WRONG',
      // it makes compilation error <3
      // OTHER_SOMETHING_WRONG: () => 'nothing',
    });

    expect(unwrap).toEqual('SOMETHING_WRONG');
  });
});

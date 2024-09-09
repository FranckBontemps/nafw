import { expect } from "vitest";
import { assert } from "ts-essentials";
import { OkValResult } from "../lib/OkValResult.js";
import type { OkResult } from "../lib/OkResult.js";
import type { BadResult } from "../lib/BadResult.js";
import { Result } from "../lib/Result.js";
import { UnwrapBadResultError } from "../lib/errors/UnwrapBadResultError.js";

describe('Result.unwrap - TESTS', () => {
  it('should be able to call unwrap directly from OkVal result return type', () => {
    const result = new OkValResult('value');

    result.unwrap()
  });

  it('should be able to call unwrap directly from union of Ok and OkVal result return type', () => {
    const result: OkValResult<'value'> | OkResult = new OkValResult('value');

    result.unwrap();
  });


  it('should NOT be able to call unwrap directly from BadResult', () => {
    const result: BadResult<'REASON'> = Result.Bad('REASON');

    // TODO In this case I'd like to be able to trigger a compilation error
    const call = () => result.unwrap();

    expect(call).toThrow(UnwrapBadResultError);
  });

  it('should be able to use narrow from union of BadVal and OkVal result return type', () => {
    const result: OkValResult<'value'> | BadResult<'REASON'> = new OkValResult('value');

    assert(result.success, "use to narrow success result");

    expect(result.value).toBe('value');
  });


  it('should be able to call unwrap directly from union of BadVal and OkVal result return type', () => {
    const result: OkValResult<'value'> | BadResult<'REASON'> = new OkValResult('value');

    result.unwrap()
  });

  it('should select specific callback by reason with Bad', () => {
    const result: BadResult<'SOMETHING_WRONG'> | BadResult<'ANOTHER_SOMETHING_WRONG'> = Result.Bad('SOMETHING_WRONG') as BadResult<'SOMETHING_WRONG'> | BadResult<'ANOTHER_SOMETHING_WRONG'>;

    const unwrap = result.matchBad({
      'SOMETHING_WRONG': () => 'SOMETHING_WRONG',
      'ANOTHER_SOMETHING_WRONG': () => 'ANOTHER_SOMETHING_WRONG',
      // it makes compilation error <3
      // OTHER_SOMETHING_WRONG: () => 'nothing',
    });

    expect(unwrap).toEqual('SOMETHING_WRONG');
  });
});

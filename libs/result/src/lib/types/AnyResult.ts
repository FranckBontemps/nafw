import type { BadResult } from '../BadResult.js';
import type { BadValResult } from '../BadValResult.js';
import type { OkResult } from '../OkResult.js';
import type { OkValResult } from '../OkValResult.js';
import type { Result } from '../Result.js';

export type AnyResult = Result | OkResult | OkValResult<any> | BadResult<any> | BadValResult<any, any>;

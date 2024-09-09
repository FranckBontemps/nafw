import type { BadResult } from '../BadResult.js';
import type { BadValResult } from '../BadValResult.js';

export type AnyBadResult = BadResult<any> | BadValResult<any, any>;

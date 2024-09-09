import type { IsAny } from "ts-essentials";

export type ForbidAny<T> = IsAny<T> extends true ? never : T;

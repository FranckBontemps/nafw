import type { IsUnknown, UnionToIntersection } from "ts-essentials";
import type { AnyResult } from "./AnyResult.js";

export type InferPropertiesCallbackReturnAsUnion<T> = {
  [K in keyof T]: T[K] extends (...args: any) => infer R ? R : never;
}[keyof T];

export type MatchBadResult<T extends AnyResult, TMap extends MatchBadInput<T>> = T extends {
    success: true;
  }
  ? InferPropertiesCallbackReturnAsUnion<TMap> | void
  : InferPropertiesCallbackReturnAsUnion<TMap>;


export type ReasonAsKeyToCallback<T extends AnyResult> = T extends {
    success: false;
    reason: string;
  }
  ? {
    [K in T['reason']]: (result: T) => any;
  }
  : never;

export type MatchBadMap<T extends AnyResult> = UnionToIntersection<ReasonAsKeyToCallback<T>>;

export type MatchBadInput<T extends AnyResult> = IsUnknown<MatchBadMap<T>> extends true
  ? never
  : MatchBadMap<T>;

// @flow
import { GraphQLSchema } from "graphql";

import type { Type } from "./type";

export function Schema<TSource, TContext>(query: Type<TSource, TContext>) {
  return new GraphQLSchema({
    query: query.fold(),
  });
}

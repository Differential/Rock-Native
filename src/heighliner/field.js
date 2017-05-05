// @flow
import { curry } from "ramda";
import type {
  GraphQLType,
  GraphQLFieldResolver,
  GraphQLFieldConfig,
} from "graphql";

import { Type } from "./type";

export const Field = curry(function<TSource, TContext>(
  type: GraphQLType,
  resolver: GraphQLFieldResolver<TSource, TContext>,
) {
  if (!(this instanceof Field)) return new Field(type, resolver);
  this.type = type;
  this.resolver = resolver;
  return this;
});

Field.prototype.map = function(f) {
  return new Field(this.type, (r, a, c, i) => {
    return f(this.resolver(r, a, c, i), a, c, i);
  });
};

Field.prototype.contramap = function(f) {
  return new Field(this.type, (r, a, c, i) => {
    return this.resolver(f(r, a, c, i), a, c, i);
  });
};

Field.prototype.resolve = function(r, a, c, i) {
  return this.resolver(r, a, c, i);
};

Field.prototype.fold = function<TSource, TContext>(): GraphQLFieldConfig<
  TSource,
  TContext,
> {
  return {
    type: this.type instanceof Type ? this.type.fold() : this.type,
    resolve: this.resolver,
  };
};

// @flow
import { curry, fromPairs, map, adjust, toPairs } from "ramda";
import { GraphQLObjectType } from "graphql";
import type { GraphQLNamedType } from "graphql";

import type { Field } from "./field";

export type HeighlinerTypeMap<TSource, TContext> = {
  [fieldname: string]: Field<TSource, TContext>,
};

const mapValues = curry((fn, obj) =>
  fromPairs(map(adjust(fn, 1), toPairs(obj))),
);

export function Type<TSource, TContext>(
  name: string,
  description: string = "",
  fields: HeighlinerTypeMap<TSource, TContext>,
) {
  if (!(this instanceof Type)) return new Type(name, description, fields);
  if (!fields && typeof description !== "string") {
    fields = description;
    description = "";
  }
  this.name = name;
  this.description = description;
  this.fields = fields;

  return this;
}

Type.prototype.fold = function<TSource, TContext>() {
  return new GraphQLObjectType({
    name: this.name,
    // description: this.description,
    fields: () =>
      mapValues((x: Field<TSource, TContext>) => x.fold(), this.fields),
  });
};

Type.prototype.type = function<TSource, TContext>(): GraphQLNamedType<
  TSource,
  TContext,
> {
  return this.fold();
};

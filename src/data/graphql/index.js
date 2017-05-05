// @flow
import { graphql as graphqljs } from "graphql";
import { print } from "graphql/language/printer";
import type { ExecutionResult, DocumentNode } from "graphql";

import { Schema, Type, Field, IntType, StringField } from "../../heighliner";

// for use via contramap
const isLoggedIn = (_, $, ctx) => {
  return ctx && ctx.user ? _ : { code: 401 };
};

// for use via map
const isSuccess = code => (code === 200 ? 204 : code);

// build Response type
export const code = Field(IntType, ({ code }) => code)
  .contramap(isLoggedIn)
  .map(isSuccess);

export const message = StringField(({ message }) => message);

export const Sample = Type("Sample", { code, message });

// build root query type
export const sample = Field(Sample, () =>
  Promise.resolve({
    code: 200,
    message: "hello world",
  }),
);
export const query = Type("Query", { sample });

// build the schema
export const schema = Schema(query);

export const safeQuery = (query: string | DocumentNode): string =>
  typeof query === "string" ? query : print(query);
// this is a curried schema execution function
// use it to execute queries for SSR and testing
export const graphql = (
  query: string | DocumentNode,
  root?: mixed,
  context?: mixed,
  variables?: ?{ [key: string]: mixed },
  operationName?: ?string,
): Promise<ExecutionResult> =>
  graphqljs(schema, safeQuery(query), root, context, variables, operationName);

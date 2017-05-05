import { graphql } from "graphql";
import { Schema, Type, Field, IntType, StringField } from "../";

it("creates an executable schema", async () => {
  // build Response type
  const code = Field(IntType, ({ code }) => code);
  const message = StringField(({ message }) => message);

  const Sample = Type("Sample", { code, message });

  // build root query type
  const sample = Field(Sample, () =>
    Promise.resolve({
      code: 200,
      message: "hello world",
    }),
  );
  const query = Type("Query", { sample });

  // build the schema
  const schema = Schema(query);

  // execute the test
  const { data } = await graphql(schema, "{ sample { code message } }");
  expect(data.sample).toEqual({
    code: 200,
    message: "hello world",
  });
});

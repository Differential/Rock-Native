import { graphql, code, message, Sample, sample, query } from "../";
import { IntType, StringType } from "../../../heighliner";

describe("code", () => {
  it("returns an int", () => {
    expect(code.fold().type).toEqual(IntType);
  });
  it("eventually returns a code from sourceValue", () => {
    expect(code.resolve({ code: 1 })).toEqual(401);
  });
  it("returns null if logged in", () => {
    expect(code.resolve({ code: 200 }, {}, { user: true })).toEqual(204);
  });
});

describe("message", () => {
  it("returns a string", () => {
    expect(message.fold().type).toEqual(StringType);
  });
  it("eventually returns a message from sourceValue", () => {
    const { resolve } = message.fold();
    expect(resolve({ message: "hello" })).toEqual("hello");
  });
});

describe("Sample", () => {
  it("returns a type with a name of sample", () => {
    expect(Sample.fold().toString()).toEqual("Sample");
  });
  it("has code and message fields", () => {
    const { code, message } = Sample.fold().getFields();
    expect(code).toBeDefined();
    expect(message).toBeDefined();
  });
});

describe("sample", () => {
  it("returns a sample type", () => {
    expect(sample.type).toEqual(Sample);
  });
  it("returns back some sample data", async () => {
    const result = await sample.fold().resolve();
    expect(result).toEqual({ code: 200, message: "hello world" });
  });
});

describe("query", () => {
  it("returns a type with a name of Query", () => {
    expect(query.fold().toString()).toEqual("Query");
  });
  it("has a sample field", () => {
    const { sample } = query.fold().getFields();
    expect(sample).toBeDefined();
  });
});

describe("graphql", () => {
  it("has a sample root level query field", async () => {
    const { data } = await graphql("{ sample { code message } }");
    expect(data).toEqual({ sample: { code: 401, message: "hello world" } });
  });
});

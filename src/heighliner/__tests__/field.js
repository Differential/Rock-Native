import { identity, sum } from "ramda";

import { Field } from "../field";
import { IntType } from "../types";

describe("Functor", () => {
  it("acts on the result of the defined resolver", () => {
    const field = Field(IntType, () => 5);

    expect(field.map((...x) => sum(x)).resolve(1, 2, 3, 4)).toEqual(14);
  });
  it("field.map(a => a) is equivalent to field (identity)", () => {
    const field = Field(IntType, (...x) => sum(x));

    expect(field.resolve(1, 2, 3, 4)).toEqual(
      field.map(identity).resolve(1, 2, 3, 4),
    );
  });
  it("field.map(x => f(g(x))) is equivalent to field.map(g).map(f) (composition)", () => {
    const field = Field(IntType, identity);
    const f = identity;
    const g = a => a + 1;

    expect(field.map(x => f(g(x))).resolve(1)).toEqual(
      field.map(g).map(f).resolve(1),
    );
  });
  it("returns a Field", () => {
    const field = Field(IntType, identity);

    expect(field.map(identity) instanceof Field).toBe(true);
  });
});

describe("Contravariant", () => {
  it("acts on the input values before the defined resolver", () => {
    const field = Field(IntType, () => 5);

    expect(field.contramap((...x) => sum(x)).resolve(1, 2, 3, 4)).toEqual(5);
  });

  it("field.contramap(a => a) is equivalent to field (identity)", () => {
    const field = Field(IntType, (...x) => sum(x));

    expect(field.resolve(1, 2, 3, 4)).toEqual(
      field.contramap(identity).resolve(1, 2, 3, 4),
    );
  });
  it("field.map(x => f(g(x))) is equivalent to field.map(g).map(f) (composition)", () => {
    const field = Field(IntType, identity);
    const f = identity;
    const g = a => a + 1;

    expect(field.contramap(x => f(g(x))).resolve(1)).toEqual(
      field.contramap(g).contramap(f).resolve(1),
    );
  });
  it("returns a Field", () => {
    const field = Field(IntType, identity);

    expect(field.contramap(identity) instanceof Field).toBe(true);
  });
});

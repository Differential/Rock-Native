// @flow

import { Field } from "./field";

import { StringType, IntType, IdType } from "./types";

const StringField = Field(StringType);
const IntField = Field(IntType);
const IdField = Field(IdType);

export { StringField, IntField, IdField };

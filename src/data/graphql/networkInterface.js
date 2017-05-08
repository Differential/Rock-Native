//@flow
import { createBatchingNetworkInterface } from "apollo-client";

export default () =>
  createBatchingNetworkInterface({
    uri: "http://localhost:3000/graphql",
    batchInterval: 10,
  });

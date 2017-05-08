// @flow
import { AppRegistry } from "react-native";
// import { NativeRouter } from "native-router";
import { ApolloProvider as Provider } from "react-apollo";
import ApolloClient from "apollo-client";

import createNetworkInterface from "./src/data/graphql/networkInterface";
import RockNative from "./src";

const client = new ApolloClient({
  networkInterface: createNetworkInterface(),
});

// XXX need to add windows support for react-native :(
const App = () => (
  <Provider client={client}>
    <RockNative />
  </Provider>
);

AppRegistry.registerComponent("RockNative", () => App);

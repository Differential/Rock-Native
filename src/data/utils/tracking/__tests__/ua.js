// @flow
// import ua from "universal-analytics";
import {
  trackScreenView,
  trackPageView,
  trackEvent,
  trackTransaction,
  UA_CODE,
  UA_APP,
  ua,
  FUN,
} from "../ua";

function mockFunctions() {
  console.log("called");
  const original = require.requireActual("../ua");
  return {
    ...original, //Pass down all the exported objects
    ua: () => ({
      screenview: jest.fn((screen, UA_APP) => ({
        send: jest.fn(),
      })),
    }),
  };
}
jest.mock("../ua", () => mockFunctions());

describe("Universal Analytics", () => {
  describe("Track Screen View", () => {
    it("should call uaVisitor.screenview when uaVisitor is passed", () => {
      const screen = "Giving Step 1";
      trackScreenView(screen);
      expect(ua().screenview).toBeCalledWith(screen, UA_APP);
      // expect(uaVisitor.screenview).toHaveBeenCalled();

      // const theCode = ua("1234");
      // console.log("theCode = ", theCode);
      // console.log("theCode.screenview = ", theCode.screenview);
      // I tried a few things here, but I'm not sure how I
      // am supposed to get trackScreenView or any of the other
      // functions to know what uaVisitor is. It's a constant
      // defined in the ua.js file and is not passed as a prop
      // to the functions. How to mock that?
    });
    it("should return void/undefined when uaVisitor is not passed", () => {
      const screen = "Giving Step 1";
      const result = trackScreenView(screen);
      expect(result).toBeUndefined;
    });
  });

  describe("Track Page View", () => {
    xit("should call uaVisitor.pageview when uaVisitor is passed", () => {
      // STUB
    });
    it("should return void/undefined when uaVisitor is not passed", () => {
      const page = "Giving";
      const result = trackPageView(page);
      expect(result).toBeUndefined;
    });
  });

  describe("Track Event", () => {
    xit("should call uaVisitor.event when uaVisitor is passed", () => {
      // STUB
    });
    it("should return void/undefined when uaVisitor is not passed", () => {
      const category = "Web";
      const action = "Click";
      const label = "";
      const value = "Clicked It";
      const result = trackEvent(category, action, label, value);
      expect(result).toBeUndefined;
    });
  });

  describe("Track Transaction", () => {
    xit("should call uaVisitor.transaction when uaVisitor is passed", () => {
      // STUB
    });
    it("should return void/undefined when uaVisitor is not passed", () => {
      const transactionId = "ABC123";
      const total = 75;
      const items = [
        {
          totalPrice: 5,
          quantity: 15,
          sku: "J1A2K3E4L5O6V7E8D9H0A1R2A3M4B5E6",
          name: "Fidget Spinner",
          variation: "NOSPIN",
        },
      ];
      const result = trackTransaction(transactionId, total, items);
      expect(result).toBeUndefined;
    });
  });
});

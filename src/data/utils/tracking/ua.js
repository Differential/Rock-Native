// @flow

import universalAnalytics from "universal-analytics";

// const UA_CODE = "UA-7130289-27";
export const UA_APP = process.env.APP_NAME || "RockNative";

// type ua = {
//
// }

export const send = () => null;

// XXX this will be where we incorporate batching and delayed
// importing of universalAnalytics. This way we can fire off events
// prior the libray being loaded. Then once loaded, we can send the
// saved events to universalAnalytics and replace the lib with
// the proper export
export const stubbedUniversalAnaltyics = code => ({
  screenview: (screen, app) => ({ send }),
  pageview: (page, app) => ({ send }),
  event: (
    category: string,
    action?: ?string,
    label?: ?string,
    value?: ?string,
  ) => ({ send }),
  transaction: (id: string, total: number) => ({
    item: () => null,
    send,
  }),
});

export const ua = (code: string = process.env.UA_CODE) => {
  // if no code, return a stub of universalAnalytics
  if (!code) return stubbedUniversalAnaltyics();
  return universalAnalytics(code);
};

export const trackScreenView = (screen: string): void => {
  console.log(ua());
  return ua().screenview(screen, UA_APP).send();
};

export const trackPageView = (page: string): void =>
  ua().pageview(page, UA_APP).send();

export const trackEvent = (
  category: string,
  action?: ?string,
  label?: ?string,
  value?: ?string,
) => ua().event(category, action, label, value);

export type TransactionItem = {
  totalPrice: number,
  quantity: number,
  sku: string,
  name: string,
  variation: string,
};

export const trackTransaction = (
  transactionId: string,
  total: number,
  items: [TransactionItem],
) => {
  const transaction = ua().transaction(transactionId, total);
  if (items && items.length) {
    items.map(({ totalPrice, quantity, sku, name, variation }) => {
      transaction.item(totalPrice, quantity, sku, name, variation);
    });
  }
  transaction.send();
};

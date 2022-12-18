import { WaitUntilList } from "./wait-until-list.js";

let waitUntilList = new WaitUntilList();

export const waitUntilHandler = (
  handler: (event: any, context: any) => Promise<any>
) => {
  return async function (event: any, context: any) {
    try {
      return await handler(event, context);
    } finally {
      await waitUntilList.waitUntilFinished();
      waitUntilList = new WaitUntilList();
    }
  };
};

export const waitUntil = (promise: Promise<any>) =>
  waitUntilList.waitUntil(promise);

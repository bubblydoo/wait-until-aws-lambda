import { WaitUntilList } from "./wait-until-list.js";
import { Context } from "aws-lambda";

let waitUntilList = new WaitUntilList();

export function waitUntilHandler<TEvent = any, TResult = any>(
  handler: (event: TEvent, context: Context) => Promise<TResult>
) {
  return async function (event: any, context: any) {
    try {
      return await handler(event, context);
    } finally {
      await waitUntilList.waitUntilFinished();
      waitUntilList = new WaitUntilList();
    }
  };
}

export const waitUntil = (promise: Promise<any>) =>
  waitUntilList.waitUntil(promise);

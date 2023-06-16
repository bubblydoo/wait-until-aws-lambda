import { WaitUntilList } from "wait-until-generalized";
import { Context } from "aws-lambda";

let waitUntilList: WaitUntilList | null = null;

// this handler is not safe for concurrent invocations
// but that doesn't happen in lambdas
export function waitUntilHandler<TEvent = any, TResult = any>(
  handler: (event: TEvent, context: Context) => Promise<TResult>
) {
  return async function (event: any, context: any) {
    try {
      waitUntilList = new WaitUntilList();
      return await handler(event, context);
    } finally {
      await waitUntilList!.waitUntilSettled();
      waitUntilList = null;
    }
  };
}

export const waitUntil = (promise: Promise<any>) => {
  if (!waitUntilList) throw new Error("waitUntilList is not initialized, is a lambda handler wrapped with waitUntilHandler?");
  waitUntilList.waitUntil(promise);
}

# `waitUntil` for AWS Lambda

Fake `waitUntil` in AWS Lambda and other platforms that don't support it.

```js
import { waitUntilHandler, waitUntil } from 'wait-until-aws-lambda';

const delay = (time) => new Promise(res => setTimeout(res, time));

export const handler = waitUntilHandler(async (event, context) => {
  waitUntil(delay(1000));

  return 'hello world';
});
```

The callback will be delayed until the promises have finished.

### Motivation

We're migrating to Cloudflare Workers, partly because `waitUntil` is available there. With this library we can have a common API between Workers and Lambdas.

### Caveat

The `waitUntilHandler` only supports async handlers (which return promises).

### Other platforms

```js
import { WaitUntilList } from 'wait-until-aws-lambda';

let waitUntilList = new WaitUntilList();

export const doStuff = async () => {
  const waitUntil = waitUntilList.waitUntil;
  functionThatCanCallWaitUntil(waitUntil);
  await waitUntilList.waitUntilFinished();
  waitUntilList = new WaitUntilList();
};
```

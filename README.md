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

### Caveat

The `waitUntilHandler` only supports async handlers (which return promises).

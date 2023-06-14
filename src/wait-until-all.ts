export async function waitUntilAll(promises: Promise<unknown>[]): Promise<PromiseSettledResult<unknown>[]> {
  let len = 0;
  let values: unknown[] = []; // actually Promise[]
  // when the length of the array changes, there has been a nested call to waitUntil
  // and we should await the promises again
  while (len !== promises.length) {
    len = promises.length;
    values = (await Promise.allSettled(promises)) as any;
  }
  return values as any;
}

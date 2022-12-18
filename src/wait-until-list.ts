/** Utility class to fake wait until on platforms that don't support it */
export class WaitUntilList {
  /** List of promisees */
  private promises: Promise<any>[] = [];
  /** Add promise to wait until list */
  waitUntil = (promise: Promise<any>) => {
    this.promises.push(promise);
  }
  /** Returns a promise that resolves when all promises in the list have been settled */
  waitUntilFinished = async () => {
    console.log("Wait until promises:", this.promises.length);
    const results = await Promise.allSettled(this.promises);
    console.log("Wait until results", results);
  }
}

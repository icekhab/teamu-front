export type Procedure = (...args: any[]) => void;

/**
 * @param {function} callback
 * @param {number} waitMilliseconds
 * @return {function}
 */
export default function debounce<F extends Procedure>(callback: F, waitMilliseconds = 50) {
  let timeout: NodeJS.Timeout;

  return function debounceFunc(this: any, ...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(this, args), waitMilliseconds);
  };
}

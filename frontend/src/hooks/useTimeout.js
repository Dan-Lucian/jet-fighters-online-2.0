import { useCallback, useEffect, useRef } from 'react';

/**
 * Runs a function inside a timeout and allows to control it by reseting
 * or by clearing it. Usefull for use with other custom hooks like useDebounce.
 *
 * @param {function} callback - the function to run after the delay.
 * @param {number} delay delay in ms.
 *
 * @returns {object} - { reset, clear }
 */
const useTimeout = (callback, delay) => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
};

export default useTimeout;

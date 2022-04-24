import { useEffect } from 'react';
import useTimeout from './useTimeout';

/**
 * Runs a timeout only after a state has stopped changing for an amount of ms.
 * It "debounces" the previous timeout if a state in the dep array has changed.
 * @param {function} callback The function to run.
 * @param {number} delay delay in ms.
 * @param {array} dependencies array of dependencies.
 */
const useDebounce = (callback, delay, dependencies) => {
  const { reset, clear } = useTimeout(callback, delay);

  // if dep changed reset the timer
  useEffect(reset, [...dependencies, reset]);

  // denies the very first run
  useEffect(clear, [clear]);
};

export { useDebounce };

/* eslint-disable no-void */
import { useRef, useLayoutEffect, useCallback } from 'react';

/**
 * Returns the passed function as a safe variant which doesn't run
 * if the component is unmounted.
 *
 * @param {function} dispatch the function to make safe.
 *
 * @returns {function} - the safe variant of the passed function.
 */
const useSafeDispatch = (dispatch) => {
  const mounted = useRef(false);

  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch]
  );
};

export { useSafeDispatch };

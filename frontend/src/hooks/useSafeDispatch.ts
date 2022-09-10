/* eslint-disable no-void */
import { useRef, useLayoutEffect, useCallback, Dispatch } from 'react';

/**
 * Returns the passed function as a safe variant which doesn't run
 * if the component is unmounted.
 *
 * @param {function} dispatch the function to make safe.
 *
 * @returns {function} - the safe variant of the passed function.
 */
const useSafeDispatch = <T>(dispatch: Dispatch<T>): (action: T) => void => {
  const mounted = useRef(false);

  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return useCallback(
    (action: T) => (mounted.current ? dispatch(action) : void 0),
    [dispatch]
  );
};

export default useSafeDispatch;

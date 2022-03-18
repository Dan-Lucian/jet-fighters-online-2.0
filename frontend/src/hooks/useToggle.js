import { useCallback, useState } from 'react';

/**
 * Creates a state which can be toggled.
 *
 * @param {boolean} initialState - initial toggle state.
 *
 * @returns {array} - toggle state and toggle function.
 */

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(
    (bool) =>
      setState((currentValue) =>
        typeof bool === 'boolean' ? bool : !currentValue
      ),
    []
  );

  return [state, toggle];
};

export default useToggle;

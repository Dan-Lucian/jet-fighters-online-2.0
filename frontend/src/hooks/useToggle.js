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
  const toggle = useCallback(() => setState((s) => !s), []);

  return [state, toggle];
};

export { useToggle };

import { useState, useRef, useEffect } from 'react';

/**
 * Creates a state synced with the local storage.
 *
 * @param {String} key local storage key name.
 * @param {Object} defaultValue the value to use if it is not already in localStorage.
 * @param {{serialize: Function, deserialize: Function}} options the serialize and deserialize functions to use (defaults to JSON.stringify and JSON.parse).
 *
 * @returns {array} - [state, setState].
 */
function useLocalStorage(
  key,
  defaultValue = '',
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const [state, setState] = useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage);
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
}

export { useLocalStorage };

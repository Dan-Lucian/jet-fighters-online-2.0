import { useRef, useEffect } from 'react';

/**
 * Puts an event listener to an element.
 * @param {string} eventName event name.
 * @param {function} handler event handler function.
 * @param {Object} [element=window] default = window, optional object to put the eventListener on.
 *
 */
const useEventListener = (eventName, handler, element = window) => {
  // stores the handler
  const savedHandler = useRef();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler
  // without us needing to pass it in effect deps array
  // and potentially cause effect to re-run every render.
  useEffect(() => {
    console.log('effect runs');
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSuported = element && element.addEventListener;
    if (!isSuported) {
      console.log(`Element doesn't support addEventListener`);
      return;
    }

    // Create event listener that calls handler function stored in ref
    // don't know why exactly it is needed ...
    // probably to not refference the same function but to call it
    const eventListener = (event) => savedHandler.current(event);

    console.log('event added');
    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
      console.log('event removed');
    };
  }, [eventName, element]);
};

export { useEventListener };

import { useState, useRef, useEffect } from 'react';

/**
 * Tracks if a click is outside an element.
 *
 * @returns {array} [ref, isClickOuside], ref should be put on the component.
 */
const useClickOutside = () => {
  const [isClickOutside, setIsClickOutside] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setIsClickOutside(true);
        } else {
          setIsClickOutside(false);
        }
      };

      document.addEventListener('pointerdown', handleClickOutside);
      return () => {
        document.removeEventListener('pointerdown', handleClickOutside);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return [ref, isClickOutside];
};

export default useClickOutside;

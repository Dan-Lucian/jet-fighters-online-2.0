import { useState, useRef, useEffect } from 'react';

/**
 * Detects if a component is hovered.
 *
 * @returns {array} [ref, isHovered] ref is put on the component.
 */
function useHover() {
  const [isHovered, setIsHovered] = useState(false);

  const ref = useRef(null);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseenter', handleMouseEnter);
      node.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [ref.current]);

  return [ref, isHovered];
}

export { useHover };
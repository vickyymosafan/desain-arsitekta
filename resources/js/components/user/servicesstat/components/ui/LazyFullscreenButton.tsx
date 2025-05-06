import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import FullscreenButton from '../FullscreenButton';

/**
 * Lazy-loaded fullscreen button that only renders when in viewport
 * Improves performance by only rendering when visible
 */
const LazyFullscreenButton: React.FC<React.ComponentProps<typeof FullscreenButton>> = (props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  
  return (
    <div ref={ref} className="absolute top-4 right-4 z-50">
      {isInView && <FullscreenButton {...props} />}
    </div>
  );
};

export default LazyFullscreenButton;

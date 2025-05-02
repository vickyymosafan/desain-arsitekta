import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface LazyComponentProps {
  children: ReactNode;
  placeholder?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

/**
 * LazyComponent - A component that renders its children only when they come into view
 * This helps reduce initial load time by deferring the rendering of off-screen components
 */
const LazyComponent: React.FC<LazyComponentProps> = ({
  children,
  placeholder,
  threshold = 0.1,
  rootMargin = '200px',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      {
        threshold,
        rootMargin, // Start loading before it comes into view
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={containerRef} className={className}>
      {isVisible ? children : placeholder || (
        <div className="animate-pulse bg-gray-200 rounded-lg w-full h-full min-h-[100px]" />
      )}
    </div>
  );
};

export default LazyComponent;

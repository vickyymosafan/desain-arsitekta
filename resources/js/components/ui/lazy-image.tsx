import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderColor?: string;
  threshold?: number;
  blurEffect?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  placeholderColor = 'bg-emerald-100',
  threshold = 0.1,
  blurEffect = true,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          if (imgRef.current) {
            observer.unobserve(imgRef.current);
          }
        }
      },
      {
        threshold,
        rootMargin: '200px', // Start loading 200px before it comes into view
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [threshold]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: !isLoaded ? placeholderColor : 'transparent' }}
      ref={imgRef}
    >
      {isInView && (
        <>
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            {...props}
          />
          {blurEffect && !isLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full" 
                 style={{ animation: 'shimmer 1.5s infinite' }}
            />
          )}
        </>
      )}
      {!isInView && (
        <div 
          className={`w-full h-full animate-pulse ${placeholderColor}`}
          style={{ 
            aspectRatio: props.width && props.height ? `${props.width}/${props.height}` : 'auto' 
          }}
        />
      )}
    </div>
  );
};

export default LazyImage;

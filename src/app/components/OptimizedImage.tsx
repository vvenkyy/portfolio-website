"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 75, // Reduced from default 100
  sizes,
  fill = false,
  style = {},
  placeholder = 'empty',
  blurDataURL
}: OptimizedImageProps) {
  const [imageQuality, setImageQuality] = useState(quality);
  const [imageWidth, setImageWidth] = useState(width);
  const [imageHeight, setImageHeight] = useState(height);
  
  // Use intersection observer to only load image when in view
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '100px'
  });

  useEffect(() => {
    // Detect device performance and adjust image quality
    const optimizeForDevice = () => {
      const connection = (navigator as any).connection;
      const memory = (performance as any).memory;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const pixelRatio = window.devicePixelRatio || 1;
      
      let newQuality = quality;
      let newWidth = width;
      let newHeight = height;

      // Reduce quality for slow connections
      if (connection) {
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          newQuality = Math.min(quality, 50);
        } else if (connection.effectiveType === '3g') {
          newQuality = Math.min(quality, 65);
        }
        
        // Save data mode
        if (connection.saveData) {
          newQuality = Math.min(quality, 40);
        }
      }

      // Reduce quality for low memory devices
      if (memory && memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.7) {
        newQuality = Math.min(quality, 60);
      }

      // Mobile optimization
      if (screenWidth <= 768) {
        newQuality = Math.min(quality, 70);
        // Reduce image dimensions for mobile
        if (newWidth && newWidth > 800) {
          newWidth = Math.min(newWidth, 800);
          if (newHeight) {
            newHeight = (newHeight * newWidth) / width!;
          }
        }
      }

      // High DPI screens - don't over-optimize
      if (pixelRatio > 2) {
        newQuality = Math.max(newQuality, 80);
      }

      // Very small screens
      if (screenWidth <= 480) {
        newQuality = Math.min(quality, 60);
        if (newWidth && newWidth > 600) {
          newWidth = Math.min(newWidth, 600);
          if (newHeight) {
            newHeight = (newHeight * newWidth) / width!;
          }
        }
      }

      setImageQuality(newQuality);
      if (newWidth) setImageWidth(newWidth);
      if (newHeight) setImageHeight(newHeight);
    };

    optimizeForDevice();

    // Re-optimize on resize
    const handleResize = () => {
      optimizeForDevice();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [quality, width, height]);

  // Generate responsive sizes if not provided
  const getResponsiveSizes = () => {
    if (sizes) return sizes;
    
    if (fill) {
      return "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw";
    }
    
    if (imageWidth) {
      if (imageWidth <= 400) return "100vw";
      if (imageWidth <= 800) return "(max-width: 768px) 100vw, 50vw";
      return "(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw";
    }
    
    return "100vw";
  };

  // Only render when in view for better performance
  if (!inView && !priority) {
    return (
      <div 
        ref={inViewRef}
        className={`${className} bg-gray-200 dark:bg-gray-800 animate-pulse`}
        style={{
          width: imageWidth ? `${imageWidth}px` : '100%',
          height: imageHeight ? `${imageHeight}px` : '200px',
          ...style
        }}
      />
    );
  }

  return (
    <Image
      ref={inViewRef}
      src={src}
      alt={alt}
      width={imageWidth}
      height={imageHeight}
      className={className}
      priority={priority}
      quality={imageQuality}
      sizes={getResponsiveSizes()}
      fill={fill}
      style={{
        ...style,
        objectFit: 'cover' as const,
      }}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      // Performance optimizations
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
} 
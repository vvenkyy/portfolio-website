"use client";
import { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface OptimizedVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  poster?: string;
  preload?: 'none' | 'metadata' | 'auto';
  quality?: 'low' | 'medium' | 'high';
  maxWidth?: number;
  maxHeight?: number;
}

export default function OptimizedVideo({
  src,
  className = "",
  style = {},
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  poster,
  preload = 'metadata',
  quality = 'medium',
  maxWidth = 1920,
  maxHeight = 1080
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use intersection observer to only load video when in view
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: '50px'
  });

  // Performance optimization: reduce video quality based on device performance
  const getOptimizedSrc = (originalSrc: string) => {
    // For now, return the original src
    // In production, you would implement server-side video transcoding
    // and return different quality versions based on device capabilities
    return originalSrc;
  };

  // Adaptive quality based on device performance
  const [adaptiveQuality, setAdaptiveQuality] = useState(quality);
  
  useEffect(() => {
    // Detect device performance and adjust quality
    const detectPerformance = () => {
      const connection = (navigator as any).connection;
      const memory = (performance as any).memory;
      
      if (connection) {
        // Slow connection
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          setAdaptiveQuality('low');
        }
        // Save data mode
        if (connection.saveData) {
          setAdaptiveQuality('low');
        }
      }
      
      // Low memory device
      if (memory && memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
        setAdaptiveQuality('low');
      }
      
      // Mobile device optimization
      if (window.innerWidth <= 768) {
        setAdaptiveQuality('low');
      }
    };

    detectPerformance();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Performance optimizations
    video.preload = preload;
    video.muted = muted;
    video.playsInline = playsInline;
    
    // Reduce video quality for better performance
    if (adaptiveQuality === 'low') {
      video.style.filter = 'blur(0.5px)';
      video.style.transform = 'scale(1.01)'; // Prevent blur edges
    }

    // Only load video when in view
    if (inView && !isLoaded) {
      video.src = getOptimizedSrc(src);
      setIsLoaded(true);
    }

    // Pause video when not in view to save resources
    if (!inView && isPlaying) {
      video.pause();
      setIsPlaying(false);
    }

    // Event listeners
    const handleLoadStart = () => {
      setError(null);
    };

    const handleCanPlay = () => {
      if (autoPlay && inView) {
        video.play().catch(() => {
          // Auto-play failed, but that's okay
        });
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      setError('Failed to load video');
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
    };
  }, [src, inView, isLoaded, autoPlay, muted, playsInline, preload, adaptiveQuality]);

  // Combine refs
  const setRefs = (element: HTMLVideoElement | null) => {
    videoRef.current = element;
    inViewRef(element);
  };

  if (error) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-200 dark:bg-gray-800`} style={style}>
        <p className="text-gray-500 dark:text-gray-400">Video unavailable</p>
      </div>
    );
  }

  return (
    <video
      ref={setRefs}
      className={className}
      style={{
        ...style,
        maxWidth: `${maxWidth}px`,
        maxHeight: `${maxHeight}px`,
        objectFit: 'cover' as const,
      }}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      poster={poster}
      preload={preload}
      // Performance attributes
      disablePictureInPicture
      disableRemotePlayback
    />
  );
} 
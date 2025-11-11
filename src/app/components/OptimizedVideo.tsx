"use client";
import { useRef, useEffect, useState, useCallback } from 'react';
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
  maxWidth?: number;
  maxHeight?: number;
  priority?: boolean;
  // Mobile fallback image
  mobileImage?: string;
}

// Simple mobile detection
const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export default function OptimizedVideo({
  src,
  className = "",
  style = {},
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  poster,
  preload = 'none', // CRITICAL: No preloading by default
  maxWidth = 1920,
  maxHeight = 1080,
  priority = false,
  mobileImage
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Intersection Observer - only load when visible
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: priority ? '200px' : '50px' // Only preload priority videos slightly ahead
  });

  // Detect mobile on mount and enable loading
  useEffect(() => {
    const mobile = isMobileDevice();
    setIsMobile(mobile);
    
    // Priority videos load immediately, others wait for inView
    if (priority) {
      setShouldLoad(true);
    } else if (inView) {
      setShouldLoad(true);
    }
  }, [inView, priority]);

  // Handle video loading and playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    // Set video attributes
    video.preload = preload;
    video.muted = muted;
    video.playsInline = playsInline;
    video.loop = loop;
    
    // Mobile optimizations: reduce playback quality to prevent overheating
    if (isMobile) {
      // Lower playback rate slightly to reduce CPU/GPU load
      video.playbackRate = 0.95;
      // Disable hardware acceleration hints that can cause overheating
      video.style.transform = 'translateZ(0)';
    }

    // Set src when ready to load
    if (shouldLoad) {
      // Get current src (might be full URL or relative)
      const currentSrc = video.src || video.getAttribute('src') || '';
      const normalizedCurrentSrc = currentSrc.replace(window.location.origin, '');
      
      // Only set src if it's different to avoid unnecessary reloads
      if (normalizedCurrentSrc !== src && currentSrc !== src) {
        video.src = src;
        video.load(); // Explicitly load the video
      }
    }

    // Play/pause based on visibility - CRITICAL for mobile to prevent overheating
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
        setIsPlaying(false);
      } else if (inView && autoPlay) {
        video.play().catch(() => {
          // Auto-play failed, that's okay
        });
      }
    };

    // Handle play/pause based on viewport
    // Mobile: Slight delay to reduce initial load, but still auto-play
    let playTimeout: NodeJS.Timeout | null = null;
    if (inView && autoPlay && !isPlaying) {
      if (isMobile) {
        // On mobile, wait a bit before playing to reduce initial load spike
        playTimeout = setTimeout(() => {
          video.play().catch(() => {
            // Auto-play failed
          });
        }, 200);
      } else {
        video.play().catch(() => {
          // Auto-play failed
        });
      }
    } else if (!inView && isPlaying) {
      video.pause();
      setIsPlaying(false);
    }

    // Event listeners
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      const video = e.target as HTMLVideoElement;
      console.error('Video error:', e, video.error);
      // Only set error for actual failures
      if (video.error) {
        // Don't show error for network issues immediately - might be temporary
        if (video.error.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
          setError('Video format not supported');
        } else if (video.error.code !== MediaError.MEDIA_ERR_NETWORK) {
          // Only show error for non-network issues
          setError('Failed to load video');
        } else {
          // Network error - log but don't show error message (might recover)
          console.warn('Network error loading video, will retry');
        }
      }
    };
    
    const handleLoadedData = () => {
      // Clear any previous errors when video loads successfully
      setError(null);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoadedData);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (playTimeout) clearTimeout(playTimeout);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoadedData);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Clean up: pause and remove src to free memory
      video.pause();
      video.src = '';
      video.load();
    };
  }, [src, shouldLoad, inView, autoPlay, muted, playsInline, loop, preload, isMobile, isPlaying]);

  // Combine refs
  const setRefs = useCallback((element: HTMLVideoElement | null) => {
    videoRef.current = element;
    inViewRef(element);
  }, [inViewRef]);

  // Mobile: Show poster image initially, then load video when ready
  // This prevents initial heavy load on mobile

  // Error state
  if (error) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-200 dark:bg-gray-800`} style={style}>
        {poster ? (
          <img src={poster} alt="Video preview" className="w-full h-full object-cover" />
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Video unavailable</p>
        )}
      </div>
    );
  }

  // Show video (mobile and desktop) - optimized for both
  return (
    <video
      ref={setRefs}
      className={className}
      style={{
        ...style,
        maxWidth: `${maxWidth}px`,
        maxHeight: `${maxHeight}px`,
        objectFit: 'cover' as const,
        // Mobile: Additional optimizations
        ...(isMobile && {
          willChange: 'auto', // Reduce GPU usage
          backfaceVisibility: 'hidden',
        }),
      }}
      autoPlay={autoPlay && shouldLoad} // Auto-play on both mobile and desktop
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      poster={poster || mobileImage} // Use mobileImage as poster if no poster provided
      preload={preload}
      disablePictureInPicture
      disableRemotePlayback
    />
  );
}

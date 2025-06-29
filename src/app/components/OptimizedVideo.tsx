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
  quality?: 'low' | 'medium' | 'high';
  maxWidth?: number;
  maxHeight?: number;
  priority?: boolean; // For hero/important videos
}

// Global video manager to prevent too many videos playing simultaneously
class VideoManager {
  private static instance: VideoManager;
  private activeVideos: Set<HTMLVideoElement> = new Set();
  private maxConcurrentVideos = 2; // Limit concurrent videos
  private performanceMode = false;

  static getInstance(): VideoManager {
    if (!VideoManager.instance) {
      VideoManager.instance = new VideoManager();
    }
    return VideoManager.instance;
  }

  constructor() {
    // Detect performance mode
    this.detectPerformanceMode();
    
    // Monitor system performance
    this.monitorPerformance();
  }

  private detectPerformanceMode() {
    const connection = (navigator as any).connection;
    const memory = (performance as any).memory;
    const cores = navigator.hardwareConcurrency || 4;
    
    // Reduce concurrent videos on low-end devices
    if (cores <= 4 || (memory && memory.jsHeapSizeLimit < 2147483648)) {
      this.maxConcurrentVideos = 1;
      this.performanceMode = true;
    }
    
    // Reduce on slow connections
    if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
      this.maxConcurrentVideos = 1;
      this.performanceMode = true;
    }
    
    // Reduce on mobile
    if (window.innerWidth <= 768) {
      this.maxConcurrentVideos = 1;
      this.performanceMode = true;
    }
  }

  private monitorPerformance() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const checkFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // If FPS drops below 30, reduce concurrent videos
        if (fps < 30 && this.maxConcurrentVideos > 1) {
          this.maxConcurrentVideos = 1;
          this.pauseNonPriorityVideos();
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(checkFPS);
    };
    
    requestAnimationFrame(checkFPS);
  }

  registerVideo(video: HTMLVideoElement, priority: boolean = false) {
    this.activeVideos.add(video);
    
    // If we have too many videos playing, pause non-priority ones
    if (this.activeVideos.size > this.maxConcurrentVideos) {
      this.pauseNonPriorityVideos();
    }
  }

  unregisterVideo(video: HTMLVideoElement) {
    this.activeVideos.delete(video);
  }

  private pauseNonPriorityVideos() {
    let priorityCount = 0;
    const videos = Array.from(this.activeVideos);
    
    // Count priority videos
    for (const video of videos) {
      if (video.dataset.priority === 'true') {
        priorityCount++;
      }
    }
    
    // Pause non-priority videos if we have too many
    for (const video of videos) {
      if (video.dataset.priority !== 'true' && video.played.length > 0) {
        video.pause();
      }
    }
  }

  canPlayVideo(priority: boolean = false): boolean {
    if (priority) return true;
    
    const playingVideos = Array.from(this.activeVideos).filter(v => 
      !v.paused && v.readyState >= 3
    );
    
    return playingVideos.length < this.maxConcurrentVideos;
  }

  isPerformanceMode(): boolean {
    return this.performanceMode;
  }
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
  maxHeight = 1080,
  priority = false
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  
  const videoManager = VideoManager.getInstance();
  
  // Use intersection observer with larger margin for better performance
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: '100px' // Larger margin to start loading earlier
  });

  // Adaptive quality based on device performance
  const [adaptiveQuality, setAdaptiveQuality] = useState(quality);
  
  useEffect(() => {
    // Set priority flag on video element
    if (videoRef.current) {
      videoRef.current.dataset.priority = priority.toString();
    }
  }, [priority]);

  useEffect(() => {
    // Detect device performance and adjust quality
    const detectPerformance = () => {
      const connection = (navigator as any).connection;
      const memory = (performance as any).memory;
      const cores = navigator.hardwareConcurrency || 4;
      
      // Aggressive quality reduction for better performance
      if (cores <= 4) {
        setAdaptiveQuality('low');
      } else if (cores <= 6) {
        setAdaptiveQuality('medium');
      }
      
      // Low memory device
      if (memory && memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.7) {
        setAdaptiveQuality('low');
      }
      
      // Slow connection
      if (connection) {
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          setAdaptiveQuality('low');
        }
        if (connection.saveData) {
          setAdaptiveQuality('low');
        }
      }
      
      // Mobile device optimization
      if (window.innerWidth <= 768) {
        setAdaptiveQuality('low');
      }
    };

    detectPerformance();
  }, []);

  // Optimize video source based on quality
  const getOptimizedSrc = useCallback((originalSrc: string) => {
    // For now, return the original src
    // In production, implement server-side transcoding for different qualities
    return originalSrc;
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Register video with manager
    videoManager.registerVideo(video, priority);

    // Aggressive performance optimizations
    video.preload = preload;
    video.muted = muted;
    video.playsInline = playsInline;
    
    // Reduce video quality for better performance
    if (adaptiveQuality === 'low' || videoManager.isPerformanceMode()) {
      video.style.filter = 'blur(1px) brightness(0.95)';
      video.style.transform = 'scale(1.02)'; // Prevent blur edges
      
      // Reduce frame rate for low-end devices
      if (videoManager.isPerformanceMode()) {
        video.playbackRate = 0.8;
      }
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
      setShouldPlay(false);
    }

    // Check if we can play this video
    if (inView && isLoaded && autoPlay && !isPlaying) {
      if (videoManager.canPlayVideo(priority)) {
        setShouldPlay(true);
      }
    }

    // Event listeners
    const handleLoadStart = () => {
      setError(null);
    };

    const handleCanPlay = () => {
      if (shouldPlay && inView) {
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
      
      // Unregister from manager
      videoManager.unregisterVideo(video);
    };
  }, [src, inView, isLoaded, autoPlay, muted, playsInline, preload, adaptiveQuality, shouldPlay, priority, videoManager, getOptimizedSrc]);

  // Combine refs
  const setRefs = useCallback((element: HTMLVideoElement | null) => {
    videoRef.current = element;
    inViewRef(element);
  }, [inViewRef]);

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
        willChange: 'transform', // Optimize for animations
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
      // Additional performance optimizations
      {...(adaptiveQuality === 'low' && {
        'data-quality': 'low'
      })}
    />
  );
} 
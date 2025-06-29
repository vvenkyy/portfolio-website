"use client";
import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
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
  priority?: boolean;
  lazy?: boolean;
}

// Instagram/Facebook/TikTok-style Video Manager
class SocialMediaVideoManager {
  private static instance: SocialMediaVideoManager;
  private videoCache: Map<string, HTMLVideoElement> = new Map();
  private preloadQueue: Set<string> = new Set();
  private activeVideos: Set<HTMLVideoElement> = new Set();
  private maxConcurrentVideos = 1; // Instagram-style: only one video at a time
  private preloadLimit = 3; // Preload next 3 videos
  private isPreloading = false;

  static getInstance(): SocialMediaVideoManager {
    if (!SocialMediaVideoManager.instance) {
      SocialMediaVideoManager.instance = new SocialMediaVideoManager();
    }
    return SocialMediaVideoManager.instance;
  }

  constructor() {
    this.initializePerformanceMode();
    this.startPreloadManager();
  }

  private initializePerformanceMode() {
    // Instagram-style: aggressive mobile optimization
    const isMobile = window.innerWidth <= 768;
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (performance as any).memory;
    
    if (isMobile || cores <= 4) {
      this.maxConcurrentVideos = 1;
    }
    
    // Reduce preload on low memory
    if (memory && memory.jsHeapSizeLimit < 2147483648) {
      this.preloadLimit = 1;
    }
  }

  private startPreloadManager() {
    // Instagram-style: smart preloading
    setInterval(() => {
      this.managePreloadQueue();
    }, 1000);
  }

  private managePreloadQueue() {
    if (this.isPreloading || this.preloadQueue.size === 0) return;
    
    this.isPreloading = true;
    const urls = Array.from(this.preloadQueue).slice(0, this.preloadLimit);
    
    urls.forEach(url => {
      this.preloadVideo(url);
      this.preloadQueue.delete(url);
    });
    
    this.isPreloading = false;
  }

  private preloadVideo(src: string) {
    if (this.videoCache.has(src)) return;
    
    const video = document.createElement('video');
    video.muted = true;
    video.preload = 'metadata';
    video.style.display = 'none';
    video.src = src;
    
    // Instagram-style: only load metadata initially
    video.addEventListener('loadedmetadata', () => {
      this.videoCache.set(src, video);
    });
    
    document.body.appendChild(video);
  }

  registerVideo(video: HTMLVideoElement, priority: boolean = false) {
    this.activeVideos.add(video);
    
    // Instagram-style: pause all other videos
    if (this.activeVideos.size > this.maxConcurrentVideos) {
      this.pauseNonPriorityVideos();
    }
  }

  unregisterVideo(video: HTMLVideoElement) {
    this.activeVideos.delete(video);
  }

  private pauseNonPriorityVideos() {
    const videos = Array.from(this.activeVideos);
    const priorityVideos = videos.filter(v => v.dataset.priority === 'true');
    
    // Keep only priority videos playing
    videos.forEach(video => {
      if (video.dataset.priority !== 'true' && !video.paused) {
        video.pause();
      }
    });
  }

  canPlayVideo(priority: boolean = false): boolean {
    if (priority) return true;
    
    const playingVideos = Array.from(this.activeVideos).filter(v => 
      !v.paused && v.readyState >= 3
    );
    
    return playingVideos.length < this.maxConcurrentVideos;
  }

  addToPreloadQueue(src: string) {
    if (!this.preloadQueue.has(src)) {
      this.preloadQueue.add(src);
    }
  }

  getCachedVideo(src: string): HTMLVideoElement | null {
    return this.videoCache.get(src) || null;
  }

  clearCache() {
    this.videoCache.forEach(video => {
      if (video.parentNode) {
        video.parentNode.removeChild(video);
      }
    });
    this.videoCache.clear();
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
  priority = false,
  lazy = true
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const videoManager = SocialMediaVideoManager.getInstance();
  
  // Instagram-style: aggressive intersection observer
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: '200px' // Larger margin for Instagram-style preloading
  });

  // Instagram-style: adaptive quality based on device
  const adaptiveQuality = useMemo(() => {
    const isMobile = window.innerWidth <= 768;
    const cores = navigator.hardwareConcurrency || 4;
    const connection = (navigator as any).connection;
    
    if (isMobile || cores <= 4) return 'low';
    if (connection && connection.effectiveType === 'slow-2g') return 'low';
    return quality;
  }, [quality]);

  // Instagram-style: optimized video source
  const optimizedSrc = useMemo(() => {
    // In production, this would return different quality URLs
    // For now, return the original src
    return src;
  }, [src]);

  useEffect(() => {
    // Add to preload queue immediately
    videoManager.addToPreloadQueue(optimizedSrc);
  }, [optimizedSrc, videoManager]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set priority flag
    video.dataset.priority = priority.toString();
    
    // Register with manager
    videoManager.registerVideo(video, priority);

    // Instagram-style: aggressive performance optimizations
    video.preload = preload;
    video.muted = muted;
    video.playsInline = playsInline;
    
    // Instagram-style: visual optimizations for performance
    if (adaptiveQuality === 'low') {
      video.style.filter = 'blur(0.5px) brightness(0.98)';
      video.style.transform = 'scale(1.01)';
      video.playbackRate = 0.9; // Slightly slower for smoother playback
    }

    // Instagram-style: smart loading
    if (inView && !isLoaded) {
      // Check if we have a cached version
      const cachedVideo = videoManager.getCachedVideo(optimizedSrc);
      if (cachedVideo) {
        video.src = cachedVideo.src;
      } else {
        video.src = optimizedSrc;
      }
      setIsLoaded(true);
    }

    // Instagram-style: pause when not visible
    if (!inView && isPlaying) {
      video.pause();
      setIsPlaying(false);
      setShouldPlay(false);
    }

    // Instagram-style: smart play logic
    if (inView && isLoaded && autoPlay && !isPlaying) {
      if (videoManager.canPlayVideo(priority)) {
        setShouldPlay(true);
      }
    }

    // Event listeners
    const handleLoadStart = () => setError(null);
    
    const handleCanPlay = () => {
      if (shouldPlay && inView) {
        video.play().catch(() => {
          // Auto-play failed, but that's okay
        });
      }
    };
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
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
      
      videoManager.unregisterVideo(video);
    };
  }, [src, inView, isLoaded, autoPlay, muted, playsInline, preload, adaptiveQuality, shouldPlay, priority, videoManager, optimizedSrc]);

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
        willChange: 'transform',
        // Instagram-style: performance optimizations
        ...(adaptiveQuality === 'low' && {
          filter: 'blur(0.5px) brightness(0.98)',
          transform: 'scale(1.01)'
        })
      }}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      poster={poster}
      preload={preload}
      // Instagram-style: performance attributes
      disablePictureInPicture
      disableRemotePlayback
      {...(adaptiveQuality === 'low' && {
        'data-quality': 'low'
      })}
    />
  );
} 
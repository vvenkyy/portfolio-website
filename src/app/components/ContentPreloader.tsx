"use client";
import { useEffect, useState, useRef } from 'react';

interface ContentPreloaderProps {
  onPreloadComplete?: () => void;
  bootProgress?: number;
}

// Instagram/Facebook/TikTok-style content preloader
export default function ContentPreloader({ onPreloadComplete, bootProgress = 0 }: ContentPreloaderProps) {
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [isPreloading, setIsPreloading] = useState(false);
  const preloadQueue = useRef<Set<string>>(new Set());
  const loadedItems = useRef<Set<string>>(new Set());

  // Critical content to preload (hero videos, important images)
  const criticalContent = [
    '/works/backdrop vid/background vid.mp4',
    '/profile/about me.png',
    '/works/backdrop vid/poster vid.mp4',
    '/works/backdrop vid/web vid.mp4',
    '/works/backdrop vid/logo vid.mp4'
  ];

  // Secondary content to preload
  const secondaryContent = [
    '/works/app developement/MAIN VID.mp4',
    '/works/app developement/enhanced vid.mp4',
    '/works/websites/enhanced rhealthcity.mp4',
    '/works/websites/enhanced void.mp4',
    '/works/web vid/rhealth city.mp4',
    '/works/web vid/void.mp4'
  ];

  useEffect(() => {
    // Start preloading when boot animation starts
    if (bootProgress > 0 && !isPreloading) {
      setIsPreloading(true);
      startPreloading();
    }
  }, [bootProgress, isPreloading]);

  const startPreloading = async () => {
    const allContent = [...criticalContent, ...secondaryContent];
    
    // Add all content to preload queue
    allContent.forEach(item => preloadQueue.current.add(item));
    
    let loadedCount = 0;
    const totalItems = allContent.length;

    // Preload critical content first
    for (const item of criticalContent) {
      await preloadItem(item);
      loadedCount++;
      setPreloadProgress((loadedCount / totalItems) * 100);
    }

    // Preload secondary content in background
    secondaryContent.forEach(item => {
      preloadItem(item).then(() => {
        loadedCount++;
        setPreloadProgress((loadedCount / totalItems) * 100);
        
        if (loadedCount === totalItems) {
          onPreloadComplete?.();
        }
      });
    });
  };

  const preloadItem = async (src: string): Promise<void> => {
    if (loadedItems.current.has(src)) return;

    return new Promise((resolve) => {
      if (src.endsWith('.mp4')) {
        preloadVideo(src, resolve);
      } else if (src.match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
        preloadImage(src, resolve);
      } else {
        resolve();
      }
    });
  };

  const preloadVideo = (src: string, onComplete: () => void) => {
    const video = document.createElement('video');
    video.muted = true;
    video.preload = 'metadata';
    video.style.display = 'none';
    
    // Instagram-style: only load metadata initially
    video.addEventListener('loadedmetadata', () => {
      loadedItems.current.add(src);
      onComplete();
    });
    
    video.addEventListener('error', () => {
      // If video fails to load, still mark as complete to continue
      loadedItems.current.add(src);
      onComplete();
    });
    
    video.src = src;
    document.body.appendChild(video);
  };

  const preloadImage = (src: string, onComplete: () => void) => {
    const img = new Image();
    
    img.onload = () => {
      loadedItems.current.add(src);
      onComplete();
    };
    
    img.onerror = () => {
      // If image fails to load, still mark as complete to continue
      loadedItems.current.add(src);
      onComplete();
    };
    
    img.src = src;
  };

  // Instagram-style: smart cache management
  useEffect(() => {
    const cleanup = () => {
      // Clean up preloaded videos when component unmounts
      const videos = document.querySelectorAll('video[style*="display: none"]');
      videos.forEach(video => {
        if (video.parentNode) {
          video.parentNode.removeChild(video);
        }
      });
    };

    return cleanup;
  }, []);

  return null; // This component doesn't render anything visible
} 
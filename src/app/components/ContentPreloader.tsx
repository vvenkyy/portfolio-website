"use client";
import { useEffect, useState } from 'react';

interface ContentPreloaderProps {
  onPreloadComplete?: () => void;
  bootProgress?: number;
}

// LIGHTWEIGHT preloader - only preload critical images, NO videos
export default function ContentPreloader({ onPreloadComplete, bootProgress = 0 }: ContentPreloaderProps) {
  const [isPreloading, setIsPreloading] = useState(false);

  useEffect(() => {
    // Only preload critical images, NOT videos (videos are too heavy)
    if (bootProgress > 0 && !isPreloading) {
      setIsPreloading(true);
      preloadCriticalImages();
    }
  }, [bootProgress, isPreloading]);

  const preloadCriticalImages = async () => {
    // Only preload the about me image - that's the only critical one
    const criticalImages = [
      '/profile/about me.png'
    ];

    const promises = criticalImages.map(src => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Continue even if image fails
        img.src = src;
      });
    });

    await Promise.all(promises);
    onPreloadComplete?.();
  };

  return null; // This component doesn't render anything visible
}

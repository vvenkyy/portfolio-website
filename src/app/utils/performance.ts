// Performance optimization utilities

// Reduced animation variants for better performance
export const reducedMotionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, // Reduced from typical 0.6-0.8
      ease: "easeOut" 
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { 
      duration: 0.3,
      ease: "easeIn" 
    }
  }
};

// Stagger variants with reduced complexity
export const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Reduced from 0.15-0.2
      delayChildren: 0.1
    }
  }
};

// Simple fade variants
export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

// Slide variants with reduced movement
export const slideVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4 }
  }
};

// Scale variants with reduced movement
export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4 }
  }
};

// Performance-optimized viewport settings
export const viewportSettings = {
  once: true,
  amount: 0.2, // Reduced from 0.3
  margin: "0px 0px -100px 0px"
};

// Device performance detection
export const getDevicePerformance = () => {
  const connection = (navigator as any).connection;
  const memory = (performance as any).memory;
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  
  let performanceLevel = 'high';
  
  // Check connection
  if (connection) {
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      performanceLevel = 'low';
    } else if (connection.effectiveType === '3g') {
      performanceLevel = 'medium';
    }
    
    if (connection.saveData) {
      performanceLevel = 'low';
    }
  }
  
  // Check memory
  if (memory && memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.7) {
    performanceLevel = 'low';
  }
  
  // Check CPU cores
  if (hardwareConcurrency < 4) {
    performanceLevel = 'medium';
  }
  
  // Check screen size (mobile optimization)
  if (window.innerWidth <= 768) {
    performanceLevel = performanceLevel === 'high' ? 'medium' : 'low';
  }
  
  return performanceLevel;
};

// Get animation settings based on device performance
export const getAnimationSettings = () => {
  const performance = getDevicePerformance();
  
  switch (performance) {
    case 'low':
      return {
        duration: 0.3,
        staggerChildren: 0.05,
        amount: 0.1,
        reduceMotion: true
      };
    case 'medium':
      return {
        duration: 0.4,
        staggerChildren: 0.1,
        amount: 0.2,
        reduceMotion: false
      };
    default:
      return {
        duration: 0.5,
        staggerChildren: 0.15,
        amount: 0.3,
        reduceMotion: false
      };
  }
};

// Debounce function for performance
export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for performance
export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function executedFunction(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}; 
"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ThemeContext } from "./ThemeProvider";
import ContentPreloader from "./components/ContentPreloader";

export const BootAnimationContext = createContext<{ 
  booted: boolean;
  bootProgress: number;
}>({ booted: false, bootProgress: 0 });

export default function BootAnimationClient({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"idle" | "transition" | "done">("idle");
  const [bootProgress, setBootProgress] = useState(0);
  const { theme } = useContext(ThemeContext);

  // Instagram-style: track boot progress for smart preloading
  useEffect(() => {
    let progress = 0;
    const progressInterval = setInterval(() => {
      if (phase === "idle") {
        progress = Math.min(progress + 2, 30);
      } else if (phase === "transition") {
        progress = Math.min(progress + 3, 80);
      } else if (phase === "done") {
        progress = 100;
      }
      setBootProgress(progress);
    }, 50);

    return () => clearInterval(progressInterval);
  }, [phase]);

  // Reduced timing for better performance
  useEffect(() => {
    if (phase === "idle") {
      const timeout = setTimeout(() => setPhase("transition"), 800);
      return () => clearTimeout(timeout);
    }
    if (phase === "transition") {
      const timeout = setTimeout(() => setPhase("done"), 600);
      return () => clearTimeout(timeout);
    }
  }, [phase]);

  // Simplified logo animation with reduced complexity
  const logoVariants = {
    idle: {
      y: [0, -8, 0, 8, 0],
      scale: 1,
      transition: { 
        duration: 1.8,
        repeat: Infinity, 
        ease: "easeInOut" as const,
        times: [0, 0.25, 0.5, 0.75, 1]
      },
    },
    transition: {
      y: "-60vh",
      scale: 1.2,
      transition: { 
        duration: 0.6,
        ease: "easeInOut" as const 
      },
    },
    done: { 
      y: "-60vh", 
      scale: 1.2,
      transition: { duration: 0.1 }
    },
  };

  // Simplified content animation
  const contentVariants = {
    hidden: { 
      y: "60vh",
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut" as const
      } 
    },
  };

  const booted = phase === "done";

  return (
    <BootAnimationContext.Provider value={{ booted, bootProgress }}>
      {/* Instagram-style: Content preloader that works during boot animation */}
      <ContentPreloader 
        bootProgress={bootProgress}
        onPreloadComplete={() => {
          console.log('🎬 Content preloading completed!');
        }}
      />
      
      <>
        <AnimatePresence mode="wait">
          {phase !== "done" && (
            <motion.div
              className={`fixed inset-0 z-[9999] flex items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ 
                opacity: 0, 
                transition: { 
                  duration: 0.3,
                  delay: 0.05
                } 
              }}
              style={{ 
                pointerEvents: "all",
                willChange: "opacity"
              }}
            >
              <motion.div
                variants={logoVariants}
                animate={phase}
                initial="idle"
                className="flex items-center justify-center"
                style={{ 
                  position: "absolute", 
                  left: 0, 
                  right: 0, 
                  margin: "auto",
                  willChange: "transform"
                }}
              >
                <Image
                  src="/works/MYLOGO/150ppi/WHITE TRANSPARENT.png"
                  alt="VVENKYY Logo Boot"
                  width={120}
                  height={120}
                  priority
                  className={`w-32 h-32 object-contain ${theme === 'light' ? 'invert' : ''}`}
                  style={{
                    willChange: "transform"
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial="hidden"
          animate={booted ? "visible" : "hidden"}
          variants={contentVariants}
          style={{ 
            minHeight: "100vh",
            willChange: "transform, opacity"
          }}
        >
          {children}
        </motion.div>
      </>
    </BootAnimationContext.Provider>
  );
} 
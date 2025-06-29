"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ThemeContext } from "./ThemeProvider";

export const BootAnimationContext = createContext<{ booted: boolean }>({ booted: false });

export default function BootAnimationClient({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"idle" | "transition" | "done">("idle");
  const { theme } = useContext(ThemeContext);

  // Reduced timing for better performance
  useEffect(() => {
    if (phase === "idle") {
      const timeout = setTimeout(() => setPhase("transition"), 800); // Reduced from 1200ms
      return () => clearTimeout(timeout);
    }
    if (phase === "transition") {
      const timeout = setTimeout(() => setPhase("done"), 600); // Reduced from 900ms
      return () => clearTimeout(timeout);
    }
  }, [phase]);

  // Simplified logo animation with reduced complexity
  const logoVariants = {
    idle: {
      y: [0, -8, 0, 8, 0], // Reduced movement range
      scale: 1,
      transition: { 
        duration: 1.8, // Reduced from 2.4s
        repeat: Infinity, 
        ease: "easeInOut" as const,
        times: [0, 0.25, 0.5, 0.75, 1] // More efficient timing
      },
    },
    transition: {
      y: "-60vh", // Reduced movement distance
      scale: 1.2, // Slight scale for visual interest
      transition: { 
        duration: 0.6, // Reduced from 0.9s
        ease: "easeInOut" as const 
      },
    },
    done: { 
      y: "-60vh", 
      scale: 1.2,
      transition: { duration: 0.1 } // Quick final state
    },
  };

  // Simplified content animation
  const contentVariants = {
    hidden: { 
      y: "60vh", // Reduced movement distance
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6, // Reduced from 0.9s
        ease: "easeOut" as const // Changed to easeOut for better performance
      } 
    },
  };

  const booted = phase === "done";

  return (
    <BootAnimationContext.Provider value={{ booted }}>
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
                  duration: 0.3, // Reduced from 0.5s
                  delay: 0.05 // Reduced delay
                } 
              }}
              style={{ 
                pointerEvents: "all",
                willChange: "opacity" // Performance hint
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
                  willChange: "transform" // Performance hint
                }}
              >
                <Image
                  src="/works/MYLOGO/150ppi/WHITE TRANSPARENT.png"
                  alt="VVENKYY Logo Boot"
                  width={120} // Reduced from 160
                  height={120} // Reduced from 160
                  priority
                  className={`w-32 h-32 object-contain ${theme === 'light' ? 'invert' : ''}`} // Reduced from w-40 h-40
                  style={{
                    willChange: "transform" // Performance hint
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
            willChange: "transform, opacity" // Performance hint
          }}
        >
          {children}
        </motion.div>
      </>
    </BootAnimationContext.Provider>
  );
} 
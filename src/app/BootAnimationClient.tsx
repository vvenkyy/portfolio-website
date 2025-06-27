"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ThemeContext } from "./ThemeProvider";

export const BootAnimationContext = createContext<{ booted: boolean }>({ booted: false });

export default function BootAnimationClient({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"idle" | "transition" | "done">("idle");
  const { theme } = useContext(ThemeContext);

  // Start transition after idle period
  useEffect(() => {
    if (phase === "idle") {
      const timeout = setTimeout(() => setPhase("transition"), 1200);
      return () => clearTimeout(timeout);
    }
    if (phase === "transition") {
      const timeout = setTimeout(() => setPhase("done"), 900);
      return () => clearTimeout(timeout);
    }
  }, [phase]);

  // Logo animation: floating in idle, then move up and scale up off screen in transition
  const logoVariants = {
    idle: {
      y: [0, -16, 0, 16, 0],
      scale: 1,
      transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" as const },
    },
    transition: {
      y: "-80vh",
      scale: 1,
      transition: { duration: 0.9, ease: "easeInOut" as const },
    },
    done: { y: "-80vh", scale: 1 },
  };

  // Content animation: hidden, then slide up as logo moves (no fade)
  const contentVariants = {
    hidden: { y: "100vh" },
    visible: { y: 0, transition: { duration: 0.9, ease: "easeInOut" as const } },
  };

  const booted = phase === "done";

  return (
    <BootAnimationContext.Provider value={{ booted }}>
      <>
        <AnimatePresence>
          {phase !== "done" && (
            <motion.div
              className={`fixed inset-0 z-[9999] flex items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.1 } }}
              style={{ pointerEvents: "all" }}
            >
              <motion.div
                variants={logoVariants}
                animate={phase}
                initial="idle"
                className="flex items-center justify-center"
                style={{ position: "absolute", left: 0, right: 0, margin: "auto" }}
              >
                <Image
                  src="/works/MYLOGO/150ppi/WHITE TRANSPARENT.png"
                  alt="VVENKYY Logo Boot"
                  width={160}
                  height={160}
                  priority
                  className={`w-40 h-40 object-contain ${theme === 'light' ? 'invert' : ''}`}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial="hidden"
          animate={booted ? "visible" : "hidden"}
          variants={contentVariants}
          style={{ minHeight: "100vh" }}
        >
          {children}
        </motion.div>
      </>
    </BootAnimationContext.Provider>
  );
} 
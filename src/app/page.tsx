"use client";
import { useContext, useRef, useState, useEffect } from "react";
import { ThemeContext } from "./ThemeProvider";
import { motion, useScroll, useTransform } from "framer-motion";
import { LightBulbIcon, EyeIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import Navbar from "./Navbar";
import { BootAnimationContext } from "./BootAnimationClient";

// Butter fill animation styles
const butterStyle = `
.butter-btn {
  position: relative;
  overflow: hidden;
  border-radius: 0 !important;
}
.butter-btn .butter-fill {
  position: absolute;
  inset: 0;
  background: #FE5500;
  z-index: 0;
  width: 0%;
  transition: width 0.45s cubic-bezier(.77,0,.18,1);
}
.butter-btn:hover .butter-fill,
.butter-btn:focus .butter-fill {
  width: 100%;
}
.butter-btn .butter-content {
  position: relative;
  z-index: 1;
  color: #fff;
}
`;

export default function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { booted } = useContext(BootAnimationContext);
  const [titleSettled, setTitleSettled] = useState(false);
  const [navbarBooted, setNavbarBooted] = useState(false);

  // Parallax for Hero background
  const heroRef = useRef(null);
  const { scrollY: heroScrollY } = useScroll({ target: heroRef });
  const heroBgY = useTransform(heroScrollY, [0, 600], ["0%", "-28%"]);

  // Parallax for About image
  const aboutImgRef = useRef(null);
  const { scrollY: aboutScrollY } = useScroll({ target: aboutImgRef });
  const aboutImgY = useTransform(aboutScrollY, [0, 400], ["0%", "-20%"]);

  const heroSectionRef = React.useRef<HTMLElement | null>(null);
  const aboutSectionRef = React.useRef<HTMLElement | null>(null);
  const servicesSectionRef = React.useRef<HTMLDivElement | null>(null);
  const contactSectionRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (typeof hash === 'string' && hash === '#hero') {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      } else if (typeof hash === 'string' && hash === '#about') {
        if (aboutSectionRef.current) {
          setTimeout(() => {
            window.scrollTo({ top: aboutSectionRef.current!.offsetTop, behavior: 'smooth' });
          }, 100);
        }
      } else if (typeof hash === 'string' && hash === '#services') {
        if (servicesSectionRef.current) {
          setTimeout(() => {
            window.scrollTo({ top: servicesSectionRef.current!.offsetTop, behavior: 'smooth' });
          }, 100);
        }
      } else if (typeof hash === 'string' && hash === '#contact') {
        if (contactSectionRef.current) {
          setTimeout(() => {
            window.scrollTo({ top: contactSectionRef.current!.offsetTop, behavior: 'smooth' });
          }, 100);
        }
      }
      // Listen for hashchange events for SPA navigation
      const onHashChange = () => {
        const hash = window.location.hash;
        if (typeof hash === 'string' && hash === '#hero') {
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 100);
        } else if (typeof hash === 'string' && hash === '#about') {
          if (aboutSectionRef.current) {
            setTimeout(() => {
              window.scrollTo({ top: aboutSectionRef.current!.offsetTop, behavior: 'smooth' });
            }, 100);
          }
        } else if (typeof hash === 'string' && hash === '#services') {
          if (servicesSectionRef.current) {
            setTimeout(() => {
              window.scrollTo({ top: servicesSectionRef.current!.offsetTop, behavior: 'smooth' });
            }, 100);
          }
        } else if (typeof hash === 'string' && hash === '#contact') {
          if (contactSectionRef.current) {
            setTimeout(() => {
              window.scrollTo({ top: contactSectionRef.current!.offsetTop, behavior: 'smooth' });
            }, 100);
          }
        }
      };
      window.addEventListener('hashchange', onHashChange);
      return () => window.removeEventListener('hashchange', onHashChange);
    }
  }, []);

  useEffect(() => {
    if (booted) {
      const t = setTimeout(() => setNavbarBooted(true), 1200);
      return () => clearTimeout(t);
    } else {
      setNavbarBooted(false);
    }
  }, [booted]);

  return (
    <div className={`w-full min-h-screen flex flex-col font-sans ${theme === 'light' ? 'bg-white' : 'bg-background'} text-foreground`} style={{ WebkitOverflowScrolling: 'touch', WebkitTapHighlightColor: 'transparent' }}>
      {/* Reserve space for sticky navbar to prevent layout shift */}
      <div style={{ height: 72, minHeight: 72, width: '100%' }} />
      {/* Sticky Navbar: Show even later after boot animation is done */}
      {navbarBooted && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 30 }}>
          <Navbar
            onScrollHero={() => {
              if (heroSectionRef.current) {
                window.scrollTo({ top: heroSectionRef.current.offsetTop, behavior: 'smooth' });
              }
            }}
            onScrollAbout={() => {
              if (aboutSectionRef.current) {
                window.scrollTo({ top: aboutSectionRef.current.offsetTop, behavior: 'smooth' });
              }
            }}
            onScrollContact={() => {
              if (contactSectionRef.current) {
                window.scrollTo({ top: contactSectionRef.current.offsetTop, behavior: 'smooth' });
              }
            }}
          />
        </div>
      )}

      {/* Hero Section: Cinematic, Full-Screen, Distinguished */}
      <section
        id="hero"
        ref={heroSectionRef}
        className="w-full flex flex-col items-center justify-center h-screen px-4 overflow-hidden relative"
        style={{ 
          position: 'relative', 
          background: theme === 'light' ? '#fff' : '#010101',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {/* Parallax Background Image */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
          style={{ y: heroBgY, WebkitTransform: 'translate3d(0,0,0)' }}
          initial={{ opacity: 0 }}
          animate={booted ? { opacity: 1, transition: { delay: 3.2, duration: 1.2, ease: "easeInOut" } } : {}}
        >
          <video
            src="/works/backdrop vid/background vid.mp4"
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            x5-playsinline="true"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="false"
            preload="auto"
            className="w-full h-full object-cover"
            style={{ 
              position: 'absolute', 
              inset: 0, 
              filter: theme === 'light' ? 'invert(1) brightness(1.1) contrast(0.95)' : 'none',
              WebkitTransform: 'translate3d(0,0,0)',
              transform: 'translate3d(0,0,0)'
            }}
          />
        </motion.div>
        {/* Cinematic Overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: theme === 'light'
              ? 'linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.8) 100%)'
              : 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(1,1,1,0.8) 100%)'
          }}
        />
        {/* Hero Content */}
        <div className="mb-6 z-20 w-full flex flex-col items-center justify-center mt-[-2.5rem] md:mt-0">
          {/* Mobile: stacked, centered; Desktop: row, left-aligned */}
          <div className="w-full flex flex-col md:flex-row md:flex-wrap md:items-end md:justify-center text-center md:text-left">
            <motion.span
              className={`font-black uppercase tracking-tight transition-all duration-700
                ${titleSettled ? 'text-5xl xs:text-6xl sm:text-7xl md:text-7xl' : 'text-3xl xs:text-4xl sm:text-5xl md:text-8xl'}
                text-accent mb-2 md:mb-0 md:mr-3`}
              style={{
                color: '#FE5500',
                filter: theme === 'light'
                  ? 'drop-shadow(0 12px 64px rgba(255,255,255,1)) drop-shadow(0 4px 24px rgba(255,255,255,0.98))'
                  : 'drop-shadow(0 12px 64px rgba(0,0,0,1)) drop-shadow(0 4px 24px rgba(0,0,0,0.98))'
              }}
              initial={{ y: 40, opacity: 0 }}
              animate={booted ? { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.7, ease: 'easeInOut' } } : {}}
            >
              DESIGN
            </motion.span>
            <motion.span
              className={`font-black uppercase tracking-tight transition-all duration-700
                ${titleSettled ? 'text-2xl xs:text-3xl sm:text-4xl md:text-7xl' : 'text-xl xs:text-2xl sm:text-3xl md:text-5xl'}
                text-black dark:text-white`}
              style={{ color: theme === 'light' ? '#18181b' : '#fff' }}
              initial={{ y: 40, opacity: 0 }}
              animate={booted ? { y: 0, opacity: 1, transition: { delay: 0.6, duration: 0.7, ease: 'easeInOut' } } : {}}
            >
              IS THE FIRST IMPRESSION.
            </motion.span>
          </div>
          <div className="w-full flex flex-col md:flex-row md:flex-wrap md:items-end md:justify-center text-center md:text-left mt-2">
            <motion.span
              className={`font-black uppercase tracking-tight transition-all duration-700
                ${titleSettled ? 'text-2xl xs:text-3xl sm:text-4xl md:text-7xl text-accent' : 'text-xl xs:text-2xl sm:text-3xl md:text-4xl'}
                text-black dark:text-white mb-2 md:mb-0 md:mr-2`}
              style={{ color: theme === 'light' ? '#18181b' : '#fff' }}
              initial={{ y: 40, opacity: 0 }}
              animate={booted ? { y: 0, opacity: 1, transition: { delay: 1.1, duration: 0.7, ease: 'easeInOut' } } : {}}
            >
              LET'S MAKE IT
            </motion.span>
            <motion.span
              className={`font-black uppercase tracking-tight transition-all duration-700
                ${titleSettled ? 'text-2xl xs:text-3xl sm:text-4xl md:text-7xl' : 'text-xl xs:text-2xl sm:text-3xl md:text-6xl'}
                text-accent`}
              style={{
                color: '#FE5500',
                filter: theme === 'light'
                  ? 'drop-shadow(0 12px 64px rgba(255,255,255,1)) drop-shadow(0 4px 24px rgba(255,255,255,0.98))'
                  : 'drop-shadow(0 12px 64px rgba(0,0,0,1)) drop-shadow(0 4px 24px rgba(0,0,0,0.98))'
              }}
              initial={{ y: 24, opacity: 0 }}
              animate={booted ? { y: 0, opacity: 1, transition: { delay: 1.5, duration: 0.8, ease: 'easeOut' } } : {}}
              onAnimationComplete={() => setTimeout(() => setTitleSettled(true), 400)}
            >
              UNFORGETTABLE.
            </motion.span>
          </div>
        </div>
        <motion.p
          className="text-base md:text-2xl text-center max-w-2xl mb-8 font-light z-20 drop-shadow-lg"
          style={{ color: theme === 'light' ? '#444' : '#e5e5e5' }}
          initial={{ y: 20, opacity: 0 }}
          animate={booted ? { y: 0, opacity: 1, transition: { delay: 4.7, duration: 1.2, ease: "easeInOut" } } : {}}
        >
          Design. Code. Impact.
        </motion.p>
        <motion.a
          href="#contact"
          className="inline-block px-10 py-4 font-black uppercase rounded tracking-widest text-sm transition-transform hover:scale-105 focus:scale-105 focus:outline-none shadow-2xl z-20"
          style={{
            background: theme === 'light' ? '#FE5500' : '#FE5500',
            color: theme === 'light' ? '#fff' : '#fff',
            border: theme === 'light' ? 'none' : 'none'
          }}
          initial={{ y: 40, opacity: 0 }}
          animate={booted ? { y: 0, opacity: 1, transition: { delay: 6.2, duration: 1.2, ease: "easeInOut" } } : {}}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Let's Talk
        </motion.a>
      </section>

      {/* Mobile About Section */}
      <section
        id="about"
        ref={aboutSectionRef}
        className="w-full flex flex-col items-center justify-center py-8 px-4 md:hidden"
        style={{ background: theme === 'light' ? '#fff' : '#010101' }}
      >
        <div className="flex flex-col items-center w-full max-w-xl mx-auto">
          <div className="w-[300px] h-[300px] mb-6 overflow-hidden border-8 border-background dark:border-black bg-gradient-to-br from-accent/80 to-black flex items-center justify-center shadow-2xl">
            <Image
              src="/profile/about me.png"
              alt="About Me Photo"
              width={300}
              height={300}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <h2 className={`text-2xl font-black leading-tight mb-6 max-w-2xl text-center ${theme === 'light' ? 'text-neutral-900' : 'text-accent'}`}>I design, create, and build for brands and stories that stand out.</h2>
          <p className={`text-base font-light mb-8 max-w-xl leading-relaxed text-center ${theme === 'light' ? 'text-neutral-900' : 'text-neutral-300'}`}>Movie/art-style posters. Logo design & brand identity. Modern web & app development.</p>
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {["Poster Design", "Logo Design", "Brand Identity", "Web Development", "App Development"].map((tag) => (
              <span
                key={tag}
                className={`px-5 py-2 rounded-full border text-base font-medium shadow-sm ${theme === 'light' ? 'border-neutral-300 text-neutral-800 bg-white' : 'dark:border-neutral-700 dark:text-neutral-200 dark:bg-black/40'}`}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-8 mt-8 justify-center">
            <div className="flex flex-col items-center">
              <span className={`text-2xl font-black ${theme === 'light' ? 'text-neutral-900' : 'text-accent'}`}>4+</span>
              <span className={`text-xs uppercase tracking-widest mt-1 ${theme === 'light' ? 'text-neutral-800' : 'text-neutral-400'}`}>Years Poster Design</span>
            </div>
            <div className="flex flex-col items-center">
              <span className={`text-2xl font-black ${theme === 'light' ? 'text-neutral-900' : 'text-accent'}`}>3+</span>
              <span className={`text-xs uppercase tracking-widest mt-1 ${theme === 'light' ? 'text-neutral-800' : 'text-neutral-400'}`}>Years Logo/Brand</span>
            </div>
            <div className="flex flex-col items-center">
              <span className={`text-2xl font-black ${theme === 'light' ? 'text-neutral-900' : 'text-accent'}`}>1+</span>
              <span className={`text-xs uppercase tracking-widest mt-1 ${theme === 'light' ? 'text-neutral-800' : 'text-neutral-400'}`}>Year Web & App Dev</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section: Editorial, Modern, Like Reference */}
      <motion.section
        id="about"
        ref={aboutSectionRef}
        className="hidden md:flex w-full flex-col items-center justify-center py-28 px-4 overflow-hidden relative scroll-mt-24"
        style={{ background: theme === 'light' ? '#fff' : '#010101' }}
        initial="offscreen"
        whileInView="onscreen"
        exit="exit"
        transition={{ staggerChildren: 0.18 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center md:items-start gap-16 md:gap-8">
          {/* Left: Headline, Tags, Stats */}
          <motion.div
            className="flex-1 flex flex-col items-start justify-center md:justify-start"
            variants={{
              offscreen: { opacity: 0, x: -80, skewY: 8, filter: 'blur(8px)' },
              onscreen: { opacity: 1, x: 0, skewY: 0, filter: 'blur(0px)', transition: { duration: 1, ease: 'easeOut' } },
              exit: { opacity: 0, x: -64, skewY: -8, filter: 'blur(8px)', transition: { duration: 0.7, ease: 'easeIn' } }
            }}
          >
            <h2 className={`text-3xl md:text-5xl font-black leading-tight mb-6 max-w-2xl ${theme === 'light' ? 'text-neutral-900' : 'text-accent'}`}>
              I design, create, and build for brands and stories that stand out.
            </h2>
            <p
              className={`text-lg md:text-2xl font-light mb-8 max-w-xl leading-relaxed ${theme === 'light' ? 'text-neutral-900' : 'text-neutral-300'}`}
            >
              Movie/art-style posters. Logo design & brand identity. Modern web & app development.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {["Poster Design", "Logo Design", "Brand Identity", "Web Development", "App Development"].map((tag) => (
                <span
                  key={tag}
                  className={`px-5 py-2 rounded-full border text-base font-medium shadow-sm ${theme === 'light' ? 'border-neutral-300 text-neutral-800 bg-white' : 'dark:border-neutral-700 dark:text-neutral-200 dark:bg-black/40'}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-10 mt-8 md:mt-16">
              <div className="flex flex-col items-start">
                <span className={`text-3xl md:text-4xl font-black ${theme === 'light' ? 'text-neutral-900' : 'text-accent'}`}>4+</span>
                <span className={`text-xs uppercase tracking-widest mt-1 ${theme === 'light' ? 'text-neutral-800' : 'text-neutral-400'}`}>Years Poster Design</span>
              </div>
              <div className="flex flex-col items-start">
                <span className={`text-3xl md:text-4xl font-black ${theme === 'light' ? 'text-neutral-900' : 'text-accent'}`}>3+</span>
                <span className={`text-xs uppercase tracking-widest mt-1 ${theme === 'light' ? 'text-neutral-800' : 'text-neutral-400'}`}>Years Logo/Brand</span>
              </div>
              <div className="flex flex-col items-start">
                <span className={`text-3xl md:text-4xl font-black ${theme === 'light' ? 'text-neutral-900' : 'text-accent'}`}>1+</span>
                <span className={`text-xs uppercase tracking-widest mt-1 ${theme === 'light' ? 'text-neutral-800' : 'text-neutral-400'}`}>Year Web & App Dev</span>
              </div>
            </div>
          </motion.div>
          {/* Right: Large Photo */}
          <motion.div
            className="flex-1 flex items-center justify-center w-full"
            variants={{
              offscreen: { opacity: 0, scale: 0.9, y: 80, rotate: -8 },
              onscreen: { opacity: 1, scale: 1, y: 0, rotate: 0, transition: { duration: 1.1, ease: 'easeOut' } },
              exit: { opacity: 0, scale: 0.85, y: -64, rotate: 8, transition: { duration: 0.7, ease: 'easeIn' } }
            }}
            style={{ perspective: 1200 }}
          >
            <motion.div
              className="w-[320px] h-[320px] md:w-[420px] md:h-[420px] bg-gradient-to-br from-accent/80 to-black flex items-center justify-center shadow-2xl overflow-hidden border-8 border-background dark:border-black"
              style={{ willChange: 'transform' }}
              variants={{
                offscreen: { scale: 0.92, rotateY: 12 },
                onscreen: { scale: 1, rotateY: 0, transition: { duration: 1.1, ease: 'easeOut' } },
                exit: { scale: 0.85, rotateY: -12, transition: { duration: 0.7, ease: 'easeIn' } }
              }}
        >
          <Image
                src="/profile/about me.png"
                alt="About Me Photo"
                width={420}
                height={420}
                className="object-cover w-full h-full"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Black spacer above works section */}
      <div className={`w-full ${theme === 'light' ? 'bg-white' : 'bg-black'} h-2 md:h-24`} />

      {/* Mobile Services Section */}
      <section className="scroll-mt-24 md:hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className={`w-full flex flex-col gap-10 py-8 ${theme === 'light' ? 'bg-white' : 'bg-background'}`} style={{ WebkitOverflowScrolling: 'touch' }}>
          <span className={`text-xs font-bold mb-4 tracking-widest px-4 ${theme === 'light' ? 'text-neutral-700' : ''}`}>SERVICES</span>
          {[
            {
              name: "Posters",
              video: "/works/backdrop vid/poster vid.mp4",
              title: "Poster Design",
              subtitle: "Movie, Art & Event Posters",
              link: "/posters"
            },
            {
              name: "Branding",
              video: "/works/backdrop vid/logo vid.mp4",
              title: "Branding",
              subtitle: "Logo, Identity, Typography",
              link: "/branding"
            },
            {
              name: "Web Development",
              video: "/works/backdrop vid/web vid.mp4",
              title: "Web Development",
              subtitle: "Custom Websites, Frontend & Backend",
              link: "/web"
            },
            {
              name: "App Development",
              video: "/works/backdrop vid/app vid.mp4",
              title: "App Development",
              subtitle: "Mobile Apps, UI/UX, Prototyping",
              link: "/appdev"
            },
          ].map((s) => (
            <div key={s.name} className="flex flex-col items-center justify-center w-full px-4">
              <div className={`w-full max-w-[420px] aspect-[4/3] mb-4 flex items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}> 
                {s.video ? (
                  <video
                    src={s.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    webkit-playsinline="true"
                    x5-playsinline="true"
                    x5-video-player-type="h5"
                    x5-video-player-fullscreen="false"
                    preload="auto"
                    className="w-full h-full object-cover rounded"
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%',
                      WebkitTransform: 'translate3d(0,0,0)',
                      transform: 'translate3d(0,0,0)'
                    }}
                  />
                ) : null}
              </div>
              <div className="w-full max-w-[420px] text-center">
                <div className={`text-2xl font-black mb-1 leading-tight ${theme === 'light' ? 'text-neutral-900' : 'text-white'}`}>{s.title}</div>
                <div className={`text-base font-light mb-4 ${theme === 'light' ? 'text-neutral-700' : 'text-white/80'}`}>{s.subtitle}</div>
                <ButterButton as="a" href={s.link} className="butter-btn-bordered inline-block px-6 py-2 bg-accent text-white font-bold uppercase rounded tracking-widest text-xs transition-transform hover:scale-105 focus:scale-105 focus:outline-none shadow-lg mt-2">
                  See More
                </ButterButton>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Desktop Services Section */}
      <section className="scroll-mt-24 hidden md:block" style={{ WebkitOverflowScrolling: 'touch' }}>
        <StepRevealServices servicesSectionRef={servicesSectionRef} />
      </section>

      {/* Black spacer below works section */}
      <div className={`w-full ${theme === 'light' ? 'bg-white' : 'bg-black'} h-2 md:h-24`} />

      {/* Philosophy / Approach */}
      <motion.section
        id="philosophy"
        className={`w-full flex flex-col items-center justify-center py-8 md:py-24 px-2 md:px-4 ${theme === 'light' ? 'bg-white' : 'bg-background'}`}
        style={{ background: theme === 'light' ? '#fff' : '#010101' }}
        initial="offscreen"
        whileInView="onscreen"
        exit="exit"
        variants={{
          offscreen: { opacity: 0, y: 64 },
          onscreen: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
          exit: { opacity: 0, y: 64, transition: { duration: 0.7, ease: 'easeIn' } }
        }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="flex flex-col items-center max-w-3xl w-full relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex flex-col items-center w-full mb-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="w-full flex justify-center mb-12"
            >
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                exit="exit"
                variants={{
                  offscreen: { opacity: 0, y: 64 },
                  onscreen: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
                  exit: { opacity: 0, y: 64, transition: { duration: 0.7, ease: 'easeIn' } }
                }}
                viewport={{ once: false, amount: 0.3 }}
                className="relative max-w-4xl w-full"
              >
                <div className="flex flex-col items-center justify-center text-center w-full md:flex-row md:items-start md:text-left">
                  <span className={`${theme === 'light' ? 'text-neutral-400' : 'text-accent'} text-[3rem] md:text-[5rem] leading-none select-none mb-2 md:mb-0 md:mr-2 mt-2`}>
                    "
                  </span>
                  <div className="flex flex-col items-center text-center md:items-start md:text-left">
                    <span className={`font-black leading-tight text-center md:text-left text-3xl md:text-6xl ${theme === 'light' ? 'text-neutral-900' : 'text-accent'}`}>
                      Design is impact—
                    </span>
                    <span className={`font-black leading-tight text-center md:text-left text-2xl md:text-5xl ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-600'} mt-2 md:ml-8`}>
                      meaning over mere looks
                    </span>
                    <span className={`font-black leading-tight text-center md:text-left text-xl md:text-4xl ${theme === 'light' ? 'text-neutral-900' : 'text-accent'} mt-2`}>
                      crafted for brands with vision
                    </span>
                  </div>
                  <span className={`${theme === 'light' ? 'text-neutral-400' : 'text-accent'} text-[3rem] md:text-[5rem] leading-none select-none mt-2 md:ml-2 md:mt-auto md:mb-1`}>
                    "
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          <div className="text-center w-full">
            <p className={`text-2xl md:text-3xl font-black mb-4 leading-tight ${theme === 'light' ? 'text-neutral-900' : 'text-accent'}`}>
              Design is not decoration. It's storytelling, emotion, and impact.
            </p>
            <p
              className={`text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}`}
            >
              Every pixel, every word, every interaction is a chance to move someone. I believe in work that's bold, honest, and crafted with intent—where beauty meets clarity, and function meets feeling.
            </p>
            <div className={`flex flex-col gap-5 text-base md:text-lg font-light max-w-2xl mx-auto mt-4 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>
              {/* <span className="flex items-center gap-3 justify-center"><SparklesIcon className="w-6 h-6 text-accent" />Simplicity is power. Minimal doesn't mean empty—it means essential.</span> */}
              <span className="flex items-center gap-3 justify-center"><EyeIcon className="w-6 h-6 text-accent" />I design for meaning, not just for looks.</span>
              <span className="flex items-center gap-3 justify-center"><LightBulbIcon className="w-6 h-6 text-accent" />Good design is invisible, but unforgettable.</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action / Contact */}
      <motion.section
        id="contact"
        ref={contactSectionRef}
        className={`w-full flex flex-col items-center justify-center py-16 md:py-40 px-4 relative overflow-hidden scroll-mt-24 ${theme === 'light' ? 'bg-white' : 'bg-background'}`}
        style={{ 
          background: theme === 'light' ? '#fff' : '#010101',
          WebkitOverflowScrolling: 'touch'
        }}
        initial="offscreen"
        whileInView="onscreen"
        exit="exit"
        variants={{
          offscreen: { opacity: 0, y: 64 },
          onscreen: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
          exit: { opacity: 0, y: 64, transition: { duration: 0.7, ease: 'easeIn' } }
        }}
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* Subtle background accent */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl z-0" />
        <div className="relative z-10 w-full max-w-3xl flex flex-col items-start">
          <h2 className={`font-black text-2xl sm:text-3xl md:text-6xl leading-tight text-left mb-6 ${theme === 'light' ? 'text-neutral-900' : 'text-accent'}`}>
            Let's create something<br />
            <span className="relative inline-block">
              unforgettable
              <motion.span
                layoutId="underline"
                className="absolute left-0 -bottom-1 w-full h-2 bg-accent rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
            </span>
            —together.
          </h2>
          <p className={`text-base sm:text-lg md:text-2xl font-light mb-8 md:mb-10 max-w-xl ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>
            Ready to launch your next big thing? I design and build complete digital products—let's make it bold, modern, and unforgettable.
          </p>
          <ButterButton as="a" href="mailto:aravindvenky225@gmail.com" className="inline-flex items-center gap-3 mb-6 md:mb-0">Email Me <ArrowRightIcon className="w-6 h-6" /></ButterButton>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-8 w-full">
            {/* Social Button Cards */}
            <a href="https://www.linkedin.com/in/venkateshr2006/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="butter-btn group flex items-center gap-3 px-4 sm:px-5 py-3 rounded-full border-2 border-accent bg-background hover:bg-accent/10 transition-all duration-200 hover:scale-105 hover:-translate-y-1 w-full sm:w-auto justify-center sm:justify-start">
              <span className="butter-fill" />
              <span className="butter-content flex items-center gap-3">
                <svg
                  className={`w-6 h-6 sm:w-7 sm:h-7 text-accent transition-colors duration-200 group-hover:${theme === 'light' ? 'text-black' : 'text-white'}`}
                  fill="currentColor" viewBox="0 0 24 24"
                  style={theme === 'light' ? { color: undefined } : {}}
                >
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/>
                </svg>
                <div className="flex flex-col">
                  <span className={`font-bold leading-tight transition-colors duration-200 group-hover:${theme === 'light' ? 'text-black' : 'text-white'} text-sm sm:text-base`}>LinkedIn</span>
                  <span className={`text-xs transition-colors duration-200 ${theme === 'light' ? 'text-neutral-500 group-hover:text-black' : 'text-neutral-400 group-hover:text-white'}`}>@vvenkyy_</span>
                </div>
              </span>
            </a>
            <a href="https://www.instagram.com/vvenkyy_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="butter-btn group flex items-center gap-3 px-4 sm:px-5 py-3 rounded-full border-2 border-accent bg-background hover:bg-accent/10 transition-all duration-200 hover:scale-105 hover:-translate-y-1 w-full sm:w-auto justify-center sm:justify-start">
              <span className="butter-fill" />
              <span className="butter-content flex items-center gap-3">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-200" viewBox="0 0 256 256" fill="currentColor">
                  <g fill="currentColor"><g transform="scale(5.12,5.12)"><path d="M16,3c-7.17,0 -13,5.83 -13,13v18c0,7.17 5.83,13 13,13h18c7.17,0 13,-5.83 13,-13v-18c0,-7.17 -5.83,-13 -13,-13zM37,11c1.1,0 2,0.9 2,2c0,1.1 -0.9,2 -2,2c-1.1,0 -2,-0.9 -2,-2c0,-1.1 0.9,-2 2,-2zM25,14c6.07,0 11,4.93 11,11c0,6.07 -4.93,11 -11,11c-6.07,0 -11,-4.93 -11,-11c0,-6.07 4.93,-11 11,-11zM25,16c-4.96,0 -9,4.04 -9,9c0,4.96 4.04,9 9,9c4.96,0 9,-4.04 9,-9c0,-4.96 -4.04,-9 -9,-9z"></path></g></g>
                </svg>
                <div className="flex flex-col">
                  <span className="font-bold group-hover:text-white leading-tight transition-colors duration-200 text-sm sm:text-base">Instagram</span>
                  <span className={`text-xs group-hover:text-white transition-colors duration-200 ${theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'}`}>@vvenkyy_</span>
                </div>
              </span>
            </a>
            <a href="https://www.fiverr.com/s/bdwvvrm" target="_blank" rel="noopener noreferrer" aria-label="Fiverr"
              className="butter-btn group flex items-center gap-3 px-4 sm:px-5 py-3 rounded-full border-2 border-accent bg-background hover:bg-accent/10 transition-all duration-200 hover:scale-105 hover:-translate-y-1 w-full sm:w-auto justify-center sm:justify-start">
              <span className="butter-fill" />
              <span className="butter-content flex items-center gap-3">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-200" viewBox="0 0 256 256" fill="currentColor">
                  <g fill="currentColor"><g transform="scale(5.12,5.12)"><path d="M25,2c-12.68,0 -23,10.32 -23,23c0,12.68 10.32,23 23,23c12.68,0 23,-10.32 23,-23c0,-12.68 -10.32,-23 -23,-23zM34,36h-6v-11h-4v11h-6v-11h-4v-6h4.04c0.37,-4.96 3.54,-8 8.46,-8h2.53v6h-2.53c-0.92,0 -2.14,0 -2.43,2h9.93z"></path></g></g>
                </svg>
                <div className="flex flex-col">
                  <span className="font-bold group-hover:text-white leading-tight transition-colors duration-200 text-sm sm:text-base">Fiverr</span>
                  <span className={`text-xs group-hover:text-white transition-colors duration-200 ${theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'}`}>@vvenkyy_</span>
                </div>
              </span>
            </a>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className={`w-full flex flex-col items-center py-8 mt-auto text-xs ${theme === 'light' ? 'bg-white text-neutral-500' : 'bg-background text-neutral-400'}`}>
        <span>&copy; {new Date().getFullYear()} <span className="text-accent font-bold">VVENKYY</span>. All rights reserved.</span>
        <span className="mt-2">Made with passion & code.</span>
      </footer>
    </div>
  );
}

type StepRevealServicesProps = { servicesSectionRef?: React.RefObject<HTMLDivElement | null> };
function StepRevealServices({ servicesSectionRef }: StepRevealServicesProps) {
  const { theme } = useContext(ThemeContext);
  // Example data
  type Service = {
    name: string;
    image?: string;
    video?: string;
    title: string;
    subtitle: string;
    link: string;
  };
  const services: Service[] = [
    {
      name: "Posters",
      video: "/works/backdrop vid/poster vid.mp4",
      title: "Poster Design",
      subtitle: "Movie, Art & Event Posters",
      link: "/posters"
    },
    {
      name: "Branding",
      video: "/works/backdrop vid/logo vid.mp4",
      title: "Branding",
      subtitle: "Logo, Identity, Typography",
      link: "/branding"
    },
    {
      name: "Web Development",
      video: "/works/backdrop vid/web vid.mp4",
      title: "Web Development",
      subtitle: "Custom Websites, Frontend & Backend",
      link: "/web"
    },
    {
      name: "App Development",
      video: "/works/backdrop vid/app vid.mp4",
      title: "App Development",
      subtitle: "Mobile Apps, UI/UX, Prototyping",
      link: "/appdev"
    },
  ];

  // Track which service is active based on scroll
  const [active, setActive] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const offsets = sectionRefs.current.map(ref => (ref && typeof ref.getBoundingClientRect === 'function') ? ref.getBoundingClientRect().top : 0);
      const index = offsets.findIndex(offset => offset > window.innerHeight * 0.5);
      setActive(index === -1 ? services.length - 1 : Math.max(0, index - 1));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`w-full min-h-[60vh] flex flex-col md:flex-row scroll-mt-24 py-8 md:py-12 ${theme === 'light' ? 'bg-white' : 'bg-background'}`} style={{ WebkitOverflowScrolling: 'touch' }}>
      <div id="services" ref={servicesSectionRef} />
      {/* Left: Stacked Service List */}
      <div className="md:w-[38.2%] w-full flex flex-col justify-center sticky top-24 h-[60vh] z-20 pl-4 md:pl-10 select-none" style={{ WebkitOverflowScrolling: 'touch' }}>
        <span className={`text-xs font-bold mb-4 tracking-widest ${theme === 'light' ? 'text-neutral-700' : ''}`}>SERVICES</span>
        <div className="flex flex-col gap-1 md:gap-2">
          {services.map((s, i) => (
            <span
              key={s.name}
              className={`transition-all duration-300 font-black uppercase leading-none ${i === active
                ? theme === 'light' ? 'text-3xl md:text-5xl text-neutral-900' : 'text-3xl md:text-5xl text-accent'
                : theme === 'light' ? 'text-2xl md:text-6xl text-neutral-300' : 'text-2xl md:text-6xl text-white/10'}`}
              style={{ letterSpacing: i === active ? '-0.04em' : '-0.01em' }}
            >
              {s.name}
            </span>
          ))}
        </div>
      </div>
      {/* Right: Step Content */}
      <div className="md:w-[61.8%] w-full flex flex-col gap-12 md:gap-20 py-8 md:py-0 pr-4 md:pr-10 pt-8 md:pt-16 justify-start">
        {services.map((s, i) => (
          <div
            key={s.name}
            ref={el => { sectionRefs.current[i] = el; }}
            className="flex flex-col items-center justify-center min-h-[40vh] w-full"
            style={{ opacity: i === active ? 1 : 0.3, transition: 'opacity 0.3s' }}
          >
            <div className={`w-full max-w-[520px] aspect-[4/3] mb-4 flex items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
              {s.video ? (
                <video
                  src={s.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  webkit-playsinline="true"
                  x5-playsinline="true"
                  x5-video-player-type="h5"
                  x5-video-player-fullscreen="false"
                  preload="auto"
                  className="w-full h-full object-cover rounded"
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '100%',
                    WebkitTransform: 'translate3d(0,0,0)',
                    transform: 'translate3d(0,0,0)'
                  }}
                />
              ) : null}
            </div>
            <div className="w-full max-w-[520px] text-left">
              <div className={`text-2xl md:text-3xl font-black mb-1 leading-tight ${theme === 'light' ? 'text-neutral-900' : 'text-white'}`}>{s.title}</div>
              <div className={`text-base md:text-lg font-light mb-4 ${theme === 'light' ? 'text-neutral-700' : 'text-white/80'}`}>{s.subtitle}</div>
              <ButterButton as="a" href={s.link} className="butter-btn-bordered inline-block px-6 py-2 bg-accent text-white font-bold uppercase rounded tracking-widest text-xs transition-transform hover:scale-105 focus:scale-105 focus:outline-none shadow-lg">
                See More
              </ButterButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Custom ButterButton component
type ButterButtonProps = React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: string; href?: string }>;

function ButterButton({ children, className = '', as, href, ...props }: ButterButtonProps) {
  const { theme } = useContext(ThemeContext);
  const baseBtnClass = `butter-btn px-5 py-2 font-black uppercase tracking-widest text-xs md:text-base shadow-lg transition-none outline-none focus:outline-none box-border ${className}`;
  const borderedClass = `butter-btn-bordered border-2 border-accent ${theme === 'light' ? 'bg-white text-accent hover:bg-accent hover:text-white focus:bg-accent focus:text-white' : 'bg-transparent text-accent hover:bg-accent hover:text-white focus:bg-accent focus:text-white'}`;
  if (as === 'a' && href) {
    return (
      <>
        <style>{butterStyle}</style>
        <a
          href={href}
          className={`${baseBtnClass} ${borderedClass}`}
          style={{ borderRadius: 0 }}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          <span className="butter-content">{children}</span>
          <span className="butter-fill" />
        </a>
      </>
    );
  }
  return (
    <>
      <style>{butterStyle}</style>
      <button
        {...props}
        className={`${baseBtnClass} ${borderedClass}`}
        style={{ borderRadius: 0 }}
      >
        <span className="butter-content">{children}</span>
        <span className="butter-fill" />
      </button>
    </>
  );
}

"use client";
import Navbar from "../Navbar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import React from "react";
import { ThemeContext } from "../ThemeProvider";

function BrowserMockup({ src, title }: { src: string; title: string }) {
  const { theme } = React.useContext(ThemeContext);
  return (
    <div className={`rounded-xl overflow-hidden shadow-2xl border ${theme === 'light' ? 'border-neutral-200 bg-neutral-100' : 'border-neutral-800 bg-neutral-900'}`}>
      <div className={`flex items-center space-x-2 rounded-t-xl px-4 py-2 ${theme === 'light' ? 'bg-neutral-200' : 'bg-neutral-800'}`}>
        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        <span className={`ml-4 text-xs ${theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'}`}>{title}</span>
      </div>
      <iframe
        src={src}
        className={`w-full h-72 md:h-96 rounded-b-xl ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups"
        title={title + " preview"}
      />
    </div>
  );
}

export default function WebDevPage() {
  const [showBoot, setShowBoot] = useState(true);
  const { theme } = React.useContext(ThemeContext);

  useEffect(() => {
    const timer = setTimeout(() => setShowBoot(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`w-full min-h-screen flex flex-col font-sans ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
      {/* Boot Animation Overlay */}
      {showBoot && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className={`fixed inset-0 z-50 flex items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
        >
          {/* Optionally, add a logo or text here for extra polish */}
        </motion.div>
      )}
      <Navbar />
      {/* Hero Section */}
      <motion.section
        className={`w-full h-screen flex flex-col items-center justify-center px-6 md:px-32 border-b border-neutral-800 relative overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      >
        <h1 className={`text-4xl md:text-7xl lg:text-8xl font-black tracking-tight text-center mb-12 leading-tight max-w-4xl mx-auto ${theme === 'light' ? 'text-black' : 'text-accent drop-shadow-xl'}`}>
          Digital Systems,<br className="hidden md:block" />
          Designed for Impact
        </h1>
        <p className={`text-xl md:text-3xl font-light text-center max-w-2xl mb-6 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}`}>
          Where intelligence meets interface. Every solution is engineered for clarity, performance, and meaning—crafted for those who demand more from the web.
        </p>
        {/* Scroll Down Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className={`text-xs uppercase tracking-widest mb-2 ${theme === 'light' ? 'text-neutral-500' : 'text-neutral-300'}`}>Scroll</span>
          <span className="block w-1 h-8 rounded-full bg-accent animate-bounce" />
        </motion.div>
      </motion.section>

      {/* RHealth City Section */}
      <motion.section
        className={`w-full border-b border-neutral-800 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 md:px-20 pt-32">
          <motion.h2
            className={`text-4xl md:text-7xl font-black mb-14 text-left md:text-center ${theme === 'light' ? 'text-black' : 'text-accent'}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Rajalakshmi Health City
          </motion.h2>
        </div>
        {/* Fullscreen 16:9 Video */}
        <div className={`w-full flex justify-center items-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
          <div className="w-full max-w-7xl aspect-[16/9] overflow-hidden flex items-center justify-center">
            <video
              src="/works/websites/enhanced rhealthcity.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{ aspectRatio: '16/9' }}
            />
          </div>
        </div>
        {/* Preview + Overview */}
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-16 py-24 px-4 md:px-20 items-start">
          <motion.div
            className="w-full md:w-1/2 flex-shrink-0"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <BrowserMockup src="https://rhealthcity.com" title="rajalakshmihealthcity.com" />
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 flex flex-col items-start md:items-start"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <motion.h3 className={`text-3xl font-bold mb-8 ${theme === 'light' ? 'text-black' : 'text-accent'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >PROJECT OVERVIEW</motion.h3>
            <motion.p className={`text-lg mb-10 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              I built a modern web platform for <span className="text-accent">Rajalakshmi Health City</span>, a multispecialty <span className="text-accent">hospital</span> and <span className="text-accent">medical college</span> in Chennai. The site streamlines <span className="text-accent">healthcare access</span>, supports <span className="text-accent">medical education</span>, and features <span className="text-accent">role-based access</span>, <span className="text-accent">dynamic directories</span>, and <span className="text-accent">appointment booking</span>. Built with <span className="text-accent">React</span> and <span className="text-accent">Firebase</span> for performance, scalability, and accessibility.
            </motion.p>
            <motion.div className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {['HOSPITAL', 'MEDICAL COLLEGE', 'WEB DEVELOPMENT', 'REACT', 'FIREBASE', 'ROLE-BASED ACCESS', 'UI/UX', 'SCALABILITY'].map(tag => (
                <span key={tag} className={`px-3 py-1 border font-bold uppercase text-xs tracking-widest ${theme === 'light' ? 'border-[#FE5500] text-[#FE5500]' : 'border-accent text-accent'}`}>{tag}</span>
              ))}
            </motion.div>
            <motion.div className={`text-base mb-10 ${theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >Role: <span className="text-accent font-bold">Full Stack Developer (Architecture, Frontend, Backend, Deployment)</span></motion.div>
            <motion.a
              href="https://rhealthcity.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`butter-btn butter-btn-bordered inline-block mt-2 px-6 py-2 font-bold rounded-none transition-all ${theme === 'light' ? 'text-black border-accent' : 'text-accent'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <span className="butter-fill" />
              <span className="butter-content">View Live</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Void Section */}
      <motion.section
        className={`w-full border-b border-neutral-800 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 md:px-20 pt-32">
          <motion.h2
            className={`text-2xl md:text-6xl lg:text-7xl font-black mb-14 text-left md:text-center break-words md:whitespace-nowrap ${theme === 'light' ? 'text-black' : 'text-accent'}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            VOID - Skill Matchmaking System
          </motion.h2>
        </div>
        {/* Fullscreen 16:9 Video */}
        <div className={`w-full flex justify-center items-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
          <div className="w-full max-w-7xl aspect-[16/9] overflow-hidden flex items-center justify-center">
            <video
              src="/works/websites/enhanced void.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{ aspectRatio: '16/9' }}
            />
          </div>
        </div>
        {/* Preview + Overview */}
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-16 py-24 px-4 md:px-20 items-start">
          <motion.div
            className="w-full md:w-1/2 flex-shrink-0"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <BrowserMockup src="https://void-82772.web.app/" title="void-82772.web.app" />
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 flex flex-col items-start md:items-start"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <motion.h3 className={`text-3xl font-bold mb-8 ${theme === 'light' ? 'text-black' : 'text-accent'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >PROJECT OVERVIEW</motion.h3>
            <motion.p className={`text-lg mb-10 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              I architected and developed <span className="text-accent">Void</span>, an AI-powered <span className="text-accent">skill matchmaking platform</span> connecting <span className="text-accent">freelancers</span> and <span className="text-accent">clients</span> with precision. At its core is a high-level <span className="text-accent">machine learning model</span>—trained on vast, real-world data—matching talent by <span className="text-accent">skill</span>, <span className="text-accent">price</span>, <span className="text-accent">duration</span>, and <span className="text-accent">project scale</span>. The entire experience is crafted in a <span className="text-accent">noir</span>, <span className="text-accent">dark minimal</span> aesthetic, balancing intelligence and elegance. Every layer, from <span className="text-accent">ML architecture</span> to <span className="text-accent">UI/UX</span>, was designed and built end-to-end.
            </motion.p>
            <motion.div className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {['AI MATCHMAKING', 'MACHINE LEARNING', 'WEB DEVELOPMENT', 'NOIR THEME', 'UI/UX', 'REACT', 'FIREBASE', 'END-TO-END'].map(tag => (
                <span key={tag} className={`px-3 py-1 border font-bold uppercase text-xs tracking-widest ${theme === 'light' ? 'border-[#FE5500] text-[#FE5500]' : 'border-accent text-accent'}`}>{tag}</span>
              ))}
            </motion.div>
            <motion.div className={`text-base mb-10 ${theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >Role: <span className="text-accent font-bold">Full Stack Developer (ML Architecture, AI, Frontend, Backend, UI/UX, Deployment)</span></motion.div>
            <motion.a
              href="https://void-82772.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={`butter-btn butter-btn-bordered inline-block mt-2 px-6 py-2 font-bold rounded-none transition-all ${theme === 'light' ? 'text-black border-accent' : 'text-accent'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <span className="butter-fill" />
              <span className="butter-content">View Live</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Floating Back to all works button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="/#services"
          className="butter-btn butter-btn-bordered px-5 py-2 text-base shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          style={{ minWidth: 180, display: 'inline-block', borderRadius: 0 }}
        >
          <span className="butter-content">← Back to all works</span>
          <span className="butter-fill" />
        </a>
      </div>

      {/* Philosophy Section */}
      <div className={`w-full flex flex-col items-center justify-center text-center px-4 pb-24 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
        <h2 className={`text-2xl md:text-4xl font-black mb-6 mt-8 md:mt-16 ${theme === 'light' ? 'text-black' : 'text-accent'}`} style={{ letterSpacing: '-0.01em' }}>
          "Intelligence is not just built—it's designed."
        </h2>
        <p className={`text-lg md:text-2xl max-w-2xl ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>
          Every algorithm, every interface, every match is a story—crafted to empower, connect, and elevate. Technology is not just what we build, it's how we shape possibility.
        </p>
      </div>
    </div>
  );
} 
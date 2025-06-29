"use client";
import Navbar from "../Navbar";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { ThemeContext } from "../ThemeProvider";
import OptimizedVideo from "../components/OptimizedVideo";
import OptimizedImage from "../components/OptimizedImage";
import Link from "next/link";

const screenshots = [
  {
    src: "/works/app developement/images/sign in.jpg",
    title: "Sign In",
    desc: `Secure login for students and staff, ensuring only authorized access to the canteen system. The sign-in screen is designed for quick authentication, with clear prompts and error handling for invalid credentials. This step is crucial for maintaining the integrity and privacy of user data, and sets the tone for a seamless user experience from the very first interaction.`
  },
  {
    src: "/works/app developement/images/sign up.jpg",
    title: "Sign Up",
    desc: `Easy onboarding for new users, linking accounts to college credentials. The sign-up process is streamlined, requiring minimal information while ensuring security. Visual cues and validation help users complete registration without confusion, making the app accessible to everyone in the college community.`
  },
  {
    src: "/works/app developement/images/home page.jpg",
    title: "Dashboard",
    desc: `Personalized dashboard showing menu, order status, and quick actions. The dashboard is the central hub, providing real-time updates on orders, daily specials, and notifications. Its intuitive layout allows users to navigate effortlessly between features, enhancing productivity and satisfaction.`
  },
  {
    src: "/works/app developement/images/cart.jpg",
    title: "Cart",
    desc: `Review and manage selected items before placing an order. The cart interface is optimized for clarity, allowing users to adjust quantities, remove items, and view total costs at a glance. This ensures transparency and helps prevent mistakes before finalizing orders.`
  },
  {
    src: "/works/app developement/images/qr page.jpg",
    title: "QR Code",
    desc: `Scan to pay and track orders, integrating with the billing system. The QR code feature bridges the digital and physical experience, enabling contactless payments and instant order tracking. This not only speeds up transactions but also adds a layer of convenience and safety.`
  },
  {
    src: "/works/app developement/images/categories.jpg",
    title: "Categories",
    desc: `Browse food and beverage categories, designed with college theme colors and patterns. The categories screen uses visual hierarchy and color coding to make selection intuitive, reflecting the vibrant identity of Rajalakshmi Institute of Technology.`
  },
  {
    src: "/works/app developement/images/forget password page.jpg",
    title: "Forgot Password",
    desc: `Simple password recovery for seamless user experience. The recovery process is straightforward, guiding users step-by-step to reset their credentials securely, ensuring they can always regain access without hassle.`
  }
];

export default function AppDevPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { theme } = React.useContext(ThemeContext);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <div className={`w-full min-h-screen flex flex-col font-sans ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
      <Navbar />
      {/* Hero Section: Cinematic fullscreen, smaller text, fade-in boot animation, scroll indicator */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`w-full h-screen flex flex-col items-center justify-center relative px-4 md:px-0 pt-0 mt-0 !m-0 !p-0 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
      >
        <h1 className={`text-3xl md:text-5xl font-black tracking-tight text-center mb-8 leading-tight max-w-3xl mx-auto ${theme === 'light' ? 'text-black' : 'text-accent drop-shadow-xl'}`} style={{ marginTop: '-2rem' }}>
          Intelligent Mobile Systems,<br className="hidden md:block" />
          Designed for Efficiency
        </h1>
        <p className={`text-base md:text-xl font-light text-center max-w-2xl mb-0 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}`}>
          Where usability meets innovation. Every app is engineered for clarity, performance, and seamless experience—crafted for those who demand more from mobile technology.
        </p>
        {/* Scroll Down Indicator */}
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className={`text-xs uppercase tracking-widest mb-2 ${theme === 'light' ? 'text-neutral-500' : 'text-neutral-300'}`}>Scroll</span>
          <span className="block w-1 h-8 rounded-full bg-accent animate-bounce" />
        </motion.div>
      </motion.section>
      {/* Project Title & Overview */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.9, ease: 'anticipate' }}
        className={`w-full pt-12 pb-10 px-4 md:px-20 flex flex-col items-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
      >
        <h2 className={`text-2xl md:text-4xl font-black text-center mb-6 drop-shadow-xl ${theme === 'light' ? 'text-black' : ''}`}>Canteen Automation for RIT</h2>
        <div className={`text-lg md:text-2xl font-light text-center max-w-3xl mb-8 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}`}>
          Currently developing a mobile application for canteen automation tailored to streamline ordering and management processes within our college.
        </div>
        <div className={`text-base md:text-lg max-w-2xl text-center mb-10 ${theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'}`}>
          Built with <span className="text-orange-400 font-semibold">Flutter</span> (frontend), <span className="text-orange-400 font-semibold">Python Flask</span> (backend), and <span className="text-orange-400 font-semibold">SSMS</span> (database), running on a <span className="text-orange-400 font-semibold">Raspberry Pi</span> as a billing machine. The design is inspired by <span className="text-orange-400 font-semibold">Rajalakshmi Institute of Technology</span>—featuring blue, orange, and circular patterns. I led the design, backend, frontend, and database development.
        </div>
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {['APP DEVELOPMENT', 'FLUTTER', 'PYTHON FLASK', 'SSMS', 'RASPBERRY PI', 'UI/UX', 'COLLEGE AUTOMATION'].map(tag => (
            <span key={tag} className={`px-3 py-1 border font-bold uppercase text-xs tracking-widest ${theme === 'light' ? 'border-orange-500 text-orange-500' : 'border-orange-400 text-orange-400'}`}>{tag}</span>
          ))}
        </div>
        <div className={`text-base mb-10 text-center ${theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'}`}>
          Role: <span className="text-orange-400 font-bold">Full Stack Developer (Design, Frontend, Backend, Database)</span>
        </div>
      </motion.section>
      {/* Video Section (no border lines, no scroll animation) */}
      <section className={`w-full flex justify-center items-center mb-16 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
        <div className="w-full max-w-7xl aspect-[16/9] overflow-hidden flex items-center justify-center">
          <OptimizedVideo
            src="/works/app developement/enhanced vid.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ aspectRatio: '16/9' }}
            quality="medium"
            preload="metadata"
            maxWidth={1920}
            maxHeight={1080}
          />
        </div>
      </section>
      {/* Screenshots Section: Justified images and text, reduced container width, snappy scroll animation */}
      <section className={`w-full py-12 px-4 md:px-20 flex flex-col items-center mt-0 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
        <div className="max-w-3xl w-full flex flex-col gap-y-20 mx-auto">
          {screenshots.map((shot, idx) => (
            <motion.div
              key={shot.title}
              className={`w-full flex flex-col md:flex-row items-center md:justify-between ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''} gap-y-8 md:gap-x-4`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.45, ease: 'circOut', delay: idx * 0.07 }}
            >
              <div className="flex justify-start items-center md:justify-start">
                <div className={`w-[22rem] h-[38rem] overflow-hidden flex-shrink-0 flex justify-center items-center ${theme === 'light' ? 'bg-neutral-100' : 'bg-neutral-900'}`} style={{ borderRadius: 0 }}>
                  <OptimizedImage
                    src={shot.src}
                    alt={shot.title}
                    width={700}
                    height={1200}
                    className="w-full h-full object-cover"
                    priority={idx === 0}
                    quality={70}
                  />
                </div>
              </div>
              <div
                className={`flex flex-col ${idx % 2 === 1 ? 'items-end text-right' : 'items-start text-left'} justify-center max-w-[22rem]`}
              >
                <h3 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-orange-500' : 'text-orange-400'}`}>{shot.title}</h3>
                <p className={`text-lg whitespace-pre-line text-justify ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}`} style={{ textAlign: 'justify' }}>{shot.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Philosophy Section (scroll animation, posters style) */}
      <motion.section
        className={`w-full flex flex-col items-center justify-center mt-24 mb-12 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="max-w-2xl text-center">
          <div className={`text-2xl md:text-3xl font-black mb-4 drop-shadow-xl ${theme === 'light' ? 'text-black' : 'text-accent'}`}>&ldquo;Technology is not just built—it&rsquo;s designed.&rdquo;</div>
          <div className={`text-lg md:text-xl font-light leading-relaxed ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>Every app, every feature, every interaction is a story—crafted to empower, connect, and elevate. Technology is not just what we build, it&rsquo;s how we shape possibility.</div>
        </div>
      </motion.section>
      {/* Floating ButterButton */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="/"
          className="butter-btn butter-btn-bordered px-6 py-3 text-base shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          style={{ minWidth: 140, display: 'inline-block', borderRadius: 0 }}
        >
          <span className="butter-content">← Back to all works</span>
          <span className="butter-fill" />
        </Link>
      </div>
    </div>
  );
} 
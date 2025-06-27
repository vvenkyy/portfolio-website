"use client";
import { useParams } from "next/navigation";
import Navbar from "../../Navbar";
import { motion } from "framer-motion";
import React from "react";
import { ThemeContext } from "../../ThemeProvider";
import Link from "next/link";

const LOGO_DATA = {
  "20-years-of-shasun": {
    title: "20 Years of Shasun",
    subtext: "A mark of legacy, empowerment, and tradition for Shasun Arts & Science College for Women.",
    overview: (
      <>Designed for Shasun Arts & Science College for Women, this commemorative mark celebrates two decades of <span style={{color:'#FE5500'}} className="font-semibold">empowerment</span> and <span style={{color:'#FE5500'}} className="font-semibold">excellence</span>. The logo unites a stylized <span style={{color:'#FE5500'}} className="font-semibold">peacock</span>&mdash;symbolizing kindness, wealth, beauty, and pride&mdash;with a bold <span style={{color:'#FE5500'}} className="font-semibold">fire</span> motif, representing courage and boldness. Together, they form the <span style={{color:'#FE5500'}} className="font-semibold">number &quot;20&quot;</span>: a visual story of <span style={{color:'#FE5500'}} className="font-semibold">legacy</span> and <span style={{color:'#FE5500'}} className="font-semibold">progress</span>. The brand mark honors the college&apos;s journey, its commitment to <span style={{color:'#FE5500'}} className="font-semibold">women&apos;s advancement</span>, and its <span style={{color:'#FE5500'}} className="font-semibold">vibrant spirit</span>.</>),
    images: [
      "/works/logo design and brand identity/SHASUN/images/20 YEARS OF SHASUN-01.png",
      "/works/logo design and brand identity/SHASUN/images/20 YEARS OF SHASUN-02.png",
      "/works/logo design and brand identity/SHASUN/images/20 YEARS OF SHASUN-03.png",
      "/works/logo design and brand identity/SHASUN/images/20 YEARS OF SHASUN-04.png",
      "/works/logo design and brand identity/SHASUN/images/20 YEARS OF SHASUN-05.png",
      "/works/logo design and brand identity/SHASUN/images/20 YEARS OF SHASUN-06.png",
      "/works/logo design and brand identity/SHASUN/images/20 YEARS OF SHASUN-07.png",
      "/works/logo design and brand identity/SHASUN/images/20 YEARS OF SHASUN-08.png",
      "/works/logo design and brand identity/SHASUN/images/20 YEARS OF SHASUN-09.png",
      "/works/logo design and brand identity/SHASUN/images/20 YEARS OF SHASUN-10.png",
      "/works/logo design and brand identity/SHASUN/images/20 YEARS OF SHASUN-11.png",
      "/works/logo design and brand identity/SHASUN/images/20 YEARS OF SHASUN-12.png"
    ],
    philosophy: (
      <>&quot;A logo for an institution is not just a symbol&mdash;it&apos;s a vessel of memory, pride, and the promise of tomorrow. The Shasun mark is a celebration of every woman who has walked these halls, and every story yet to unfold.&quot;</>
    ),
  },
  "eco-living-solution": {
    title: "Eco Living Solution",
    subtext: "A sustainable brand for natural skincare and eco-friendly packaging.",
    overview: (
      <><span style={{color:'#FE5500'}} className="font-semibold">Eco Living Solution</span> is a brand dedicated to <span style={{color:'#FE5500'}} className="font-semibold">sustainable</span> living through <span style={{color:'#FE5500'}} className="font-semibold">natural</span> skincare and <span style={{color:'#FE5500'}} className="font-semibold">eco-friendly</span> <span style={{color:'#FE5500'}} className="font-semibold">packaging</span>. The logo draws inspiration from the <span style={{color:'#FE5500'}} className="font-semibold">trunk</span> and <span style={{color:'#FE5500'}} className="font-semibold">leaves</span> of a <span style={{color:'#FE5500'}} className="font-semibold">tree</span>, symbolizing <span style={{color:'#FE5500'}} className="font-semibold">growth</span>, <span style={{color:'#FE5500'}} className="font-semibold">harmony</span>, and a deep connection to <span style={{color:'#FE5500'}} className="font-semibold">nature</span>. Every product is crafted with a commitment to <span style={{color:'#FE5500'}} className="font-semibold">environmental responsibility</span>, using only <span style={{color:'#FE5500'}} className="font-semibold">sustainable materials</span> and processes. The <span style={{color:'#FE5500'}} className="font-semibold">visual identity</span> reflects the brand&apos;s <span style={{color:'#FE5500'}} className="font-semibold">mission</span>: making sustainable choices simple, effective, and beautiful.</>),
    images: [
      "/works/logo design and brand identity/eco living/PDF/iimages/eco living solutions-1.png",
      "/works/logo design and brand identity/eco living/PDF/iimages/eco living solutions-2.png",
      "/works/logo design and brand identity/eco living/PDF/iimages/eco living solutions-3.png",
      "/works/logo design and brand identity/eco living/PDF/iimages/eco living solutions-4.png",
      "/works/logo design and brand identity/eco living/PDF/iimages/eco living solutions-5.png",
      "/works/logo design and brand identity/eco living/PDF/iimages/eco living solutions-6.png",
      "/works/logo design and brand identity/eco living/PDF/iimages/eco living solutions-7.png",
      "/works/logo design and brand identity/eco living/PDF/iimages/eco living solutions-8.png",
      "/works/logo design and brand identity/eco living/PDF/iimages/eco living solutions-9.png",
      "/works/logo design and brand identity/eco living/PDF/iimages/eco living solutions-10.png",
      "/works/logo design and brand identity/eco living/PDF/iimages/eco living solutions-11.png",
      "/works/logo design and brand identity/eco living/PDF/iimages/eco living solutions-12.png"
    ],
    philosophy: (
      <>&quot;A logo for a sustainable brand is a living mark&mdash;rooted in nature, growing with purpose, and always reaching for harmony. Eco Living Solution&apos;s identity is a quiet revolution: beauty in balance with the earth.&quot;</>
    ),
  },
  "urban-pulse": {
    title: "Urban Pulse",
    subtext: "A minimal, modern mark for a corporate IT company focused on weather solutions.",
    overview: (
      <><span style={{color:'#FE5500'}} className="font-semibold">Urban Pulse</span> is a <span style={{color:'#FE5500'}} className="font-semibold">corporate</span> <span style={{color:'#FE5500'}} className="font-semibold">IT</span> company specializing in <span style={{color:'#FE5500'}} className="font-semibold">weather</span>-related solutions. The logo is a <span style={{color:'#FE5500'}} className="font-semibold">minimal</span>, <span style={{color:'#FE5500'}} className="font-semibold">modern</span> mark that subtly combines the letters <span style={{color:'#FE5500'}} className="font-semibold">U</span> and <span style={{color:'#FE5500'}} className="font-semibold">P</span>, reflecting the brand&apos;s focus on <span style={{color:'#FE5500'}} className="font-semibold">clarity</span>, <span style={{color:'#FE5500'}} className="font-semibold">precision</span>, and <span style={{color:'#FE5500'}} className="font-semibold">innovation</span>. The visual identity is <span style={{color:'#FE5500'}} className="font-semibold">professional</span>, designed to communicate <span style={{color:'#FE5500'}} className="font-semibold">trust</span> and technical <span style={{color:'#FE5500'}} className="font-semibold">expertise</span> without unnecessary embellishment.</>),
    images: [
      "/works/logo design and brand identity/Urban Pulse/pdf/images/Urban Pulse-1.png",
      "/works/logo design and brand identity/Urban Pulse/pdf/images/Urban Pulse-2.png",
      "/works/logo design and brand identity/Urban Pulse/pdf/images/Urban Pulse-3.png",
      "/works/logo design and brand identity/Urban Pulse/pdf/images/Urban Pulse-4.png",
      "/works/logo design and brand identity/Urban Pulse/pdf/images/Urban Pulse-5.png",
      "/works/logo design and brand identity/Urban Pulse/pdf/images/Urban Pulse-6.png",
      "/works/logo design and brand identity/Urban Pulse/pdf/images/Urban Pulse-7.png",
      "/works/logo design and brand identity/Urban Pulse/pdf/images/Urban Pulse-8.png",
      "/works/logo design and brand identity/Urban Pulse/pdf/images/Urban Pulse-9.png",
      "/works/logo design and brand identity/Urban Pulse/pdf/images/Urban Pulse-10.png",
      "/works/logo design and brand identity/Urban Pulse/pdf/images/Urban Pulse-11.png",
      "/works/logo design and brand identity/Urban Pulse/pdf/images/Urban Pulse-12.png",
      "/works/logo design and brand identity/Urban Pulse/pdf/images/Urban Pulse-13.png",
      "/works/logo design and brand identity/Urban Pulse/pdf/images/Urban Pulse-14.png",
      "/works/logo design and brand identity/Urban Pulse/pdf/images/Urban Pulse-15.png",
      "/works/logo design and brand identity/Urban Pulse/pdf/images/Urban Pulse-16.png",
      "/works/logo design and brand identity/Urban Pulse/pdf/images/Urban Pulse-17.png"
    ],
    philosophy: (
      <>&quot;A logo for a tech company is a signal&mdash;minimal, clear, and always in motion. Urban Pulse&apos;s mark is a forecast: a promise of precision, innovation, and the pulse of progress.&quot;</>
    ),
  },
  "srinath-finearts": {
    title: "Srinath Finearts",
    subtext: "A traditional arts club logo uniting dance, music, and theatre in a single mark.",
    overview: (
      <><span style={{color:'#FE5500'}} className="font-semibold">Srinath Finearts</span> is the traditional arts club of <span style={{color:'#FE5500'}} className="font-semibold">Dwaraka Doss Goverdhan Doss Vaishnav College</span> (DGVC) in Chennai. The social media logo was designed to embody the club&apos;s rich cultural heritage, featuring a classical <span style={{color:'#FE5500'}} className="font-semibold">Bharatanatyam dancer</span> at the center, a <span style={{color:'#FE5500'}} className="font-semibold">veena</span> on the left, and a <span style={{color:'#FE5500'}} className="font-semibold">mime mask</span> on the right. The composition is unified by a <span style={{color:'#FE5500'}} className="font-semibold">fire theme</span>, symbolizing passion, tradition, and artistic energy. The logo brings together iconic elements of Indian performing arts, reflecting the club&apos;s mission to celebrate and promote cultural excellence.</>),
    images: [
      "/works/logo design and brand identity/SRINATH FINEARTS/pdf images/Srinath Finearts Pdf-1.png",
      "/works/logo design and brand identity/SRINATH FINEARTS/pdf images/Srinath Finearts Pdf-2.png",
      "/works/logo design and brand identity/SRINATH FINEARTS/pdf images/Srinath Finearts Pdf-3.png",
      "/works/logo design and brand identity/SRINATH FINEARTS/pdf images/Srinath Finearts Pdf-4.png",
      "/works/logo design and brand identity/SRINATH FINEARTS/pdf images/Srinath Finearts Pdf-5.png",
      "/works/logo design and brand identity/SRINATH FINEARTS/pdf images/Srinath Finearts Pdf-6.png",
      "/works/logo design and brand identity/SRINATH FINEARTS/pdf images/Srinath Finearts Pdf-7.png",
      "/works/logo design and brand identity/SRINATH FINEARTS/pdf images/Srinath Finearts Pdf-8.png"
    ],
    philosophy: (
      <>&quot;A logo for the arts is a stage&mdash;where every line, every curve, every color is a performance. Srinath Finearts&apos; mark is a festival: a celebration of tradition, talent, and the fire of creativity.&quot;</>
    ),
  },
};

type ButterButtonProps = React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: string; href?: string }>;

function ButterButton({ children, className = '', as, href, ...props }: ButterButtonProps) {
  if (as === 'a' && href) {
    return (
      <>
        <a
          href={href}
          className={`butter-btn px-5 py-2 bg-transparent border border-accent text-accent font-black uppercase tracking-widest text-xs md:text-base shadow-lg transition-none outline-none focus:outline-none box-border ${className}`}
          style={{ borderRadius: 0 }}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          <span className="butter-content">{children}</span>
        </a>
      </>
    );
  }
  return (
    <>
      <button
        {...props}
        className={`butter-btn px-5 py-2 bg-transparent border border-accent text-accent font-black uppercase tracking-widest text-xs md:text-base shadow-lg transition-none outline-none focus:outline-none box-border ${className}`}
        style={{ borderRadius: 0 }}
      >
        <span className="butter-content">{children}</span>
      </button>
    </>
  );
}

export default function BrandingLogoSlugPage() {
  const { slug } = useParams();
  const { theme } = React.useContext(ThemeContext);
  const data = LOGO_DATA[slug as keyof typeof LOGO_DATA];

  if (!data) return <div className="text-center text-red-500 py-32">Logo not found.</div>;

  return (
    <div className={`w-full min-h-screen flex flex-col font-sans ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
      <Navbar />
      {/* Hero Section */}
      <motion.section
        className={`w-full min-h-[80vh] flex flex-col items-center justify-center px-4 border-b border-neutral-800 relative overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      >
        <h1 className={`text-7xl md:text-9xl font-black uppercase tracking-tight text-center mb-10 leading-tight ${theme === 'light' ? 'text-black' : 'text-accent drop-shadow-xl'}`}>
          {data.title}
        </h1>
        <p className={`text-2xl md:text-3xl font-light text-center max-w-3xl mb-10 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}`}>
          {data.subtext}
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
      {/* Overview Section */}
      <section className={`w-full flex flex-col items-center justify-center py-28 px-4 border-b border-neutral-800 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
        <h2 className={`text-3xl md:text-5xl font-black mb-8 uppercase tracking-tight ${theme === 'light' ? 'text-black' : 'text-accent'}`}>Project Overview</h2>
        <div className={`max-w-4xl w-full text-base md:text-lg font-light leading-relaxed text-justify mb-16 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-200'}`}>
          {data.overview}
        </div>
      </section>
      {/* Images Section */}
      <section className={`w-full flex flex-col items-center justify-center p-0 m-0 border-b border-neutral-800 py-16 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
        {data.images.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt={`${data.title} page ${idx + 1}`}
            className="w-screen h-auto block p-0 m-0"
            style={{ width: '100vw', maxHeight: '100vh', objectFit: 'contain', margin: 0, padding: 0, border: 0 }}
          />
        ))}
      </section>
      {/* Philosophy Section */}
      <motion.section
        className={`w-full flex flex-col items-center justify-center py-24 px-4 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {(() => {
          // Split philosophy into main and supporting lines
          const content = typeof data.philosophy === 'string' ? data.philosophy : (data.philosophy.props.children || '');
          const [main, ...rest] = content.split('. ');
          const mainLine = main.endsWith('.') ? main : main + (rest.length ? '.' : '');
          const supportingLine = rest.join('. ').trim();
          return (
            <>
              <div className={`text-2xl md:text-4xl font-black text-center mb-8 leading-tight max-w-2xl mx-auto ${theme === 'light' ? 'text-black' : 'text-white'}`}>“{mainLine.replace(/^"|"$/g, '')}”</div>
              {supportingLine && (
                <div className={`text-lg md:text-2xl text-center max-w-2xl md:max-w-3xl leading-relaxed md:leading-relaxed ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>{supportingLine}</div>
              )}
            </>
          );
        })()}
      </motion.section>
      {/* Floating Back to all works button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="/branding"
          className="butter-btn butter-btn-bordered px-5 py-2 text-base shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          style={{ minWidth: 180, display: 'inline-block', borderRadius: 0 }}
        >
          <span className="butter-content">&larr; Back to all logos</span>
          <span className="butter-fill" />
        </Link>
      </div>
    </div>
  );
} 
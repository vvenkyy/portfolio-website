"use client";
import Navbar from "../Navbar";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { ThemeContext } from "../ThemeProvider";

const LOGOS = [
  {
    slug: "20-years-of-shasun",
    img: "/works/logo design and brand identity/SHASUN/images/20 YEARS OF SHASUN-02.png",
    alt: "20 Years of Shasun Logo",
    overview: {
      project: "20 Years of Shasun",
      description: (
        <>
          Designed for Shasun Arts & Science College for Women, this commemorative mark celebrates two decades of <span style={{color:'#FE5500'}} className="font-semibold">empowerment</span> and <span style={{color:'#FE5500'}} className="font-semibold">excellence</span>. The logo unites a stylized <span style={{color:'#FE5500'}} className="font-semibold">peacock</span>—symbolizing kindness, wealth, beauty, and pride—with a bold <span style={{color:'#FE5500'}} className="font-semibold">fire</span> motif, representing courage and boldness. Together, they form the <span style={{color:'#FE5500'}} className="font-semibold">number "20"</span>: a visual story of <span style={{color:'#FE5500'}} className="font-semibold">legacy</span> and <span style={{color:'#FE5500'}} className="font-semibold">progress</span>. The brand mark honors the college's journey, its commitment to <span style={{color:'#FE5500'}} className="font-semibold">women's advancement</span>, and its <span style={{color:'#FE5500'}} className="font-semibold">vibrant spirit</span>.
        </>
      ),
      tags: ["Women's College", "Anniversary", "Empowerment", "Visual Identity", "2024"],
      role: "Logo, Symbolism & Visual Identity Designer"
    }
  },
  {
    slug: "eco-living-solution",
    img: "/works/logo design and brand identity/eco living/jpg/150ppi/primary logo.jpg",
    alt: "Eco Living Solution Logo",
    overview: {
      project: "Eco Living Solution",
      description: (
        <>
          <span style={{color:'#FE5500'}} className="font-semibold">Eco Living Solution</span> is a brand dedicated to <span style={{color:'#FE5500'}} className="font-semibold">sustainable</span> living through <span style={{color:'#FE5500'}} className="font-semibold">natural</span> skincare and <span style={{color:'#FE5500'}} className="font-semibold">eco-friendly</span> <span style={{color:'#FE5500'}} className="font-semibold">packaging</span>. The logo draws inspiration from the <span style={{color:'#FE5500'}} className="font-semibold">trunk</span> and <span style={{color:'#FE5500'}} className="font-semibold">leaves</span> of a <span style={{color:'#FE5500'}} className="font-semibold">tree</span>, symbolizing <span style={{color:'#FE5500'}} className="font-semibold">growth</span>, <span style={{color:'#FE5500'}} className="font-semibold">harmony</span>, and a deep connection to <span style={{color:'#FE5500'}} className="font-semibold">nature</span>. Every product is crafted with a commitment to <span style={{color:'#FE5500'}} className="font-semibold">environmental responsibility</span>, using only <span style={{color:'#FE5500'}} className="font-semibold">sustainable materials</span> and processes. The <span style={{color:'#FE5500'}} className="font-semibold">visual identity</span> reflects the brand's <span style={{color:'#FE5500'}} className="font-semibold">mission</span>: making sustainable choices simple, effective, and beautiful.
        </>
      ),
      tags: ["Sustainability", "Skincare", "Eco Packaging", "Nature", "2023"],
      role: "Logo, Visual Identity & Packaging Designer"
    }
  },
  {
    slug: "urban-pulse",
    img: "/works/logo design and brand identity/Urban Pulse/Jpeg/150ppi/logos/Primary logo@150x-100.jpg",
    alt: "Urban Pulse Logo",
    overview: {
      project: "Urban Pulse",
      description: (
        <>
          <span style={{color:'#FE5500'}} className="font-semibold">Urban Pulse</span> is a <span style={{color:'#FE5500'}} className="font-semibold">corporate</span> <span style={{color:'#FE5500'}} className="font-semibold">IT</span> company specializing in <span style={{color:'#FE5500'}} className="font-semibold">weather</span>-related solutions. The logo is a <span style={{color:'#FE5500'}} className="font-semibold">minimal</span>, <span style={{color:'#FE5500'}} className="font-semibold">modern</span> mark that subtly combines the letters <span style={{color:'#FE5500'}} className="font-semibold">U</span> and <span style={{color:'#FE5500'}} className="font-semibold">P</span>, reflecting the brand's focus on <span style={{color:'#FE5500'}} className="font-semibold">clarity</span>, <span style={{color:'#FE5500'}} className="font-semibold">precision</span>, and <span style={{color:'#FE5500'}} className="font-semibold">innovation</span>. The visual identity is <span style={{color:'#FE5500'}} className="font-semibold">professional</span>, designed to communicate <span style={{color:'#FE5500'}} className="font-semibold">trust</span> and technical <span style={{color:'#FE5500'}} className="font-semibold">expertise</span> without unnecessary embellishment.
        </>
      ),
      tags: ["IT", "Weather", "Corporate", "Minimalism", "2024"],
      role: "Logo & Visual Identity Designer"
    }
  },
  {
    slug: "srinath-finearts",
    img: "/works/logo design and brand identity/SRINATH FINEARTS/SRINATH FINEARTS revised.png",
    alt: "Srinath Finearts Logo",
    overview: {
      project: "Srinath Finearts",
      description: (
        <>
          <span style={{color:'#FE5500'}} className="font-semibold">Srinath Finearts</span> is the traditional arts club of <span style={{color:'#FE5500'}} className="font-semibold">Dwaraka Doss Goverdhan Doss Vaishnav College</span> (DGVC) in Chennai. The social media logo was designed to embody the club's rich cultural heritage, featuring a classical <span style={{color:'#FE5500'}} className="font-semibold">Bharatanatyam dancer</span> at the center, a <span style={{color:'#FE5500'}} className="font-semibold">veena</span> on the left, and a <span style={{color:'#FE5500'}} className="font-semibold">mime mask</span> on the right. The composition is unified by a <span style={{color:'#FE5500'}} className="font-semibold">fire theme</span>, symbolizing passion, tradition, and artistic energy. The logo brings together iconic elements of Indian performing arts, reflecting the club's mission to celebrate and promote cultural excellence.
        </>
      ),
      tags: ["Tradition", "Performing Arts", "Fire", "Chennai", "2023"],
      role: "Logo & Social Media Identity Designer"
    }
  },
  {
    slug: "atti-podcast",
    img: "/works/logo design and brand identity/ATTI PODCAST/TXT PURPLE.png",
    alt: "Atti Podcast Logo",
    overview: {
      project: "Atti Podcast",
      description: (
        <>
          <span style={{color:'#FE5500'}} className="font-semibold">Atti Podcast</span> is a podcast channel that wanted a logo centered around bold, playful text. The client requested a design that would be both <span style={{color:'#FE5500'}} className="font-semibold">playful</span> and <span style={{color:'#FE5500'}} className="font-semibold">professional</span>, with a strong visual presence. The final logo uses a vibrant <span style={{color:'#FE5500'}} className="font-semibold">poppy orange</span> paired with a contrasting <span style={{color:'#FE5500'}} className="font-semibold">dark purple</span> to create a sense of energy and clarity. The result is a text-based identity that stands out in the podcast space while maintaining a polished, modern feel.
        </>
      ),
      tags: ["Podcast", "Playful", "Bold Color", "Text Logo", "2024"],
      role: "Logo & Visual Identity Designer"
    }
  },
  {
    slug: "boredom-clickzz",
    img: "/works/logo design and brand identity/boredom clickzz/jpeg/red bg white txt.jpg",
    alt: "Boredom Clickzz Logo",
    overview: {
      project: "Boredom Clickzz",
      description: (
        <>
          <span style={{color:'#FE5500'}} className="font-semibold">Boredom Clickzz</span> is an Instagram photography page dedicated to capturing <span style={{color:'#FE5500'}} className="font-semibold">patterns</span>, <span style={{color:'#FE5500'}} className="font-semibold">symmetry</span>, <span style={{color:'#FE5500'}} className="font-semibold">art</span>, and <span style={{color:'#FE5500'}} className="font-semibold">aesthetics</span> found in nature. The logo is a highly <span style={{color:'#FE5500'}} className="font-semibold">minimal</span>, <span style={{color:'#FE5500'}} className="font-semibold">vector</span> design depicting a <span style={{color:'#FE5500'}} className="font-semibold">camera</span> from the front view, with a distinct lens at its center. A bold, <span style={{color:'#FE5500'}} className="font-semibold">saturated red</span> serves as the brand's signature color, paired with strong, modern typography. The identity is designed to be instantly recognizable and to reflect the page's focus on <span style={{color:'#FE5500'}} className="font-semibold">visual harmony</span> and creative exploration.
        </>
      ),
      tags: ["Photography", "Minimalism", "Vector", "Instagram", "2022"],
      role: "Logo & Visual Identity Designer"
    }
  },
  {
    slug: "cinephiliaa",
    img: "/works/logo design and brand identity/CIINIPHILIAA REDESIGN.png",
    alt: "Cinephiliaa Logo",
    overview: {
      project: "Cinephiliaa",
      description: (
        <>
          <span style={{color:'#FE5500'}} className="font-semibold">Cinephiliaa</span> is an Instagram page dedicated to sharing facts, information, and updates about the world of cinema. The logo is a saturated, aesthetic, filmic mark that merges the word <span style={{color:'#FE5500'}} className="font-semibold">Cinephiliaa</span> with a <span style={{color:'#FE5500'}} className="font-semibold">film projector</span>, rendered in a vibrant <span style={{color:'#FE5500'}} className="font-semibold">pink</span> brand color. The design features a <span style={{color:'#FE5500'}} className="font-semibold">shiny</span>, <span style={{color:'#FE5500'}} className="font-semibold">glossy</span>, and <span style={{color:'#FE5500'}} className="font-semibold">glowy</span> effect, creating a distinctive and cinematic identity that stands out in the digital space.
        </>
      ),
      tags: ["Cinema", "Instagram", "Film", "Pink", "2024"],
      role: "Logo & Visual Identity Designer"
    }
  }
];

type ButterButtonProps = React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: string; href?: string }>;

function ButterButton({ children, className = '', as, href, ...props }: ButterButtonProps) {
  if (as === 'a' && href) {
    return (
      <>
        <a
          href={href}
          className={`butter-btn px-5 py-2 border font-black uppercase tracking-widest text-xs md:text-base shadow-lg transition-none outline-none focus:outline-none box-border ${className} ${typeof window !== 'undefined' && document.body.classList.contains('light') ? 'bg-white text-black border-accent' : 'bg-transparent border-accent text-accent'}`}
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
      <button
        {...props}
        className={`butter-btn px-5 py-2 border font-black uppercase tracking-widest text-xs md:text-base shadow-lg transition-none outline-none focus:outline-none box-border ${className} ${typeof window !== 'undefined' && document.body.classList.contains('light') ? 'bg-white text-black border-accent' : 'bg-transparent border-accent text-accent'}`}
        style={{ borderRadius: 0 }}
      >
        <span className="butter-content">{children}</span>
        <span className="butter-fill" />
      </button>
    </>
  );
}

export default function BrandingPage() {
  const { theme } = React.useContext(ThemeContext);
  return (
    <div className={`w-full min-h-screen flex flex-col font-sans ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
      <Navbar />
      {/* Hero Section */}
      <motion.section
        className={`w-full flex flex-col items-center justify-start md:min-h-screen md:justify-center px-4 border-b border-neutral-800 relative overflow-hidden pt-2 md:pt-0 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      >
        <h1
          className={`text-5xl md:text-8xl font-black uppercase tracking-tight text-center mb-6 leading-tight ${theme === 'light' ? 'text-black' : 'text-accent drop-shadow-xl'}`}
        >
          <span className="block">More Than a Mark</span>
        </h1>
        <p
          className={`text-lg md:text-2xl font-light text-center max-w-2xl mb-2 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}`}
        >
          A logo is a poem in shape—a story told in a single glance. My branding work is about clarity, resonance, and the art of unforgettable first impressions.
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
      {/* Logos Presentations */}
      <div className="flex flex-col gap-32 py-24 px-4 max-w-4xl mx-auto">
        {LOGOS.map((logo, idx) => (
          <motion.section
            key={logo.slug}
            className={`w-full flex flex-col md:flex-row items-start justify-center gap-12 md:gap-24 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
            initial="offscreen"
            whileInView="onscreen"
            exit="exit"
            viewport={{ once: false, amount: 0.2 }}
            transition={{ staggerChildren: 0.18 }}
          >
            {idx % 2 === 0 ? (
              <>
                {/* Logo left */}
                <motion.div
                  className="w-full md:w-1/2 flex items-center justify-center"
                  variants={{
                    offscreen: { opacity: 0, y: 40 },
                    onscreen: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
                    exit: { opacity: 0, y: 40, transition: { duration: 0.5, ease: 'easeIn' } }
                  }}
                >
                  <div className={`w-[340px] h-[340px] border-8 flex items-center justify-center overflow-hidden ${theme === 'light' ? 'bg-neutral-100 border-neutral-300 shadow-lg' : 'bg-neutral-900 border-black shadow-2xl'}`}>
                    <Image
                      src={logo.img}
                      alt={logo.alt}
                      width={420}
                      height={420}
                      className="object-cover w-full h-full"
                      priority={idx === 0}
                    />
                  </div>
                </motion.div>
                {/* Overview right */}
                <motion.div
                  className="w-full md:w-1/2 flex flex-col items-start justify-center flex-grow p-0 md:pl-4 min-h-[340px]"
                  variants={{
                    offscreen: { opacity: 0, y: 40 },
                    onscreen: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.12 } },
                    exit: { opacity: 0, y: 40, transition: { duration: 0.5, ease: 'easeIn' } }
                  }}
                >
                  <div className={`text-2xl md:text-3xl font-black mb-1 uppercase tracking-tight leading-tight ${theme === 'light' ? 'text-black' : 'text-accent'}`}>{logo.overview.project}</div>
                  <h2 className={`text-base md:text-lg font-bold mb-2 uppercase tracking-widest opacity-80 ${theme === 'light' ? 'text-neutral-700' : 'text-white'}`}>Project</h2>
                  <div className={`text-sm md:text-base font-light leading-relaxed text-justify mb-3 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}`}>
                    {logo.overview.description}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1 mb-3">
                    {logo.overview.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 border font-bold uppercase text-xs tracking-widest ${theme === 'light' ? 'border-[#FE5500] text-[#FE5500]' : 'border-accent text-accent'}`}
                      >{tag}</span>
                    ))}
                  </div>
                  <div className={`text-xs mb-4 ${theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'}`}>Role: <span style={{color:'#FE5500'}} className="font-semibold">{logo.overview.role}</span></div>
                  {!(logo.slug === "atti-podcast" || logo.slug === "boredom-clickzz" || logo.slug === "cinephiliaa") && (
                    <ButterButton as="a" href={`/branding/${logo.slug}`} className="butter-btn-bordered inline-block px-5 py-2">
                      Explore
                    </ButterButton>
                  )}
                </motion.div>
              </>
            ) : (
              <>
                {/* Overview left */}
                <motion.div
                  className="w-full md:w-1/2 flex flex-col items-start justify-center flex-grow order-2 md:order-1 p-0 md:pr-4 min-h-[340px]"
                  variants={{
                    offscreen: { opacity: 0, y: 40 },
                    onscreen: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
                    exit: { opacity: 0, y: 40, transition: { duration: 0.5, ease: 'easeIn' } }
                  }}
                >
                  <div className={`text-2xl md:text-3xl font-black mb-1 uppercase tracking-tight leading-tight ${theme === 'light' ? 'text-black' : 'text-accent'}`}>{logo.overview.project}</div>
                  <h2 className={`text-base md:text-lg font-bold mb-2 uppercase tracking-widest opacity-80 ${theme === 'light' ? 'text-neutral-700' : 'text-white'}`}>Project</h2>
                  <div className={`text-sm md:text-base font-light leading-relaxed text-justify mb-3 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}`}>
                    {logo.overview.description}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1 mb-3">
                    {logo.overview.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 border font-bold uppercase text-xs tracking-widest ${theme === 'light' ? 'border-[#FE5500] text-[#FE5500]' : 'border-accent text-accent'}`}
                      >{tag}</span>
                    ))}
                  </div>
                  <div className={`text-xs mb-4 ${theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'}`}>Role: <span style={{color:'#FE5500'}} className="font-semibold">{logo.overview.role}</span></div>
                  {!(logo.slug === "atti-podcast" || logo.slug === "boredom-clickzz" || logo.slug === "cinephiliaa") && (
                    <ButterButton as="a" href={`/branding/${logo.slug}`} className="butter-btn-bordered inline-block px-5 py-2">
                      Explore
                    </ButterButton>
                  )}
                </motion.div>
                {/* Logo right */}
                <motion.div
                  className="w-full md:w-1/2 flex items-center justify-center order-1 md:order-2"
                  variants={{
                    offscreen: { opacity: 0, y: 40 },
                    onscreen: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.12 } },
                    exit: { opacity: 0, y: 40, transition: { duration: 0.5, ease: 'easeIn' } }
                  }}
                >
                  <div className={`w-[340px] h-[340px] border-8 flex items-center justify-center overflow-hidden ${theme === 'light' ? 'bg-neutral-100 border-neutral-300 shadow-lg' : 'bg-neutral-900 border-black shadow-2xl'}`}>
                    <Image
                      src={logo.img}
                      alt={logo.alt}
                      width={420}
                      height={420}
                      className="object-cover w-full h-full"
                      priority={idx === 0}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </motion.section>
        ))}
      </div>
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
      <motion.section
        className={`w-full flex flex-col items-center justify-center py-24 px-4 border-t border-neutral-800 mt-12 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
        initial="offscreen"
        whileInView="onscreen"
        exit="exit"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ staggerChildren: 0.18 }}
      >
        <motion.div
          className="max-w-4xl w-full mx-auto flex flex-col items-center gap-6"
          variants={{
            offscreen: { opacity: 0, y: 40 },
            onscreen: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
            exit: { opacity: 0, y: 40, transition: { duration: 0.5, ease: 'easeIn' } }
          }}
        >
          <div className={`text-3xl md:text-5xl font-black text-center mb-2 md:mb-4 leading-tight md:leading-tight ${theme === 'light' ? 'text-black' : 'text-white'}`}>
            "A logo is not just a mark—it's the first story your brand ever tells."
          </div>
          <div className={`text-lg md:text-2xl text-center max-w-2xl md:max-w-3xl leading-relaxed md:leading-relaxed ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>
            Great logo design distills vision, values, and personality into a single, unforgettable symbol. It's the foundation of identity, trust, and recognition.
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
 
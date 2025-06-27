"use client";
import { useRouter, useParams } from "next/navigation";
import Navbar from "../../Navbar";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { ThemeContext } from "../../ThemeProvider";

const CLIENT_FOLDERS = [
  {
    slug: "yatra",
    name: "yatra",
    title: "Yatra",
    images: [
      "CELEBRITY POST.png",
      "ASAL KOLAAR ANNOUNCEMENT.png",
      "REGISTRATIONS OPEN.png",
      "REGISTERATIONS OPEN.png",
      "PAAL DABBA VERSION 2.png",
    ],
    description: "Dummy description for Yatra. This event was a celebration of creativity and collaboration, featuring a range of unique poster designs.",
    meta: ["Event", "2024"],
  },
  {
    slug: "160",
    name: "160",
    title: "One 60",
    images: ["one 60 png.png", "One 60.jpg"],
    description: "Dummy description for One 60. A showcase of bold visual storytelling and impactful branding.",
    meta: ["Client Work", "2023"],
  },
  {
    slug: "san-24",
    name: "san 24",
    title: "San 24",
    images: ["JITZ.png"],
    description: "Dummy description for San 24. A modern approach to event branding and poster design.",
    meta: ["Event", "2024"],
  },
  {
    slug: "era-production",
    name: "era production",
    title: "Era Production",
    images: ["era poster.jpg", "era.png"],
    description: "Dummy description for Era Production. Editorial, cinematic, and visually striking posters for a new era.",
    meta: ["Production", "2023"],
  },
  {
    slug: "ava",
    name: "ava",
    title: "Ava",
    images: ["ava first look SHOUT.png"],
    description: "Dummy description for Ava. A creative journey in poster design and visual identity.",
    meta: ["Client Work", "2022"],
  },
  {
    slug: "era-production-2",
    name: "era production 2",
    title: "Era Production 2",
    images: ["era poster.jpg", "era.png"],
    description: "Dummy description for Era Production 2. Another chapter in editorial and cinematic design.",
    meta: ["Production", "2024"],
  },
];

export default function PosterDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  return <PosterDetailPageInner key={slug} slug={slug} />;
}

function PosterDetailPageInner({ slug }: { slug: string }) {
  console.log("MOUNTED PosterDetailPageInner", slug);
  const router = useRouter();
  const posterRef = useRef<HTMLImageElement>(null);
  const [heroBooted, setHeroBooted] = useState(false);
  const [navbarBooted, setNavbarBooted] = useState(false);
  const [descStage, setDescStage] = useState<'orange' | 'full'>('orange');
  const { theme } = React.useContext(ThemeContext);

  useEffect(() => {
    setHeroBooted(false);
    setNavbarBooted(false);
    setDescStage('orange');

    let heroTimer: NodeJS.Timeout;
    let navbarTimer: NodeJS.Timeout;

    if (["yatra", "160", "san-24", "era-production", "ava"].includes(slug)) {
      heroTimer = setTimeout(() => setHeroBooted(true), 400);
      navbarTimer = setTimeout(() => setNavbarBooted(true), 1200);
    }

    return () => {
      if (heroTimer) clearTimeout(heroTimer);
      if (navbarTimer) clearTimeout(navbarTimer);
    };
  }, [slug]);

  const work = CLIENT_FOLDERS.find((f) => f.slug === slug);

  if (!work) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <Navbar />
        <div className="text-2xl font-bold text-accent mt-32">Work not found.</div>
        <Link href="/posters" className="mt-8 px-6 py-2 bg-accent text-white rounded font-bold">Back to all posters</Link>
      </div>
    );
  }

  // Yatra-specific content
  if (slug === "yatra") {
    const logo = "/works/posters/yatra/YATRA-2025-FINAL-LOGO.png";
    const summary = `A cyberpunk-inspired college fest. Complete branding, social, and print design.`;
    const tags = ["College Fest", "Cyberpunk Theme", "2025", "RIT"];
    const celebrityPosters = [
      {
        img: "/works/posters/yatra/ASAL KOLAAR ANNOUNCEMENT.png",
        title: "Asal Kolaar Poster",
        desc: "Promotional poster for singer Asal Kolaar, featuring cyberpunk neon effects and bold typography.",
        story: "I wanted to capture Asal Kolaar's energetic stage presence with a bold, futuristic look. The color palette and type choices reflect the event's cyberpunk theme."
      },
      {
        img: "/works/posters/yatra/PAAL DABBA VERSION 2.png",
        title: "Paal Dabba Poster",
        desc: "Futuristic, glowy poster for singer Paal Dabba, matching the event's cyberpunk theme.",
        story: "For Paal Dabba, I focused on a glowy, high-contrast look to make the poster pop on both digital and print platforms."
      },
      {
        img: "/works/posters/yatra/CELEBRITY POST.png",
        title: "Celebrity Combined Poster",
        desc: "Combined poster featuring actor Vijay Sethupathi, Asal Kolaar, and Paal Dabba.",
        story: "This poster was designed to create hype by featuring all the main celebrities together, using a composition that balances all three personalities."
      },
      {
        img: "/works/posters/yatra/dj madhan.png",
        title: "DJ Madhan Poster",
        desc: "Energetic, neon-styled poster for DJ Madhan.",
        story: "The DJ poster uses dynamic angles and bold color blocks to convey the energy of the event's music segment."
      },
      {
        img: "/works/posters/yatra/roshith kumar.jpg",
        title: "Host (Roshith Kumar) Poster",
        desc: "Poster for the event host, Roshith Kumar, in a cyberpunk style.",
        story: "For the host, I kept the design sharp and minimal, letting the portrait and event branding stand out."
      },
    ];
    const announcementPosters = [
      {
        img: "/works/posters/yatra/REGISTRATIONS OPEN.png",
        title: "Registrations Open Poster",
        desc: "Announcement poster for event registrations, using the event's neon, futuristic visual language.",
        story: "This poster was key for driving early engagement. I used bold, clear type and a strong call-to-action to make it instantly readable on social feeds."
      }
    ];
    const eventPosters = [
      "photography.jpg",
      "rj hunt.jpg",
      "face fiesta.jpg",
      "poster design.jpg",
      "cricket commentry.jpg",
      "box cricket.jpg",
      "e sports.jpg",
      "treasure hunt.jpg",
      "1 min to celebrity.jpg",
      "classical dance.jpg",
      "channel surfing.jpg",
      "mime.jpg",
      "duo dance.jpg",
      "Short Cuts.jpg",
      "Group Dance.jpg",
      "Band Blitz.jpg"
    ].reverse();
    return (
      <React.Fragment key={slug}>
        <div key={slug} className={`w-full min-h-screen flex flex-col font-sans ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-foreground'}`}>
          {/* Navbar boots in after logo */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={navbarBooted ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
        <Navbar />
          </motion.div>
          {/* Hero Section: Visually Engaging, like 160 */}
          <section
            className={`w-full h-screen flex items-center justify-center border-b border-neutral-800 relative overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
          >
            <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
              {theme === 'light' ? (
                <div className="w-full h-full bg-gradient-to-b from-white/90 via-white/70 to-transparent" />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-black/90 via-black/70 to-transparent" />
              )}
          </div>
            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-none px-0 md:max-w-3xl md:mx-auto md:px-4">
              {/* Logo boots in first */}
              <motion.img
                src={logo}
                alt="Yatra 2025 Logo"
                width={1600}
                height={1600}
                className="object-contain w-full max-w-none h-auto mb-8"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={heroBooted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              {/* Rest of hero content boots in after navbar */}
              <motion.div
                className="flex flex-col items-center w-full"
                initial={{ opacity: 0, y: 40 }}
                animate={heroBooted ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              >
                <h1 className={`text-2xl md:text-3xl font-black mb-2 uppercase tracking-tight text-center drop-shadow-xl ${theme === 'light' ? 'text-black' : 'text-accent'}`}>Yatra 2025</h1>
                <div className={`text-base md:text-lg font-light text-center max-w-xl mb-2 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>{summary}</div>
              </motion.div>
            </div>
        </section>
        {/* Project Overview */}
          <motion.section
            className={`w-full border-b border-neutral-800 pb-12 mb-12 mt-12 md:mt-16 md:mb-16 ${theme === 'light' ? 'bg-white' : ''}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
          <div className="max-w-3xl mx-auto flex flex-col gap-6 px-4">
              <motion.h2
                className={`text-2xl md:text-4xl font-black mb-2 uppercase tracking-tight ${theme === 'light' ? 'text-black' : 'text-accent'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.7 }}
              >Project Overview</motion.h2>
              <motion.div
                className={`text-base md:text-xl font-semibold mb-2 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >Venue: <span className="text-white">Rajalakshmi Institute of Technology</span></motion.div>
              {/* Description staged animation */}
              <motion.div
                className={`text-sm md:text-base font-light leading-relaxed text-justify ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                {descStage === 'orange' ? (
                  <>
                    As the lead designer for <span style={{color:'#FE5500'}} className="font-semibold">Yatra 2025</span>, a major college cultural festival at <span style={{color:'#FE5500'}} className="font-semibold">Rajalakshmi Institute of Technology</span>, I was responsible for shaping the event's entire visual identity. Embracing a <span style={{color:'#FE5500'}} className="font-semibold">cyberpunk</span> theme, I developed a cohesive suite of promotional materials—including <span style={{color:'#FE5500'}} className="font-semibold">branding</span>, <span style={{color:'#FE5500'}} className="font-semibold">social media</span> campaigns, and <span style={{color:'#FE5500'}} className="font-semibold">print</span> collateral—tailored for both <span style={{color:'#FE5500'}} className="font-semibold">Instagram</span> and on-campus engagement. My work spanned the creation of high-impact <span style={{color:'#FE5500'}} className="font-semibold">celebrity posters</span>, dynamic <span style={{color:'#FE5500'}} className="font-semibold">event announcements</span>, and a full set of <span style={{color:'#FE5500'}} className="font-semibold">event posters</span>.
                  </>
                ) : (
                  <>
                    As the lead designer for <span style={{color:'#FE5500'}} className="font-semibold">Yatra 2025</span>, a major college cultural festival at <span style={{color:'#FE5500'}} className="font-semibold">Rajalakshmi Institute of Technology</span>, I was responsible for shaping the event's entire visual identity. Embracing a <span style={{color:'#FE5500'}} className="font-semibold">cyberpunk</span> theme, I developed a cohesive suite of promotional materials—including <span style={{color:'#FE5500'}} className="font-semibold">branding</span>, <span style={{color:'#FE5500'}} className="font-semibold">social media</span> campaigns, and <span style={{color:'#FE5500'}} className="font-semibold">print</span> collateral—tailored for both <span style={{color:'#FE5500'}} className="font-semibold">Instagram</span> and on-campus engagement. My work spanned the creation of high-impact <span style={{color:'#FE5500'}} className="font-semibold">celebrity posters</span>, dynamic <span style={{color:'#FE5500'}} className="font-semibold">event announcements</span>, and a full set of <span style={{color:'#FE5500'}} className="font-semibold">event posters</span>, all designed to capture attention, communicate the festival's futuristic spirit, and drive participation. The result was a unified, professional visual experience that elevated the Yatra brand and set a new standard for college fest design.
                  </>
                )}
              </motion.div>
              <motion.div
                className="flex flex-wrap gap-3 mt-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.08
                    }
                  }
                }}
              >
                {tags.map((tag) => (
                  <motion.span
                    key={tag}
                    className={`px-4 py-1 border font-bold uppercase text-xs tracking-widest ${theme === 'light' ? 'border-[#FE5500] text-[#FE5500]' : 'border-accent text-accent'}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                  >{tag}</motion.span>
                ))}
              </motion.div>
              <motion.div
                className={`text-base mt-4 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >Role: <span style={{color:'#FE5500'}} className="font-semibold">Lead Designer (Branding, Social, Print)</span></motion.div>
            </div>
          </motion.section>
          {/* Editorial Poster Highlights */}
          <motion.section
            className={`w-full border-b border-neutral-800 pb-12 mb-12 ${theme === 'light' ? 'bg-white' : ''}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="max-w-4xl mx-auto flex flex-col gap-20 px-4">
              {celebrityPosters.map((p, i) => (
                <motion.div
                  key={p.img}
                  className={`flex flex-col md:flex-row ${i % 2 === 1 ? 'md:flex-row-reverse' : ''} gap-8 md:gap-16 items-center justify-center ${theme === 'light' ? 'bg-white' : ''}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                >
                  <motion.div
                    className="flex-1 w-full flex items-center justify-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  >
                    <motion.img
                      src={p.img}
                      alt={p.title}
                      width={440}
                      height={620}
                      className="object-cover w-full h-full shadow-lg max-w-xs md:max-w-sm"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                    />
                  </motion.div>
                  <motion.div
                    className="flex-1 w-full flex flex-col justify-center gap-3 md:gap-6 text-left md:text-left"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    <motion.div className={`text-xl md:text-2xl font-black mb-1 ${theme === 'light' ? 'text-black' : 'text-accent'}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >{p.title}</motion.div>
                    <motion.div className={`text-base md:text-lg font-light mb-1 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >{p.desc}</motion.div>
                    <motion.div className={`text-base md:text-lg italic ${theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >{p.story}</motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.section>
          {/* Announcement Posters */}
          <motion.section
            className={`w-full border-b border-neutral-800 pb-12 mb-12 ${theme === 'light' ? 'bg-white' : ''}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="max-w-4xl mx-auto flex flex-col gap-16 px-4">
              {announcementPosters.map((p, i) => (
                <motion.div key={p.img} className="flex flex-col md:flex-row gap-8 items-center"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                >
                  <motion.div className="flex-1 w-full"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  >
                    <motion.img
                      src={p.img}
                      alt={p.title}
                      width={500}
                      height={700}
                      className="object-cover w-full h-full shadow-lg"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                    />
                  </motion.div>
                  <motion.div className="flex-1 w-full flex flex-col gap-2"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    <motion.div className={`text-lg font-bold mb-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >{p.title}</motion.div>
                    <motion.div className={`text-base mb-2 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >{p.desc}</motion.div>
                    <motion.div className={`text-base md:text-lg italic ${theme === 'light' ? 'text-neutral-500' : 'text-neutral-300'}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >{p.story}</motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.section>
          {/* Moments in Motion: Event Posters */}
          <motion.section
            className={`w-full border-b border-neutral-800 pb-12 mb-12 ${theme === 'light' ? 'bg-white' : ''}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="max-w-5xl mx-auto px-4">
              <motion.h2
                className={`text-2xl md:text-4xl font-black mb-8 uppercase tracking-tight ${theme === 'light' ? 'text-black' : 'text-accent'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >Moments in Motion</motion.h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                {eventPosters.map((img, i) => {
                  let eventName = img.replace(/\.[^.]+$/, "").replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                  if (eventName === 'Short Cuts') eventName = 'Short Cutz';
                  return (
                    <motion.div key={img} className="flex flex-col items-center"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.08 }}
                    >
                      <motion.div className={`w-full aspect-[3/4] overflow-hidden flex items-center justify-center shadow-lg mb-3 ${theme === 'light' ? 'bg-neutral-200' : 'bg-black'}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                      >
                        <motion.img
                          src={`/works/posters/yatra/events/${img}`}
                          alt={eventName}
                          width={400}
                          height={600}
                          className="object-cover w-full h-full"
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.7, delay: 0.2 }}
                        />
                      </motion.div>
                      <motion.div className={`text-base text-center font-semibold ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >{eventName}</motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.section>
          {/* Philosophy Section (Yatra-specific) */}
          <section className={`w-full border-b border-neutral-800 py-24 md:py-32 flex items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
            <div className="max-w-4xl w-full mx-auto px-6 flex flex-col items-center gap-8">
              <div className={`text-3xl md:text-5xl font-black text-center mb-2 md:mb-4 leading-tight md:leading-tight ${theme === 'light' ? 'text-neutral-900' : 'text-accent'}`}>
                "Design isn't just what you see—it's the energy that electrifies an event."
              </div>
              <div className={`text-lg md:text-2xl text-center max-w-2xl md:max-w-3xl leading-relaxed md:leading-relaxed ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>
                Every detail was crafted to energize the crowd and unite everyone in the cyberpunk spirit of Yatra 2025.
              </div>
            </div>
          </section>
          {/* Floating Back to all posters button */}
          <div className="fixed bottom-6 right-6 z-50">
            <a
              href="/posters"
              className="butter-btn butter-btn-bordered px-3 py-1.5 text-xs shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              style={{ minWidth: 120, display: 'inline-block', borderRadius: 0 }}
            >
              <span className="butter-content">← Back to all posters</span>
              <span className="butter-fill" />
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }

  if (slug === "160") {
    const logo = "/works/posters/160/one 60 png.png";
    const firstLook = "/works/posters/160/One 60.jpg";

    return (
      <React.Fragment key={slug}>
        <div className={`w-full min-h-screen flex flex-col font-sans overflow-x-hidden ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-foreground'}`}>
          <Navbar />
          {/* Hero Section: Visually Engaging */}
          <section
            className={`w-full min-h-[80vh] flex items-center justify-center border-b border-neutral-800 relative mb-12 overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
          >
            <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
              {theme === 'light' ? (
                <div className="w-full h-full bg-gradient-to-b from-white/90 via-white/70 to-transparent" />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-black/90 via-black/70 to-transparent" />
              )}
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl mx-auto py-16 px-4">
              {/* Logo boots in first */}
              <motion.img
                src={logo}
                alt="One 60 Logo"
                width={1200}
                height={1200}
                className="object-contain w-[80vw] max-w-[700px] h-auto mb-8"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={heroBooted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              {/* Rest of hero content boots in after navbar */}
              <motion.div
                className="flex flex-col items-center w-full"
                initial={{ opacity: 0, y: 40 }}
                animate={heroBooted && navbarBooted ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              >
                <h1 className={`text-2xl md:text-3xl font-black mb-2 uppercase tracking-tight text-center drop-shadow-xl ${theme === 'light' ? 'text-black' : 'text-accent'}`}>160</h1>
                <div className={`text-base md:text-lg font-light text-center max-w-xl mb-2 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>A short film about gully cricket, urban dreams, and the poetry of the everyday game.</div>
              </motion.div>
            </div>
          </section>
          {/* Project Overview Section: Editorial, Yatra-style */}
          <motion.section
            className={`w-full border-b border-neutral-800 pb-12 mb-12 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="max-w-3xl mx-auto flex flex-col gap-6 px-4">
              <h2 className={`text-3xl md:text-5xl font-black mb-2 uppercase tracking-tight ${theme === 'light' ? 'text-black' : 'text-accent'}`}>Project Overview</h2>
              <div className={`text-base md:text-xl font-light leading-relaxed text-justify ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}`}>As the designer for <span style={{color:'#FE5500'}} className="font-semibold">One 60</span>, a short film celebrating <span style={{color:'#FE5500'}} className="font-semibold">gully cricket</span> and urban dreams, I crafted a visual identity that is both <span style={{color:'#FE5500'}} className="font-semibold">minimal</span> and <span style={{color:'#FE5500'}} className="font-semibold">cinematic</span>. The logo is a <span style={{color:'#FE5500'}} className="font-semibold">metaphor</span>: the <span style={{color:'#FE5500'}} className="font-semibold">"1"</span> as <span style={{color:'#FE5500'}} className="font-semibold">bat</span>, the <span style={{color:'#FE5500'}} className="font-semibold">"0"</span> as <span style={{color:'#FE5500'}} className="font-semibold">ball</span>, and the <span style={{color:'#FE5500'}} className="font-semibold">"6"</span> as <span style={{color:'#FE5500'}} className="font-semibold">ground</span>. This project is a tribute to the <span style={{color:'#FE5500'}} className="font-semibold">spirit</span> and <span style={{color:'#FE5500'}} className="font-semibold">poetry</span> of the everyday game, designed to inspire and resonate with anyone who has ever played cricket in the streets.</div>
              <div className="flex flex-wrap gap-3 mt-2">
                <span className={`px-4 py-1 border font-bold uppercase text-xs tracking-widest ${theme === 'light' ? 'border-[#FE5500] text-[#FE5500]' : 'border-accent text-accent'}`}>Short Film</span>
                <span className={`px-4 py-1 border font-bold uppercase text-xs tracking-widest ${theme === 'light' ? 'border-[#FE5500] text-[#FE5500]' : 'border-accent text-accent'}`}>Gully Cricket</span>
                <span className={`px-4 py-1 border font-bold uppercase text-xs tracking-widest ${theme === 'light' ? 'border-[#FE5500] text-[#FE5500]' : 'border-accent text-accent'}`}>2024</span>
              </div>
              <div className={`text-base mt-4 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>Role: <span style={{color:'#FE5500'}} className="font-semibold">Designer (Branding, Visual Identity)</span></div>
            </div>
          </motion.section>
          {/* First Look Poster Section: Cinematic, Large, Focused, Parallax */}
          <section
            className={`w-full flex flex-col items-center justify-center relative p-0 m-0 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
          >
            {/* Mobile: 16:9 aspect ratio */}
            <div className="block md:hidden w-full max-w-2xl mx-auto aspect-video relative">
              <img
                src={firstLook}
                alt="One 60 First Look Poster"
                className="object-cover w-full h-full rounded-none"
                style={{ aspectRatio: '16/9', maxHeight: '360px', minHeight: 0 }}
              />
            </div>
            {/* Desktop: original full-screen style */}
            <div className="hidden md:block w-full h-screen relative">
              <img
                src={firstLook}
                alt="One 60 First Look Poster"
                className="w-full h-full object-cover absolute inset-0 z-0"
                style={{ minHeight: '100vh', width: '100%', maxWidth: '100vw' }}
              />
            </div>
          </section>
          {/* Philosophy Section */}
          <section className={`w-full border-b border-neutral-800 py-24 md:py-32 flex items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
            <div className="max-w-4xl w-full mx-auto px-6 flex flex-col items-center gap-8">
              <div className={`text-3xl md:text-5xl font-black text-center mb-2 md:mb-4 leading-tight md:leading-tight ${theme === 'light' ? 'text-neutral-900' : 'text-accent'}`}>
                "Every frame is a story—minimal, cinematic, and true to the spirit of the game."
              </div>
              <div className={`text-lg md:text-2xl text-center max-w-2xl md:max-w-3xl leading-relaxed md:leading-relaxed ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>
                Design for One 60 is about capturing the poetry of everyday cricket—simple, bold, and full of heart. Every detail is crafted to inspire and resonate with anyone who's ever played in the streets.</div>
            </div>
          </section>
          {/* Floating Back to all posters button (reuse) */}
          <div className="fixed bottom-6 right-6 z-50">
            <a
              href="/posters"
              className="butter-btn butter-btn-bordered px-3 py-1.5 text-xs shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              style={{ minWidth: 120, display: 'inline-block', borderRadius: 0 }}
            >
              <span className="butter-content">← Back to all posters</span>
              <span className="butter-fill" />
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }

  if (slug === "san-24") {
    const poster = "/works/posters/san 24/JITZ.png";
    return (
      <React.Fragment key={slug}>
        <div key={slug} className={`w-full min-h-screen flex flex-col font-sans ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-foreground'}`}>
          <Navbar />
          {/* Main Section: Poster + Overview with scroll animation */}
          <motion.section
            className={`w-full min-h-[80vh] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 max-w-6xl mx-auto px-4 mt-8 md:mt-12 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Poster on the left boots in first */}
            <motion.div
              className="w-full md:w-1/2 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={heroBooted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className={`w-full max-w-md aspect-[3/4] rounded-none overflow-hidden flex items-center justify-center ${theme === 'light' ? 'bg-neutral-200' : 'bg-neutral-900'}`}>
                <Image
                  src={poster}
                  alt="San 24 DJ Jitz Poster"
                  width={600}
                  height={800}
                  className="object-cover w-full h-full"
                />
                </div>
            </motion.div>
            {/* Overview on the right boots in after navbar */}
            <motion.div
              className="w-full md:w-1/2 flex flex-col justify-center gap-8 max-w-xl"
              initial={{ opacity: 0, y: 40 }}
              animate={heroBooted && navbarBooted ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            >
              <h2 className={`text-3xl md:text-5xl font-black mb-2 uppercase tracking-tight ${theme === 'light' ? 'text-black' : 'text-accent'}`}>Project Overview</h2>
              <div className={`text-base md:text-xl font-light leading-relaxed text-justify ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}`}>
                Farewell for <span style={{color:'#FE5500'}} className="font-semibold">Santhome Higher Secondary School, Chennai</span>, held on <span style={{color:'#FE5500'}} className="font-semibold">24.02.2024</span>.<br className="hidden md:block" />
                I designed the <span style={{color:'#FE5500'}} className="font-semibold">announcement poster</span> for the <span style={{color:'#FE5500'}} className="font-semibold">DJ Jitz</span> event. The visual identity was crafted to capture the <span style={{color:'#FE5500'}} className="font-semibold">energy</span>, <span style={{color:'#FE5500'}} className="font-semibold">nostalgia</span>, and <span style={{color:'#FE5500'}} className="font-semibold">celebration</span> of a school farewell, blending bold modern design with a sense of occasion. The poster was designed to <span style={{color:'#FE5500'}} className="font-semibold">excite</span>, <span style={{color:'#FE5500'}} className="font-semibold">invite</span>, and leave a <span style={{color:'#FE5500'}} className="font-semibold">lasting impression</span> on the graduating class.
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                {["Farewell", "School Event", "2024", "DJ Jitz"].map(tag => (
                  <span key={tag} className={`px-4 py-1 border font-bold uppercase text-xs tracking-widest ${theme === 'light' ? 'border-[#FE5500] text-[#FE5500]' : 'border-accent text-accent'}`}>{tag}</span>
                ))}
              </div>
              <div className={`text-base mt-4 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>Role: <span style={{color:'#FE5500'}} className="font-semibold">Designer (Announcement Poster, Visual Identity)</span></div>
            </motion.div>
          </motion.section>
          {/* Philosophy Section with scroll animation */}
          <section
            className={`w-full border-b border-neutral-800 py-20 md:py-28 flex items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
          >
            <div className="max-w-3xl w-full mx-auto px-6 flex flex-col items-center gap-8">
              <div className={`text-2xl md:text-4xl font-black text-center mb-2 md:mb-4 leading-tight md:leading-tight ${theme === 'light' ? 'text-neutral-900' : 'text-accent'}`}>
                "A farewell is not just an end—it's a stage, a song, a memory in the making."
              </div>
              <div className={`text-lg md:text-2xl text-center max-w-2xl md:max-w-3xl leading-relaxed md:leading-relaxed ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>
                The San 24 farewell was more than a send-off; it was a celebration of friendships, dreams, and the music that brings us together. The DJ Jitz poster was designed to echo the pulse of the night—bold, electric, and unforgettable—leaving every student with a memory that will last long after the final song fades.
              </div>
            </div>
          </section>
          {/* Floating Back to all posters button (reuse) */}
          <div className="fixed bottom-6 right-6 z-50">
            <a
              href="/posters"
              className="butter-btn butter-btn-bordered px-3 py-1.5 text-xs shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              style={{ minWidth: 120, display: 'inline-block', borderRadius: 0 }}
            >
              <span className="butter-content">← Back to all posters</span>
              <span className="butter-fill" />
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }

  if (slug === "era-production") {
    const poster = "/works/posters/era production/era poster.jpg";
    return (
      <React.Fragment key={slug}>
        <div key={slug} className={`w-full min-h-screen flex flex-col font-sans ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-foreground'}`}>
          <Navbar />
          {/* Main Section: Poster + Overview with scroll animation */}
          <motion.section
            className={`w-full min-h-[80vh] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 max-w-6xl mx-auto px-4 mt-8 md:mt-12 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Poster on the left boots in first */}
            <motion.div
              className="w-full md:w-1/2 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={heroBooted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className={`w-full max-w-md aspect-[3/4] rounded-none overflow-hidden flex items-center justify-center ${theme === 'light' ? 'bg-neutral-200' : 'bg-neutral-900'}`}>
                <Image
                  src={poster}
                  alt="Era Production Poster"
                  width={600}
                  height={800}
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
            {/* Overview on the right boots in after navbar */}
            <motion.div
              className="w-full md:w-1/2 flex flex-col justify-center gap-8 max-w-xl"
              initial={{ opacity: 0, y: 40 }}
              animate={heroBooted && navbarBooted ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            >
              <h2 className={`text-3xl md:text-5xl font-black mb-2 uppercase tracking-tight ${theme === 'light' ? 'text-black' : 'text-accent'}`}>Project Overview</h2>
              <div className={`text-base md:text-xl font-light leading-relaxed text-justify ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}`}>
                <span style={{color:'#FE5500'}} className="font-semibold">Era Production</span> is a short film production company for which I designed a distinctive <span style={{color:'#FE5500'}} className="font-semibold">logo</span> and an <span style={{color:'#FE5500'}} className="font-semibold">announcement poster</span>. Inspired by the very concept of <span style={{color:'#FE5500'}} className="font-semibold">era</span>, the logo was crafted using a <span style={{color:'#FE5500'}} className="font-semibold">stylish royal typeface</span> that weaves together elements from multiple <span style={{color:'#FE5500'}} className="font-semibold">generations</span>—each detail in the mark tells a story of <span style={{color:'#FE5500'}} className="font-semibold">cinematic</span> evolution. The announcement poster presents this logo in a <span style={{color:'#FE5500'}} className="font-semibold">bold</span>, <span style={{color:'#FE5500'}} className="font-semibold">modern</span>, and <span style={{color:'#FE5500'}} className="font-semibold">cinematic</span> form, setting the tone for a brand that honors the past while embracing the future of <span style={{color:'#FE5500'}} className="font-semibold">storytelling</span>.
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                {["Production", "Short Film", "Logo Design", "2023"].map(tag => (
                  <span key={tag} className={`px-4 py-1 border font-bold uppercase text-xs tracking-widest ${theme === 'light' ? 'border-[#FE5500] text-[#FE5500]' : 'border-accent text-accent'}`}>{tag}</span>
                ))}
              </div>
              <div className={`text-base mt-4 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>Role: <span style={{color:'#FE5500'}} className="font-semibold">Designer (Logo, Announcement Poster, Visual Identity)</span></div>
            </motion.div>
          </motion.section>
          {/* Philosophy Section with scroll animation */}
          <section
            className={`w-full border-b border-neutral-800 py-20 md:py-28 flex items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
          >
            <div className="max-w-3xl w-full mx-auto px-6 flex flex-col items-center gap-8">
              <div className={`text-2xl md:text-4xl font-black text-center mb-2 md:mb-4 leading-tight md:leading-tight ${theme === 'light' ? 'text-neutral-900' : 'text-accent'}`}>
                "A logo is not just a mark—it's a bridge between generations, a symbol of stories yet to be told."
              </div>
              <div className={`text-lg md:text-2xl text-center max-w-2xl md:max-w-3xl leading-relaxed md:leading-relaxed ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>
                Era Production's identity was designed to evoke a sense of legacy and innovation. The logo and poster together celebrate the timeless art of filmmaking—where every era leaves its mark, and every new project is a chance to create something unforgettable.
              </div>
            </div>
          </section>
          {/* Floating Back to all posters button (reuse) */}
          <div className="fixed bottom-6 right-6 z-50">
            <a
              href="/posters"
              className="butter-btn butter-btn-bordered px-3 py-1.5 text-xs shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              style={{ minWidth: 120, display: 'inline-block', borderRadius: 0 }}
            >
              <span className="butter-content">← Back to all posters</span>
              <span className="butter-fill" />
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }

  if (slug === "ava") {
    const poster = "/works/posters/ava/ava first look SHOUT.png";
    return (
      <React.Fragment key={slug}>
        <div key={slug} className={`w-full min-h-screen flex flex-col font-sans ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-foreground'}`}>
          <Navbar />
          {/* Main Section: Poster + Overview with scroll animation */}
          <motion.section
            className={`w-full min-h-[80vh] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 max-w-6xl mx-auto px-4 mt-8 md:mt-12 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Poster on the left boots in first */}
            <motion.div
              className="w-full md:w-1/2 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={heroBooted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className={`w-full max-w-md aspect-[3/4] rounded-none overflow-hidden flex items-center justify-center ${theme === 'light' ? 'bg-neutral-200' : 'bg-neutral-900'}`}>
                <Image
                  src={poster}
                  alt="Ava Adutha Vinadi Aachiriyangal Poster"
                  width={600}
                  height={800}
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
            {/* Overview on the right boots in after navbar */}
            <motion.div
              className="w-full md:w-1/2 flex flex-col justify-center gap-8 max-w-xl"
              initial={{ opacity: 0, y: 40 }}
              animate={heroBooted && navbarBooted ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            >
              <h2 className={`text-3xl md:text-5xl font-black mb-2 uppercase tracking-tight ${theme === 'light' ? 'text-black' : 'text-accent'}`}>Project Overview</h2>
              <div className={`text-base md:text-xl font-light leading-relaxed text-justify ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}`}>
                I designed the <span style={{color:'#FE5500'}} className="font-semibold">announcement poster</span> for a short film called <span style={{color:'#FE5500'}} className="font-semibold">Adutha Vinadi Aachiriyangal</span>. The story follows a man who seemingly has <span style={{color:'#FE5500'}} className="font-semibold">everything</span>, yet is driven by <span style={{color:'#FE5500'}} className="font-semibold">greed</span> and a restless urge to <span style={{color:'#FE5500'}} className="font-semibold">yap</span>. The film explores the idea that <span style={{color:'#FE5500'}} className="font-semibold">anything can happen anytime</span>. The poster is filled with <span style={{color:'#FE5500'}} className="font-semibold">clocks</span> and hidden details—like <span style={{color:'#FE5500'}} className="font-semibold">knives</span> and other <span style={{color:'#FE5500'}} className="font-semibold">tools</span> used in the film—inviting viewers to look closer and discover the story within the design.
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                {["Short Film", "Poster Design", "2022", "Adutha Vinadi Aachiriyangal"].map(tag => (
                  <span key={tag} className={`px-4 py-1 border font-bold uppercase text-xs tracking-widest ${theme === 'light' ? 'border-[#FE5500] text-[#FE5500]' : 'border-accent text-accent'}`}>{tag}</span>
                ))}
              </div>
              <div className={`text-base mt-4 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>Role: <span style={{color:'#FE5500'}} className="font-semibold">Designer (Announcement Poster, Visual Identity)</span></div>
            </motion.div>
          </motion.section>
          {/* Philosophy Section with scroll animation */}
          <section
            className={`w-full border-b border-neutral-800 py-20 md:py-28 flex items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
          >
            <div className="max-w-3xl w-full mx-auto px-6 flex flex-col items-center gap-8">
              <div className={`text-2xl md:text-4xl font-black text-center mb-2 md:mb-4 leading-tight md:leading-tight ${theme === 'light' ? 'text-neutral-900' : 'text-accent'}`}>
                "Time is the greatest twist—every second holds a secret, every detail a clue."
              </div>
              <div className={`text-lg md:text-2xl text-center max-w-2xl md:max-w-3xl leading-relaxed md:leading-relaxed ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>
                The poster for Adutha Vinadi Aachiriyangal is a visual puzzle, echoing the film's message that life is unpredictable and every moment matters. Through the use of clocks and hidden objects, the design invites the audience to search for meaning and anticipate the unexpected—just as the film itself does.
              </div>
            </div>
          </section>
          {/* Floating Back to all posters button (reuse) */}
          <div className="fixed bottom-6 right-6 z-50">
            <a
              href="/posters"
              className="butter-btn butter-btn-bordered px-3 py-1.5 text-xs shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              style={{ minWidth: 120, display: 'inline-block', borderRadius: 0 }}
            >
              <span className="butter-content">← Back to all posters</span>
              <span className="butter-fill" />
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment key={slug}>
    <div className="w-full min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center py-16 px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full flex flex-col items-center mb-12"
        >
          <div className="w-full aspect-[16/7] bg-black overflow-hidden shadow-2xl mb-8 flex items-center justify-center">
            <Image
              src={`/works/posters/${work.name}/${work.images[0]}`}
              alt={work.title}
              width={1200}
              height={525}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-end w-full justify-between">
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-accent mb-2 uppercase tracking-tight drop-shadow-xl">{work.title}</h1>
              <div className="flex gap-2 mb-2">
                {work.meta.map((m) => (
                  <span key={m} className="text-xs px-2 py-0.5 rounded bg-accent/80 text-white font-bold uppercase tracking-widest">{m}</span>
                ))}
              </div>
            </div>
            <Link href="/posters" className="text-accent font-bold text-sm md:text-base underline underline-offset-4 hover:text-white transition ml-0 md:ml-8 mt-4 md:mt-0">← Back to all posters</Link>
          </div>
        </motion.div>
        {/* Description */}
        <div className="w-full max-w-3xl text-lg md:text-2xl text-neutral-300 font-light mb-12 leading-relaxed">
          {work.description}
        </div>
        {/* Gallery */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {work.images.map((img) => (
            <div key={img} className="w-full aspect-[3/4] bg-black overflow-hidden flex items-center justify-center shadow-lg">
              <Image
                src={`/works/posters/${work.name}/${img}`}
                alt={img.replace(/\.[^.]+$/, "")}
                width={600}
                height={800}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    </React.Fragment>
  );
} 
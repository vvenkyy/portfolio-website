"use client";
import { useState, useContext } from "react";
import { ThemeContext } from "../ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Navbar from "../Navbar";

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
    images: ["One 60.jpg", "one 60 png.png"],
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
    title: "Adutha Vinaadi Aachiriyangal",
    images: ["ADUTHA VINAADI AACHIRIYANGAL PRINT TXT black.png", "ava first look SHOUT.png"],
    description: "Dummy description for Ava. A creative journey in poster design and visual identity.",
    meta: ["Client Work", "2022"],
  },
];

const GENERAL_POSTERS = [
  "main.png","David with the head of golioth 2.png","Thug Life.png","kuch kuch hota hai.png","12th fail.png","ak.png","rockstar 2.png","RETRO INSTAGRAM.png","POOKIEFIED FRAME.png","rockstar.png","chill guy.png","charles red.png","greek 2.png","LUCKY BASKHAR.png","RAJINATION.png","NAYAGAN.png","OG.png","venkatesh cse g.png","greek.png","THANGALAAN.png","ARR.png","RAAVANAN.png","Laapataa Ladies.png","KOHLI.png","GODS DON'T TALK.png","ANDREA BW.png","FAFA.png","AISHWARYA LEKSHMI.png","TIANIC.jpg","ILAYARAJA.png","MAHAAN POSTER.png","GOOD NIGHT 1.png","MALAR.png","MAHAAN.png","SANA2.png",/*"SANA.png",*/"PP.png","ghilli.png","VTV.png","DQ.png","THALAIVAR.png","AMAR.png","LEO OH 2.png","vijay drunk.png","sms.png","MSD 3.png","CM PUNK.jpg","MAAMANAN.jpg","simbu.jpg","dhoni.jpg","jigarthanda.jpg","MAADU.jpg","sd 3.jpg","sd 2.jpg","HARRY POTTER.jpg","DUNE.jpg","TR.jpg","vidu.jpg","faf.jpg","DIRECTORS.jpg","superman.jpg","gow.jpg","KAITHI.jpg","sarpatta.jpg","vadachennai.jpg"
];

export default function PostersPage() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`w-full min-h-screen flex flex-col font-sans ${theme === 'light' ? 'bg-white text-black' : 'bg-background text-foreground'}`}>
      <Navbar />
      <h1 className="text-4xl md:text-6xl font-black text-accent mt-12 md:mt-20 mb-2 tracking-tight uppercase text-center drop-shadow-2xl">
        Client & Event Showcase
        </h1>
      <div className="flex flex-col items-center mb-12">
        <span className="text-neutral-400 text-sm uppercase tracking-widest mb-2">Scroll Down</span>
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: [0, 16, 0], opacity: [1, 0.7, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-7 h-7 flex items-center justify-center"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 6V22" stroke="#FE5500" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M7 15L14 22L21 15" stroke="#FE5500" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </motion.div>
      </div>
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {CLIENT_FOLDERS.map((folder, idx) => (
            <motion.div
              key={folder.slug}
              className={`group border-2 border-transparent hover:border-[#FE5500] transition-all duration-300 shadow-xl overflow-hidden cursor-pointer flex flex-col rounded-none ${theme === 'light' ? 'bg-neutral-100' : 'bg-neutral-900'}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: 'easeOut' }}
            >
              <Link href={`/posters/${folder.slug}`} className="block w-full h-full">
                <div className={`relative w-full aspect-[4/3] overflow-hidden ${theme === 'light' ? 'bg-neutral-200' : 'bg-black'}`}>
                <Image
                  src={`/works/posters/${folder.name}/${folder.images[0]}`}
                  alt={folder.title}
                  width={600}
                  height={450}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 rounded-none"
                    loading="lazy"
                />
                  <div className="absolute inset-0 pointer-events-none group-hover:ring-2 group-hover:ring-[#FE5500] transition-all duration-300" />
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <div className={`text-2xl font-black uppercase tracking-wide mb-1 group-hover:text-[#FE5500] transition-colors duration-300 ${theme === 'light' ? 'text-black' : 'text-white'}`}>{folder.title}</div>
                  <div className="flex gap-2 flex-wrap mb-1">
                    {folder.meta.map((m) => (
                      <span key={folder.slug + '-' + m} className={`px-2 py-0.5 border font-bold uppercase text-xs tracking-widest ${theme === 'light' ? 'border-[#FE5500] text-[#FE5500]' : 'border-[#FE5500] text-[#FE5500] bg-black/40'}`}>{m}</span>
                    ))}
                  </div>
                  <div className={`text-sm truncate ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>{folder.description}</div>
              </div>
            </Link>
            </motion.div>
          ))}
        </div>
        <section className="w-full max-w-7xl mx-auto mt-24">
          <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FE5500] via-orange-400 to-[#FE5500] drop-shadow-2xl tracking-tight uppercase text-center mt-20 mb-8">
            Personal Artistry Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {GENERAL_POSTERS.map((img) => (
              <div key={img} className={`w-full aspect-[3/4] rounded-none overflow-hidden flex items-center justify-center shadow-lg ${theme === 'light' ? 'bg-neutral-100' : 'bg-black'}`}>
                <Image
                  src={`/works/posters/general posters/${img}`}
                  alt={img.replace(/\.[^.]+$/, "")}
                  width={400}
                  height={600}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
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
      <section className="w-full flex flex-col items-center justify-center mt-24 mb-12">
        <div className="max-w-2xl text-center">
          <div className={`text-2xl md:text-3xl font-black mb-4 drop-shadow-xl ${theme === 'light' ? 'text-neutral-900' : 'text-accent'}`}>"Design is the silent ambassador of vision."</div>
          <div className={`text-lg md:text-xl font-light leading-relaxed ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>Every project, every poster, every pixel is a story—crafted to inspire, connect, and leave a mark. Creativity is not just what we do, it's who we are.</div>
        </div>
      </section>
    </div>
  );
} 
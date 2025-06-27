"use client";
import { useContext, useState, useRef } from "react";
import { ThemeContext } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  navLinks?: NavLink[];
  onScrollHero?: () => void;
  onScrollAbout?: () => void;
  onScrollContact?: () => void;
}

const defaultLinks: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

const servicesSubnav = [
  { label: "Poster", href: "/posters" },
  { label: "Branding", href: "/branding" },
  { label: "Web Development", href: "/web" },
  { label: "App Development", href: "/appdev" },
];

export default function Navbar({ navLinks = defaultLinks, onScrollHero, onScrollAbout, onScrollContact }: NavbarProps) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleServicesEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setServicesOpen(true);
  };
  const handleServicesLeave = () => {
    closeTimeout.current = setTimeout(() => setServicesOpen(false), 180);
  };

  const textClass = theme === 'light' ? 'text-neutral-900' : 'text-white';

  return (
    <>
      <motion.nav
        className={`w-full flex justify-between items-center px-4 md:px-8 py-4 sticky top-0 z-50 backdrop-blur-md border-b ${theme === 'light' ? 'bg-white border-neutral-200' : 'bg-black border-neutral-800'} ${textClass}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2, duration: 1.2, ease: "easeInOut" } }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/#hero"
            scroll={false}
            className="h-7 w-auto object-contain"
            aria-label="Home"
            onClick={e => {
              e.preventDefault();
              if (pathname !== '/') {
                router.push('/#hero');
              } else {
                if (window.location.hash !== '#hero') {
                  window.location.hash = '#hero';
                }
                if (onScrollHero) onScrollHero();
              }
            }}
          >
            <Image
              src="/works/MYLOGO/150ppi/web logo.png"
              alt="VVENKYY Logo"
              width={28}
              height={28}
              className={`h-7 w-auto object-contain ${theme === 'light' ? 'invert' : 'invert-0'}`}
              priority
            />
          </Link>
        </div>
        {/* Hamburger for mobile */}
        <div className="flex items-center md:hidden">
          <button
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            className="p-2 rounded-full border border-transparent hover:border-accent transition-colors mr-2"
          >
            {theme === "dark" ? (
              <SunIcon className="w-6 h-6 text-accent" />
            ) : (
              <MoonIcon className="w-6 h-6 text-accent" />
            )}
          </button>
          <button
            className="flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
            aria-label="Open menu"
            onClick={() => setMobileOpen(v => !v)}
          >
            <span className={`block w-6 h-0.5 mb-1 rounded transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''} ${theme === 'light' ? 'bg-black' : 'bg-white'}`}></span>
            <span className={`block w-6 h-0.5 mb-1 rounded transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''} ${theme === 'light' ? 'bg-black' : 'bg-white'}`}></span>
            <span className={`block w-6 h-0.5 rounded transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''} ${theme === 'light' ? 'bg-black' : 'bg-white'}`}></span>
          </button>
        </div>
        {/* Desktop nav */}
        <ul className={`hidden md:flex gap-8 items-center text-xs font-semibold uppercase ${textClass}`}>
          {navLinks.map((link) =>
            link.label === "Services" ? (
              <li
                key={link.href}
                className="relative group flex items-center"
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              >
                <Link
                  href={link.href}
                  className={`${textClass} hover:text-[#FE5500] transition-colors duration-200 flex items-center gap-1`}
                  onClick={() => setServicesOpen(false)}
                >
                  Services
                  <svg className={`w-3 h-3 ml-1 transition-transform group-hover:rotate-180 ${theme === 'light' ? 'text-black stroke-black' : 'text-accent stroke-accent'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
                </Link>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.ul
                      initial={{ opacity: 0, scale: 0.95, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 12 }}
                      transition={{ duration: 0.28, ease: "circOut" }}
                      className={`absolute top-full left-0 mt-12 w-[260px] shadow-2xl rounded-lg px-4 py-5 z-50 flex flex-col gap-4 items-stretch text-left ${theme === 'light' ? 'bg-white border border-neutral-200' : 'bg-black border border-neutral-800'} ${textClass}`}
                    >
                      {servicesSubnav.map((sub, i) => (
                        <motion.li
                          key={sub.href}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -16 }}
                          transition={{ duration: 0.22, delay: i * 0.07, ease: "circOut" }}
                        >
                          <Link
                            href={sub.href}
                            className={`butter-btn butter-btn-no-shadow flex items-center justify-start px-6 py-4 font-bold uppercase tracking-widest text-base transition-none outline-none focus:outline-none box-border text-left whitespace-normal w-full relative overflow-hidden transition-colors duration-200`}
                            style={{ borderRadius: 0, zIndex: 1 }}
                            onClick={() => setServicesOpen(false)}
                          >
                            <span className="butter-content text-black relative z-10 w-full text-left whitespace-normal">{sub.label}</span>
                            <span className="butter-fill absolute inset-0 z-0" />
                          </Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ) : (
            <li key={link.href}>
                <Link
                  href={link.href}
                  scroll={false}
                  className={`${textClass} hover:text-[#FE5500] transition-colors duration-200`}
                  onClick={e => {
                    if (link.label === 'About' || link.label === 'Contact' || link.label === 'Services') {
                      e.preventDefault();
                      const hash = link.href.split('#')[1];
                      if (pathname !== '/' && hash) {
                        router.push('/#' + hash);
                      } else if (hash) {
                        if (window.location.hash !== '#' + hash) {
                          window.location.hash = '#' + hash;
                        }
                        if (link.label === 'About' && onScrollAbout) onScrollAbout();
                        if (link.label === 'Contact' && onScrollContact) onScrollContact();
                      }
                    }
                  }}
                >
                {link.label}
              </Link>
            </li>
            )
          )}
          <button
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full border border-transparent hover:border-accent transition-colors"
          >
            {theme === "dark" ? (
              <SunIcon className="w-4 h-4 text-accent" />
            ) : (
              <MoonIcon className="w-4 h-4 text-accent" />
            )}
          </button>
        </ul>
      </motion.nav>
      {/* Mobile nav overlay (outside nav for proper overlay behavior) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`fixed left-0 right-0 top-0 bottom-0 z-40 flex flex-col !bg-opacity-100 ${theme === 'light' ? '!bg-white' : '!bg-black'} md:hidden`}
            style={{ background: 'transparent', opacity: 1, backdropFilter: 'none' }}
          >
            <style jsx>{`
              .mobile-menu-overlay::before {
                content: "";
                position: absolute;
                inset: 0;
                z-index: 0;
                background: ${theme === 'light' ? '#fff' : '#000'} !important;
                opacity: 1 !important;
                pointer-events: none;
              }
            `}</style>
            <ul
              className={`flex flex-col gap-6 px-8 pt-4 pb-8 mt-[72px] text-lg font-bold uppercase w-full
                ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}
              style={{
                background: theme === 'light' ? '#fff' : '#000',
                opacity: 1,
                borderRadius: 0,
                boxShadow: 'none'
              }}
            >
              {navLinks.map((link) => (
                link.label === 'Services' ? (
                  <li key={link.href} className="relative">
                    <button
                      className="flex items-center gap-2 w-full py-2 text-left"
                      onClick={e => {
                        e.preventDefault();
                        setMobileServicesOpen(v => !v);
                      }}
                    >
                      SERVICES
                      <svg className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''} ${theme === 'light' ? 'text-black' : 'text-accent'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.ul
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col gap-2 pl-4 mt-2 border-l-2 border-accent"
                          style={{ background: 'transparent', border: 'none', borderRadius: 0, boxShadow: 'none', opacity: 1 }}
                        >
                          {servicesSubnav.map((sub) => (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                className="block py-2 w-full text-base"
                                onClick={() => {
                                  setMobileOpen(false);
                                  setMobileServicesOpen(false);
                                }}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      scroll={false}
                      className="block py-2 w-full"
                      onClick={e => {
                        setMobileOpen(false);
                        if (link.label === 'About' || link.label === 'Contact') {
                          e.preventDefault();
                          const hash = link.href.split('#')[1];
                          if (pathname !== '/' && hash) {
                            router.push('/#' + hash);
                          } else if (hash) {
                            if (window.location.hash !== '#' + hash) {
                              window.location.hash = '#' + hash;
                            }
                            if (link.label === 'About' && onScrollAbout) onScrollAbout();
                            if (link.label === 'Contact' && onScrollContact) onScrollContact();
                          }
                        }
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 
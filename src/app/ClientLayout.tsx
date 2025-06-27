"use client";
import { usePathname } from "next/navigation";
import BootAnimationClient from "./BootAnimationClient";
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme } = useContext(ThemeContext);
  const className = `transition-colors duration-500 min-h-screen ${theme === "light" ? "bg-white text-black light" : "bg-black text-white"}`;
  const style = { background: theme === "light" ? "#fff" : "#010101", color: theme === "light" ? "#000" : "#ededed" };
  const content = pathname === "/"
    ? <BootAnimationClient>{children}</BootAnimationClient>
    : <>{children}</>;
  return <div className={className} style={style}>{content}</div>;
} 
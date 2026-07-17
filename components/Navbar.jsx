"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efek untuk mendeteksi posisi scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    /* 
      BACA INI: Kita pakai 'sticky top-0' agar tetap berada di aliran dokumen normal 
      (sehingga konten di bawahnya tidak ketutupan), tapi tetap menempel saat di-scroll.
    */
    <nav 
      className={`w-full border-b border-[#30363d] sticky top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#0d1117]/75 backdrop-blur-md py-4" // Saat di-scroll: agak transparan + blur
          : "bg-[#0d1117] py-6" // Kondisi awal di paling atas
      }`}
    >
      {/* Container utama */}
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center transition-all duration-300">
        {/* Brand/Nama */}
        <Link href="/" className="font-bold text-white text-lg tracking-tight">
          Alvinza Erza F.
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 text-sm text-[#8b949e]">
          <Link href="/" className="hover:text-white transition-colors">About</Link>
          <Link href="/posts" className="hover:text-white transition-colors">Posts</Link>
          <Link href="/repositories" className="hover:text-white transition-colors">Repositories</Link>
          <Link href="/cv" className="hover:text-white transition-colors">CV</Link>
          <Link href="/certifications" className="hover:text-white transition-colors">Certifications</Link>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#8b949e] hover:text-white p-1 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0d1117]/95 backdrop-blur-lg border-b border-[#30363d] px-6 py-4 absolute top-full left-0 w-full flex flex-col space-y-4 text-sm text-[#8b949e] shadow-lg">
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-1">About</Link>
          <Link href="/posts" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-1">Posts</Link>
          <Link href="/repositories" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-1">Repositories</Link>
          <Link href="/cv" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-1">CV</Link>
          <Link href="/certifications" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-1">Certifications</Link>
        </div>
      )}
    </nav>
  );
}
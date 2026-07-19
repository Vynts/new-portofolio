"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // State kustom untuk translator kita
  const [bahasaAktif, setBahasaAktif] = useState("ID");
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    // 1. Deteksi scroll untuk background navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    // 2. Baca cookie bahasa aktif dari Google Translate saat halaman dimuat
    const match = document.cookie.match(new RegExp("(^| )googtrans=([^;]+)"));
    if (match) {
      setBahasaAktif(match[2].endsWith("/en") ? "ENG" : "ID");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Fungsi memanipulasi cookie Google Translate & reload halaman secara instan
  const gantiBahasa = (bahasa) => {
    const domain = window.location.hostname.replace("www", "");
    const nilaiCookie = bahasa === "ENG" ? "/id/en" : "/id/id";

    // Set cookie untuk root domain portofolio kamu
    document.cookie = `googtrans=${nilaiCookie}; path=/; domain=${domain};`;
    document.cookie = `googtrans=${nilaiCookie}; path=/;`;

    setBahasaAktif(bahasa);
    setIsLangOpen(false);
    
    // Refresh halaman agar engine internal browser langsung menerjemahkan halaman
    window.location.reload();
  };

  return (
    <nav 
      className={`w-full border-b border-[#30363d] sticky top-0 left-0 z-50 transition-all duration-300 notranslate ${
        isScrolled ? "bg-[#0d1117]/75 backdrop-blur-md py-4" : "bg-[#0d1117] py-6"
      }`}
    >
      <div className="max-w-5xl mx-auto px-3 flex justify-between items-center transition-all duration-300">
        
        {/* 1. LOGO */}
        <Link href="/" className="font-bold text-white text-lg tracking-tight">
          Alvinza Erza F.
        </Link>

        {/* =========================================================================
            WADAH NAVIGASI UTAMA
            ========================================================================= */}
        <div className="flex items-center space-x-4 md:space-x-6">
          
          {/* A. NAVIGASI DESKTOP */}
          <div className="hidden md:flex items-center space-x-6 text-sm text-[#8b949e] md:order-1">
            <Link href="/" className="hover:text-white transition-colors">About</Link>
            <Link href="/posts" className="hover:text-white transition-colors">Posts</Link>
            <Link href="/repositories" className="hover:text-white transition-colors">Repositories</Link>
            <Link href="/cv" className="hover:text-white transition-colors">CV</Link>
            <Link href="/certifications" className="hover:text-white transition-colors">Certifications</Link>
          </div>

          {/* B. DROPDOWN TRANSLATOR KUSTOM (100% Mengikuti Aturan Sticky) */}
          <div className="order-1 md:order-2 relative inline-block text-left select-none md:ml-2">
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 bg-[#161b22] text-[#c9d1d9] border border-[#30363d] px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer hover:bg-[#1f242c] transition-colors"
            >
              <span>{bahasaAktif}</span>
              <span className="text-[9px] opacity-70">▼</span>
            </button>

            {/* Popup Pilihan Bahasa (Murni ID & ENG, Di bawah Tombol) */}
            {isLangOpen && (
              <div className="absolute right-0 mt-2 bg-[#161b22] border border-[#30363d] rounded-md shadow-xl z-50 min-w-[76px] overflow-hidden">
                <div className="py-0.5">
                  <button
                    onClick={() => gantiBahasa("ID")}
                    className={`block w-full text-left px-3 py-1.5 text-xs transition-colors ${
                      bahasaAktif === "ID" ? "text-[#58a6ff] bg-[#1f242c] font-bold" : "text-[#c9d1d9] hover:bg-[#1f242c]"
                    }`}
                  >
                    ID
                  </button>
                  <button
                    onClick={() => gantiBahasa("ENG")}
                    className={`block w-full text-left px-3 py-1.5 text-xs transition-colors ${
                      bahasaAktif === "ENG" ? "text-[#58a6ff] bg-[#1f242c] font-bold" : "text-[#c9d1d9] hover:bg-[#1f242c]"
                    }`}
                  >
                    ENG
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* C. TOMBOL HAMBURGER MOBILE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#8b949e] hover:text-white p-1 focus:outline-none order-2"
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
      </div>

      {/* Menu Navigasi Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#0d1117]/95 backdrop-blur-lg border-b border-[#30363d] px-6 py-4 absolute top-full left-0 w-full flex flex-col space-y-4 text-sm text-[#8b949e] shadow-lg">
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-1">About</Link>
          <Link href="/posts" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-1">Posts</Link>
          <Link href="/repositories" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-1">Repositories</Link>
          <Link href="/cv" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-1">CV</Link>
          <Link href="/certifications" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-1">Certifications</Link>
        </div>
      )}

      {/* CSS Global untuk menyembunyikan elemen sampah bawaan Google Translate jika browser memicunya */}
      <style jsx global>{`
        body > .skiptranslate,
        .goog-te-banner-frame,
        #goog-gt-tt,
        .goog-te-balloon-frame {
          display: none !important;
          visibility: hidden !important;
        }
        body {
          top: 0 !important;
        }
      `}</style>
    </nav>
  );
}
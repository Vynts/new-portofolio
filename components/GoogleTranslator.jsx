"use client";

import { useEffect } from "react";

export default function GoogleTranslator() {
  useEffect(() => {
    // 1. Muat skrip eksternal Google Translate di background
    if (!document.querySelector('script[src*="translate_a/element.js"]')) {
      const addScript = document.createElement("script");
      addScript.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      document.body.appendChild(addScript);
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "id", autoDisplay: false },
        "google_translate_hidden_engine"
      );
    };

    // 2. Bersihkan paksa banner bawaan Google yang merusak visual atas website
    const hapusBanner = () => {
      const iframe = document.querySelector(".goog-te-banner-frame");
      if (iframe) iframe.remove();
      if (document.documentElement.style.paddingTop) document.documentElement.style.paddingTop = "0px";
      if (document.body.style.top) document.body.style.top = "0px";
    };

    const observer = new MutationObserver(hapusBanner);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Wadah tersembunyi agar engine Google tetap bekerja di background */}
      <div id="google_translate_hidden_engine" style={{ display: "none", visibility: "hidden" }} />
      
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
    </>
  );
}
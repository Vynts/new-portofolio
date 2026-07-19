"use client";

import { useEffect } from "react";

export default function GoogleTranslator() {
  useEffect(() => {
    // Inisialisasi Google Translate Element standar
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "id",
          includedLanguages: "en,id",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Muat skrip eksternal Google jika belum ada
    if (!document.querySelector('script[src*="translate_a/element.js"]')) {
      const addScript = document.createElement("script");
      addScript.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      document.body.appendChild(addScript);
    }

    // --- LOGIKA MENGUBAH TEKS & MENYEMBUNYIKAN DUPLIKAT SECARA RINGAN ---
    const paksaTeksBahasa = () => {
      const selectEl = document.querySelector(".goog-te-combo");
      if (selectEl) {
        const options = selectEl.querySelectorAll("option");
        const adaOpsiKosong = Array.from(options).some(opt => opt.value === "");

        options.forEach((opt) => {
          // 1. Ubah teks opsi default (value "") menjadi ID
          if (opt.value === "") {
            opt.textContent = "ID";
            opt.style.display = "block";
          }
          // 2. Kunci teks Indonesia asli menjadi ID
          else if (opt.value === "id") {
            opt.textContent = "ID";
            opt.style.display = adaOpsiKosong ? "none" : "block";
          }
          // 3. Kunci teks Inggris menjadi ENG
          else if (opt.value === "en") {
            opt.textContent = "ENG";
            opt.style.display = "block";
          }
        });
      }
    };

    // Pengawas global hanya untuk menghapus bar putih atas Google
    const globalObserver = new MutationObserver(() => {
      const googleIframe = document.querySelector(".goog-te-banner-frame");
      if (googleIframe) googleIframe.remove();

      if (document.documentElement.style.paddingTop) document.documentElement.style.paddingTop = "0px";
      if (document.body.style.top) document.body.style.top = "0px";
      
      paksaTeksBahasa();
    });

    globalObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
    globalObserver.observe(document.body, { childList: true, attributes: true, attributeFilter: ["style"] });

    // Cek berkala sampai element dropdown selesai di-render di DOM awal
    const intervalCheck = setInterval(() => {
      const selectEl = document.querySelector(".goog-te-combo");
      if (selectEl) {
        paksaTeksBahasa();
        
        // Pemicu berbasis interaksi (sangat ringan untuk HP, anti infinite-loop)
        selectEl.addEventListener("change", () => setTimeout(paksaTeksBahasa, 20));
        selectEl.addEventListener("click", paksaTeksBahasa);
        selectEl.addEventListener("focus", paksaTeksBahasa);
        
        clearInterval(intervalCheck);
      }
    }, 500);

    return () => {
      globalObserver.disconnect();
      clearInterval(intervalCheck);
      
      const selectEl = document.querySelector(".goog-te-combo");
      if (selectEl) {
        selectEl.removeEventListener("change", paksaTeksBahasa);
        selectEl.removeEventListener("click", paksaTeksBahasa);
        selectEl.removeEventListener("focus", paksaTeksBahasa);
      }
    };
  }, []);

  return null;
}
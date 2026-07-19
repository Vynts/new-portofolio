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

    // --- LOGIKA MENGUBAH TEKS & MENYEMBUNYIKAN DUPLIKAT YANG AMAN ---
    const paksaTeksBahasa = () => {
      const selectEl = document.querySelector(".goog-te-combo");
      if (selectEl) {
        const options = selectEl.querySelectorAll("option");
        
        // Cek apakah opsi default (value "") saat ini sedang ada di DOM
        const adaOpsiKosong = Array.from(options).some(opt => opt.value === "");

        options.forEach((opt) => {
          // 1. Ubah teks opsi default (value "") menjadi ID
          if (opt.value === "") {
            opt.textContent = "ID";
            opt.style.display = "block"; // Selalu tampilkan jika ada
          }
          // 2. Kunci teks Indonesia asli menjadi ID
          else if (opt.value === "id") {
            opt.textContent = "ID";
            // HANYA sembunyikan opsi "id" jika opsi default "" ada (mencegah duplikat).
            // Jika opsi default "" hilang (seperti saat posisi ENG), pastikan "id" TETAP MUNCUL.
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

    // Pengawas global untuk menghapus bar putih atas
    const globalObserver = new MutationObserver(() => {
      const googleIframe = document.querySelector(".goog-te-banner-frame");
      if (googleIframe) googleIframe.remove();

      if (document.documentElement.style.paddingTop) document.documentElement.style.paddingTop = "0px";
      if (document.body.style.top) document.body.style.top = "0px";
      
      paksaTeksBahasa();
    });

    // Pengawas khusus isi dropdown menggunakan delay macro-task (setTimeout)
    // agar Google selesai memproses perpindahan bahasa sebelum teksnya dikunci kembali.
    const selectObserver = new MutationObserver(() => {
      setTimeout(paksaTeksBahasa, 0);
    });

    globalObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
    globalObserver.observe(document.body, { childList: true, attributes: true, attributeFilter: ["style"] });

    // Cek berkala sampai element dropdown selesai di-render di DOM
    const intervalCheck = setInterval(() => {
      const selectEl = document.querySelector(".goog-te-combo");
      if (selectEl) {
        paksaTeksBahasa();
        selectObserver.observe(selectEl, { childList: true, characterData: true, subtree: true });
        
        // Jaring pengaman saat interaksi klik manual bolak-balik
        selectEl.addEventListener("change", () => setTimeout(paksaTeksBahasa, 0));
        
        clearInterval(intervalCheck);
      }
    }, 500);

    return () => {
      globalObserver.disconnect();
      selectObserver.disconnect();
      clearInterval(intervalCheck);
    };
  }, []);

  return null;
}
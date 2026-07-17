"use client";

import React, { useState } from 'react';

interface Item {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl?: string;
}

// ==========================================
// DATA SERTIFIKAT & PENGHARGAAN KAMU
// ==========================================
const itemsData: (Item & { category: 'cert' | 'award' })[] = [
  // --- Kategori Sertifikasi ---
  { 
    id: 1, 
    category: 'cert', 
    title: "Belajar Dasar Cloud dan Gen AI di AWS", 
    issuer: "Dicoding Indonesia", 
    date: "2026", 
    image: "/certs/dicoding.jpg", 
    credentialUrl: "https://www.dicoding.com/certificates/1OP8RELELZQK"
  },
  { 
    id: 2, 
    category: 'cert', 
    title: "Spec-Driven Development dengan Kiro", 
    issuer: "Dicoding Indonesia", 
    date: "2026", 
    image: "/certs/dicoding.jpg",
    credentialUrl: "https://www.dicoding.com/certificates/81P2OL97YZOY"
  },
  { 
    id: 3, 
    category: 'cert', 
    title: "Belajar Membuat Front-End Web untuk Pemula", 
    issuer: "Dicoding Indonesia", 
    date: "2026", 
    image: "/certs/dicoding.jpg",
    credentialUrl: "http://dicoding.com/certificates/07Z67360JPQR"
  },
  { 
    id: 4, 
    category: 'cert', 
    title: "Belajar Dasar Pemrograman Web", 
    issuer: "Dicoding Indonesia", 
    date: "2026", 
    image: "/certs/dicoding.jpg",
    credentialUrl: "https://www.dicoding.com/certificates/RVZK01NNOZD5"
  },
  { 
    id: 5, 
    category: 'cert', 
    title: "TOEIC® Listening and Reading", 
    issuer: "International Test Center", 
    date: "2025", 
    image: "https://media.licdn.com/dms/image/v2/D562DAQEJ5g_pIWx7kQ/profile-treasury-image-shrink_800_800/B56Z8llLxxHUAI-/0/1783041932687?e=1784872800&v=beta&t=78_HoOJ6eRcsFqXYdr0xYcvzZaA7M46p_55R7gooakc",
    credentialUrl: "https://media.licdn.com/dms/image/v2/D562DAQEJ5g_pIWx7kQ/profile-treasury-image-shrink_800_800/B56Z8llLxxHUAI-/0/1783041932687?e=1784872800&v=beta&t=78_HoOJ6eRcsFqXYdr0xYcvzZaA7M46p_55R7gooakc"
  },
  
  // --- Kategori Awards ---
  { 
    id: 101, 
    category: 'award', 
    title: "Finalis LKS Cloud Computing Nasional", 
    issuer: "LKS Nasional", 
    date: "2025", 
    image: "https://media.licdn.com/dms/image/v2/D4D2DAQERA5E7NCs3qQ/profile-treasury-image-shrink_1280_1280/B4DZiykNbSHYAY-/0/1755342499542?e=1784872800&v=beta&t=j3_RO9K507LNhRUg0CnFFuhkoPDDd_eEhQ_QuGa0Y3g" 
  },
  { 
    id: 102, 
    category: 'award', 
    title: "Juara 1 LKS Cloud Computing Prov. Lampung", 
    issuer: "LKS Provinsi", 
    date: "2025", 
    image: "https://media.licdn.com/dms/image/v2/D562DAQHyyMURi4iDrg/profile-treasury-image-shrink_1280_1280/B56Z8ljwlEIoAY-/0/1783041559122?e=1784872800&v=beta&t=v7iIfC-b1iKHYHIHyxQ8tsIYEP7gYU6elidal_XNPL8",
    credentialUrl: "https://media.licdn.com/dms/image/v2/D562DAQHyyMURi4iDrg/profile-treasury-image-shrink_1280_1280/B56Z8ljwlEIoAY-/0/1783041559122?e=1784872800&v=beta&t=v7iIfC-b1iKHYHIHyxQ8tsIYEP7gYU6elidal_XNPL8"
  },
  { 
    id: 103, 
    category: 'award', 
    title: "Medali Perunggu Olympic Ahmad Dahlan (Web Design)", 
    issuer: "Olympic Ahmad Dahlan", 
    date: "2024", 
    image: "https://media.licdn.com/dms/image/v2/D4E2DAQHgfcERf1gJHQ/profile-treasury-image-shrink_1280_1280/B4EZic5YIfHIAg-/0/1754978946540?e=1784872800&v=beta&t=hhx3B8XkvdZRRlbvt8d9TWInsuU4YlOg-DzMTeryQ2k",
    credentialUrl: "https://media.licdn.com/dms/image/v2/D4E2DAQHgfcERf1gJHQ/profile-treasury-image-shrink_1280_1280/B4EZic5YIfHIAg-/0/1754978946540?e=1784872800&v=beta&t=hhx3B8XkvdZRRlbvt8d9TWInsuU4YlOg-DzMTeryQ2k" 
  },
  { 
    id: 104, 
    category: 'award', 
    title: "Juara 2 Lks Cloud Computing Tingkat Kota Metro", 
    issuer: "LKS Kota Metro", 
    date: "2024", 
    image: "https://media.licdn.com/dms/image/v2/D562DAQGAcj9Uy4edJg/profile-treasury-image-shrink_1280_1280/B56Z9ujVLNG4AY-/0/1784266183626?e=1784872800&v=beta&t=30-nojW9Jb8y5tt7ovSwgFJHhI4UMrQWFUE6CR7JxRU",
    credentialUrl: "https://media.licdn.com/dms/image/v2/D562DAQGAcj9Uy4edJg/profile-treasury-image-shrink_1280_1280/B56Z9ujVLNG4AY-/0/1784266183626?e=1784872800&v=beta&t=30-nojW9Jb8y5tt7ovSwgFJHhI4UMrQWFUE6CR7JxRU" 
  },
];

export default function CertificationsPage() {
  const [activeTab, setActiveTab] = useState<'cert' | 'award'>('cert');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  const filteredItems = itemsData.filter(item => item.category === activeTab);
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-[#0d1117] text-[#c9d1d9] py-10 sm:py-16 selection:bg-[#58a6ff]/30 selection:text-white">
      <div className="max-w-5xl mx-auto sm:px-6 space-y-8 sm:space-y-12">
        
        {/* Header & Tabs */}
        <div className="space-y-6 sm:space-y-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f0f6fc] tracking-tight">Achievements</h1>
          
          <div className="flex gap-2 sm:gap-4 border-b border-[#30363d]/40 pb-px">
            <button 
              onClick={() => { setActiveTab('cert'); setCurrentPage(1); }}
              className={`pb-3 px-2 sm:px-3 text-sm sm:text-base font-semibold transition-colors relative ${
                activeTab === 'cert' 
                  ? 'text-[#58a6ff]' 
                  : 'text-[#8b949e] hover:text-[#f0f6fc]'
              }`}
            >
              Certifications
              {activeTab === 'cert' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#58a6ff]" />
              )}
            </button>
            <button 
              onClick={() => { setActiveTab('award'); setCurrentPage(1); }}
              className={`pb-3 px-2 sm:px-3 text-sm sm:text-base font-semibold transition-colors relative ${
                activeTab === 'award' 
                  ? 'text-[#58a6ff]' 
                  : 'text-[#8b949e] hover:text-[#f0f6fc]'
              }`}
            >
              Awards
              {activeTab === 'award' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#58a6ff]" />
              )}
            </button>
          </div>
        </div>

        {/* Grid Responsif (1 kolom di HP sangat kecil, 2 di mobile sedang, 3 di tablet, 4 di desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentItems.map((item) => {
            const CardContent = (
              <div className="bg-[#1b222c] border border-[#30363d]/60 hover:border-[#444c56] rounded-xl p-5 sm:p-6 flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg h-full justify-between">
                
                {/* Badge Image - Responsif (Lebih kecil di mobile agar tidak memakan ruang vertikal berlebih) */}
                <div className="w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center bg-[#0d1117]/50 rounded-lg p-2 shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="max-w-full max-h-full object-contain" 
                    loading="lazy"
                  />
                </div>

                {/* Info Text */}
                <div className="mt-4 sm:mt-5 flex-1 flex flex-col justify-between w-full">
                  <div>
                    {/* line-clamp-3 membatasi teks panjang agar card tetap rapi */}
                    <h2 className="text-xs sm:text-[13px] font-semibold text-[#f0f6fc] line-clamp-3 leading-snug break-words">
                      {item.title}
                    </h2>
                  </div>
                  <p className="text-[11px] text-[#8b949e] mt-2 shrink-0">
                    {item.issuer} • {item.date}
                  </p>
                </div>

              </div>
            );

            return item.credentialUrl ? (
              <a 
                key={item.id} 
                href={item.credentialUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block h-full group"
              >
                {CardContent}
              </a>
            ) : (
              <div key={item.id} className="h-full">
                {CardContent}
              </div>
            );
          })}
        </div>

        {/* Pagination Minimalis & Touch-Friendly di Mobile */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 sm:gap-4 pt-6 sm:pt-8">
            <button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1} 
              className="w-9 h-9 flex items-center justify-center text-[#8b949e] hover:text-[#58a6ff] disabled:opacity-30 disabled:hover:text-[#8b949e] transition-colors text-sm font-medium"
              aria-label="Previous Page"
            >
              &lt;
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button 
                  key={pageNumber} 
                  onClick={() => paginate(pageNumber)} 
                  className={`w-9 h-9 rounded-md text-xs font-semibold transition-colors ${
                    currentPage === pageNumber 
                      ? "bg-[#58a6ff] text-white" 
                      : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === totalPages} 
              className="w-9 h-9 flex items-center justify-center text-[#8b949e] hover:text-[#58a6ff] disabled:opacity-30 disabled:hover:text-[#8b949e] transition-colors text-sm font-medium"
              aria-label="Next Page"
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
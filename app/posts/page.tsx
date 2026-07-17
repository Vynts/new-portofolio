"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
}

export default function PostsPage() {
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // Mengambil daftar posts melalui API Route internal Next.js
  useEffect(() => {
    fetch('/api/posts')
      .then((res) => {
        if (!res.ok) throw new Error('Gagal memuat artikel');
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Kalkulasi data untuk pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll halus ke atas saat ganti halaman
  };

  return (
    <div className="w-full min-h-screen bg-[#0d1117] text-[#c9d1d9] py-6 sm:py-12 selection:bg-[#58a6ff]/30 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-6 px-4">
        
        {/* Header Section */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold text-[#f0f6fc] tracking-tight">Posts</h1>
              <p className="text-xs sm:text-sm text-[#58a6ff]">Berbagi catatan, dokumentasi, dan pembelajaran teknologi</p>
            </div>
            
            {/* Badge Total Posts */}
            <div className="bg-[#21262d] border border-[#30363d] px-4 py-2 rounded-lg text-center h-fit w-full sm:w-auto shrink-0">
              <span className="text-[10px] sm:text-xs text-[#8b949e] block uppercase tracking-wider">Total Posts</span>
              <span className="text-base sm:text-lg font-bold text-[#f0f6fc]">{posts.length}</span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#58a6ff]"></div>
          </div>
        )}

        {/* Posts Grid Layout */}
        {!loading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentItems.length > 0 ? (
                currentItems.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="group flex flex-col justify-between bg-[#161b22] border border-[#30363d] hover:border-[#444c56] rounded-xl p-5 sm:p-6 transition-colors h-full"
                  >
                    <div className="space-y-2.5">
                      {/* Tanggal Post */}
                      <span className="text-[11px] sm:text-xs text-[#8b949e] block">
                        {post.date ? new Date(post.date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        }) : ''}
                      </span>

                      {/* Judul */}
                      <h2 className="text-sm sm:text-base font-bold text-[#f0f6fc] group-hover:text-[#58a6ff] transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h2> 

                      {/* Deskripsi Singkat */}
                      <p className="text-xs sm:text-sm text-[#8b949e] line-clamp-2 min-h-[36px] sm:min-h-[40px] leading-relaxed text-justify">
                        {post.description}
                      </p>
                    </div>

                    {/* Tags Badge */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-[#30363d]/40">
                        {post.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="font-semibold text-white bg-[#21262d] border border-[#30363d] px-2 py-0.5 rounded text-[10px] sm:text-[11px] tracking-wide"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))
              ) : (
                <div className="col-span-1 sm:col-span-2 bg-[#161b22] border border-[#30363d] rounded-xl p-12 text-center text-[#8b949e] text-sm leading-relaxed">
                  Belum ada tulisan yang dipublikasikan. Buat file `.md` baru di folder <code className="bg-[#21262d] px-1.5 py-0.5 rounded text-[#58a6ff]">content/posts/</code>!
                </div>
              )}
            </div>

            {/* Pagination Controls - Mobile-friendly horizontal scroll */}
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-8 pt-6 border-t border-[#30363d]/50">
                {/* Tombol Previous */}
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg bg-[#21262d] border border-[#30363d] text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#30363d] disabled:opacity-30 disabled:hover:bg-[#21262d] disabled:hover:text-[#8b949e] transition-colors text-xs sm:text-sm font-medium"
                >
                  Prev
                </button>

                {/* Angka Halaman dengan pembatas scroll horizontal jika terlalu banyak */}
                <div className="flex items-center gap-1 overflow-x-auto max-w-[180px] xs:max-w-none scrollbar-none">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-lg border text-xs sm:text-sm font-semibold transition-colors ${
                        currentPage === pageNumber
                          ? "bg-[#58a6ff]/10 border-[#58a6ff] text-[#58a6ff]"
                          : "bg-[#21262d] border-[#30363d] text-[#8b949e] hover:text-white hover:bg-[#30363d]"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>

                {/* Tombol Next */}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg bg-[#21262d] border border-[#30363d] text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#30363d] disabled:opacity-30 disabled:hover:bg-[#21262d] disabled:hover:text-[#8b949e] transition-colors text-xs sm:text-sm font-medium"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
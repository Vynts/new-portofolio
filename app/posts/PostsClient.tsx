"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { PostData } from "@/lib/posts";

export default function PostsClient({ initialPosts }: { initialPosts: PostData[] }) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = initialPosts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(initialPosts.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-[#0d1117] text-[#c9d1d9] py-6 sm:py-12 px-4 selection:bg-[#58a6ff]/30 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold text-[#f0f6fc] tracking-tight">Postingan</h1>
              <p className="text-sm text-[#58a6ff]">Berbagi catatan, dokumentasi, dan pembelajaran teknologi</p>
            </div>
            
            <div className="bg-[#21262d] border border-[#30363d] px-4 py-2 rounded-lg text-center h-fit w-full sm:w-auto shrink-0">
              <span className="text-xs text-[#8b949e] block uppercase tracking-wider notranslate">Total Posts</span>
              <span className="text-lg font-bold text-[#f0f6fc]">{initialPosts.length}</span>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentItems.length > 0 ? (
            currentItems.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="group flex flex-col justify-between bg-[#161b22] border border-[#30363d] hover:border-[#444c56] rounded-xl p-5 sm:p-6 transition-all h-full"
              >
                <div className="space-y-2.5">
                  <span className="text-xs text-[#8b949e] block">
                    {post.date ? new Date(post.date).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    }) : ''}
                  </span>

                  <h2 className="text-base font-bold text-[#f0f6fc] group-hover:text-[#58a6ff] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h2> 

                  <p className="text-sm text-[#8b949e] line-clamp-2 min-h-[40px] leading-relaxed text-justify">
                    {post.description}
                  </p>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-[#30363d]/40">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="font-semibold text-white bg-[#21262d] border border-[#30363d] px-2.5 py-0.5 rounded text-xs tracking-wide"
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
              Belum ada tulisan yang dipublikasikan.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 pt-6 border-t border-[#30363d]/50">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-[#21262d] border border-[#30363d] text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#30363d] disabled:opacity-30 transition-colors text-sm font-medium"
            >
              Prev
            </button>

            <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-none scrollbar-none">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`w-9 h-9 shrink-0 rounded-lg border text-sm font-semibold transition-colors ${
                    currentPage === pageNumber
                      ? "bg-[#58a6ff]/10 border-[#58a6ff] text-[#58a6ff]"
                      : "bg-[#21262d] border-[#30363d] text-[#8b949e] hover:text-white hover:bg-[#30363d]"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-[#21262d] border border-[#30363d] text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#30363d] disabled:opacity-30 transition-colors text-sm font-medium"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
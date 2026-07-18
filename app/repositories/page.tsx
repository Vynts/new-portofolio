"use client";

import React, { useEffect, useState } from 'react';

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  language: string | null;
  updated_at: string;
}

export default function RepositoriesPage() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetch('https://api.github.com/users/vynts/repos?sort=updated&per_page=100')
      .then((res) => {
        // Cek jika terkena API rate limit pembatasan request dari GitHub
        if (res.status === 403) {
          throw new Error('Terkena Rate Limit GitHub API. Silakan coba lagi beberapa saat lagi.');
        }
        if (!res.ok) {
          throw new Error(`Gagal mengambil data dari GitHub API (Status: ${res.status})`);
        }
        
        // Pastikan response berupa JSON yang valid sebelum diparse
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response dari server bukan format JSON yang valid.");
        }

        return res.json();
      })
      .then((data: Repository[]) => {
        if (!Array.isArray(data)) {
          throw new Error("Data yang diterima bukan array repositori.");
        }
        const originalRepos = data.filter((repo) => !repo.fork);
        setRepos(originalRepos);
        setFilteredRepos(originalRepos);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = repos.filter((repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredRepos(filtered);
    setCurrentPage(1);
  }, [searchQuery, repos]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRepos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getLanguageBgColor = (lang: string) => {
    switch (lang) {
      case 'Python': return 'bg-[#3572A5]';
      case 'TypeScript': return 'bg-[#3178c6]';
      case 'JavaScript': return 'bg-[#f1e05a] text-black';
      case 'HTML': return 'bg-[#e34c26]';
      case 'CSS': return 'bg-[#563d7c]';
      case 'PHP': return 'bg-[#4F5D95]';
      case 'Go': return 'bg-[#00ADD8]';
      case 'Rust': return 'bg-[#deadf5] text-black';
      default: return 'bg-[#30363d]';
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0d1117] text-[#c9d1d9] py-6 sm:py-12 px-4 selection:bg-[#58a6ff]/30 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header & Stats */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold text-[#f0f6fc] tracking-tight">Repositories</h1>
              <p className="text-sm text-[#58a6ff]">Daftar proyek open-source asli di GitHub @vynts</p>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex-1 sm:flex-initial bg-[#21262d] border border-[#30363d] px-4 py-2 rounded-lg text-center">
                <span className="text-xs text-[#8b949e] block uppercase tracking-wider">Total Repos</span>
                <span className="text-lg font-bold text-[#f0f6fc]">{repos.length}</span>
              </div>
              <a href="https://github.com/vynts" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 bg-[#21262d] hover:bg-[#30363d] text-[#58a6ff] rounded-lg transition-colors border border-[#30363d] text-sm font-medium">
                Profile
              </a>
            </div>
          </div>

          <div className="mt-5">
            <input 
              type="text"
              placeholder="Cari repositori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] text-[#f0f6fc] rounded-lg pl-4 py-3 text-sm outline-none transition-all"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#58a6ff]"></div></div>}
        
        {/* Error State yang Rapi */}
        {error && <div className="bg-[#ff7b72]/10 border border-[#ff7b72]/40 text-[#ff7b72] rounded-xl p-6 text-center text-sm leading-relaxed">Error: {error}</div>}

        {/* Main Content */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentItems.length > 0 ? (
                currentItems.map((repo) => (
                  <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="group flex flex-col justify-between bg-[#161b22] border border-[#30363d] hover:border-[#444c56] rounded-xl p-5 sm:p-6 transition-colors h-full">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#21262d] rounded-lg text-[#8b949e] group-hover:text-[#58a6ff] shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/></svg>
                      </div>
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <h3 className="text-base font-bold text-[#f0f6fc] group-hover:text-[#58a6ff] truncate">{repo.name}</h3>
                        <p className="text-sm text-[#8b949e] line-clamp-2 leading-relaxed text-justify min-h-[40px]">{repo.description || "Tidak ada deskripsi."}</p>
                      </div>
                    </div>

                    <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 text-xs text-[#8b949e] pt-4 mt-4 border-t border-[#30363d]/40">
                      <div className="flex items-center gap-3">
                        {repo.language && <span className={`font-semibold text-white px-2.5 py-0.5 rounded text-xs ${getLanguageBgColor(repo.language)}`}>{repo.language}</span>}
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>
                          <span>{repo.stargazers_count}</span>
                        </div>
                      </div>
                      <span className="text-xs">Update: {new Date(repo.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </a>
                ))
              ) : (
                <div className="col-span-1 sm:col-span-2 bg-[#161b22] border border-[#30363d] rounded-xl p-8 text-center text-sm text-[#8b949e]">Tidak ada repositori yang ditemukan.</div>
              )}
            </div>

            {/* Pagination Responsive */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8 border-t border-[#30363d]/50">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#21262d] border border-[#30363d] text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#30363d] disabled:opacity-30 transition-colors text-sm font-medium"
                >
                  &lt;
                </button>
                <div className="flex items-center gap-1 overflow-x-auto max-w-[180px] sm:max-w-none scrollbar-none">
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
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#21262d] border border-[#30363d] text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#30363d] disabled:opacity-30 transition-colors text-sm font-medium"
                >
                  &gt;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function Home() {
  // Mengambil data langsung dari server, bukan dari API
  const allPosts = getSortedPostsData();
  const latestPosts = allPosts.slice(0, 2);

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9] px-4 sm:px-6 py-12 sm:py-16 selection:bg-[#58a6ff]/30 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-16 sm:space-y-24">
        
        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row gap-8 md:gap-12 items-center justify-between">
          <div className="space-y-6 flex-1 text-center md:text-left">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                Alvinza Erza Farandhika
              </h1>
              <p className="text-base sm:text-lg text-[#58a6ff] font-medium tracking-wide">
                Junior Backend Developer | Cloud Enthusiast
              </p>
            </div>
            
            <p className="leading-relaxed text-[#8b949e] text-sm sm:text-base max-w-2xl mx-auto md:mx-0">
              Halo, saya Alvinza — seorang Backend Developer yang antusias dalam membangun aplikasi web yang kokoh dan efesien.
              <br/><br/>
              Berfokus pada Python, saya mendalami pengembangan web serta perancangan arsitektur database relasional. Saya juga memiliki ketertarikan kuat di bidang infrastruktur cloud dan senang mempelajari bagaimana sistem backend terintegrasi dengan lingkungan penyebaran modern.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-5 items-center justify-center md:justify-start pt-2 text-[#8b949e]">
              <a href="mailto:alvinzaerzaf@gmail.com" className="hover:text-[#58a6ff] transition-colors w-6 h-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383z"/></svg>
              </a>
              <a href="/cv" className="hover:text-[#58a6ff] transition-colors w-6 h-6 flex items-center justify-center font-semibold">CV</a>
              <a href="https://www.youtube.com/@erzaproject" target="_blank" rel="noopener noreferrer" className="hover:text-[#58a6ff] transition-colors w-6 h-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.104 1.981l-.014.134-.027.214-.008.082a15 15 0 0 1-.22 1.403 2.002 2.002 0 0 1-1.415 1.417c-1.115.3-5.287.3-6.11.301h-.086c-.822-.001-4.987-.03-6.11-.301a2.002 2.002 0 0 1-1.415-1.417 15 15 0 0 1-.219-1.403l-.014-.134-.027-.214-.008-.082c-.066-.918-.074-1.774-.075-1.957v-.075c.001-.194.01-1.108.104-1.981l.014-.134.027-.214.008-.082a15 15 0 0 1 .22-1.403A2 2 0 0 1 1.95 2.334c1.115-.3 5.287-.3 6.11-.301zM6.157 11.07l4.887-2.887-4.887-3.075z"/></svg>
              </a>
              <a href="https://github.com/Vynts" target="_blank" rel="noopener noreferrer" className="hover:text-[#58a6ff] transition-colors w-6 h-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/alvinza-erza-farandhika-7a023637a/" target="_blank" rel="noopener noreferrer" className="hover:text-[#58a6ff] transition-colors w-6 h-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/></svg>
              </a>
            </div>
          </div>

          <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-[#161b22] rounded-2xl border border-[#30363d] p-3 flex items-center justify-center shrink-0 shadow-xl">
            <img src="/images/photo.jpg" alt="Profile Picture" className="w-full h-full object-cover rounded-xl" loading="eager"/>
          </div>
        </section>

        {/* Latest Posts Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-center border-[#30363d] pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Latest Posts</h2>
            <Link href="/posts" className="text-xs sm:text-sm text-[#58a6ff] hover:underline">Lihat semua &rarr;</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {latestPosts.length > 0 ? (
              latestPosts.map((post: any) => (
                <Link key={post.slug} href={`/posts/${post.slug}`} className="group p-5 sm:p-6 bg-[#161b22] rounded-xl border border-[#30363d] hover:border-[#58a6ff]/60 transition-all">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <span className="text-xs text-[#8b949e]">{post.date}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#58a6ff] transition-colors mb-2">{post.title}</h3>
                  <p className="text-xs sm:text-sm text-[#8b949e] line-clamp-2">{post.description}</p>
                </Link>
              ))
            ) : (
              <p className="text-[#8b949e]">Belum ada tulisan terbaru.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PostProps {
  params: Promise<{
    slug: string;
  }>;
}

// Konfigurasi parser marked agar mempertahankan enter/pindah baris
marked.setOptions({
  gfm: true,        // Mengaktifkan GitHub Flavored Markdown
  breaks: true,     // BACA INI: Mengubah single enter menjadi <br> agar spasi baris tetap terjaga!
});

function getPostContent(slug: string) {
  const folder = path.join(process.cwd(), 'content/posts');
  const file = path.join(folder, `${slug}.md`);

  if (!fs.existsSync(file)) {
    return null;
  }

  // 1. Baca file markdown
  const fileContent = fs.readFileSync(file, 'utf8');
  
  // 2. Ekstrak Frontmatter (Metadata) dan Konten asli tanpa merusak whitespace asli file markdown
  const matterResult = matter(fileContent);
  
  // 3. Render Markdown ke HTML
  const htmlContent = marked.parse(matterResult.content);

  return {
    meta: matterResult.data,
    html: htmlContent,
  };
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostContent(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.meta.title} | Alvinza Erza`,
    description: post.meta.description || 'Artikel seputar backend development dan teknologi.',
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: 'article',
      publishedTime: post.meta.date,
      authors: ['Alvinza Erza Farandhika'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.description,
    },
  };
}

export default async function PostDetailPage({ params }: PostProps) {
  const resolvedParams = await params;
  const post = getPostContent(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen bg-[#0d1117] text-[#c9d1d9] py-6 sm:py-12 px-4 sm:px-6 selection:bg-[#58a6ff]/30 selection:text-white">
      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Tombol Kembali */}
        <Link 
          href="/posts" 
          className="inline-flex items-center gap-2 py-1 text-xs sm:text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
          Kembali ke Posts
        </Link>

        {/* Wrapper Utama */}
        <article className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-10 space-y-6 sm:space-y-8 overflow-hidden">
          
          {/* Header Artikel */}
          <div className="border-b border-[#30363d] pb-5 sm:pb-6 space-y-2 sm:space-y-3">
            <span className="text-[10px] sm:text-xs text-[#8b949e] block font-medium">
              {post.meta.date ? new Date(post.meta.date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }) : ''}
            </span>
            <h1 className="text-xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
              {post.meta.title}
            </h1>
            <p className="text-xs sm:text-base text-[#8b949e] italic leading-relaxed">
              {post.meta.description}
            </p>
          </div>

          {/* Render HTML Markdown */}
          <div 
            className="prose prose-invert max-w-none text-[#c9d1d9] break-words
              prose-headings:text-[#f0f6fc] prose-headings:font-bold
              
              /* BACA INI: Memaksa margin vertikal (spasi antar paragraf, list, dan heading) */
              [&_p]:my-6 [&_p]:leading-relaxed [&_p]:text-xs sm:[&_p]:text-base [&_p]:text-[#c9d1d9]/90
              [&_h2]:text-lg sm:[&_h2]:text-2xl [&_h2]:mt-12 [&_h2]:mb-6
              [&_h3]:text-base sm:[&_h3]:text-lg [&_h3]:mt-8 [&_h3]:mb-4
              
              prose-a:text-[#58a6ff] prose-a:no-underline hover:prose-a:underline
              prose-code:text-[#f0f6fc] prose-code:bg-[#21262d] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[11px] sm:prose-code:text-xs prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-[#30363d] prose-pre:p-3 sm:prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:text-xs
              prose-ol:list-decimal prose-ol:pl-5 sm:prose-ol:pl-6 prose-ol:my-4 prose-ol:space-y-1.5 sm:prose-ol:space-y-2 prose-ol:text-xs sm:prose-ol:text-base
              prose-ul:list-disc prose-ul:pl-5 sm:prose-ul:pl-6 prose-ul:my-4 prose-ul:space-y-1.5 sm:prose-ul:space-y-2 prose-ul:text-xs sm:prose-ul:text-base
              prose-blockquote:border-l-4 prose-blockquote:border-[#30363d] prose-blockquote:pl-4 prose-blockquote:my-4 sm:prose-blockquote:my-6 prose-blockquote:text-[#8b949e] prose-blockquote:italic
              prose-table:w-full prose-table:my-6 sm:prose-table:my-8 prose-table:overflow-x-auto prose-table:block prose-th:text-[#f0f6fc] prose-th:text-xs sm:prose-th:text-sm prose-td:text-[#8b949e] prose-td:p-2 sm:prose-td:p-3 prose-td:text-xs sm:prose-td:text-sm prose-tr:border-b prose-tr:border-[#30363d]/40"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>

      </div>
    </div>
  );
}
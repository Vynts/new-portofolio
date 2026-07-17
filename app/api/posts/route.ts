import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  try {
    const folder = path.join(process.cwd(), 'content/posts');
    
    if (!fs.existsSync(folder)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(folder);
    const markdownPosts = files.filter((file) => file.endsWith('.md'));

    const posts = markdownPosts.map((fileName) => {
      const fileContents = fs.readFileSync(path.join(folder, fileName), 'utf8');
      const matterResult = matter(fileContents);
      
      return {
        slug: fileName.replace('.md', ''),
        title: matterResult.data.title || 'Untitled',
        date: matterResult.data.date || '',
        description: matterResult.data.description || '',
        tags: matterResult.data.tags || [],
      };
    });

    // Urutkan berdasarkan tanggal terbaru
    const sortedPosts = posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return NextResponse.json(sortedPosts);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil posts' }, { status: 500 });
  }
}
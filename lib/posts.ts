// lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Definisikan bentuk data post
export interface PostData {
  slug: string;
  title: string;
  date: string;
  description?: string; // Tanda tanya artinya opsional
  tags?: string[];
}

export function getSortedPostsData(): PostData[] { // <--- Tambahkan : PostData[]
  const folder = path.join(process.cwd(), 'content/posts');
  
  if (!fs.existsSync(folder)) return [];

  const files = fs.readdirSync(folder);
  
  const allPostsData = files
    .filter((file) => file.endsWith('.md'))
    .map((fileName) => {
      const fileContents = fs.readFileSync(path.join(folder, fileName), 'utf8');
      const matterResult = matter(fileContents);
      
      return {
        slug: fileName.replace('.md', ''),
        title: matterResult.data.title || 'Untitled',
        date: matterResult.data.date || '', // Pastikan key ini ada di frontmatter md
        description: matterResult.data.description || '',
        tags: matterResult.data.tags || [],
      };
    });

  return allPostsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
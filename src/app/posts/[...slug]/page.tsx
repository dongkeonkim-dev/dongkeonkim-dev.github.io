import path from 'path';
import { getMdxContent } from '@/utils/mdx';
import PostContent from './post-contents';
import fs from 'fs'
import styles from './page.module.css'

interface PageProps {
  params: { slug: string[] };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const { html, headers } = await getMdxContent(slug);

  return <PostContent html={html} headers={headers} />;
}

export async function generateStaticParams() {
  const postPath = path.join(process.cwd(), 'posts');
  const slugs = getAllFileSlugs(postPath);
  return slugs.map((slug) => ({ slug }));
}

export function getAllFileSlugs(dirPath: string, dirs: string[] = [], slugs: string[][] = []): string[][] {
    const files = fs.readdirSync(path.join(dirPath, ...dirs));

    files.forEach((file) => {
        const currentDirs = [...dirs, file];
        const filePath = path.join(dirPath, ...currentDirs);
        
        if (fs.statSync(filePath).isDirectory()) {
            slugs = getAllFileSlugs(dirPath, currentDirs, slugs);
        } else {
            slugs.push(currentDirs);
        }
    });

    return slugs;
}
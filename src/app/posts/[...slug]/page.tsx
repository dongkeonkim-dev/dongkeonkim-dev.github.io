import fs from 'fs'
import path from 'path'
import SideBarRight from '@/components/Main/SideBarRight/SideBarRight';
import { getMdxContent } from '@/utils/mdx';
import styles from './page.module.css'
import Comments from '@/components/Main/Comments/Comments';

export default async function Post({ params }: { params: { slug: string[] } }) {
    const { slug } = params;
  const { html, headers } = await getMdxContent(slug);
  console.log(headers)

  return (
    <div className={styles.main}>
        <div className={styles.container}>
            <div className={styles.page} dangerouslySetInnerHTML={{ __html: html }} />
            <Comments />
        </div>
        <SideBarRight headers={headers} />
    </div>
    
  );
}

export async function generateStaticParams() {
    const postPath = path.join(process.cwd(), 'posts')
    const slugs = getAllFileSlugs(postPath)
    return slugs.map((slug) => ({slug : slug}))
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
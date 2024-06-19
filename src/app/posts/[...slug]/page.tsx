import fs from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function Post({ params }: { params: { slug: string[] } }) {
    const { slug } = params;
    const mdxSource = await getSource('.mdx', 'posts', slug);

    return (
        <div>
            <h1>Title</h1>
            <MDXRemote source={mdxSource} />
        </div>
    );
}

export async function getSource(fileType:string, directory:string, slugArray: string[]) {
    const filePath = path.join(directory, ...slugArray) + fileType
    let source = fs.readFileSync(filePath, 'utf8');
    return source
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
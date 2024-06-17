import fs from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function Post({ params }: { params: { slug: string[] } }) {
    const { slug } = params;
    const mdxSource = await getMdxContent(slug);

    if (!mdxSource) {
        return <div>Post not found</div>;
    }

    return (
        <div>
            <h1>Title</h1>
            <MDXRemote source={mdxSource} />
        </div>
    );
}

async function getMdxContent(slugArray: string[]) {
    const filePath = `${path.join('posts', ...slugArray)}.mdx`;
    let fileContent = fs.readFileSync(filePath, 'utf8');
    return fileContent
}

export async function generateStaticParams() {
    const postPath = path.join(process.cwd(), 'posts')
    const slugs = getAllSlugs(postPath)
    return slugs.map((slug) => ({slug : slug}))
}

function getAllSlugs(dirPath: string, arrayOfDirs: string[] = [], arrayOfSlugs: string[][] = []): string[][] {
    const files = fs.readdirSync(path.join(dirPath, ...arrayOfDirs));

    files.forEach((file) => {
        const currentDirs = [...arrayOfDirs, file];
        const filePath = path.join(dirPath, ...currentDirs);
        
        if (fs.statSync(filePath).isDirectory()) {
            arrayOfSlugs = getAllSlugs(dirPath, currentDirs, arrayOfSlugs);
        } else {
            arrayOfSlugs.push(currentDirs);
        }
    });

    return arrayOfSlugs;
}
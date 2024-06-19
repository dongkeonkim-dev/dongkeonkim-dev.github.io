import fs from 'fs'
import path from 'path';

interface Post {
    name: string;
    slug: string;
  }
  
  interface Node {
    name: string;
    slug: string;
    children: (Node | Post)[];
  }
  
export function getDirectoryTree(dirPath: string, basePath = ''): Node {
    const name = path.basename(dirPath);
    const slug = path.join(basePath, name).replace(/\\/g, '/');
    const children: (Node | Post)[] = [];

    const items = fs.readdirSync(dirPath);

    items.forEach((item) => {
        const itemPath = path.join(dirPath, item);
        const itemBasePath = path.join(basePath, item);

        if (fs.statSync(itemPath).isDirectory()) {
            children.push(getDirectoryTree(itemPath, itemBasePath));
        } else {
            children.push({
                name: item.replace(/\.mdx$/, ''),
                slug: itemBasePath.replace(/\.mdx$/, ''),
            });
        }
    });

    return { name, slug, children };
}
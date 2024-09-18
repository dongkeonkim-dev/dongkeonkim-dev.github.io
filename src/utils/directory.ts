import fs from 'fs';
import path from 'path';

interface Node {
  name: string;
  slug: string;
  children: (Node | Post)[];
  hasPage: boolean;
}

interface Post {
  name: string;
  slug: string;
}

export function getDirectoryTree(dirPath: string): Node {
  function readDirectory(directory: string, basePath: string): Node {
    const name = path.basename(directory);
    const relativePath = path.relative(basePath, directory).replace(/\\/g, '/');
    const slug = directory;
    const children: (Node | Post)[] = [];
    let hasPage = false;

    const files = fs.readdirSync(directory);

    files.forEach(file => {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        children.push(readDirectory(filePath, basePath));
      } else if (stat.isFile() && file === 'page.mdx') {
        hasPage = true;
      }
    });

    return {
      name,
      slug : relativePath ,
      children,
      hasPage
    };
  }

  return readDirectory(path.resolve(dirPath), path.resolve(dirPath));
}

export default getDirectoryTree;
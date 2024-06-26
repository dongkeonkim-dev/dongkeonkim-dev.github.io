import { remark } from 'remark';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter';
import mdxToHtml from './mdx-to-html';
import { unified } from 'unified';

interface Header {
  depth: number;
  value: string;
  id: string;
}
export async function getSource(fileType:string, directory:string, slugArray: string[]) {
  const filePath = path.join(directory, ...slugArray) + fileType
  let source = fs.readFileSync(filePath, 'utf8');
  return source
}

export async function extractHeaders(mdxContent: string): Promise<Header[]> {
  const headers: Header[] = [];
  const processor = unified().use(remarkParse);
  const file = processor.parse(mdxContent);

  let idIndex = 1;

  visit(file, 'heading', (node: any, index: number | undefined) => {
    if (!node || !node.children || index === undefined) return;

    const textNode = node.children.find((child: any) => child.type === 'text');
    if (textNode) {
      const id = `heading-${idIndex}`;
      headers.push({
        depth: node.depth,
        value: textNode.value,
        id,
      });
      idIndex += 1;
    }
  });
  return headers;
}

export async function getMdxContent(slugArray: string[]): Promise<{ html: string; headers: string[]; frontMatter: Record<string, unknown>; }> {
  const filePath = path.join(process.cwd(), 'posts', ...slugArray) + '.mdx';
  const decodedFilePath = decodeURIComponent(filePath);
  const source = fs.readFileSync(decodedFilePath, 'utf8');
  const { content, data } = matter(source);
  const html = await mdxToHtml(content);
  const headers = await extractHeaders(content);

  return {
    html,
    headers: Array.isArray(headers) ? headers : [],
    frontMatter: data,
  };
}


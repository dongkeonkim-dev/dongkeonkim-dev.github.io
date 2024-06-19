import { unified } from 'unified';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { visit } from 'unist-util-visit';

export default async function mdxToHtml(mdxContent: string) {
    const res = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeCustomSlug) 
    .use(rehypeStringify)
    .process(mdxContent);

  return res.toString();
}

function rehypeCustomSlug() {
    return (tree: any) => {
      let counter = 1;
      visit(tree, 'element', (node) => {
        if (node.tagName === 'h1' || node.tagName === 'h2' || node.tagName === 'h3' || node.tagName === 'h4' || node.tagName === 'h5' || node.tagName === 'h6') {
          node.properties.id = `heading-${counter}`;
          counter += 1;
        }
      });
    };
  }
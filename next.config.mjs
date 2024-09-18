//next.config.mjs
import nextMdx from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
const remarkSlug = await import('remark-slug');

const withMdx = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkSlug.default],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    providerImportSource: false, 
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = withMdx({
  reactStrictMode: true, 
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  output: 'export',
  basePath: '', // 
  assetPrefix: '/docs/',
  trailingSlash: true,  // 경로에 슬래시 추가 (GitHub Pages 호환성)
  distDir: 'docs', // 빌드 결과물이 저장될 디렉토리
  images: {
    unoptimized: true,  // 이미지 최적화 비활성화 (GitHub Pages에서 필요)
  },
})

export default nextConfig
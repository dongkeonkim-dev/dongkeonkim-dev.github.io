import nextMdx from '@next/mdx'
const remarkSlug = await import('remark-slug');

const withMdx = nextMdx({
  // By default only the `.mdx` extension is supported.
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkSlug.default],
  }
})
/** @type {import('next').NextConfig} */
const nextConfig = withMdx({
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
  async headers() {
    return [
      {
        source: '/giscus.css',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ]
  },
})

export default nextConfig
import nextMdx from '@next/mdx'

const withMdx = nextMdx({
  // By default only the `.mdx` extension is supported.
  extension: /\.mdx?$/,
  options: {/* otherOptions… */}
})
/** @type {import('next').NextConfig} */
const nextConfig = withMdx({
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
})

export default nextConfig
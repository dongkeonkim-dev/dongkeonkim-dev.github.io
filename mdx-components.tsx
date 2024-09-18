import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 여기에 커스텀 컴포넼트를 추가할 수 있습니다.
    ...components,
  }
}
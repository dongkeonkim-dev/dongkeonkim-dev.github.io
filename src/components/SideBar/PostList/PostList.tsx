'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './PostList.module.css';
import Image from 'next/image';

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

function PostList({postTree}:{postTree:Node}) {
  const [fullUrl, setFullUrl] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFullUrl(window.location.href);
    }
  }, [pathname]);

  return (
    <ul className={styles.postList}>
      {postTree.children.map((child) => renderTree(child,fullUrl))}
    </ul>
  );
}

export default PostList;


function renderTree(node: Node | Post, fullUrl: string) {
  const isNode = (node: any): node is Node => 'children' in node;
  const nodeSlug = node.slug.replace(/\\/g, '/');
  const nodeHref = isNode(node) && node.hasPage ? `/${node.name}` : '';
  const formattedFullUrl = decodeURIComponent(fullUrl).replace(/\\/g, '/');
  const isActive = formattedFullUrl.endsWith(nodeHref);
  const [isOpen, setIsOpen] = useState(false);

  if (isNode(node) && !node.hasPage) {
    const nodeId = node.slug.replace(/\s+/g, '-').toLowerCase();
    const toggleOpen = () => setIsOpen(!isOpen);

    return (
      <li className={styles.category} key={nodeId}>
        <input type="checkbox" id={nodeId} checked={isOpen} onChange={toggleOpen} />
        <label className={styles.label} htmlFor={nodeId}>
          <span className={styles.labelText}>{node.name}</span>
          <span className={`${styles.arrow}`}>
            <Image src="/chevron-right.svg" width={16} height={16} alt="chevron" className={styles.chevron} />
          </span>
        </label>
        <ul className={`${styles.list} ${isOpen ? styles.open : ''}`}>
          {node.hasPage && (
            <li>
              <Link className={styles.link} href={nodeHref}>
                <label className={`${styles.label} ${isActive ? styles.activeLabel : ''}`}>
                  <span className={styles.labelText}>Open page.mdx</span>
                </label>
              </Link>
            </li>
          )}
          {node.children.map((child) => renderTree(child, fullUrl))}
        </ul>
      </li>
    );
  } else {
    return (
      <li>
        <Link className={styles.link} href={`/pages/${nodeSlug}`}>
          <label className={`${styles.label} ${isActive ? styles.activeLabel : ''}`}>
            <span className={styles.labelText}>{node.name}</span>
          </label>
        </Link>
      </li>
    );
  }
}

// function renderTree(node: Node | Post, fullUrl:string) {
//   const nodeSlug = node.slug.replace(/\\/g, '/');
//   const nodeHref = `/posts/${nodeSlug}`;
//   const formattedFullUrl = decodeURIComponent(fullUrl).replace(/\\/g, '/');
//   const isActive = formattedFullUrl.endsWith(nodeHref);
  
//   if ('children' in node) {
//     const nodeId = node.slug.replace(/\s+/g, '-').toLowerCase();
//     return (
//       <li className={styles.category} key={nodeId}>
//         <input type="checkbox" id={nodeId} onChange={handleCheckboxChange}/>
//         <label className={styles.label} htmlFor={nodeId} >
//           <span className={styles.labelText}>{node.name}</span>
//           <span className={`${styles.arrow}`}>
//             <Image src="/chevron-right.svg" 
//               width = {16}
//               height = {16}
//               alt="chevron" 
//               className={styles.chevron} 
//             /> 
//           </span>
//         </label>
//         <ul className={styles.list}>
//           {node.children.map((child) => renderTree(child,fullUrl))}
//         </ul>
//       </li>
//     );
//   } else {
//     return (
//       <li>
//         <Link className={styles.link} href={nodeHref}>
//           <label className={`${styles.label } ${isActive ? styles.activeLabel : ''}`}>
//             <span className={styles.labelText}>{node.name}</span>
//           </label>
//         </Link>
//       </li>
//     );
//   }
// }

function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
  const checkbox = event.target;
  const list = checkbox.parentElement?.querySelector(`.${styles.list}`) as HTMLElement;
  list.style.height = list.scrollHeight + 'px';
  if (checkbox.checked) {
    setTimeout(() => {
      list.style.height = 'auto';
    }, 400);
  } else {
    setTimeout(() => {
      list.style.height = '0';
    }, 10);
  }
}
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

interface TreeNodeProps {
  node: Node | Post;
  fullUrl: string;
}

function PostList({postTree}:{postTree:Node}) {
  const [fullUrl, setFullUrl] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFullUrl(window.location.href.replace(/\/$/, ''));
    }
  }, [pathname]);

  return (
    <ul className={styles.postList}>
      {postTree.children.map((child) => (
        <TreeNode key={child.slug} node={child} fullUrl={fullUrl} />
      ))}
      {/* {postTree.children.map((child) => renderTree(child,fullUrl))} */}
    </ul>
  );
}

export default PostList;


const TreeNode: React.FC<TreeNodeProps> = ({ node, fullUrl }) => {
  const isNode = (node: Node | Post): node is Node => 'children' in node;
  const nodeSlug = node.slug.replace(/\\/g, '/');
  const nodeHref = isNode(node) && node.hasPage ? `/${node.name}` : '';
  const formattedFullUrl = decodeURIComponent(fullUrl).replace(/\\/g, '/').replace(/\/$/, '');
  const isActive = formattedFullUrl.endsWith(nodeHref);
  
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // mounted 상태 설정
  useEffect(() => {
    setMounted(true);
  }, []);

  // mounted 후 localStorage 값 적용
  useEffect(() => {
    if (mounted) {
      const saved = localStorage.getItem(`folder-${nodeSlug}`);
      if (saved !== null) {
        setIsOpen(saved === 'true');
      }
    }
  }, [mounted, nodeSlug]);

  // mounted 후 자동 펼치기 적용 및 저장
  useEffect(() => {
    if (mounted && formattedFullUrl && nodeSlug) {
      const currentPath = formattedFullUrl.split('/pages/')[1] || '';
      if (currentPath.startsWith(nodeSlug)) {
        setIsOpen(true);
        localStorage.setItem(`folder-${nodeSlug}`, 'true');
      }
    }
  }, [mounted, formattedFullUrl, nodeSlug]);

  const toggleOpen = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem(`folder-${nodeSlug}`, String(newState));
  };

  // 마운트되기 전에는 접힌 상태로 보여줌
  if (!mounted) {
    return (
      <li className={styles.category}>
        <input type="checkbox" checked={false} readOnly />
        <label className={styles.label}>
          <span className={styles.labelText}>{node.name}</span>
          <span className={`${styles.arrow}`}>
            <Image src="/chevron-right.svg" width={16} height={16} alt="chevron" className={styles.chevron} />
          </span>
        </label>
      </li>
    );
  }

  if (isNode(node) && !node.hasPage) {
    const nodeId = node.slug.replace(/\s+/g, '-').toLowerCase();

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
          {/* {node.children.map((child) => renderTree(child, fullUrl))} */}
          {node.children.map((child) => (
            <TreeNode key={child.slug} node={child} fullUrl={fullUrl} />
          ))}
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
};



// function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
//   const checkbox = event.target;
//   const list = checkbox.parentElement?.querySelector(`.${styles.list}`) as HTMLElement;
//   list.style.height = list.scrollHeight + 'px';
//   if (checkbox.checked) {
//     setTimeout(() => {
//       list.style.height = 'auto';
//     }, 400);
//   } else {
//     setTimeout(() => {
//       list.style.height = '0';
//     }, 10);
//   }
// }
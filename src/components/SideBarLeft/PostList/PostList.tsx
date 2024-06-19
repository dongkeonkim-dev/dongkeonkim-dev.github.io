'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './PostList.module.css';

interface Post {
  name: string;
  slug: string;
}

interface Node {
  name: string;
  slug: string;
  children: (Node | Post)[];
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

function renderTree(node: Node | Post, fullUrl:string) {
  const nodeHref = `/posts/${node.slug}`.replace(/\\/g, '/');
  const formattedFullUrl = fullUrl.replace(/\\/g, '/');
  const isActive = formattedFullUrl.endsWith(nodeHref);
  
  if ('children' in node) {
    const nodeId = node.name.replace(/\s+/g, '-').toLowerCase();
    return (
      <li className={styles.category} key={node.name}>
        <input type="checkbox" id={nodeId} onChange={handleCheckboxChange}/>
        <label className={styles.label} htmlFor={nodeId} >
          <span>
            {node.name}
          </span>
          <span className={`${styles.arrow}`}>
            <img src="/chevron-right.svg" alt="chevron" className={styles.chevron} /> 
          </span>
        </label>
        <ul className={styles.list}>
          {node.children.map((child) => renderTree(child,fullUrl))}
        </ul>
      </li>
    );
  } else {
    return (
      <li>
          <Link className={styles.link} href={`/posts/${node.slug}`}>
            <label className={`${styles.label } ${isActive ? styles.activeLabel : ''}`}>
              {node.name}
            </label>
          </Link>
      </li>
    );
  }
}

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
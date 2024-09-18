'use client';

import React, { useEffect, useState } from 'react';
import styles from './Toc.module.css';

interface Header {
  id: string;
  level: number;
  text: string;
}

export default function Toc({ headers = [] } : {headers:Header[]}){
  console.log('headers:',headers);
  
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY +66;
      let activeSectionId: string | null = null;

      headers.forEach((header) => {
        const section = document.getElementById(header.id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            activeSectionId = header.id;
          }
        }
      });

      setActiveId(activeSectionId);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headers]);



  return (
    <div className={styles.sidebarRight}>
      <div className={styles.toc}>
        <h3 className={styles.floatContainer}>Table of Contents</h3>
        <ul className={styles.list}>
          {headers.map((header, index) => (
            <li key={index} className={`${styles.tocItem} ${styles[`depth${header.level}`]} ${activeId === header.id ? styles.active : ''}`}>
              <a
                href={`#${header.id}`}
                className={`${styles.tocLink} ${activeId === header.id ? styles.active : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(header.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {header.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
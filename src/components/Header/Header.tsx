'use client';
import React, { useEffect } from 'react';
import styles from './Header.module.css';
import Link from 'next/link';

export default function Header() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(`.${styles.header}`);
      if (window.scrollY > 0) {
        header?.classList.add(styles.scrolled);
      } else {
        header?.classList.remove(styles.scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className = {styles.header}>
      <ul className = {styles.menu}>
        <li className={styles.menuItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.menuItem}>
          <Link href="/profile">Profile</Link>
        </li>
      </ul>
    </header>
  );
}


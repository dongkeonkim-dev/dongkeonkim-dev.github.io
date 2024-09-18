'use client';
import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Comments.module.css';

const Comments: React.FC = () => {
  const commentBox = useRef<HTMLDivElement>(null);
  const pathname = usePathname().replace(/\/$/, '');
  console.log('Pathname:', pathname);
  const dataTerm = pathname?.split('/').pop();
  console.log('dataTerm:', dataTerm);

  useLayoutEffect(() => {
    if (!commentBox.current || !dataTerm) return;

    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://giscus.app/client.js';
    scriptElem.async = true;
    scriptElem.setAttribute('data-repo', 'dongkeonkim-dev/dongkeonkim-dev.github.io');
    scriptElem.setAttribute('data-repo-id', 'R_kgDOMKYX3g');
    scriptElem.setAttribute('data-category', 'Announcements');
    scriptElem.setAttribute('data-category-id', 'DIC_kwDOMKYX3s4CgZul');
    scriptElem.setAttribute('data-mapping', 'specific');
    scriptElem.setAttribute('data-term', dataTerm);
    scriptElem.setAttribute('data-strict', '0');
    scriptElem.setAttribute('data-reactions-enabled', '0');
    scriptElem.setAttribute('data-emit-metadata', '0');
    scriptElem.setAttribute('data-input-position', 'top');
    scriptElem.setAttribute('data-theme','preferred_color_scheme');
    scriptElem.setAttribute('data-lang', 'ko');
    scriptElem.crossOrigin = 'anonymous';
    
    
    // Ensure the commentBox is cleared before appending the new script
    if (commentBox.current) {
      commentBox.current.innerHTML = '';
      commentBox.current.appendChild(scriptElem);
    }

    return () => {
      if (commentBox.current) {
        commentBox.current.innerHTML = '';
      }
    };
  }, [dataTerm]);

  useEffect(() => {
    const giscusFrame = document.querySelector('.giscus-frame') as HTMLIFrameElement;
    if (giscusFrame) {
      giscusFrame.addEventListener('load', () => {
        const giscusMessage = { setConfig: { theme: 'custom' } };
        giscusFrame.contentWindow?.postMessage({ giscus: giscusMessage }, 'https://giscus.app');
      });
    }
  }, []);

  return <div className = {styles.comments} ref={commentBox} />;
};

export default Comments;

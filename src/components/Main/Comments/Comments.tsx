'use client'
import React, { useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Comments.module.css'

const Comments: React.FC = () => {
  const commentBox = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const issueTerm = pathname?.split('/').pop();

  useLayoutEffect(() => {
    if (!commentBox.current || !issueTerm) return;

    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://utteranc.es/client.js';
    scriptElem.async = true;
    scriptElem.setAttribute('repo', 'dongkeonkim-dev/dongkeonkim-dev.github.io');
    scriptElem.setAttribute('issue-term', issueTerm);
    scriptElem.setAttribute('theme', 'github-light');
    scriptElem.setAttribute('label', 'Comment');
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
  }, [issueTerm]);

  return <div className = {styles.comments} ref={commentBox} />;
};

export default Comments;

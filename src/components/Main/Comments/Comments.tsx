'use client'
import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const Comments: React.FC = () => {
  const commentBox = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const issueTerm = pathname?.split('/').pop();

  useEffect(() => {
    if (!commentBox.current || !issueTerm) return;

    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://utteranc.es/client.js';
    scriptElem.async = true;
    scriptElem.setAttribute('repo', 'dongkeonkim-dev/dongkeonkim-dev.github.io');
    scriptElem.setAttribute('issue-term', issueTerm);
    scriptElem.setAttribute('theme', 'github-light');
    scriptElem.setAttribute('label', 'blog-comment');
    scriptElem.crossOrigin = 'anonymous';
    commentBox.current.appendChild(scriptElem);

    // Clean up the script element on component unmount
    return () => {
      if (commentBox.current) {
        commentBox.current.innerHTML = '';
      }
    };
  }, [issueTerm]);

  return <div ref={commentBox} />;
};

export default Comments;
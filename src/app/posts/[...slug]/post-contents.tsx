'use client';

import React, { useState, useEffect } from 'react';
import styles from './post-contents.module.css'; // 적절한 경로로 수정하세요
import Comments from '@/components/Main/Comments/Comments'; // 적절한 경로로 수정하세요
import SideBarRight from '@/components/Main/SideBarRight/SideBarRight'; // 적절한 경로로 수정하세요

interface Header {
  depth: number;
  value: string;
  id: string;
}

interface PostContentProps {
  html: string;
  headers: Header[];
}

const PostContent: React.FC<PostContentProps> = ({ html, headers }) => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    setContent(html);
  }, [html]);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.page} dangerouslySetInnerHTML={{ __html: content }} />
        <Comments />
      </div>
      <SideBarRight headers={headers} />
    </div>
  );
};

export default PostContent;
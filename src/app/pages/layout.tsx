'use client';
import React, { useEffect, /*useState*/ } from 'react';
import styles from './posts.module.css';
import Comments from '@/components/Body/Post/Comments/Comments';
// import Toc from '@/components/Body/Post/Toc/Toc';
// import { extractHeaders, Header } from '@/utils/mdx';

const PostsLayout = ({ children }: { children: React.ReactElement }) => {
  // const [headers, setHeaders] = useState<Header[]>([]);

  useEffect(() => {
    const fetchHeaders = async () => {
      const mdxContent = children.props.children;
      console.log('mdx',mdxContent);
      // const extractedHeaders = await extractHeaders(mdxContent);
      // setHeaders(extractedHeaders);
    };

    fetchHeaders();
  }, [children]);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.page}>
          {children}
        </div>
        <Comments />
      </div>
      {/* <Toc headers={headers} /> */}
    </div>
  );
};

export default PostsLayout;
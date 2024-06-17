import React, { useEffect, useState } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import markdownFiles from 'models/markdownFiles';
import PostCard from 'components/Main/Posts/PostCard';
import styles from 'styles/Posts.module.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await Promise.all(
        markdownFiles.map(async (file) => {
          const response = await fetch(file);
          const text = await response.text();
          const processed = await unified()
            .use(remarkParse)
            .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
            .process(text);
          const data = processed.data;
          const content = processed.value;
          return { data, content };
        })
      );
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.posts}>
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  );
};

export default Posts;

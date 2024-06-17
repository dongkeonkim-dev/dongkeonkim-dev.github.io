import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import markdownFiles from 'models/markdownFiles';
import styles from 'styles/PostDetail.module.css';

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const file = markdownFiles.find(file => file.includes(`${slug}.md`));
      const response = await fetch(file);
      const text = await response.text();
      const processed = await unified()
        .use(remarkParse)
        .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
        .process(text);
      const data = processed.data;
      const content = processed.value;
      setPost({ data, content });
    };

    fetchPost();
  }, [slug]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className={styles.postDetail}>
      <h1>{post.data.title}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {post.content}
      </ReactMarkdown>
    </div>
  );
};

export default PostDetail;

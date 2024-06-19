import styles from './SocialMedia.module.css';

const SocialMedia = () => {
  return (
    <div className={styles.socialMedia}>
      <a href="https://github.com/dongkeonkim-dev">GitHub</a>
      <a href="https://linkedin.com/in/동건-김-019563312">LinkedIn</a>
      <a href="mailto:username@gmail.com">Gmail</a>
    </div>
  );
};

export default SocialMedia;

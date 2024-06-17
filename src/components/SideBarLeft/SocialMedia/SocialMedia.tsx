import styles from './SocialMedia.module.css';

const SocialMedia = () => {
  return (
    <div className={styles.socialMedia}>
      <a href="https://github.com/username">GitHub</a>
      <a href="https://linkedin.com/in/username">LinkedIn</a>
      <a href="mailto:username@gmail.com">Gmail</a>
    </div>
  );
};

export default SocialMedia;

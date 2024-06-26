import styles from './Profile.module.css';
import Image from 'next/image';

const Profile = () => {
  return (

    <div className={styles.profile}>
      <Image 
        src='/profile.jpg'
        width = {250}
        height = {250}
        alt="프로필 사진" 
        className="rounded-full w-24 h-24 object-cover" 
      />
      <h2>개발자 김동건</h2>
      <p>Back-end, NodeJS</p>
    </div>
  );
};

export default Profile;

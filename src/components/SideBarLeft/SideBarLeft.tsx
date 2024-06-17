import Profile from './Profile/Profile';
import SearchBar from './SearchBar/SearchBar';
import Categories from './Scroller/Scroller';
import SocialMedia from './SocialMedia/SocialMedia';
import styles from './SideBarLeft.module.css';


export default function SideBarLeft() {
  return (
    <div className={styles.sidebarLeft}>
      <Profile />
      <SearchBar />
      <Categories />
      <SocialMedia />
    </div>
  );
};

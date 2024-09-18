import Profile from './Profile/Profile';
// import SearchBar from './SearchBar/SearchBar';
import PostList from './PostList/PostList';
import SocialMedia from './SocialMedia/SocialMedia';
import styles from './SideBar.module.css';

interface Post {
  name: string;
  slug: string;
}

interface Node {
  name: string;
  slug: string;
  children: (Node | Post)[];
  hasPage: boolean;
}

export default function SideBar({ postTree }: { postTree : Node }) {
  return (
    <div className={`${styles.sidebarLeft} ${styles.preventOverflow}`}>
      <div className={styles.floatContainer}>
        <Profile />
        {/* <SearchBar /> */}
        <PostList postTree={postTree}/>
        <SocialMedia />
      </div>
    </div>
  );
};
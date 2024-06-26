import { usePathname } from 'next/navigation';
import Profile from './Profile/Profile';
import SearchBar from './SearchBar/SearchBar';
import PostList from './PostList/PostList';
import SocialMedia from './SocialMedia/SocialMedia';
import styles from './SideBarLeft.module.css';

interface Post {
  name: string;
  slug: string;
}

interface Node {
  name: string;
  slug: string;
  children: (Node | Post)[];
}

export default function SideBarLeft({ postTree }: { postTree : Node }) {
  return (
    <div className={`${styles.sidebarLeft} ${styles.preventOverflow}`}>
      <div className={styles.floatContainer}>
        <Profile />
        <SearchBar />
        <PostList postTree={postTree}/>
        <SocialMedia />
      </div>
    </div>
  );
};
//app/layout.tsx
import Script from 'next/script';
import { Inter } from 'next/font/google';
import SideBar from '@/components/SideBar/SideBar';
import Header from '@/components/Header/Header';
import { getDirectoryTree } from '@/utils/directory';
import path from 'path';
import styles from './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const postTree = getDirectoryTree(path.join(process.cwd(), 'src/app/pages'));

  return (
    <html lang="en">
      <head>
      <Script 
        src="https://kit.fontawesome.com/cf485cac6a.js" 
        strategy="afterInteractive"
      />
      </head>
      <body>
        <div className="container">
          <SideBar postTree={postTree} />
          <div className={styles.main}>{/* body */}
            <Header />
            <div className = {styles.page}>{/* Main */}
              {children}
            </div>
          </div> 
        </div>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideBarLeft from '@/components/SideBarLeft/SideBarLeft';
import SideBarRight from '@/components/SideBarRight/SideBarRight';
import Header from '@/components/Main/Header/Header';
import { getDirectoryTree } from '@/utils/directory';
import path from 'path';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const postTree = getDirectoryTree(path.join(process.cwd(), 'posts'));
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <SideBarLeft  postTree = {postTree} />
          <div className="main">
            <Header />
            {children}
          </div>
          <SideBarRight />
        </div>
      </body>
    </html>
  );
}
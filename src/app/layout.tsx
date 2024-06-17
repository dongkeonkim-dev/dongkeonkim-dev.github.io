import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideBarLeft from '@/components/SideBarLeft/SideBarLeft';
import SideBarRight from '@/components/SideBarRight/SideBarRight';
import Header from '@/components/Main/Header/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <SideBarLeft />
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
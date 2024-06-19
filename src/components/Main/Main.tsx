import React from 'react';
import Header from '@/components/Main/Header/Header';
import Comments from '@/components/Main/Comments/Comments';

import style from './Main.module.css'

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children, postTree }) => {

  return (
    <div className={style.main}>
        <Header />
        <div className = {style.page}>
            {children}
        </div>
        <Comments />
    </div>
  );
};

export default Main;
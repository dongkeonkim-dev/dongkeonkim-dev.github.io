import React from 'react';
import Header from '@/components/Main/Header/Header';
import Comments from '@/components/Main/Comments/Comments';

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {

  return (
    <div className="main">
      <Header />
      {children}
      <Comments />
    </div>
  );
};

export default Main;
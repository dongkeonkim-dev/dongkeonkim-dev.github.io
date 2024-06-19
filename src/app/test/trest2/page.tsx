'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const CurrentPageUrl = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [fullUrl, setFullUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFullUrl(window.location.href);
    }
  }, []);

  return (
    <div>
      <p>Current pathname: {pathname}</p>
      <p>Current search params: {searchParams.toString()}</p>
      <p>Current full URL: {fullUrl}</p>
    </div>
  );
};

export default CurrentPageUrl;

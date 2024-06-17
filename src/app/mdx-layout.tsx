import type { ReactNode } from 'react';

interface MdxLayoutProps {
  children: ReactNode;
}

export default function MdxLayout({ children }: MdxLayoutProps) {
  // Create any shared layout or styles here
  return <div style={{ color: 'blue' }}>{children}</div>;
}

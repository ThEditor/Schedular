import * as React from 'react';

import Navbar from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar className='absolute w-screen' />
      {children}
    </>
  );
}

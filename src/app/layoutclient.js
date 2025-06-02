'use client';

import { usePathname } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const hideNavbar = pathname === '/login' || pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

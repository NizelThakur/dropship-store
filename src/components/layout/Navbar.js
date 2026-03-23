"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.brand}>
          Dropship<span>Style</span>
        </Link>
        
        <div className={styles.navLinks}>
          <Link href="/" className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}>Home</Link>
          <Link href="/shop" className={`${styles.link} ${pathname?.startsWith('/shop') ? styles.active : ''}`}>Shop</Link>
          <Link href="/admin" className={`${styles.link} ${pathname?.startsWith('/admin') ? styles.active : ''}`}>Admin</Link>
        </div>

        <div className={styles.actions}>
          <button 
            className={styles.cartBtn} 
            aria-label="Cart"
            onClick={() => setIsCartOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}

import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h3>Dropship<span>Style</span></h3>
          <p>Curating the latest fashion trends at unbeatable prices. Delivered straight to your doorstep.</p>
        </div>
        
        <div className={styles.links}>
          <h4>Quick Links</h4>
          <Link href="/">Home</Link>
          <Link href="/shop">Shop Collection</Link>
          <Link href="/admin">Seller Admin</Link>
        </div>
        
        <div className={styles.links}>
          <h4>Customer Service</h4>
          <a href="#">Contact Us</a>
          <a href="#">Shipping Policy</a>
          <a href="#">Returns & Exchanges</a>
        </div>
      </div>
      
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Dropship Style. All rights reserved.</p>
      </div>
    </footer>
  );
}

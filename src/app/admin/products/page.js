"use client";
import { useState } from "react";
import styles from "../page.module.css";
import Link from "next/link";

export default function ProductsManagement() {
  const [basePrice, setBasePrice] = useState("");
  const [sellPrice, setSellPrice] = useState(0);

  const handlePriceChange = (e) => {
    const val = parseFloat(e.target.value);
    setBasePrice(e.target.value);
    if (!isNaN(val)) {
      // 20% profit margin
      setSellPrice((val * 1.20).toFixed(2));
    } else {
      setSellPrice(0);
    }
  };

  return (
    <div className={styles.adminPage}>
      <aside className={styles.sidebar}>
        <h2>Seller Admin</h2>
        <nav>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/products" className={styles.active}>Products</Link>
          <Link href="/admin">Orders</Link>
          <Link href="/admin">Settings</Link>
        </nav>
      </aside>
      
      <main className={styles.content}>
        <header className={styles.header}>
          <h1>Manage Products</h1>
        </header>

        <section className={styles.ordersSection}>
          <h2>Add New Meesho Product</h2>
          <div style={{ maxWidth: '500px', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600 }}>Product Name</label>
              <input type="text" placeholder="e.g. Neon Rush Sneakers" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600 }}>Meesho Base Price ($)</label>
              <input 
                type="number" 
                value={basePrice}
                onChange={handlePriceChange}
                placeholder="0.00" 
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }} 
              />
            </div>

            <div style={{ backgroundColor: '#f1f5f9', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem' }}>
              <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Calculated Selling Price (Base + 20% Margin)</p>
              <h3 style={{ fontSize: '2rem', color: '#0f172a' }}>${sellPrice}</h3>
              <p style={{ color: '#16a34a', fontWeight: 600, marginTop: '0.5rem' }}>Your Profit: ${(sellPrice - (parseFloat(basePrice) || 0)).toFixed(2)}</p>
            </div>

            <button className={styles.primaryBtn} style={{ marginTop: '1rem' }}>Save to Storefront</button>
          </div>
        </section>
      </main>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import styles from "./page.module.css";

export default function AdminDashboard() {
  const [logs, setLogs] = useState([
    { id: 1, type: 'Info', message: 'Admin dashboard loaded', time: new Date().toLocaleTimeString() }
  ]);
  const [products, setProducts] = useState([]);
  const [lastSync, setLastSync] = useState('Never');
  const [isSyncing, setIsSyncing] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const addLog = (type, message) => {
    setLogs(prev => [
      { id: Date.now(), type, message, time: new Date().toLocaleTimeString() },
      ...prev
    ]);
  };

  // Load synced products from the live store's data
  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
          setLastSync(new Date().toLocaleTimeString());
          addLog('Sync', `Loaded ${data.length} live products from store`);
        }
      })
      .catch(() => {
        addLog('Info', 'Using locally bundled product data');
      });
  }, []);

  // Manual: Run the auto-sync bot via the command line (explained to user)
  const handleManualSync = () => {
    setIsSyncing(true);
    addLog('Sync', 'Manual sync triggered. Run Run_Sync_Once.bat on your computer to scrape fresh products.');
    setTimeout(() => {
      setIsSyncing(false);
      addLog('Info', 'Tip: Double-click Run_Sync_Once.bat to update products and social media.');
    }, 2000);
  };

  // Manual: Trigger social media post (reminds user how it works)
  const handleSocialPost = () => {
    setIsPosting(true);
    addLog('Social', 'Social post triggered. Run Run_Sync_Once.bat to post 3 products to Facebook & Instagram via Ayrshare.');
    setTimeout(() => setIsPosting(false), 2000);
  };

  const totalRevenue = products.reduce((sum, p) => sum + (p.price || 0), 0);
  const totalProfit = products.reduce((sum, p) => sum + ((p.price || 0) * 0.4), 0);

  return (
    <div className={styles.adminPage}>
      <aside className={styles.sidebar}>
        <h2 className={styles.brand}>Style<span>Admin</span></h2>
        <nav>
          <a href="/admin" className={styles.active}>📊 Dashboard</a>
          <a href="/shop" target="_blank">🛍️ View Store</a>
          <a href="https://vercel.com" target="_blank">🚀 Vercel Deploys</a>
          <a href="https://github.com/NizelThakur/dropship-store" target="_blank">💻 GitHub Repo</a>
          <a href="https://app.ayrshare.com" target="_blank">📱 Ayrshare Posts</a>
        </nav>
      </aside>

      <main className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1>Operations Dashboard</h1>
            <p className={styles.subtitle}>Real-time dropshipping automation status</p>
          </div>
          <div className={styles.headerActions}>
            {/* 
              HOW TO SYNC: Double-click Run_Sync_Once.bat on your computer.
              This button shows you the reminder — actual sync runs locally.
            */}
            <button
              className={`${styles.syncBtn} ${isSyncing ? styles.syncing : ''}`}
              onClick={handleManualSync}
              disabled={isSyncing}
              title="Click to see sync instructions"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
                <polyline points="21 3 21 8 16 8"></polyline>
              </svg>
              {isSyncing ? 'See Logs ↓' : 'How to Sync'}
            </button>
            <button
              className={styles.primaryBtn}
              onClick={handleSocialPost}
              disabled={isPosting}
              title="Posts products to Facebook & Instagram via Ayrshare"
            >
              {isPosting ? 'See Logs ↓' : '📱 Social Post'}
            </button>
          </div>
        </header>

        {/* Live Stats - calculated from real synced products */}
        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Live Products</h3>
            <p className={styles.statValue}>{products.length || '—'}</p>
            <span className={styles.statTrend}>Synced from Meesho</span>
          </div>
          <div className={styles.statCard}>
            <h3>Total Catalog Value</h3>
            <p className={styles.statValue}>
              {products.length ? `₹${totalRevenue.toLocaleString('en-IN')}` : '—'}
            </p>
            <span className={styles.statTrend}>40% margin applied</span>
          </div>
          <div className={styles.statCard}>
            <h3>Potential Profit</h3>
            <p className={styles.statValue}>
              {products.length ? `₹${Math.round(totalProfit).toLocaleString('en-IN')}` : '—'}
            </p>
            <span className={styles.statTrend}>If all items sell</span>
          </div>
          <div className={styles.statCard}>
            <h3>Bot Status</h3>
            <p className={styles.statValue}>Ready</p>
            <span className={styles.statusDot}></span>
          </div>
        </section>

        <div className={styles.dualGrid}>
          {/* Live Products Table */}
          <section className={styles.ordersSection}>
            <div className={styles.sectionHeader}>
              <h2>Live Product Catalog</h2>
              <a href="/shop" target="_blank">View in Store →</a>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Selling Price</th>
                    <th>Profit (40%)</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={3} style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)' }}>
                        Run <strong>Run_Sync_Once.bat</strong> to load products
                      </td>
                    </tr>
                  ) : (
                    products.slice(0, 10).map((p, i) => (
                      <tr key={i}>
                        <td>{p.name}</td>
                        <td>₹{Number(p.price).toLocaleString('en-IN')}</td>
                        <td>₹{Math.round(p.price * 0.4).toLocaleString('en-IN')}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Activity Log */}
          <section className={styles.automationLog}>
            <div className={styles.sectionHeader}>
              <h2>Activity Log</h2>
              <span className={styles.lastSync}>Last sync: {lastSync}</span>
            </div>

            {/* How-to Guide */}
            <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
              <strong>🤖 How to run your bot:</strong>
              <ul style={{ margin: '0.5rem 0 0 1rem', lineHeight: '1.8' }}>
                <li><strong>Sync + Post now:</strong> Double-click <code>Run_Sync_Once.bat</code></li>
                <li><strong>Hourly auto-sync:</strong> Double-click <code>Start_Daily_Bot.bat</code></li>
                <li><strong>Social media:</strong> Handled automatically by Ayrshare</li>
                <li><strong>Orders:</strong> Fulfill manually on Meesho when you get an order</li>
              </ul>
            </div>

            <div className={styles.logList}>
              {logs.map(log => (
                <div key={log.id} className={styles.logItem}>
                  <span className={styles.logTime}>{log.time}</span>
                  <span className={styles.logType}>{log.type}</span>
                  <p className={styles.logMsg}>{log.message}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

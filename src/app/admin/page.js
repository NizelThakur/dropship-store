'use client';

import { useState, useEffect } from 'react';
import { syncProductsToStore } from "@/lib/meeshoService";
import { fulfillOrderOnMeesho } from "@/lib/fulfillmentService";
import { postToSocialMedia } from "@/lib/socialService";
import styles from "./page.module.css";

export default function AdminDashboard() {
  const [syncStatus, setSyncStatus] = useState("Idle");
  const [lastSync, setLastSync] = useState("Never");
  const [isSyncing, setIsSyncing] = useState(false);
  const [fulfillmentLogs, setFulfillmentLogs] = useState([
    { id: 1, type: "Sync", message: "Initial product set loaded", time: "10:00 AM" }
  ]);

  const addLog = (type, message) => {
    setFulfillmentLogs(prev => [
      { id: Date.now(), type, message, time: new Date().toLocaleTimeString() },
      ...prev
    ]);
  };

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncStatus("Syncing with Meesho...");
    try {
      const response = await fetch('/api/automation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync' })
      });
      const result = await response.json();
      
      if (response.ok) {
        setLastSync(new Date().toLocaleTimeString());
        setSyncStatus("Success");
        addLog("Sync", "Successfully synced real-time trending items from Meesho");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setSyncStatus("Failed");
      addLog("Error", `Sync failed: ${error.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleFulfill = async (orderId, customerName) => {
    addLog("Order", `Starting fulfillment for ${orderId}...`);
    try {
      const response = await fetch('/api/automation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'fulfill', orderId, customerName })
      });
      if (response.ok) {
        addLog("Success", `Order ${orderId} automation triggered successfully`);
      } else {
        throw new Error("API error");
      }
    } catch (error) {
      addLog("Error", `Auto-fulfillment failed for ${orderId}`);
    }
  };

  const handleSocialPost = async (productName) => {
    addLog("Social", `Posting ${productName} to social channels...`);
    try {
      const response = await fetch('/api/automation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'social', product: productName })
      });
      if (response.ok) {
        addLog("Social", `Successfully posted ${productName} to IG & FB`);
      } else {
        throw new Error("API error");
      }
    } catch (error) {
      addLog("Error", `Social post failed for ${productName}`);
    }
  };

  const dummyOrders = [
    { id: "ORD-001", customer: "John Doe", product: "Neon Rush Sneakers", address: "123 Main St, NY", status: "Pending", automation: "Ready" },
    { id: "ORD-002", customer: "Jane Smith", product: "Oversized Streetwear Hoodie", address: "456 Oak Ave, CA", status: "Fulfilled", automation: "Completed" }
  ];

  return (
    <div className={styles.adminPage}>
      <aside className={styles.sidebar}>
        <h2 className={styles.brand}>Style<span>Admin</span></h2>
        <nav>
          <a href="#" className={styles.active}>Dashboard</a>
          <a href="#">Inventory</a>
          <a href="#">Automation</a>
          <a href="#">Analytics</a>
        </nav>
      </aside>
      
      <main className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1>Operations Dashboard</h1>
            <p className={styles.subtitle}>Real-time dropshipping automation status</p>
          </div>
          <div className={styles.headerActions}>
            <button 
              className={`${styles.syncBtn} ${isSyncing ? styles.syncing : ''}`} 
              onClick={handleSync}
              disabled={isSyncing}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
                <polyline points="21 3 21 8 16 8"></polyline>
              </svg>
              {isSyncing ? "Syncing..." : "Sync Meesho"}
            </button>
            <button className={styles.primaryBtn}>+ Add Item</button>
          </div>
        </header>

        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Total Revenue</h3>
            <p className={styles.statValue}>₹1,245.00</p>
            <span className={styles.statTrend}>+12% from last week</span>
          </div>
          <div className={styles.statCard}>
            <h3>Profit (20% Avg)</h3>
            <p className={styles.statValue}>₹249.00</p>
            <span className={styles.statTrend}>+8% growth</span>
          </div>
          <div className={styles.statCard}>
            <h3>Automation Health</h3>
            <p className={styles.statValue}>Healthy</p>
            <span className={styles.statusDot}></span>
          </div>
        </section>

        <div className={styles.dualGrid}>
          <section className={styles.ordersSection}>
            <div className={styles.sectionHeader}>
              <h2>Active Orders</h2>
              <a href="#">Expand View</a>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Product</th>
                    <th>Status</th>
                    <th>Automation</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyOrders.map(order => (
                    <tr key={order.id}>
                      <td className={styles.orderId}>{order.id}</td>
                      <td>{order.product}</td>
                      <td>
                        <span className={`${styles.badge} ${styles[order.status.toLowerCase()]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className={styles.automationStatus}>{order.automation}</td>
                      <td>
                        <button 
                          className={styles.actionBtn}
                          onClick={() => handleFulfill(order.id, order.customer)}
                          disabled={order.status === "Fulfilled"}
                        >
                          {order.status === "Pending" ? "Fulfill Now" : "Details"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.sectionHeader} style={{ marginTop: '2rem' }}>
              <h2>Recent Products</h2>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Margin</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Neon Rush Sneakers", price: "₹120.00", margin: "20%" },
                    { name: "Minimalist Infinity Watch", price: "₹155.00", margin: "20%" }
                  ].map((product, idx) => (
                    <tr key={idx}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.margin}</td>
                      <td>
                        <button 
                          className={styles.socialBtn}
                          onClick={() => handleSocialPost(product.name)}
                        >
                          Post to IG/FB
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={styles.automationLog}>
            <div className={styles.sectionHeader}>
              <h2>System Logs</h2>
              <span className={styles.lastSync}>Last Sync: {lastSync}</span>
            </div>
            <div className={styles.logList}>
              {fulfillmentLogs.map(log => (
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

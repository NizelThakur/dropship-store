import styles from "./page.module.css";
import ProductCard from "@/components/ui/ProductCard";
import { fetchTrendingProducts } from "@/lib/meeshoService";
import fs from 'fs';
import path from 'path';

export default async function Shop() {
      let products = [];

  try {
          // Using require ensures the Next.js/Vercel bundler packages the JSON into the build payload
        const productsData = require('@/data/products.json');
          if (productsData && productsData.length > 0) {
                    products = productsData.map(product => ({
                                  ...product,
                                  id: product.id || String(Math.random()),
                                  sellingPrice: product.price || parseFloat((product.meeshoPrice * 1.4).toFixed(2)),
                                  profit: parseFloat((product.meeshoPrice * 0.4).toFixed(2))
                    }));
          }
  } catch (error) {
          // If running in an environment without the synced file, use mock service
        products = await fetchTrendingProducts();
  }

  return (
          <div className={styles.shopPage}>
      <header className={styles.header}>
        <h1>The Trending Collection</h1>
            <p>Directly synced from Meesho with our curated 20% dropship margin.</p>
      </header>

      <div className={styles.container}>
        <aside className={styles.filters}>
          <h3>Automation Status</h3>
              <div className={styles.syncBadge}>
            <span className={styles.dot}></span> Live Meesho Sync
      </div>
      </aside>

        <main className={styles.productGrid}>
  {products.map(product => (
                  <ProductCard key={product.id} product={product} />
              ))}
    </main>
    </div>
    </div>
  );
}

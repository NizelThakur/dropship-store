import styles from "./page.module.css";
import ProductCard from "@/components/ui/ProductCard";
import { fetchTrendingProducts } from "@/lib/meeshoService";
import fs from 'fs';
import path from 'path';

export default async function Shop() {
  let products = [];
  const productsPath = path.join(process.cwd(), 'src/data/products.json');
  
  if (fs.existsSync(productsPath)) {
    products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  } else {
    products = await fetchTrendingProducts(); // Fallback to mock
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

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import ProductCard from "@/components/ui/ProductCard";

// Helper: tries to load live synced products, falls back to mock
function getProducts() {
  try {
    const data = require('@/data/products.json');
    if (data && data.length > 0) {
      return data.slice(0, 4).map(p => ({
        ...p,
        id: p.id || String(Math.random()),
        price: p.price || parseFloat((p.meeshoPrice * 1.4).toFixed(2)),
      }));
    }
  } catch (e) {
    // Fall through to mock
  }
  // Fallback mock products shown until first sync
  return [
    { id: "m1", name: "Vintage Oversized Denim Jacket", price: 840, image: "https://images.unsplash.com/photo-1576871333020-22105658e23b?q=80&w=600" },
    { id: "m2", name: "Cyberpunk Techwear Joggers",    price: 924, image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=600" },
    { id: "m3", name: "Retro Future Sunglasses",       price: 336, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600" },
    { id: "m4", name: "Minimalist Leather Backpack",   price: 1344, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600" },
  ];
}

export default async function Home() {
  const trendingProducts = getProducts();

  return (
    <div className={styles.page}>
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Discover Your Next Favorite Look</h1>
          <p className={styles.heroSub}>Curated premium fashion hand-picked from top trending suppliers. Unbeatable value.</p>
          <div className={styles.heroActions}>
            <Link href="/shop" className={styles.primaryBtn}>Shop the Collection</Link>
            <Link href="#trending" className={styles.secondaryBtn}>View Trending</Link>
          </div>
        </div>
        <div className={styles.heroImageWrapper}>
          <Image 
            src="/fashion_hero_1774254878087.png" 
            alt="Fashion Hero" 
            fill
            priority
            className={styles.heroImage}
          />
        </div>
      </section>

      {/* Trending Section — live products from hourly sync */}
      <section id="trending" className={styles.trendingSection}>
        <div className={styles.sectionHeader}>
          <h2>Trending Now</h2>
          <Link href="/shop" className={styles.viewAllBtn}>View All <span>&rarr;</span></Link>
        </div>
        
        <div className={styles.productGrid}>
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>✦</div>
          <h3>Premium Quality</h3>
          <p>We source only the highest quality materials for maximum durability.</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>✦</div>
          <h3>Fast Shipping</h3>
          <p>Automated fulfillment directly from our partners to your doorstep.</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>✦</div>
          <h3>Secure Checkout</h3>
          <p>Your payment information is processed securely with top encryption.</p>
        </div>
      </section>
    </div>
  );
}

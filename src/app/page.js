import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import ProductCard from "@/components/ui/ProductCard";

export default function Home() {
  const trendingProducts = [
    {
      id: 1,
      name: "Neon Rush Sneakers",
      price: 120.00,
      image: "/product_sneakers_1774254895697.png"
    },
    {
      id: 2,
      name: "Oversized Streetwear Hoodie",
      price: 65.00,
      image: "/product_hoodie_1774254914664.png"
    },
    {
      id: 3,
      name: "Minimalist Infinity Watch",
      price: 155.00,
      image: "/product_watch_1774254935233.png"
    }
  ];

  return (
    <div className={styles.page}>
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Discover Your Next Favorite Look</h1>
          <p className={styles.heroSub}>Curated premium fashion hand-picked from top trending dropship suppliers. Unbeatable value.</p>
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

      {/* Trending Section */}
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

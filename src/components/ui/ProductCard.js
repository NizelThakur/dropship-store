import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  // Assuming price needs to be formatted
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(product.price);

  return (
    <div className={styles.card}>
      <Link href={`/product/${product.id}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <Image 
            src={product.image} 
            alt={product.name} 
            fill
            className={styles.image}
          />
        </div>
      </Link>
      <div className={styles.info}>
        <h3 className={styles.title}>
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className={styles.price}>{formattedPrice}</p>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}

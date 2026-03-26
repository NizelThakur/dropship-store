import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import AddToCartButton from "@/components/ui/AddToCartButton";

// Fetch product from the statically bundled scraped data
const getProduct = (id) => {
  let allProducts = [];
  try {
    const fileData = require('@/data/products.json');
    if (fileData && fileData.length > 0) {
      allProducts = fileData.map(product => ({
        ...product,
        // Ensure format consistency with storefront components
        id: product.id || String(Math.random()),
        name: product.name,
        price: product.price || parseFloat((product.meeshoPrice * 1.4).toFixed(2)),
        description: product.description || "Trending fashion item directly sourced with premium dropship quality guarantees.",
        image: product.image,
        category: product.category || "Apparel",
        details: [
          "Premium Quality",
          "Ethically Sourced",
          "Standard Shipping Included",
          "Automated Fulfillment"
        ]
      }));
    }
  } catch (error) {
    // Only load these if the live scraped data completely fails
    allProducts = [
      {
        id: "m101",
        name: "Vintage Oversized Denim Jacket",
        price: 54.00,
        description: "Step into the future with this premium dropship item.",
        image: "https://images.unsplash.com/photo-1576871333020-22105658e23b?q=80&w=600",
        category: "Apparel",
        details: ["Standard Shipping", "Premium Fit"]
      }
    ];
  }

  // Support both Number IDs and String IDs from scraping
  return allProducts.find(p => String(p.id) === String(id));
};

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(product.price);

  return (
    <div className={styles.productPage}>
      <div className={styles.container}>
        <div className={styles.gallery}>
          <div className={styles.imageWrapper}>
            <Image 
              src={product.image} 
              alt={product.name} 
              fill
              priority
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.info}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.price}>{formattedPrice}</p>
          
          <div className={styles.description}>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className={styles.details}>
            <h3>Key Features</h3>
            <ul>
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>

          <div className={styles.actions}>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

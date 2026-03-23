import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import AddToCartButton from "@/components/ui/AddToCartButton";

// Mock data fetch - in a real app this would be an API call
const getProduct = (id) => {
  const allProducts = [
    {
      id: 1,
      name: "Neon Rush Sneakers",
      price: 120.00,
      description: "Step into the future with the Neon Rush Sneakers. Featuring futuristic glow-in-the-dark accents and ultra-responsive cushioning for all-day comfort and style.",
      image: "/product_sneakers_1774254895697.png",
      category: "Footwear",
      details: [
        "Synthetic breathable upper",
        "Responsive foam midsole",
        "High-traction rubber outsole",
        "Glow-in-the-dark finish"
      ]
    },
    {
      id: 2,
      name: "Oversized Streetwear Hoodie",
      price: 65.00,
      description: "The ultimate comfort piece for your urban wardrobe. This oversized hoodie is crafted from premium heavyweight cotton for that perfect draped look.",
      image: "/product_hoodie_1774254914664.png",
      category: "Apparel",
      details: [
        "100% Premium Cotton",
        "Dropped shoulder design",
        "Double-lined hood",
        "Kangaroo pocket"
      ]
    },
    {
      id: 3,
      name: "Minimalist Infinity Watch",
      price: 155.00,
      description: "A timepiece that speaks volumes through simplicity. The Infinity Watch features a sleek, borderless face and a premium mesh strap.",
      image: "/product_watch_1774254935233.png",
      category: "Accessories",
      details: [
        "Japanese Quartz movement",
        "Stainless steel mesh strap",
        "Scratch-resistant sapphire glass",
        "Water resistant up to 5 ATM"
      ]
    }
  ];
  return allProducts.find(p => p.id === parseInt(id));
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

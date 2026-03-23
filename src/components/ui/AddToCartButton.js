'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from './AddToCartButton.module.css';

export default function AddToCartButton({ product }) {
  const { addToCart, setIsCartOpen } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    addToCart(product);
    
    // Auto-open cart after a small delay
    setTimeout(() => {
      setIsCartOpen(true);
      setIsAdding(false);
    }, 800);
  };

  return (
    <button 
      className={`${styles.button} ${isAdding ? styles.adding : ''}`}
      onClick={handleAdd}
      disabled={isAdding}
    >
      <span className={styles.text}>
        {isAdding ? (
          <>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Added!
          </>
        ) : (
          'Add to Cart'
        )}
      </span>
    </button>
  );
}

'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { fulfillOrderOnMeesho } from '@/lib/fulfillmentService';
import styles from './page.module.css';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsOrderPlaced(true);
    
    // Trigger automated fulfillment simulation
    const orderId = `ORD-${Math.floor(Math.random() * 100000)}`;
    fulfillOrderOnMeesho(orderId, formData);
    
    clearCart();
  };

  if (isOrderPlaced) {
    return (
      <div className={styles.success}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>
            <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase, {formData.name}. We've sent a confirmation email to {formData.email}.</p>
          <a href="/shop" className={styles.continueBtn}>Continue Shopping</a>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className={styles.empty}>
        <h1>Your cart is empty</h1>
        <p>Add some trending items to your cart to proceed to checkout.</p>
        <a href="/shop" className={styles.continueBtn}>Go to Shop</a>
      </div>
    );
  }

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.container}>
        <div className={styles.formSection}>
          <h2>Shipping Information</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="address">Shipping Address</label>
              <input 
                type="text" 
                id="address" 
                name="address" 
                required 
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Street Name"
              />
            </div>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label htmlFor="city">City</label>
                <input 
                  type="text" 
                  id="city" 
                  name="city" 
                  required 
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="zip">ZIP Code</label>
                <input 
                  type="text" 
                  id="zip" 
                  name="zip" 
                  required 
                  value={formData.zip}
                  onChange={handleChange}
                  placeholder="10001"
                />
              </div>
            </div>
            <button type="submit" className={styles.submitBtn}>
              Place Order - {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(cartTotal)}
            </button>
          </form>
        </div>

        <div className={styles.summarySection}>
          <h2>Order Summary</h2>
          <div className={styles.summaryCard}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.summaryItem}>
                <span>{item.name} x {item.quantity}</span>
                <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(cartTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

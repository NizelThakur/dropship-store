'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

// User Details for Checkout
const UPI_ID = 'nizelthakur-2@okaxis';
const WHATSAPP_NUMBER = '+917001945301';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Shipping, 2: Payment
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

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setCheckoutStep(2); // Move to Payment Step
  };

  const handlePaymentConfirmed = () => {
    const orderId = `ORD-${Math.floor(Math.random() * 100000)}`;
    const itemsList = cartItems.map(item => `${item.name} (x${item.quantity})`).join(', ');
    
    // Create pre-filled WhatsApp message
    const message = `Hi StyleHub! I've just placed an order.
    
Order ID: ${orderId}
Total: ₹${cartTotal.toLocaleString('en-IN')}
Name: ${formData.name}
Items: ${itemsList}
Address: ${formData.address}, ${formData.city} - ${formData.zip}

Attached is my payment screenshot for confirmation.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp confirmation
    window.open(whatsappUrl, '_blank');
    
    // Clear and show success
    setIsOrderPlaced(true);
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
          <h1>Order Submitted!</h1>
          <p>Thank you, {formData.name}. Please ensure you've sent your payment screenshot on WhatsApp for instant processing.</p>
          <a href="/shop" className={styles.continueBtn}>Return to Shop</a>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && checkoutStep === 1) {
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
        {/* Step Indicator */}
        <div className={styles.stepIndicator}>
          <div className={`${styles.step} ${checkoutStep >= 1 ? styles.activeStep : ''}`}>1. Shipping</div>
          <div className={styles.stepDivider}></div>
          <div className={`${styles.step} ${checkoutStep >= 2 ? styles.activeStep : ''}`}>2. Payment</div>
        </div>

        <div className={styles.gridContainer}>
          <div className={styles.leftCol}>
            {checkoutStep === 1 ? (
              <div className={styles.formSection}>
                <h2>Shipping Information</h2>
                <form onSubmit={handleShippingSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="address">Full Shipping Address</label>
                    <input type="text" id="address" name="address" required value={formData.address} onChange={handleChange} placeholder="123 Street Name, Area" />
                  </div>
                  <div className={styles.row}>
                    <div className={styles.formGroup}>
                      <label htmlFor="city">City</label>
                      <input type="text" id="city" name="city" required value={formData.city} onChange={handleChange} placeholder="Mumbai" />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="zip">ZIP Code</label>
                      <input type="text" id="zip" name="zip" required value={formData.zip} onChange={handleChange} placeholder="400001" />
                    </div>
                  </div>
                  <button type="submit" className={styles.submitBtn}>
                    Continue to Payment
                  </button>
                </form>
              </div>
            ) : (
              <div className={styles.paymentSection}>
                <button onClick={() => setCheckoutStep(1)} className={styles.backBtn}>← Back to Shipping</button>
                <h2>Complete Your Payment</h2>
                
                <div className={styles.upiCard}>
                  <div className={styles.upiHeader}>
                    <div className={styles.upiInfo}>
                      <span className={styles.upiLabel}>UPI ID:</span>
                      <strong className={styles.upiValue}>{UPI_ID}</strong>
                    </div>
                    <button className={styles.copyBtn} onClick={() => navigator.clipboard.writeText(UPI_ID)}>Copy</button>
                  </div>

                  <div className={styles.qrContainer}>
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=${UPI_ID}&pn=StyleHub&am=${cartTotal}&cu=INR`)}`} 
                      alt="UPI QR Code" 
                      className={styles.qrCode}
                    />
                    <p className={styles.qrHelp}>Scan with GPay, PhonePe, or Paytm</p>
                  </div>

                  <div className={styles.amountBanner}>
                    <span>Total Amount to Pay:</span>
                    <strong>₹{cartTotal.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <div className={styles.confirmationBox}>
                  <h3>Confirmation Step:</h3>
                  <p>1. Open your UPI app and scan the QR above.<br/>2. After paying, click the button below to send your <strong>Payment Proof</strong> on WhatsApp.</p>
                  <button onClick={handlePaymentConfirmed} className={styles.whatsappBtn}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12.031 6.172c-2.277 0-4.152 1.875-4.152 4.152 0 .614.135 1.192.378 1.71L7.15 15.613l3.657-1.106c.414.218.877.34 1.37.34 2.277 0 4.152-1.875 4.152-4.152.001-2.277-1.875-4.523-4.152-4.523zm0 7.411a3.25 3.25 0 01-2.831-1.644l-.16-.282-2.126.643.514-1.688-.135-.224a3.245 3.245 0 114.738 3.195z"/>
                    </svg>
                    Done! Confirm on WhatsApp
                  </button>
                </div>
              </div>
            )}
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
                <span>Total Amount</span>
                <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(cartTotal)}</span>
              </div>
            </div>
            
            <div className={styles.trustBadge}>
              <div className={styles.badgeItem}>
                <span>🔒</span>
                <div>
                  <strong>Secure Checkout</strong>
                  <p>Encrypted order processing</p>
                </div>
              </div>
              <div className={styles.badgeItem}>
                <span>🚚</span>
                <div>
                  <strong>Fast Delivery</strong>
                  <p>3-5 Business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

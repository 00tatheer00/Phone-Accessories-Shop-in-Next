"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import styles from "./checkout.module.css";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();

  // Order success state
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Payment method tab state
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Form states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    cardExp: "",
    cardCvv: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Pricing calculations
  const subtotal = cartTotal;
  const shippingCost = subtotal >= 250 || subtotal === 0 ? 0 : 15.00;
  const estimatedTax = subtotal * 0.08;
  const grandTotal = subtotal + shippingCost + estimatedTax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Simple validation
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "Required";
    if (!formData.lastName.trim()) errors.lastName = "Required";
    if (!formData.email.trim()) errors.email = "Required";
    if (!formData.address.trim()) errors.address = "Required";
    if (!formData.city.trim()) errors.city = "Required";
    if (!formData.zipCode.trim()) errors.zipCode = "Required";

    if (paymentMethod === "card") {
      if (!formData.cardNumber.trim()) errors.cardNumber = "Required";
      if (!formData.cardExp.trim()) errors.cardExp = "Required";
      if (!formData.cardCvv.trim()) errors.cardCvv = "Required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      alert("Please fill in all required checkout fields.");
      return;
    }

    // Success simulation
    const randomOrderNum = "DIG-" + Math.floor(1000000 + Math.random() * 9000000);
    setOrderNumber(randomOrderNum);
    setIsSuccess(true);
    clearCart(); // Clear shopping cart context state
  };

  // Success screen
  if (isSuccess) {
    return (
      <div className={styles.successCard}>
        <div className={styles.successIcon}>✓</div>
        <h2 className={styles.successTitle}>Order Placed Successfully!</h2>
        <p className={styles.successDesc}>
          Thank you for your purchase, {formData.firstName}! We've received your order and are processing it. A confirmation email has been sent to <strong>{formData.email}</strong>.
        </p>
        <div>
          <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
            Your Order Reference Number:
          </span>
          <div className={styles.orderNumber}>{orderNumber}</div>
        </div>
        <div style={{ marginTop: "12px" }}>
          <Link href="/" className={styles.btnPlaceOrder} style={{ display: "inline-block", padding: "14px 40px", width: "auto" }}>
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // Handle empty cart checkout access
  if (cart.length === 0) {
    return (
      <div style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2>Checkout Unavailable</h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "10px", marginBottom: "24px" }}>
          Your shopping cart is currently empty. You must add products to your cart before proceeding to checkout.
        </p>
        <Link href="/shop" className={styles.btnPlaceOrder} style={{ display: "inline-block", padding: "14px 40px", width: "auto" }}>
          Browse Shop Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <h1 className={styles.pageTitle}>Secure Checkout</h1>

      <form className={styles.checkoutGrid} onSubmit={handlePlaceOrder}>
        {/* Billing Details Cards */}
        <div className={styles.formCard}>
          <div>
            <h2 className={styles.sectionTitle}>Billing & Shipping Details</h2>
            
            <div className={styles.formRow} style={{ marginTop: "16px" }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={styles.formInput}
                  value={formData.firstName}
                  onChange={handleInputChange}
                  style={formErrors.firstName ? { borderColor: "var(--accent-red)" } : {}}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={styles.formInput}
                  value={formData.lastName}
                  onChange={handleInputChange}
                  style={formErrors.lastName ? { borderColor: "var(--accent-red)" } : {}}
                />
              </div>
            </div>

            <div className={styles.formRow} style={{ marginTop: "16px" }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.formInput}
                  value={formData.email}
                  onChange={handleInputChange}
                  style={formErrors.email ? { borderColor: "var(--accent-red)" } : {}}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={styles.formInput}
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={styles.formGroup} style={{ marginTop: "16px" }}>
              <label className={styles.formLabel} htmlFor="address">Street Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                className={styles.formInput}
                value={formData.address}
                onChange={handleInputChange}
                placeholder="House number and street name"
                style={formErrors.address ? { borderColor: "var(--accent-red)" } : {}}
              />
            </div>

            <div className={styles.formRow} style={{ marginTop: "16px" }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="city">Town / City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className={styles.formInput}
                  value={formData.city}
                  onChange={handleInputChange}
                  style={formErrors.city ? { borderColor: "var(--accent-red)" } : {}}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="zipCode">Postcode / ZIP *</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  className={styles.formInput}
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  style={formErrors.zipCode ? { borderColor: "var(--accent-red)" } : {}}
                />
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div>
            <h2 className={styles.sectionTitle}>Payment Method</h2>
            
            <div className={styles.paymentTabs} style={{ marginTop: "16px" }}>
              <div
                className={`${styles.paymentTab} ${paymentMethod === "card" ? styles.paymentTabActive : ""}`}
                onClick={() => setPaymentMethod("card")}
              >
                💳 Credit Card
              </div>
              <div
                className={`${styles.paymentTab} ${paymentMethod === "paypal" ? styles.paymentTabActive : ""}`}
                onClick={() => setPaymentMethod("paypal")}
              >
                🅿️ PayPal
              </div>
              <div
                className={`${styles.paymentTab} ${paymentMethod === "cod" ? styles.paymentTabActive : ""}`}
                onClick={() => setPaymentMethod("cod")}
              >
                💵 Cash on Delivery
              </div>
            </div>

            {/* Credit Card inputs */}
            {paymentMethod === "card" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="cardNumber">Card Number *</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    className={styles.formInput}
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9101 1121"
                    style={formErrors.cardNumber ? { borderColor: "var(--accent-red)" } : {}}
                  />
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="cardExp">Expiration Date *</label>
                    <input
                      type="text"
                      id="cardExp"
                      name="cardExp"
                      className={styles.formInput}
                      value={formData.cardExp}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      style={formErrors.cardExp ? { borderColor: "var(--accent-red)" } : {}}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="cardCvv">Card CVV *</label>
                    <input
                      type="password"
                      id="cardCvv"
                      name="cardCvv"
                      className={styles.formInput}
                      value={formData.cardCvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength="4"
                      style={formErrors.cardCvv ? { borderColor: "var(--accent-red)" } : {}}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div style={{ padding: "10px", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                You will be redirected to PayPal's secure portal to authorize your payment once you submit the order.
              </div>
            )}

            {paymentMethod === "cod" && (
              <div style={{ padding: "10px", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                Pay with cash directly to the logistics courier upon receiving delivery at your street address.
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Summary Review */}
        <div className={styles.summaryCard}>
          <h2 className={styles.summaryTitle}>Your Order</h2>
          
          <div className={styles.itemsReviewList}>
            {cart.map((item) => (
              <div key={item.id} className={styles.reviewItem}>
                <div className={styles.reviewImgContainer}>
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className={styles.reviewImg}
                    sizes="50px"
                  />
                </div>
                <div className={styles.reviewItemInfo}>
                  <span className={styles.reviewItemTitle}>{item.title}</span>
                  <span className={styles.reviewItemQty}>Qty: {item.quantity}</span>
                </div>
                <span className={styles.reviewItemPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.summaryRow}>
            <span>Cart Subtotal</span>
            <span style={{ fontWeight: "700", color: "var(--text-primary)" }}>
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <div className={styles.summaryRow}>
            <span>Shipping Cost</span>
            <span>{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Estimated Sales Tax (8%)</span>
            <span>${estimatedTax.toFixed(2)}</span>
          </div>

          <div className={styles.summaryRowBold}>
            <span>Grand Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          <button type="submit" className={styles.btnPlaceOrder}>
            Place Order Now
          </button>
        </div>

      </form>
    </div>
  );
}

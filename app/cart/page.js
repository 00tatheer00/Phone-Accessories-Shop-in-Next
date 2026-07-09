"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import styles from "./cart.module.css";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  // Price calculations
  const subtotal = cartTotal;
  const shippingThreshold = 250;
  const shippingCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 15.00;
  const estimatedTax = subtotal * 0.08; // 8% sales tax
  const grandTotal = subtotal + shippingCost + estimatedTax;

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.emptyCartIcon}>🛒</div>
        <h2 className={styles.emptyCartTitle}>Your Cart is Empty</h2>
        <p className={styles.emptyCartDesc}>
          Looks like you haven't added any products to your shopping cart yet. Browse our shop for deals!
        </p>
        <Link href="/shop" className={styles.checkoutBtn} style={{ maxWidth: "200px", margin: "0 auto" }}>
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.pageTitle}>Shopping Cart</h1>

      <div className={styles.cartGrid}>
        
        {/* Cart items listing card */}
        <div className={styles.cartItemsCard}>
          <table className={styles.cartTable}>
            <thead>
              <tr className={styles.cartTableHeader}>
                <th style={{ width: "45%" }}>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th style={{ width: "8%", textAlign: "center" }}>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className={styles.cartItemRow}>
                  {/* Title & Image */}
                  <td className={styles.productCell}>
                    <div className={styles.productImgContainer}>
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className={styles.productImg}
                        sizes="70px"
                      />
                    </div>
                    <div className={styles.productDetails}>
                      <span className={styles.productCategory}>{item.category}</span>
                      <Link href="/shop" className={styles.productTitleLink}>
                        {item.title}
                      </Link>
                    </div>
                  </td>

                  {/* Price */}
                  <td className={styles.priceCell}>
                    ${item.price.toFixed(2)}
                  </td>

                  {/* Quantity controls */}
                  <td>
                    <div className={styles.quantityAdjust}>
                      <button
                        className={styles.adjustBtn}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className={styles.quantityInput}
                        value={item.quantity}
                        readOnly
                        aria-label="Quantity input"
                      />
                      <button
                        className={styles.adjustBtn}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Subtotal */}
                  <td className={styles.totalCell}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>

                  {/* Remove */}
                  <td style={{ textAlign: "center" }}>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Summary sidebar */}
        <div className={styles.summaryCard}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span style={{ fontWeight: "700", color: "var(--text-primary)" }}>
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>
              {shippingCost === 0 ? (
                <span style={{ color: "#2b7d41", fontWeight: "700" }}>FREE</span>
              ) : (
                `$${shippingCost.toFixed(2)}`
              )}
            </span>
          </div>

          {shippingCost > 0 && (
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "-8px", marginBottom: "12px", textAlign: "right" }}>
              Spend ${(shippingThreshold - subtotal).toFixed(2)} more for free shipping!
            </div>
          )}

          <div className={styles.summaryRow}>
            <span>Estimated Tax (8%)</span>
            <span>${estimatedTax.toFixed(2)}</span>
          </div>

          <div className={styles.summaryRowBold}>
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          <Link href="/checkout" className={styles.checkoutBtn}>
            Proceed to Checkout
          </Link>

          <Link href="/shop" className={styles.continueShoppingBtn}>
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}

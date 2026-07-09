"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import styles from "./wishlist.module.css";

// Dynamic Pastel Background Colors by Category
const getCategoryBgColor = (category) => {
  switch (category) {
    case "Gaming": return "#dbf5e6"; // Pastel green
    case "Headphone": return "#ebdcf9"; // Pastel purple
    case "Mobile & Tablets": return "#fde8d7"; // Pastel peach
    case "Smartwatches": return "#dceefd"; // Pastel blue
    case "Computer & Laptop": return "#f9e2e7"; // Pastel pink
    case "Television": return "#fbf0d8"; // Pastel yellow
    default: return "#eef1f6"; // General light gray
  }
};

// Simulated Color selection dots by Category
const getCategoryColorDots = (category) => {
  switch (category) {
    case "Gaming":
      return ["#000000", "#ffffff", "#4b5563", "#3b82f6"];
    case "Headphone":
      return ["#f6c3cb", "#97b1a6", "#3c3d40", "#ffffff"];
    case "Mobile & Tablets":
      return ["#111827", "#f3f4f6", "#b45309", "#2563eb"];
    case "Smartwatches":
      return ["#10b981", "#ef4444", "#3b82f6", "#000000"];
    default:
      return ["#000000", "#e2e8f0", "#f87171", "#facc15", "#3b82f6"];
  }
};

export default function Wishlist() {
  const { wishlist, toggleWishlist, moveToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className={styles.emptyWishlist}>
        <div className={styles.emptyIcon}>♡</div>
        <h2 className={styles.emptyTitle}>Your Wishlist is Empty</h2>
        <p className={styles.emptyDesc}>
          You haven't saved any items yet. When you browse the catalog, click the heart icon on any product to save it here.
        </p>
        <Link href="/shop" className={styles.shopBtn}>
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.wishlistContainer}>
      <h1 className={styles.pageTitle}>My Saved Items ({wishlist.length})</h1>

      <div className={styles.wishlistGrid}>
        {wishlist.map((item) => (
          <div key={item.id} className={styles.wishlistCard}>
            
            {/* Delete/Remove button */}
            <button
              className={styles.removeBtn}
              onClick={() => toggleWishlist(item)}
              title="Remove from saved items"
            >
              ✕
            </button>

            <div className={styles.productImgContainer} style={{ backgroundColor: getCategoryBgColor(item.category) }} onClick={() => moveToCart(item)}>
              <Image
                src={item.img}
                alt={item.title}
                fill
                className={styles.productImg}
                sizes="150px"
              />
              {/* Floating quick-cart action button */}
              <button 
                className={styles.floatingCartBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  moveToCart(item);
                }}
                title="Move to Cart"
              >
                +
              </button>
            </div>

            {/* Category & Title */}
            <span className={styles.productCategory}>{item.category}</span>
            <Link href="/shop" className={styles.productTitle}>
              {item.title}
            </Link>

            {/* Price */}
            <div className={styles.priceDisplay}>
              ${item.price.toFixed(2)}
            </div>



          </div>
        ))}
      </div>
    </div>
  );
}

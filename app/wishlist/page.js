"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import styles from "./wishlist.module.css";

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

            {/* Product image */}
            <div className={styles.productImgContainer} onClick={() => moveToCart(item)}>
              <Image
                src={item.img}
                alt={item.title}
                fill
                className={styles.productImg}
                sizes="150px"
              />
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

            {/* Move to cart trigger */}
            <button
              className={styles.btnMoveToCart}
              onClick={() => moveToCart(item)}
            >
              Move to Cart 🛒
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

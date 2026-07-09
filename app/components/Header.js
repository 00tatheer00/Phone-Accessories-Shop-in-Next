"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import styles from "./Header.module.css";

export default function Header() {
  const { cartCount, cartTotal, wishlist } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All Categories");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(searchCategory)}`);
    } else {
      router.push(`/shop`);
    }
  };

  return (
    <div className={styles.headerContainer}>
      {/* 1. Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <ul className={styles.topBarLinks}>
            <li><Link href="/contact">Find a Store</Link></li>
            <li><Link href="/cart">Order Tracking</Link></li>
            <li><Link href="/shop">Shop</Link></li>
          </ul>
          <div className={styles.topBarPromo}>
            <span>Free shipping worldwide for orders over $250!</span>
            <div style={{ display: "flex", gap: "16px" }}>
              <span style={{ cursor: "pointer" }}>USD ($) ▾</span>
              <span style={{ cursor: "pointer" }}>English ▾</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <header className={styles.mainHeader}>
        <div className={styles.headerInner}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>⚡</span>
            <span className={styles.logoText}>digitaz<span className={styles.logoHighlight}>.</span></span>
          </Link>

          {/* Search form */}
          <form className={styles.searchBar} onSubmit={handleSearchSubmit}>
            <select 
              className={styles.searchDropdown}
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              aria-label="Select search category"
            >
              <option>All Categories</option>
              <option>Computer & Laptop</option>
              <option>Camera & Videos</option>
              <option>Television</option>
              <option>Smartwatches</option>
              <option>Gaming</option>
              <option>Mobile & Tablets</option>
              <option>Headphone</option>
            </select>
            <input 
              type="text" 
              placeholder="Search for products..." 
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search query"
            />
            <button type="submit" className={styles.searchBtn} aria-label="Search button">
              🔍
            </button>
          </form>

          {/* Cart / User Info */}
          <div className={styles.headerRight}>
            <Link href="/wishlist" className={styles.headerIconWrapper} title="Wishlist">
              ♡
              <span className={styles.iconBadge}>{wishlist.length}</span>
            </Link>
            
            <div className={styles.headerIconWrapper} title="User Profile">
              👤
            </div>

            <Link href="/cart" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className={styles.headerIconWrapper} title="Shopping Cart">
                🛒
                <span className={styles.iconBadge}>{cartCount}</span>
              </div>
              <div className={styles.cartInfo}>
                <span>Your Cart:</span>
                <span className={styles.cartValue}>${cartTotal.toFixed(2)}</span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* 3. Category Nav Bar (Blue) */}
      <div className={styles.categoryNavBar}>
        <div className={styles.navInner}>
          <button className={styles.departmentBtn} onClick={() => router.push("/shop")}>
            <span>☰ Shop By Department</span>
          </button>
          <ul className={styles.navItems}>
            <li className={`${styles.navItem} ${pathname === "/" ? styles.navItemActive : ""}`}>
              <Link href="/">Home</Link>
            </li>
            <li className={`${styles.navItem} ${pathname === "/shop" ? styles.navItemActive : ""}`}>
              <Link href="/shop">Shop</Link>
            </li>
            <li className={`${styles.navItem} ${pathname === "/wishlist" ? styles.navItemActive : ""}`}>
              <Link href="/wishlist">Wishlist</Link>
            </li>
            <li className={`${styles.navItem} ${pathname === "/cart" ? styles.navItemActive : ""}`}>
              <Link href="/cart">Cart</Link>
            </li>
            <li className={`${styles.navItem} ${pathname === "/contact" ? styles.navItemActive : ""}`}>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li className={styles.navItem} style={{ borderLeft: "1px solid rgba(255,255,255,0.15)" }}>
              <Link href="/shop" style={{ color: "#ffb900" }}>🔥 Amazing Deals</Link>
            </li>
          </ul>
          <div className={styles.navExtra}>
            <span className={styles.navExtraLink}>📞 1-800-888-9999</span>
            <Link href="/cart" className={styles.navExtraLink}>Recently Viewed</Link>
            <Link href="/checkout" className={styles.navExtraLink}>Order Status</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

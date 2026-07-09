"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCart } from "../context/CartContext";
import styles from "./shop.module.css";

// Complete Product Database
const PRODUCTS_DATABASE = [
  { id: "p1", category: "Gaming", title: "PlayStation 5 Console Digital Edition Slim", price: 399.99, rating: 5, reviews: 112, img: "/images/ps5-controller.png", discount: "-10%", oldPrice: "$449.00" },
  { id: "p2", category: "Gaming", title: "DualSense Edge Wireless Controller PS5", price: 179.99, rating: 5, reviews: 48, img: "/images/ps5-controller.png" },
  { id: "p3", category: "Headphone", title: "Apple AirPods Max Wireless Over-Ear Headphones - Space Gray", price: 494.10, rating: 5, reviews: 124, img: "/images/pink-headphones.png", discount: "-10%", oldPrice: "$549.00" },
  { id: "p4", category: "Headphone", title: "Apple AirPods Max Wireless Over-Ear Headphones - Pastel Pink", price: 494.10, rating: 5, reviews: 92, img: "/images/pink-headphones.png" },
  { id: "p5", category: "Mobile & Tablets", title: "Apple iPad Pro 12.9-inch M2 Wi-Fi 256GB - Space Gray", price: 1011.08, rating: 5, reviews: 88, img: "/images/iphone-hero.png", discount: "-8%", oldPrice: "$1099.00" },
  { id: "p6", category: "Computer & Laptop", title: "MacBook Air 13-inch M3 Chip 8GB RAM 256GB SSD", price: 967.12, rating: 4, reviews: 76, img: "/images/smartwatch.png", discount: "-12%", oldPrice: "$1099.00" },
  { id: "p7", category: "Computer & Laptop", title: "MacBook Pro 14-inch M3 Pro Chip 512GB Space Black", price: 1899.05, rating: 5, reviews: 45, img: "/images/smartwatch.png", discount: "-5%", oldPrice: "$1999.00" },
  { id: "p8", category: "Television", title: "Sceptre 50-inch Class 4K UHD LED TV (U515CV-U)", price: 299.99, rating: 4, reviews: 54, img: "/images/marshall-speaker.png", discount: "-25%", oldPrice: "$399.99" },
  { id: "p9", category: "Mobile & Tablets", title: "iPhone 15 Pro Max 256GB - Natural Titanium Unlocked", price: 1139.05, rating: 5, reviews: 142, img: "/images/iphone-hero.png", discount: "-5%", oldPrice: "$1199.00" },
  { id: "p10", category: "Smartwatches", title: "Watch Creator Series 4 GPS + Cellular 44mm Active Strap", price: 382.50, rating: 5, reviews: 36, img: "/images/smartwatch.png", discount: "-15%", oldPrice: "$450.00" },
  { id: "p11", category: "Headphone", title: "B&O Beoplay E8 3.0 Wireless Earbuds - Green", price: 262.50, rating: 5, reviews: 29, img: "/images/beoplay-earbuds.png", discount: "-25%", oldPrice: "$350.00" },
  { id: "p12", category: "Accessories", title: "Marshall Acton III Bluetooth Speaker Classic Black", price: 195.99, rating: 4, reviews: 63, img: "/images/marshall-speaker.png", discount: "-30%", oldPrice: "$279.99" },
  { id: "p13", category: "Accessories", title: "Portable Power Bank 10000mAh Dual USB Port Charger", price: 31.99, rating: 4, reviews: 154, img: "/images/beoplay-earbuds.png", discount: "-20%", oldPrice: "$39.99" },
  { id: "p14", category: "Gaming", title: "Nintendo Switch OLED Model - White Console", price: 329.99, rating: 5, reviews: 218, img: "/images/ps5-controller.png" },
  { id: "p15", category: "Smartwatches", title: "SmartWatch Active Series 3 Green Titanium 40mm", price: 254.99, rating: 4, reviews: 49, img: "/images/smartwatch.png", discount: "-15%", oldPrice: "$299.99" },
  { id: "p16", category: "Mobile & Tablets", title: "iPhone 15 Unlocked 128GB - Blue Sky Edition", price: 749.99, rating: 5, reviews: 88, img: "/images/iphone-hero.png", discount: "-6%", oldPrice: "$799.00" },
  { id: "p17", category: "Accessories", title: "Ultra High-Speed HDMI 2.1 Braided Cable 6ft", price: 12.99, rating: 4, reviews: 310, img: "/images/beoplay-earbuds.png" },
  { id: "p18", category: "Accessories", title: "Dual Qi Wireless Charging Stand 15W Fast Charge", price: 24.50, rating: 4, reviews: 140, img: "/images/beoplay-earbuds.png" },
  { id: "p19", category: "Accessories", title: "Wireless Ergonomic Keyboard and Mouse Combo", price: 54.99, rating: 5, reviews: 75, img: "/images/smartwatch.png" },
];

function ShopContent() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const searchParams = useSearchParams();

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Shimmer skeleton loading state
  const [isLoading, setIsLoading] = useState(true);

  // Read URL search params
  useEffect(() => {
    const urlQuery = searchParams.get("search");
    const urlCategory = searchParams.get("category");

    if (urlQuery) {
      setSearchQuery(urlQuery);
    }
    if (urlCategory && urlCategory !== "All Categories") {
      setSelectedCategories([urlCategory]);
    }
  }, [searchParams]);

  // Simulated Loader Delay on filter updates
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 750);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategories, priceRange, sortBy]);

  // Category counts computation
  const getCategoryCount = (category) => {
    return PRODUCTS_DATABASE.filter((p) => p.category === category).length;
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceRange("all");
    setSortBy("default");
  };

  // Filtering Logic
  const filteredProducts = PRODUCTS_DATABASE.filter((product) => {
    // 1. Search Query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const matchTitle = product.title.toLowerCase().includes(query);
      const matchCat = product.category.toLowerCase().includes(query);
      if (!matchTitle && !matchCat) return false;
    }

    // 2. Categories
    if (selectedCategories.length > 0) {
      if (!selectedCategories.includes(product.category)) return false;
    }

    // 3. Price Ranges
    if (priceRange !== "all") {
      const price = product.price;
      if (priceRange === "under-50" && price >= 50) return false;
      if (priceRange === "50-150" && (price < 50 || price > 150)) return false;
      if (priceRange === "150-500" && (price < 150 || price > 500)) return false;
      if (priceRange === "500-1000" && (price < 500 || price > 1000)) return false;
      if (priceRange === "over-1000" && price < 1000) return false;
    }

    return true;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "title") return a.title.localeCompare(b.title);
    return 0; // default order
  });

  return (
    <div className={styles.shopContainer}>
      {/* Sidebar Filter Panel */}
      <aside className={styles.sidebar}>
        
        {/* Search */}
        <div className={styles.filterBlock}>
          <h3 className={styles.filterTitle}>Search Catalog</h3>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search products..."
              className={styles.sidebarSearchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search catalog input"
            />
            {searchQuery && (
              <button 
                type="button" 
                className={styles.sidebarSearchBtn}
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Categories Checkboxes */}
        <div className={styles.filterBlock}>
          <h3 className={styles.filterTitle}>Categories</h3>
          <ul className={styles.categoryList}>
            {["Computer & Laptop", "Camera & Videos", "Television", "Smartwatches", "Gaming", "Mobile & Tablets", "Headphone", "Accessories"].map((cat) => (
              <li key={cat}>
                <label className={styles.categoryLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkboxInput}
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryToggle(cat)}
                  />
                  <span>{cat}</span>
                  <span className={styles.categoryCount}>({getCategoryCount(cat)})</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Ranges Radio */}
        <div className={styles.filterBlock}>
          <h3 className={styles.filterTitle}>Price Range</h3>
          <div className={styles.priceOptions}>
            {[
              { id: "all", label: "All Prices" },
              { id: "under-50", label: "Under $50" },
              { id: "50-150", label: "$50 - $150" },
              { id: "150-500", label: "$150 - $500" },
              { id: "500-1000", label: "$500 - $1,000" },
              { id: "over-1000", label: "Over $1,000" },
            ].map((rng) => (
              <label key={rng.id} className={styles.priceRadioLabel}>
                <input
                  type="radio"
                  name="priceRangeRadio"
                  className={styles.radioInput}
                  checked={priceRange === rng.id}
                  onChange={() => setPriceRange(rng.id)}
                />
                <span>{rng.label}</span>
              </label>
            ))}
          </div>
        </div>

      </aside>

      {/* Main Catalog Area */}
      <main className={styles.catalogPanel}>
        
        {/* Sorting header */}
        <div className={styles.catalogHeader}>
          <div className={styles.resultsCount}>
            Showing <span className={styles.resultsBold}>{sortedProducts.length}</span> results in store
          </div>
          
          <div className={styles.sortWrapper}>
            <span>Sort By:</span>
            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products selector"
            >
              <option value="default">Default Sort</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Average Rating</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Active badges list */}
        {(selectedCategories.length > 0 || priceRange !== "all" || searchQuery !== "") && (
          <div className={styles.activeFilters}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-secondary)" }}>Active Filters:</span>
            
            {searchQuery && (
              <div className={styles.filterBadge} onClick={() => setSearchQuery("")}>
                Search: "{searchQuery}" <span className={styles.filterBadgeRemove}>✕</span>
              </div>
            )}

            {selectedCategories.map((c) => (
              <div key={c} className={styles.filterBadge} onClick={() => handleCategoryToggle(c)}>
                Category: {c} <span className={styles.filterBadgeRemove}>✕</span>
              </div>
            ))}

            {priceRange !== "all" && (
              <div className={styles.filterBadge} onClick={() => setPriceRange("all")}>
                Price: {priceRange.replace("-", " to ")} <span className={styles.filterBadgeRemove}>✕</span>
              </div>
            )}

            <button className={styles.clearFiltersBtn} onClick={clearAllFilters}>Clear All</button>
          </div>
        )}

        {/* Catalog Grid */}
        {isLoading ? (
          <div className={styles.productsGrid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.skeletonCard}>
                <div className={`${styles.skeletonImage} ${styles.shimmer}`} />
                <div className={`${styles.skeletonCategory} ${styles.shimmer}`} />
                <div className={`${styles.skeletonTitle} ${styles.shimmer}`} />
                <div className={`${styles.skeletonTitleShort} ${styles.shimmer}`} />
                <div className={`${styles.skeletonRating} ${styles.shimmer}`} />
                <div className={styles.skeletonPriceRow}>
                  <div className={`${styles.skeletonPrice} ${styles.shimmer}`} />
                  <div className={`${styles.skeletonBtn} ${styles.shimmer}`} />
                </div>
              </div>
            ))}
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className={styles.productsGrid}>
            {sortedProducts.map((product) => (
              <div key={product.id} className={styles.shopProductCard}>
                {product.discount && <span className={styles.discountBadge}>{product.discount}</span>}
                
                {/* Wishlist toggle */}
                <button
                  className={`${styles.wishlistBtn} ${isInWishlist(product.id) ? styles.wishlistBtnActive : ""}`}
                  onClick={() => toggleWishlist(product)}
                  title="Toggle Wishlist"
                >
                  {isInWishlist(product.id) ? "♥" : "♡"}
                </button>

                <div className={styles.productImgContainer} onClick={() => addToCart(product)}>
                  <Image
                    src={product.img}
                    alt={product.title}
                    fill
                    className={styles.productImg}
                    sizes="180px"
                  />
                </div>

                <span className={styles.productCategory}>{product.category}</span>
                <h4 className={styles.productTitle} onClick={() => addToCart(product)}>{product.title}</h4>

                <div className={styles.ratingContainer}>
                  {"★".repeat(product.rating)}
                  {"☆".repeat(5 - product.rating)}
                  <span className={styles.ratingCount}>({product.reviews})</span>
                </div>

                <div className={styles.cartActionRow}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
                    <span className={styles.newPrice}>${product.price.toFixed(2)}</span>
                    {product.oldPrice && <span className={styles.oldPrice}>{product.oldPrice}</span>}
                  </div>
                  <button className={styles.btnAddToCart} onClick={() => addToCart(product)}>
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyTitle}>No Products Found</div>
            <p>We couldn't find any products matching your search criteria. Try resetting your active filters.</p>
            <button 
              className={styles.btnAddToCart} 
              style={{ marginTop: "24px", padding: "10px 24px" }}
              onClick={clearAllFilters}
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div style={{ padding: "80px", textAlign: "center", color: "var(--text-secondary)" }}>Loading Shop Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}

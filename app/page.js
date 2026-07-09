"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./context/CartContext";
import styles from "./page.module.css";

// Category list
const CATEGORIES = [
  { id: "laptop", name: "Computer & Laptop", icon: "💻" },
  { id: "camera", name: "Camera & Videos", icon: "📷" },
  { id: "tv", name: "Television", icon: "📺" },
  { id: "watch", name: "Smartwatches", icon: "⌚" },
  { id: "gaming", name: "Gaming", icon: "🎮" },
  { id: "mobile", name: "Mobile & Tablets", icon: "📱" },
  { id: "headphone", name: "Headphone", icon: "🎧" },
  { id: "accessories", name: "Accessories", icon: "🔌" },
];

// Product listings for Today's Featured Deals
const FEATURED_DEALS = [
  {
    id: "deal-1",
    category: "Smartwatches",
    title: "Watch Creator Series 4 GPS + Cellular 44mm Active Strap",
    img: "/images/smartwatch.png",
    discount: "-15%",
    oldPrice: "$450.00",
    newPrice: "$382.50",
    price: 382.50,
    rating: 5,
    reviews: 14,
    sold: 12,
    total: 20,
  },
  {
    id: "deal-2",
    category: "Headphone",
    title: "AirPods Max Wireless Over-Ear Headphones - Space Gray",
    img: "/images/pink-headphones.png",
    discount: "-10%",
    oldPrice: "$549.00",
    newPrice: "$494.10",
    price: 494.10,
    rating: 5,
    reviews: 42,
    sold: 16,
    total: 30,
  },
  {
    id: "deal-3",
    category: "Mobile & Tablets",
    title: "Apple iPad Pro 12.9-inch Wi-Fi 256GB - Space Gray",
    img: "/images/iphone-hero.png",
    discount: "-8%",
    oldPrice: "$1099.00",
    newPrice: "$1011.08",
    price: 1011.08,
    rating: 5,
    reviews: 29,
    sold: 5,
    total: 25,
  },
  {
    id: "deal-4",
    category: "Computer & Laptop",
    title: "MacBook Air 13-inch M3 Chip 8GB RAM 256GB SSD",
    img: "/images/smartwatch.png",
    discount: "-12%",
    oldPrice: "$1099.00",
    newPrice: "$967.12",
    price: 967.12,
    rating: 4,
    reviews: 18,
    sold: 9,
    total: 15,
  },
  {
    id: "deal-5",
    category: "Television",
    title: "Sceptre 50-inch Class 4K UHD LED TV (U515CV-U)",
    img: "/images/marshall-speaker.png",
    discount: "-25%",
    oldPrice: "$399.99",
    newPrice: "$299.99",
    price: 299.99,
    rating: 4,
    reviews: 8,
    sold: 4,
    total: 10,
  },
  {
    id: "deal-6",
    category: "Mobile & Tablets",
    title: "iPhone 15 Pro Max 256GB - Natural Titanium Unlocked",
    img: "/images/iphone-hero.png",
    discount: "-5%",
    oldPrice: "$1199.00",
    newPrice: "$1139.05",
    price: 1139.05,
    rating: 5,
    reviews: 55,
    sold: 18,
    total: 20,
  },
];

// Product listings for Trending This Week (tabbed grid)
const TRENDING_PRODUCTS = {
  bestSeller: [
    { id: "trend-1", category: "Mobile & Tablets", title: "iPhone 15 Pro Max 256GB Blue Titanium", img: "/images/iphone-hero.png", discount: "-10%", oldPrice: "$1199.00", newPrice: "$1079.10", price: 1079.10, rating: 5, reviews: 31 },
    { id: "trend-2", category: "Computer & Laptop", title: "MacBook Pro 14-inch M3 Pro Chip 512GB", img: "/images/smartwatch.png", discount: "-5%", oldPrice: "$1999.00", newPrice: "$1899.05", price: 1899.05, rating: 5, reviews: 19 },
    { id: "trend-3", category: "Smartwatches", title: "SmartWatch Active Series 3 Green Titanium", img: "/images/smartwatch.png", discount: "-15%", oldPrice: "$299.99", newPrice: "$254.99", price: 254.99, rating: 4, reviews: 11 },
    { id: "trend-4", category: "Accessories", title: "Portable Power Bank 10000mAh Dual Port", img: "/images/beoplay-earbuds.png", discount: "-20%", oldPrice: "$39.99", newPrice: "$31.99", price: 31.99, rating: 4, reviews: 25 },
  ],
  sales: [
    { id: "trend-5", category: "Gaming", title: "PlayStation 5 Console Digital Edition", img: "/images/ps5-controller.png", discount: "-15%", oldPrice: "$399.99", newPrice: "$339.99", price: 339.99, rating: 5, reviews: 68 },
    { id: "trend-6", category: "Accessories", title: "Marshall Acton III Bluetooth Speaker", img: "/images/marshall-speaker.png", discount: "-30%", oldPrice: "$279.99", newPrice: "$195.99", price: 195.99, rating: 4, reviews: 14 },
  ],
  featured: [
    { id: "trend-7", category: "Headphone", title: "B&O Beoplay E8 3.0 Wireless Earbuds - Green", img: "/images/beoplay-earbuds.png", discount: "-25%", oldPrice: "$350.00", newPrice: "$262.50", price: 262.50, rating: 5, reviews: 22 },
  ],
  newProducts: [
    { id: "trend-8", category: "Gaming", title: "DualSense Edge Wireless Controller PS5", img: "/images/ps5-controller.png", discount: "-10%", oldPrice: "$199.99", newPrice: "$179.99", price: 179.99, rating: 5, reviews: 8 },
  ],
};

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

export default function Storefront() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  // Timer countdown values (matching 06:15:48 starting value)
  const [timeLeft, setTimeLeft] = useState(22548); // 6 hours, 15 minutes, 48 seconds in seconds

  // Trending section Active Tab
  const [activeTab, setActiveTab] = useState("bestSeller");

  // Active color for the center-featured headphone
  const [featuredColor, setFeaturedColor] = useState("pink");

  // Countdown timer decrement
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Convert seconds to hours:minutes:seconds
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  };

  const timerString = formatTime(timeLeft);

  return (
    <div className={styles.container}>
      {/* 4. Hero Slider Section */}
      <section id="hero" className={styles.heroSlider}>
        <div className={styles.heroBackground}>
          <div className={`${styles.heroGlowCircle} ${styles.heroGlow1}`} />
          <div className={`${styles.heroGlowCircle} ${styles.heroGlow2}`} />
        </div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <span className={styles.heroSub}>DualSense Wireless Controller</span>
            <h1 className={styles.heroTitle}>Bring Gaming Worlds To Life</h1>
            <div className={styles.heroPrice}>
              <span className={styles.heroPriceLabel}>Starting at</span>
              <span className={styles.heroPriceValue}>$449.99</span>
            </div>
            <button 
              className={styles.heroCta} 
              onClick={() => addToCart({
                id: "hero-controller",
                title: "PlayStation 5 DualSense Wireless Controller Special Combo Pack",
                price: 449.99,
                img: "/images/ps5-controller.png",
                category: "Gaming"
              })}
            >
              Shop Now • Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* 5. Horizontal Categories List */}
      <section className={styles.categoriesRow}>
        <div className={styles.categoriesRowInner}>
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} href={`/shop?category=${cat.name}`} className={styles.categoryItem}>
              <div className={styles.categoryIconBg}>{cat.icon}</div>
              <span className={styles.categoryText}>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Triple Promo Banners */}
      <section className={styles.tripleGrid}>
        {/* Banner 1 */}
        <div className={styles.promoBannerCard}>
          <div className={styles.promoBannerLeft}>
            <span className={styles.promoBannerTag}>Get Rewarded</span>
            <h3 className={styles.promoBannerTitle}>Save Up 50% Off</h3>
            <Link href="/shop" className={styles.promoBannerBtn}>Shop Now</Link>
          </div>
          <div className={styles.promoBannerImgWrapper}>
            <Image 
              src="/images/iphone-hero.png"
              alt="Sleek Tablet promo"
              fill
              className={styles.promoBannerImg}
              sizes="100px"
            />
          </div>
        </div>

        {/* Banner 2 */}
        <div className={styles.promoBannerCard}>
          <div className={styles.promoBannerLeft}>
            <span className={`${styles.promoBannerTag} ${styles.promoBannerTagAlt}`}>New Arrivals</span>
            <h3 className={styles.promoBannerTitle}>B&O Beoplay E8 3.0</h3>
            <button 
              className={styles.promoBannerBtn} 
              onClick={() => addToCart({
                id: "trend-7",
                title: "B&O Beoplay E8 3.0 Wireless Earbuds - Green",
                price: 262.50,
                img: "/images/beoplay-earbuds.png",
                category: "Headphone"
              })}
            >
              Add to Cart
            </button>
          </div>
          <div className={styles.promoBannerImgWrapper}>
            <Image 
              src="/images/beoplay-earbuds.png"
              alt="Beoplay E8 Wireless Earbuds"
              fill
              className={styles.promoBannerImg}
              sizes="100px"
            />
          </div>
        </div>

        {/* Banner 3 */}
        <div className={styles.promoBannerCard}>
          <div className={styles.promoBannerLeft}>
            <span className={`${styles.promoBannerTag} ${styles.promoBannerTagRed}`}>Top Seller</span>
            <h3 className={styles.promoBannerTitle}>Beauty on Your Wrist</h3>
            <Link href="/shop?category=Smartwatches" className={styles.promoBannerBtn}>Shop Now</Link>
          </div>
          <div className={styles.promoBannerImgWrapper}>
            <Image 
              src="/images/smartwatch.png"
              alt="Smartwatch promo"
              fill
              className={styles.promoBannerImg}
              sizes="100px"
            />
          </div>
        </div>
      </section>

      {/* 7. Today's Featured Deals */}
      <section id="deals" className={styles.dealsSection}>
        <div className={styles.dealsHeader}>
          <h2 className={styles.dealsHeaderTitle}>Today's Featured Deals</h2>
          <div className={styles.dealsTimer}>
            <span>End in:</span>
            <div className={styles.timerContainer}>
              <div className={styles.timerBlock}>{timerString.hours}</div>
              <div className={styles.timerBlock}>{timerString.minutes}</div>
              <div className={styles.timerBlock}>{timerString.seconds}</div>
            </div>
          </div>
        </div>

        <div className={styles.dealsGrid}>
          {FEATURED_DEALS.map((deal) => (
            <div key={deal.id} className={styles.productCard}>
              <span className={styles.discountBadge}>{deal.discount}</span>
              
              {/* Wishlist toggle heart */}
              <button 
                className={`${styles.wishlistBtn} ${isInWishlist(deal.id) ? styles.wishlistBtnActive : ""}`}
                onClick={() => toggleWishlist(deal)}
                title={isInWishlist(deal.id) ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                {isInWishlist(deal.id) ? "♥" : "♡"}
              </button>

              <div className={styles.productImgContainer} style={{ backgroundColor: getCategoryBgColor(deal.category) }} onClick={() => addToCart(deal)}>
                <Image 
                  src={deal.img}
                  alt={deal.title}
                  fill
                  className={styles.productImg}
                  sizes="150px"
                />
                {/* Floating quick-cart action button */}
                <button 
                  className={styles.floatingCartBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(deal);
                  }}
                  title="Quick Add to Cart"
                >
                  +
                </button>
              </div>
              <span className={styles.productCategory}>{deal.category}</span>
              <h4 className={styles.productTitle} onClick={() => addToCart(deal)}>{deal.title}</h4>
              
              <div className={styles.ratingContainer}>
                {"★".repeat(deal.rating)}
                {"☆".repeat(5 - deal.rating)}
                <span className={styles.ratingCount}>({deal.reviews})</span>
              </div>

              <div className={styles.priceRow}>
                <span className={styles.newPrice}>{deal.newPrice}</span>
                <span className={styles.oldPrice}>{deal.oldPrice}</span>
              </div>

              {/* Color dots bar */}
              <div className={styles.colorSelectionBar} style={{ marginBottom: "16px" }}>
                <span className={styles.colorPillLabel}>Colors</span>
                <div className={styles.colorSelectionDots}>
                  {getCategoryColorDots(deal.category).map((color, idx) => (
                    <span key={idx} className={styles.selectionDot} style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className={styles.stockWrapper}>
                <div className={styles.stockTexts}>
                  <span>Already sold: <span className={styles.stockBold}>{deal.sold}</span></span>
                  <span>Available: <span className={styles.stockBold}>{deal.total - deal.sold}</span></span>
                </div>
                <div className={styles.stockProgress}>
                  <div 
                    className={styles.stockBar} 
                    style={{ width: `${(deal.sold / deal.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Double Promo Banners */}
      <section className={styles.doubleGrid}>
        {/* Banner Large (Speaker) */}
        <div className={styles.doubleCardLarge}>
          <div className={styles.promoBannerLeft}>
            <span className={styles.promoBannerTag}>Get Rewarded</span>
            <h3 className={styles.promoBannerTitle} style={{ fontSize: "1.4rem" }}>Super Cheap Price<br />Earn 20% Back</h3>
            <button 
              className={styles.promoBannerBtn} 
              style={{ padding: "10px 24px" }} 
              onClick={() => addToCart({
                id: "trend-6",
                title: "Marshall Acton III Bluetooth Speaker",
                price: 195.99,
                img: "/images/marshall-speaker.png",
                category: "Accessories"
              })}
            >
              Add to Cart
            </button>
          </div>
          <div className={styles.doubleCardImgWrapper}>
            <Image 
              src="/images/marshall-speaker.png"
              alt="Marshall speaker promotion"
              fill
              className={styles.promoBannerImg}
              sizes="140px"
            />
          </div>
        </div>

        {/* Banner Small 1 (Powerbank) */}
        <div className={styles.doubleCardSmall}>
          <span className={styles.productCategory}>Power Bank</span>
          <h3 className={styles.promoBannerTitle}>Charger Power Bank 10000mAh</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <span className={styles.productCategory}>Starting At</span>
              <div className={styles.newPrice} style={{ fontSize: "1.2rem", marginTop: "4px" }}>$79.99</div>
            </div>
            <button 
              className={styles.btnAddToCart} 
              onClick={() => addToCart({
                id: "accessories-power-bank",
                title: "Charger Power Bank 10000mAh Quick Charge Type C",
                price: 79.99,
                img: "/images/beoplay-earbuds.png",
                category: "Accessories"
              })}
            >
              Add 🛒
            </button>
          </div>
        </div>

        {/* Banner Small 2 (Switch controller) */}
        <div className={styles.doubleCardSmall}>
          <span className={styles.discountBadge} style={{ position: "static", alignSelf: "flex-start", marginBottom: "8px" }}>Discount 30% Off</span>
          <h3 className={styles.promoBannerTitle}>Controller for Switch / OLED</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <span className={styles.productCategory}>Shop Deals</span>
              <div className={styles.newPrice} style={{ fontSize: "1.2rem", marginTop: "4px" }}>$34.99</div>
            </div>
            <button 
              className={styles.btnAddToCart} 
              onClick={() => addToCart({
                id: "gaming-switch-controller",
                title: "Controller for Switch / OLED Wireless Gamepad",
                price: 34.99,
                img: "/images/ps5-controller.png",
                category: "Gaming"
              })}
            >
              Add 🛒
            </button>
          </div>
        </div>
      </section>

      {/* 9. Trending This Week */}
      <section id="trending" className={styles.trendingSection}>
        <div className={styles.trendingHeader}>
          <h2 className={styles.dealsHeaderTitle}>Trending This Week</h2>
          <ul className={styles.tabsList}>
            <li 
              className={`${styles.tabItem} ${activeTab === "bestSeller" ? styles.tabItemActive : ""}`}
              onClick={() => setActiveTab("bestSeller")}
            >
              Best Seller
            </li>
            <li 
              className={`${styles.tabItem} ${activeTab === "sales" ? styles.tabItemActive : ""}`}
              onClick={() => setActiveTab("sales")}
            >
              Sales
            </li>
            <li 
              className={`${styles.tabItem} ${activeTab === "featured" ? styles.tabItemActive : ""}`}
              onClick={() => setActiveTab("featured")}
            >
              Featured
            </li>
            <li 
              className={`${styles.tabItem} ${activeTab === "newProducts" ? styles.tabItemActive : ""}`}
              onClick={() => setActiveTab("newProducts")}
            >
              New Products
            </li>
          </ul>
        </div>

        <div className={styles.trendingGrid}>
          {TRENDING_PRODUCTS[activeTab]?.slice(0, 4).map((product, index) => (
            <div key={index} className={styles.productCard}>
              <span className={styles.discountBadge}>{product.discount}</span>
              <button 
                className={`${styles.wishlistBtn} ${isInWishlist(product.id) ? styles.wishlistBtnActive : ""}`}
                onClick={() => toggleWishlist(product)}
                title="Wishlist"
              >
                ♥
              </button>
              <div className={styles.productImgContainer} style={{ backgroundColor: getCategoryBgColor(product.category) }} onClick={() => addToCart(product)}>
                <Image src={product.img} alt={product.title} fill className={styles.productImg} sizes="150px" />
                <button 
                  className={styles.floatingCartBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  +
                </button>
              </div>
              <span className={styles.productCategory}>{product.category}</span>
              <h4 className={styles.productTitle} onClick={() => addToCart(product)}>{product.title}</h4>
              <div className={styles.ratingContainer}>★★★★★ <span className={styles.ratingCount}>({product.reviews})</span></div>
              <div className={styles.priceRow}>
                <span className={styles.newPrice}>${product.price.toFixed(2)}</span>
                <span className={styles.oldPrice}>{product.oldPrice}</span>
              </div>
              <div className={styles.colorSelectionBar}>
                <span className={styles.colorPillLabel}>Colors</span>
                <div className={styles.colorSelectionDots}>
                  {getCategoryColorDots(product.category).map((color, idx) => (
                    <span key={idx} className={styles.selectionDot} style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Middle FEATURED headphone card layout in trending grid */}
          <div className={styles.trendingGridFeatured}>
            <div className={styles.featuredImgContainer} onClick={() => addToCart({
              id: "featured-centerpiece",
              title: `Apple AirPods Max Wireless Headphone (${featuredColor})`,
              price: 129.99,
              img: "/images/pink-headphones.png",
              category: "Headphone"
            })}>
              <Image 
                src="/images/pink-headphones.png" 
                alt="Featured Headphones Centerpiece"
                fill 
                className={styles.productImg}
                sizes="180px"
              />
            </div>
            
            <div className={styles.featuredColorOptions}>
              <span 
                className={`${styles.colorBullet} ${featuredColor === "pink" ? styles.colorBulletActive : ""}`} 
                style={{ backgroundColor: "#f6c3cb" }}
                onClick={() => setFeaturedColor("pink")}
                title="Pink"
              />
              <span 
                className={`${styles.colorBullet} ${featuredColor === "green" ? styles.colorBulletActive : ""}`} 
                style={{ backgroundColor: "#97b1a6" }}
                onClick={() => setFeaturedColor("green")}
                title="Green"
              />
              <span 
                className={`${styles.colorBullet} ${featuredColor === "white" ? styles.colorBulletActive : ""}`} 
                style={{ backgroundColor: "#f2f1ed" }}
                onClick={() => setFeaturedColor("white")}
                title="White"
              />
              <span 
                className={`${styles.colorBullet} ${featuredColor === "black" ? styles.colorBulletActive : ""}`} 
                style={{ backgroundColor: "#3c3d40" }}
                onClick={() => setFeaturedColor("black")}
                title="Black"
              />
            </div>

            <span className={styles.productCategory}>Headphone</span>
            <h4 className={styles.productTitle} style={{ textAlign: "center" }} onClick={() => addToCart({
              id: "featured-centerpiece",
              title: `Apple AirPods Max Wireless Headphone (${featuredColor})`,
              price: 129.99,
              img: "/images/pink-headphones.png",
              category: "Headphone"
            })}>
              Apple AirPods Max Premium Headset Special
            </h4>
            <div className={styles.ratingContainer} style={{ justifyContent: "center" }}>★★★★★ <span className={styles.ratingCount}>(96)</span></div>
            <div className={styles.priceRow} style={{ justifyContent: "center" }}>
              <span className={styles.newPrice} style={{ fontSize: "1.2rem" }}>$129.99</span>
            </div>
            <button 
              className={styles.btnAddToCart} 
              style={{ width: "90%" }}
              onClick={() => addToCart({
                id: "featured-centerpiece",
                title: `Apple AirPods Max Wireless Headphone (${featuredColor})`,
                price: 129.99,
                img: "/images/pink-headphones.png",
                category: "Headphone"
              })}
            >
              Add to Cart 🛒
            </button>
          </div>
        </div>
      </section>

      {/* 10. Bottom Banner */}
      <section className={styles.bottomPromoBanner}>
        <div className={styles.bottomPromoInner}>
          <div className={styles.bottomPromoLeft}>
            <span className={styles.bottomPromoSub}>New Collection</span>
            <h2 className={styles.bottomPromoTitle}>Up to 30% Off <br />Instant Discount</h2>
            <p className={styles.bottomPromoDesc}>Applicable on debit cards, credit cards, and net banking.</p>
            <button className={styles.heroCta} style={{ backgroundColor: "#233a95", color: "white" }} onClick={() => alert("Discount code digitaz30 applied!")}>
              Apply Code
            </button>
          </div>
          <div className={styles.bottomPromoImgWrapper}>
            <Image 
              src="/images/iphone-colors.png"
              alt="MacBook display representation"
              fill
              className={styles.heroImage}
              sizes="250px"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { Outfit, Inter } from "next/font/google";
import { useState, useEffect } from "react";
import Image from "next/image";
import "./globals.css";
import { CartProvider, useCart } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styles from "./layout.module.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Simulated Sales Data
const SIMULATED_SALES = [
  { city: "Chicago, USA", product: "DualSense Edge PS5 Controller", img: "/images/ps5-controller.png" },
  { city: "Paris, France", product: "B&O Beoplay E8 3.0 Earbuds", img: "/images/beoplay-earbuds.png" },
  { city: "Tokyo, Japan", product: "AirPods Max Wireless Headphones", img: "/images/pink-headphones.png" },
  { city: "London, UK", product: "Marshall Acton III Speaker", img: "/images/marshall-speaker.png" },
  { city: "Berlin, Germany", product: "Watch Creator Series 4 GPS", img: "/images/smartwatch.png" },
  { city: "Toronto, Canada", product: "iPad Pro 12.9-inch Space Gray", img: "/images/iphone-hero.png" },
];

function ECommerceAppWrapper({ children }) {
  const { toasts, removeToast } = useCart();
  
  // Preloader active state
  const [preloaderActive, setPreloaderActive] = useState(true);

  // Sales pop notification state
  const [salesPop, setSalesPop] = useState(null);
  const [salesPopVisible, setSalesPopVisible] = useState(false);

  // Preloader fadeout timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloaderActive(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Sales notification pop cycle
  useEffect(() => {
    // Initial delay before first popup
    let popTimer;
    
    const triggerPop = () => {
      const randomSale = SIMULATED_SALES[Math.floor(Math.random() * SIMULATED_SALES.length)];
      setSalesPop(randomSale);
      setSalesPopVisible(true);
      
      // Hide after 5 seconds
      popTimer = setTimeout(() => {
        setSalesPopVisible(false);
        // Reschedule next pop in 20 seconds
        popTimer = setTimeout(triggerPop, 20000);
      }, 5000);
    };

    // First trigger after 8 seconds
    popTimer = setTimeout(triggerPop, 8000);

    return () => clearTimeout(popTimer);
  }, []);

  return (
    <>
      {/* 1. Website Preloader overlay */}
      <div className={`${styles.preloader} ${!preloaderActive ? styles.preloaderHidden : ""}`}>
        <div className={styles.spinnerContainer}>
          <div className={styles.spinnerRing} />
          <span className={styles.spinnerLogo}>⚡ digitaz.</span>
        </div>
      </div>

      {/* 2. Global Toast container */}
      <div className={styles.toastContainer}>
        {toasts.map((t) => (
          <div 
            key={t.id} 
            className={`${styles.toastCard} ${t.type === "success" ? styles.toastSuccess : styles.toastInfo}`}
          >
            <div className={styles.toastMessage}>
              {t.message}
            </div>
            <button 
              className={styles.toastCloseBtn} 
              onClick={() => removeToast(t.id)}
              aria-label="Close toast"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* 3. Sales popup simulator */}
      {salesPop && (
        <div className={`${styles.salesPop} ${salesPopVisible ? styles.salesPopActive : ""}`}>
          <div className={styles.salesPopImgWrapper}>
            <Image 
              src={salesPop.img} 
              alt={salesPop.product} 
              fill 
              className={styles.salesPopImg}
              sizes="50px"
            />
          </div>
          <div className={styles.salesPopInfo}>
            <span>
              Someone in <span className={styles.salesPopTextBold}>{salesPop.city}</span>
            </span>
            <span>
              recently purchased <span className={styles.salesPopTextBold}>{salesPop.product}</span>
            </span>
            <span className={styles.salesPopTime}>2 minutes ago</span>
          </div>
        </div>
      )}

      {/* Main header/footer wrappers */}
      <Header />
      <main style={{ minHeight: "60vh" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body id="app-root">
        <CartProvider>
          <ECommerceAppWrapper>
            {children}
          </ECommerceAppWrapper>
        </CartProvider>
      </body>
    </html>
  );
}

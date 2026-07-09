"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          
          {/* Brand/Contact */}
          <div className={styles.footerCol}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>⚡</span>
              <span className={styles.logoText}>digitaz<span className={styles.logoHighlight}>.</span></span>
            </Link>
            <p className={styles.footerBrandDesc}>
              We are a global e-commerce electronics seller supplying high-fidelity hardware, computers, accessories, and mobile systems.
            </p>
            <div className={styles.footerContact}>
              <span>Support Line 24/7:</span>
              <span className={styles.footerContactBold}>1-800-888-9999</span>
            </div>
          </div>

          {/* Links 1 */}
          <div className={styles.footerCol}>
            <span className={styles.footerColTitle}>Departments</span>
            <ul className={styles.footerLinks}>
              <li className={styles.footerLink}><Link href="/shop">Computer & Laptop</Link></li>
              <li className={styles.footerLink}><Link href="/shop">Cameras & Videos</Link></li>
              <li className={styles.footerLink}><Link href="/shop">Television</Link></li>
              <li className={styles.footerLink}><Link href="/shop">Smartwatches</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className={styles.footerCol}>
            <span className={styles.footerColTitle}>Customer Care</span>
            <ul className={styles.footerLinks}>
              <li className={styles.footerLink}><Link href="/cart">My Account</Link></li>
              <li className={styles.footerLink}><Link href="/cart">Track Your Order</Link></li>
              <li className={styles.footerLink}><Link href="/contact">Customer Support</Link></li>
              <li className={styles.footerLink}><Link href="/cart">Returns & Exchanges</Link></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div className={styles.footerCol}>
            <span className={styles.footerColTitle}>Quick Info</span>
            <ul className={styles.footerLinks}>
              <li className={styles.footerLink}><Link href="/">Privacy Policy</Link></li>
              <li className={styles.footerLink}><Link href="/">Terms of Service</Link></li>
              <li className={styles.footerLink}><Link href="/shop">Affiliate Program</Link></li>
              <li className={styles.footerLink}><Link href="/contact">Careers</Link></li>
            </ul>
          </div>

        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © 2026 Digitaz Electronics Store Clone. All rights reserved. Built with Next.js & Vanilla CSS.
          </p>
          <ul className={styles.footerLegalLinks}>
            <li className={styles.footerLegalLink}><Link href="/">Privacy Policy</Link></li>
            <li className={styles.footerLegalLink}><Link href="/">Terms of Use</Link></li>
            <li className={styles.footerLegalLink}><Link href="/">Sales Policy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

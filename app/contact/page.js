"use client";

import { useState } from "react";
import styles from "./contact.module.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
    // Simulation
    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.pageTitle}>Contact Us</h1>
      <p className={styles.pageDesc}>
        Have questions about product details, shipping times, or your order tracking? Get in touch with the Digitaz Support Team. We respond within 24 hours.
      </p>

      <div className={styles.contactGrid}>
        
        {/* Info Cards */}
        <div className={styles.infoPanel}>
          
          {/* Card 1: Office Address */}
          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>📍</div>
            <div className={styles.infoContent}>
              <h3 className={styles.infoTitle}>Global Headquarters</h3>
              <p className={styles.infoDetail}>
                100 Silicon Boulevard, Suite 500<br />
                San Francisco, CA 94107, United States
              </p>
            </div>
          </div>

          {/* Card 2: Support Lines */}
          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>📞</div>
            <div className={styles.infoContent}>
              <h3 className={styles.infoTitle}>Customer Support Hotline</h3>
              <p className={styles.infoDetail}>
                Toll Free: 1-800-888-9999 (24/7 Support)<br />
                Office Tel: +1 (415) 555-0199 (Mon-Fri 9am-6pm)
              </p>
            </div>
          </div>

          {/* Card 3: Email Contacts */}
          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>✉️</div>
            <div className={styles.infoContent}>
              <h3 className={styles.infoTitle}>Support Email Addresses</h3>
              <p className={styles.infoDetail}>
                General Inquiries: info@digitaz.com<br />
                Order Support: orders@digitaz.com<br />
                Business Partners: partners@digitaz.com
              </p>
            </div>
          </div>

          {/* Card 4: Working Hours */}
          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>⏱</div>
            <div className={styles.infoContent}>
              <h3 className={styles.infoTitle}>Operating Hours</h3>
              <p className={styles.infoDetail}>
                E-Commerce Storefront: Open 24/7/365<br />
                Warehouse Logistics: Mon-Sat 8:00 AM - 10:00 PM EST
              </p>
            </div>
          </div>

        </div>

        {/* Inquiry Form */}
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Send Us a Message</h2>
          
          {isSubmitted ? (
            <div style={{ backgroundColor: "#e6f6ec", color: "#2b7d41", padding: "20px", borderRadius: "6px", fontSize: "0.9rem", lineHeight: "1.5", textAlign: "center" }}>
              <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "8px" }}>✉️ Success!</span>
              Your query has been submitted successfully. A customer support representative will reach out to your email address shortly.
              <button 
                className={styles.btnSubmit} 
                style={{ marginTop: "20px", padding: "10px", width: "auto" }}
                onClick={() => setIsSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={styles.formInput}
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.formInput}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className={styles.formInput}
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  className={styles.formTextarea}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className={styles.btnSubmit}>
                Send Message
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

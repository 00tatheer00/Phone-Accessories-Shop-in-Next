# ⚡ Digitaz Electronics - Premium E-Commerce Storefront

Digitaz is a full-featured, highly interactive electronics e-commerce storefront built from the ground up using **Next.js (App Router)** and **Vanilla CSS Modules**. It clone-designs the modern e-commerce storefront reference with a bright, clean blue-and-white layout, robust product lists, search queries, dynamic filtering, a live countdown, shopping cart contexts, and order checkout forms.

---

## 🚀 Key Features

*   **Unified Global Shopping State**: Managed via React Context API. Adding items to your cart or wishlist on any subroute instantly syncs and updates counts and pricing in the header.
*   **Real-time Countdown Ticker**: Featured deals count down hours, minutes, and seconds live using React hook intervals.
*   **Filterable & Sortable Catalog**: The `/shop` route reads URL query criteria and lets users filter by categories, price ranges, search text, or sort alphabetically, by ratings, or by prices.
*   **Dynamic Cart Calculations**: The `/cart` route manages item quantities, removes items, calculates tax, and offers free shipping on orders over $250.
*   **Interactive Checkout Portal**: Supports form billing entries, payment tab options (Credit Card, PayPal, Cash on Delivery), and generates random confirmation invoice numbers on completion.
*   **Wishlist persistence**: A dedicated wishlist saves favorited products and allows quick transfer straight to the shopping cart.
*   **E-Commerce Asset Generation**: Contains custom generated premium studio mockups for PS5 controllers, AirPods Max, Beoplay earbuds, Marshall speakers, and smartwatches.

---

## 🛠 Tech Stack

1.  **Core Framework**: Next.js 16.2 (App Router)
2.  **Logic & Hooks**: React 19 (State, Effects, Context Provider)
3.  **Styling**: Vanilla CSS Modules (modular page styles, global theme variables, and keyframe animations)
4.  **Data Hydration**: Context local storage synchronization to persist cart contents on refresh.

---

## 📂 Project Directory Structure

```
├── app
│   ├── components
│   │   ├── Header.js           # Shared navigation navigation layout
│   │   ├── Header.module.css   # Header-specific CSS
│   │   ├── Footer.js           # Shared sitemap footer
│   │   └── Footer.module.css   # Footer-specific CSS
│   ├── context
│   │   └── CartContext.js      # Global state provider for shopping cart
│   ├── shop
│   │   └── page.js             # Catalog display & product filter page
│   │   └── shop.module.css     # Shop layout sidebar grids
│   ├── cart
│   │   └── page.js             # Cart line items review page
│   │   └── cart.module.css     # Cart styles & quantities controls
│   ├── checkout
│   │   └── page.js             # Billing forms & card checkout portal
│   │   └── checkout.module.css # Checkout layout & success banners
│   ├── wishlist
│   │   └── page.js             # Saved products manager
│   │   └── wishlist.module.css # Wishlist grids
│   ├── contact
│   │   └── page.js             # Contact info & feedback inquiries form
│   │   └── contact.module.css  # Contact styles
│   ├── layout.js               # Root layout wrapping CartProvider
│   ├── globals.css             # E-commerce colors, fonts, resets
│   └── page.js                 # Homepage layout & widgets
├── public
│   └── images                  # Renders for mockups
├── package.json                # Dependencies list
└── README.md                   # Documentation
```

---

## 🔧 Installation & Local Setup

### 1. Prerequisites
Ensure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your system.

### 2. Install dependencies
Run the following command in the project root directory:
```bash
npm install
```

### 3. Start development server
Run this command to fire up the local Next.js dev server:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to explore the store.

### 4. Build for production
To compile and check static page generation for deployments:
```bash
npm run build
```

---

## 💳 Payment & Ordering Simulation
*Note: This storefront acts as an interactive simulator. Orders submitted do not perform real money transactions, but simulate the invoice and confirmation pipeline on the frontend.*

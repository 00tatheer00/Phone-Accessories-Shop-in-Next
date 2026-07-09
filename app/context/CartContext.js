"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  
  // Toast notifications array
  const [toasts, setToasts] = useState([]);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("digitaz_cart");
    const savedWishlist = localStorage.getItem("digitaz_wishlist");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart localstorage data", e);
      }
    }
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist localstorage data", e);
      }
    }
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem("digitaz_cart", JSON.stringify(cart));
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("digitaz_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast Trigger Helper
  const addToast = (message, type = "success") => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove after 3.2 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3200);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add item to cart
  const addToCart = (product) => {
    const priceNum = typeof product.price === "string" 
      ? parseFloat(product.price.replace(/[^0-9.]/g, "")) 
      : product.price;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { 
        id: product.id,
        title: product.title,
        price: priceNum,
        img: product.img || product.image,
        category: product.category,
        quantity: 1
      }];
    });

    // Display Toast
    const shortTitle = product.title.length > 30 ? product.title.slice(0, 30) + "..." : product.title;
    addToast(`"${shortTitle}" added to cart! 🛒`, "success");
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    const item = cart.find((i) => i.id === productId);
    setCart((prev) => prev.filter((item) => item.id !== productId));
    if (item) {
      const shortTitle = item.title.length > 30 ? item.title.slice(0, 30) + "..." : item.title;
      addToast(`Removed "${shortTitle}" from cart 🗑`, "info");
    }
  };

  // Update item quantity
  const updateQuantity = (productId, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: qty } : item))
    );
    addToast("Item quantity updated", "info");
  };

  // Clear cart entirely
  const clearCart = () => {
    setCart([]);
  };

  // Toggle wishlist state
  const toggleWishlist = (product) => {
    let alreadyExists = false;
    
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        alreadyExists = true;
        return prev.filter((item) => item.id !== product.id);
      }
      const priceNum = typeof product.price === "string"
        ? parseFloat(product.price.replace(/[^0-9.]/g, ""))
        : product.price;

      return [...prev, {
        id: product.id,
        title: product.title,
        price: priceNum,
        img: product.img || product.image,
        category: product.category
      }];
    });

    const shortTitle = product.title.length > 30 ? product.title.slice(0, 30) + "..." : product.title;
    if (alreadyExists) {
      addToast(`Removed "${shortTitle}" from wishlist 💔`, "info");
    } else {
      addToast(`Saved "${shortTitle}" to wishlist! ♥`, "success");
    }
  };

  // Move item from wishlist to cart
  const moveToCart = (product) => {
    // Remove from wishlist
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    
    // Add to cart (without triggering duplicate toast, custom add to cart flow)
    const priceNum = typeof product.price === "string" 
      ? parseFloat(product.price.replace(/[^0-9.]/g, "")) 
      : product.price;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { 
        id: product.id,
        title: product.title,
        price: priceNum,
        img: product.img || product.image,
        category: product.category,
        quantity: 1
      }];
    });

    const shortTitle = product.title.length > 30 ? product.title.slice(0, 30) + "..." : product.title;
    addToast(`"${shortTitle}" transferred to cart! 🛒`, "success");
  };

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Computations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        toasts,
        addToast,
        removeToast,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        moveToCart,
        isInWishlist,
        cartCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

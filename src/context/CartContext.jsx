import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const CartContext = createContext();

const COUPON_CODES = {
  'ACCESS2026': { rate: 0.15, label: '15% Flagship Launch Discount' },
  'PRODIGY10': { rate: 0.10, label: '10% Tech Pioneer Discount' },
  'FREESHIP': { rate: 0.05, label: '5% Express Courier Credit' }
};

export const CartProvider = ({ children }) => {
  // Local storage persistence
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('access_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('access_wishlist');
      return saved ? JSON.parse(saved) : ['mob-01', 'lap-01', 'aud-01'];
    } catch {
      return ['mob-01', 'lap-01', 'aud-01'];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('access_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('access_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Toast notification trigger
  const showToast = (message, type = 'info', meta = null) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, meta }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (product, quantity = 1, selectedColor = null) => {
    const color = selectedColor || (product.colors && product.colors[0]?.name) || 'Default';
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedColor: color }];
      }
    });

    showToast(`Added ${product.name} to your vault`, 'cart', {
      image: product.image,
      price: product.price
    });
  };

  const updateQuantity = (productId, newQty, selectedColor) => {
    if (newQty <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCartItems(prev =>
      prev.map(item => {
        if (item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor)) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId, selectedColor) => {
    setCartItems(prev =>
      prev.filter(
        item => !(item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor))
      )
    );
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    const productId = product.id;
    if (wishlist.includes(productId)) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast(`Removed from curated wishlist`, 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast(`Saved ${product.name} to wishlist`, 'success', {
        image: product.image
      });
    }
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  // Quick View Modal
  const openQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Coupons
  const applyCoupon = (code) => {
    const upper = code.trim().toUpperCase();
    if (COUPON_CODES[upper]) {
      setAppliedCoupon({ code: upper, ...COUPON_CODES[upper] });
      setCouponError('');
      showToast(`Promo applied! ${COUPON_CODES[upper].label}`, 'success');
      return true;
    } else {
      setCouponError('Invalid promo code. Try ACCESS2026');
      showToast('Invalid promo code', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  // Celebrate Order Completion
  const triggerOrderSuccess = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#818cf8', '#34d399', '#f59e0b']
    });
  };

  // Calculations
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? Math.round(subtotal * appliedCoupon.rate) : 0;
  const freeShippingThreshold = 500;
  const isFreeShipping = subtotal >= freeShippingThreshold || totalItems === 0;
  const shippingFee = isFreeShipping ? 0 : 25;
  const taxAmount = Math.round((subtotal - discountAmount) * 0.08);
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee + taxAmount);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        subtotal,
        discountAmount,
        shippingFee,
        taxAmount,
        finalTotal,
        appliedCoupon,
        couponError,
        freeShippingThreshold,
        freeShippingProgress,
        isFreeShipping,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isWishlisted,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        toasts,
        showToast,
        removeToast,
        triggerOrderSuccess,
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        sortBy,
        setSortBy,
        priceRange,
        setPriceRange,
        inStockOnly,
        setInStockOnly
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

import React from 'react';
import { CartProvider } from './context/CartContext';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PromoBanners from './components/PromoBanners';
import CategoriesSection from './components/CategoriesSection';
import TrustFeatures from './components/TrustFeatures';
import ProductListings from './components/ProductListings';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import SearchModal from './components/SearchModal';
import ProductDetailsModal from './components/ProductDetailsModal';
import CheckoutModal from './components/CheckoutModal';
import ToastContainer from './components/ToastContainer';

export default function App() {
  return (
    <CartProvider>
      <SmoothScroll>
        <div className="min-h-screen bg-[#080808] text-[#f5f2eb] font-outfit selection:bg-[#f5f2eb] selection:text-[#080808] overflow-x-hidden relative">
          
          {/* Navigation Bar */}
          <Navbar />

          {/* Main Website Flow */}
          <main>
            {/* Monumental Centered Hero */}
            <Hero />

            {/* Hardware Catalog & Filtering */}
            <ProductListings />

            {/* Curated Categories */}
            <CategoriesSection />

            {/* Special Releases & Promo Banners */}
            <PromoBanners />

            {/* Quality & Delivery Assurance */}
            <TrustFeatures />

            {/* Concierge & FAQ Accordion */}
            <FaqSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Modals and Drawers */}
          <CartDrawer />
          <WishlistDrawer />
          <SearchModal />
          <ProductDetailsModal />
          <CheckoutModal />
          <ToastContainer />
        </div>
      </SmoothScroll>
    </CartProvider>
  );
}

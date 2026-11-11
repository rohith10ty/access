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
        <div className="min-h-screen bg-[#08090d] text-slate-100 font-outfit selection:bg-cyan-500 selection:text-black overflow-x-hidden relative">
          
          {/* Top Global Ambient Lights */}
          <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
          <div className="fixed top-1/3 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

          {/* Navigation Bar */}
          <Navbar />

          {/* Main Website Flow */}
          <main>
            {/* 10/10 Centered & Justified Hero Section */}
            <Hero />

            {/* Value Trust Features Bar */}
            <TrustFeatures />

            {/* Special Offers & Promotional Drops */}
            <PromoBanners />

            {/* Curated Categories Grid */}
            <CategoriesSection />

            {/* Product Catalog & Search & Filters */}
            <ProductListings />

            {/* Concierge & FAQ Accordion */}
            <FaqSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Floating Modals and Drawers */}
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

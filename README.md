# ACCESS — Next-Gen Modern Electronics Shopping Experience

ACCESS is an ultra-premium, flagship electronics e-commerce web platform engineered with **React.js**, **Vite**, **Tailwind CSS**, **Lenis Smooth Scroll**, **GSAP**, and **Framer Motion**.

---

## ⚡ Highlights & Key Features

- **Outfit Typography & Zero Scrollbar**: Sleek, immersive aesthetic styled with the Google Font **Outfit** and universally hidden native scrollbars for a clean, distraction-free app feel.
- **Top-Tier Aerodynamic Floating Navigation**:
  - Dynamic glassmorphic header responding to scroll depth.
  - Interactive department quick-dropdown for instant navigation across 7 core categories.
  - Global `⌘K` / `Ctrl+K` Raycast-style spotlight search modal with live query matching.
  - Curated Wishlist drawer toggle with animated live heart counter.
  - Floating Cart Dock showing item quantity and running total with micro-bounce animations.
- **10/10 Centered & Justified Flagship Hero**:
  - High-impact verified hardware badge and dual gradient headline.
  - Centered manifesto highlighting silicon supremacy, titanium acoustics, and aerospace design.
  - **Interactive Centered 3D Showcase Carousel**: Live switcher between the iPhone 16 Pro Max, MacBook Pro M4 Max, Sony WH-1000XM5, and LG G4 OLED evo with animated telemetry pills, ambient reactive glow, and auto-progress timers.
- **7 Core Curated Hardware Categories**:
  - 📱 **Mobiles** (iPhone 16 Pro Max, Samsung Galaxy S25 Ultra, Google Pixel 9 Pro XL, Nothing Phone 2)
  - 💻 **Laptops** (MacBook Pro 16" M4 Max, ASUS ROG Zephyrus G16 OLED, Dell XPS 16, Razer Blade 16)
  - 🎧 **Headphones** (Sony WH-1000XM5, Apple AirPods Max, Bose QuietComfort Ultra, Sennheiser Momentum 4)
  - 📺 **Smart TVs** (LG OLED evo G4 65", Samsung Neo QLED 8K, Sony BRAVIA XR A95L, TCL QM8 Mini-LED)
  - 📷 **Cameras** (Sony Alpha 7 IV, Fujifilm X-T5, Canon EOS R6 Mark II, Nikon Z8)
  - ⌚ **Smartwatches** (Apple Watch Ultra 2, Samsung Galaxy Watch Ultra, Garmin Epix Pro, Pixel Watch 3)
  - ⚡ **Accessories** (Anker Prime 250W GaN Station, Apple Magic Keyboard Touch ID, DJI Osmo Mobile 6, Logitech MX Master 3S)
- **Deep Specifications Modal**:
  - Multi-angle thumbnail galleries with zoom preview.
  - Detailed spec tables (Display, Silicon, RAM, Camera, Battery, OS).
  - Key capability highlights and what's included in the box.
  - Real-time stock status and finish color swatches.
- **Dynamic Search, Filtering & Price Sorting**:
  - Instant live keyword search.
  - One-click category tab filters.
  - Price ceiling budget range slider.
  - "In Stock Only" toggle.
  - Multi-criteria sorting: Featured, Price (Low to High, High to Low), Customer Rating, and Discount Percentage.
- **Interactive Shopping Cart & Encrypted Checkout**:
  - Slide-out drawer with free priority shipping progress bar.
  - Incremental quantity controls (+/-), item removal, and subtotal calculation.
  - Promo code voucher engine (`ACCESS2026` for 15% off, `PRODIGY10` for 10% off).
  - Express checkout modal with instant address form, Apple Pay/Card toggles, and celebratory confetti explosion upon order confirmation.
- **Concierge Support & Accordion FAQ**:
  - Interactive accordion covering warranty, priority air delivery, and return policy.
  - Live concierge card with toll-free hotline and chat status.
- **Comprehensive Luxury Footer**:
  - Hardware intelligence newsletter subscription with feedback toasts.
  - Department links, customer support desk, showroom location, and payment gateway badges.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS + Custom Glassmorphism & Cyber Radial Gradients
- **Typography**: Google Fonts Outfit (`font-outfit`)
- **Animations**: Framer Motion 12 + GSAP 3
- **Smooth Scroll**: Lenis (`@studio-freight/lenis` / `lenis`)
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti

---

## 🚀 Getting Started Locally

1. **Clone or navigate to the repository:**
   ```bash
   cd "electronics website"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment to Vercel or Netlify

### Deploying to Vercel:
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root.
3. Accept default build settings (`npm run build`, output directory: `dist`).

### Deploying to Netlify:
1. Connect the GitHub repository in the Netlify Dashboard.
2. Build command: `npm run build`
3. Publish directory: `dist`

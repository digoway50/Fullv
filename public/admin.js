// ============================================================
// FLEEX GARMENT - ATELIER ADMIN PORTAL (SECURE HIDDEN ENGINE)
// Authenticated via Cryptographic SHA-256 Hash of Secret Code
// No plaintext credentials stored anywhere in the codebase.
// ============================================================

(function () {
  'use strict';

  // SHA-256 hash of the master atelier admin key
  const MASTER_HASH = 'eb5e1360c29b912df6ff52b81d859c12fe2bcd8fd542f240d7f885b0b3011831';
  const SESSION_KEY = 'fleex_atelier_admin_auth';
  const PRODUCTS_STORAGE_KEY = 'fleex_custom_products';
  const CAMPAIGN_STORAGE_KEY = 'fleex_hero_campaign';
  const SETTINGS_STORAGE_KEY = 'fleex_store_settings';
  const SUBSCRIBERS_STORAGE_KEY = 'fleex_newsletter_subscribers';

  // Cryptographic SHA-256 helper
  async function computeSha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text.trim());
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Initial Default Products (12 Fleex Garment Stitched Suits - Synced with Storefront)
  const DEFAULT_PRODUCTS = [
    {
      id: 1,
      title: 'Olive Green Classic Collar Suit',
      category: 'Uploaded Designs',
      fabric: 'Wash & Wear Blended Fabric',
      price: 2550,
      badge: 'BESTSELLER',
      tag: 'Wash & Wear',
      image: 'assets/aistudio/1793957376347_4a65293c.jpg',
      description: 'Classic Olive Green 2-Piece Stitched Kameez Shalwar tailored from breathable wrinkle-resistant wash-and-wear fabric with turn-down collar and subtle contrast stitching.'
    },
    {
      id: 2,
      title: 'Dove Grey Ban Collar Suit',
      category: 'Uploaded Designs',
      fabric: 'Breathable Blended Cotton',
      price: 2450,
      badge: 'MINIMALIST',
      tag: 'Cotton Blend',
      image: 'assets/aistudio/1793957380265_c059a715.jpg',
      description: 'Minimalist Dove Grey Stitched Kameez Shalwar tailored from soft-touch blended cotton with neat mandarin ban collar and white double-track stitching.'
    },
    {
      id: 3,
      title: 'Royal Navy Blue Textured Suit',
      category: 'Uploaded Designs',
      fabric: 'Textured Cotton Blend',
      price: 2750,
      badge: 'NEW ARRIVAL',
      tag: 'Textured Cotton',
      image: 'assets/aistudio/1793957392138_6a9e5128.jpg',
      description: 'Royal Navy Blue 2-Piece Kameez Shalwar in self-textured breathable cotton with fine silver-grey thread work on collar and cuffs.'
    },
    {
      id: 4,
      title: 'Ash Grey Geometric Stitch Suit',
      category: 'Uploaded Designs',
      fabric: 'Wrinkle-Resistant Poly-Viscose',
      price: 2850,
      badge: 'DESIGNER',
      tag: 'Wash & Wear',
      image: 'assets/aistudio/1793957396101_628635cd.jpg',
      description: 'Ash Grey Stitched Kameez Shalwar featuring bold black criss-cross anchor thread detailing across collar, cuffs, and placket.'
    },
    {
      id: 5,
      title: 'Cream Beige Modern Motif Suit',
      category: 'Uploaded Designs',
      fabric: 'Silk-Touch Wash & Wear',
      price: 3150,
      badge: 'LUXURY PRET',
      tag: 'Wash & Wear',
      image: 'assets/aistudio/1793957401142_6f15b946.jpg',
      description: 'Cream Beige Festive 2-Piece Suit with lustrous silk-touch drape, sleek black bar embroidery on collar tips, cuffs, and metallic gold buttons.'
    },
    {
      id: 6,
      title: 'Teal Blue Designer Zig-Zag Suit',
      category: 'Creative & Minimalist Store Designs',
      fabric: 'Textured Dobby Cotton',
      price: 2950,
      badge: 'TRENDING',
      tag: 'Textured Dobby',
      image: 'assets/aistudio/1793957405200_e121423d.jpg',
      description: 'Teal Blue Designer 2-Piece Kameez Shalwar featuring an asymmetrical zig-zag embroidered placket, contrast piping, and flapped chest pocket.'
    },
    {
      id: 7,
      title: 'Sage Green Linen Minimalist Suit',
      category: 'Creative & Minimalist Store Designs',
      fabric: 'Slub Cotton Linen',
      price: 2450,
      badge: 'SUMMER HIT',
      tag: 'Cotton Blend',
      image: 'assets/aistudio/1793957409076_a446f27c.jpg',
      description: 'Sage Green Slub Cotton-Linen Stitched Kameez Shalwar designed with a clean concealed placket and delicate cream micro-stitching.'
    },
    {
      id: 8,
      title: 'Rust Terracotta Contrast Piping Suit',
      category: 'Creative & Minimalist Store Designs',
      fabric: 'Mid-Weight Blended Fabric',
      price: 2650,
      badge: 'ALL SEASON',
      tag: 'Wash & Wear',
      image: 'assets/aistudio/1793957412810_b52fae88.jpg',
      description: 'Warm Rust Terracotta 2-Piece Kameez Shalwar highlighted by crisp navy piping along the mandarin collar and chest pocket edge.'
    },
    {
      id: 9,
      title: 'Classic Navy Blue Contrast Trim Suit',
      category: 'Creative & Minimalist Store Designs',
      fabric: 'Tropical Wash & Wear',
      price: 2650,
      badge: 'SIGNATURE',
      tag: 'Wash & Wear',
      image: 'assets/aistudio/1793957407265_38f6545f.jpg',
      description: 'Structured Classic Navy Blue 2-Piece Suit accented with bone-white twin-needle stitching along the ban neckline and chest pocket.'
    },
    {
      id: 10,
      title: 'Olive Charcoal Contrast Pocket Suit',
      category: 'Creative & Minimalist Store Designs',
      fabric: 'High-Twist Wash & Wear',
      price: 2750,
      badge: 'TIMELESS',
      tag: 'Wash & Wear',
      image: 'images/charcoal_kurta_suit_1790890713358.jpg',
      description: 'Refined Olive Charcoal Kameez Shalwar tailored in high-twist wash-and-wear fabric with twin-needle topstitching and flapped breast pocket.'
    },
    {
      id: 11,
      title: 'Deep Maroon Streamlined Pocketless Suit',
      category: 'Signature Classics',
      fabric: 'Lustrous Blended Suiting',
      price: 2850,
      badge: 'FESTIVE EDIT',
      tag: 'Wash & Wear',
      image: 'images/fleex_kurta_model_1790884646861.jpg',
      description: 'Deep Maroon Stitched Kameez Shalwar featuring a streamlined pocketless front, concealed placket, and crisp mandarin collar.'
    },
    {
      id: 12,
      title: 'Midnight Blue Pocketless Minimalist Suit',
      category: 'Signature Classics',
      fabric: 'Fine Count Blended Cotton',
      price: 2650,
      badge: 'MODERN CLASSIC',
      tag: 'Cotton Blend',
      image: 'assets/aistudio/1793957417585_f8752f13.jpg',
      description: 'Midnight Blue Pocketless 2-Piece Stitched Kameez Shalwar with pure lines, double-fused ban collar, and fine-count breathable cotton.'
    }
  ];

  // Initialize Storage
  function getStoredProducts() {
    try {
      const data = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return DEFAULT_PRODUCTS;
  }

  function saveStoredProducts(products) {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    localStorage.setItem('fleex_custom_products_dirty', '1');
    syncWebsiteCatalog(true);
  }

  function getStoredSettings() {
    try {
      const data = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {}
    const defaultSettings = {
      whatsappNumber: '923702265968',
      storeName: 'Fleex Garment',
      storeAddress: 'Mughal Market, Main Matli Road, Tando Ghulam Ali, Sindh, Pakistan',
      storeEmail: 'fleexgarments@gmail.com',
      storePhone: '0370 2265968',
      announcementActive: false,
      announcementText: 'BOYS EID COLLECTION 2026 – WHOLESALE & RETAIL COD DISPATCH'
    };
    return defaultSettings;
  }

  function saveStoredSettings(settings) {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    syncWebsiteSettings();
  }

  function getStoredCampaign() {
    try {
      const data = localStorage.getItem(CAMPAIGN_STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return {
      heroTag: 'BOYS EID COLLECTION 2026',
      heroTitle: 'STITCHED KAMEEZ SHALWAR',
      heroCta: 'EXPLORE COLLECTION',
      slide1Image: 'assets/aistudio/1793957376347_4a65293c.jpg',
      slide2Image: 'assets/aistudio/1793957401142_6f15b946.jpg',
      slide3Image: 'assets/aistudio/1793957405200_e121423d.jpg',
      slide4Image: 'assets/aistudio/1793957392138_6a9e5128.jpg'
    };
  }

  function saveStoredCampaign(campaign) {
    localStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(campaign));
    syncWebsiteCampaign();
  }

  // Real-time synchronization with website elements (fixes broken ?&text= query string)
  function syncWebsiteSettings() {
    const settings = getStoredSettings();
    const phone = (settings.whatsappNumber || '923702265968').replace(/[^0-9]/g, '');
    if (!phone) return;

    document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
      const currentHref = a.getAttribute('href') || '';
      const textMatch = currentHref.match(/[?&]text=([^&]*)/);
      const query = textMatch ? `?text=${textMatch[1]}` : '';
      a.setAttribute('href', `https://wa.me/${phone}${query}`);
    });
  }

  function syncWebsiteCampaign() {
    const campaign = getStoredCampaign();
    const heroSlides = document.querySelectorAll('.hero-slide img');
    if (heroSlides[0] && campaign.slide1Image) heroSlides[0].src = campaign.slide1Image;
    if (heroSlides[1] && campaign.slide2Image) heroSlides[1].src = campaign.slide2Image;
    if (heroSlides[2] && campaign.slide3Image) heroSlides[2].src = campaign.slide3Image;
    if (heroSlides[3] && campaign.slide4Image) heroSlides[3].src = campaign.slide4Image;
  }

  function renderAdminCardHTML(p, phone) {
    const priceText = typeof window.formatFleexPKR === 'function'
      ? window.formatFleexPKR(p.price || 2650)
      : `PKR ${Number(p.price || 2650).toLocaleString('en-PK')}`;
    const catSlug = [
      (p.category || '').toLowerCase().includes('uploaded') ? 'uploaded' : 'creative',
      (p.tag || p.fabric || '').toLowerCase().includes('cotton') || (p.tag || '').toLowerCase().includes('linen') ? 'cotton' : 'washwear',
      'all'
    ].join(' ');

    return `
      <div class="product-item product-card group flex flex-col justify-between" data-cat="${catSlug}" data-id="${p.id}">
        <div>
          <div class="relative w-full aspect-[3/4.2] overflow-hidden bg-slate-100 mb-2 cursor-pointer product-card-thumb rounded-2xl" data-id="${p.id}">
            <img src="${p.image}" alt="${p.title}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <span class="absolute top-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 tracking-wider uppercase rounded-md">
              ${p.badge || 'SIGNATURE'}
            </span>
          </div>
          <div class="flex items-start justify-between gap-1">
            <h3 class="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-tight line-clamp-1">
              ${p.title}
            </h3>
            <button type="button" class="quick-add-btn p-1 text-slate-600 hover:text-black cursor-pointer" data-title="${p.title}" data-image="${p.image}" aria-label="Add to Bag">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15"/></svg>
            </button>
          </div>
          <p class="text-[10px] text-slate-500 font-medium uppercase tracking-wider mb-0.5">${p.tag || p.fabric} · STITCHED 2-PIECE</p>
          <p class="text-xs font-extrabold text-slate-900 tabular-nums mb-1">${priceText}</p>
        </div>
        <div class="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
          <button type="button" class="open-modal-btn text-[10px] font-bold tracking-wider uppercase text-emerald-800 hover:text-black cursor-pointer" data-id="${p.id}">
            OVERVIEW
          </button>
          <a href="https://wa.me/${phone}?text=${encodeURIComponent(`Salam Fleex Garments! I would like to order ${p.title}.`)}" target="_blank" rel="noopener noreferrer" class="text-[11px] font-bold tracking-wider uppercase text-slate-900 hover:underline">
            ORDER NOW →
          </a>
        </div>
      </div>
    `;
  }

  function syncWebsiteCatalog(forceRender = false) {
    const isDirty = localStorage.getItem('fleex_custom_products_dirty') === '1';
    if (!forceRender && !isDirty) return; // Keep fast SSR HTML cards unless admin customized catalog

    const products = getStoredProducts();
    const settings = getStoredSettings();
    const phone = (settings.whatsappNumber || '923702265968').replace(/[^0-9]/g, '');

    if (Array.isArray(window.FLEEX_SUITS)) {
      window.FLEEX_SUITS = products;
    }

    const grid = document.getElementById('trending-products-grid');
    if (grid) {
      grid.innerHTML = products.slice(0, 8).map(p => renderAdminCardHTML(p, phone)).join('');
    }

    const catalogContainer = document.getElementById('catalog-products-container');
    if (catalogContainer) {
      catalogContainer.innerHTML = products.map(p => renderAdminCardHTML(p, phone)).join('');
      if (typeof window.applyCatalogFilters === 'function') window.applyCatalogFilters();
    }
  }

  // Build and inject the Admin Modal UI
  function createAdminModal() {
    if (document.getElementById('fleex-admin-panel')) return;

    const modal = document.createElement('div');
    modal.id = 'fleex-admin-panel';
    modal.className = 'fixed inset-0 z-[100] hidden bg-slate-950/80 backdrop-blur-md flex flex-col justify-end sm:justify-center p-0 sm:p-4 overflow-hidden';
    modal.innerHTML = `
      <div class="relative w-full max-w-5xl h-[92vh] sm:h-[88vh] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden mx-auto border border-slate-200">
        
        <!-- Admin Header -->
        <div class="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-[#6C91B8] flex items-center justify-center font-serif text-white font-bold text-xs ring-2 ring-white/20">
              Fg.
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-sm sm:text-base font-black tracking-widest uppercase">FLEEX ATELIER ADMIN</h2>
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  LIVE SECURE
                </span>
              </div>
              <p class="text-[10px] text-slate-400">Website & Product Gallery Command Center</p>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <button id="admin-preview-btn" type="button" class="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors flex items-center gap-1.5 cursor-pointer">
              <span>👁️ View Store</span>
            </button>
            <button id="admin-logout-btn" type="button" class="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-rose-900/60 hover:bg-rose-800 text-rose-200 rounded transition-colors flex items-center gap-1 cursor-pointer">
              <span>🔒 Logout</span>
            </button>
            <button id="admin-close-btn" type="button" class="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer" aria-label="Minimize">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 sm:gap-6 overflow-x-auto shrink-0 scrollbar-none text-xs font-bold uppercase tracking-wider text-slate-600">
          <button type="button" class="admin-tab-btn py-3 border-b-2 border-slate-900 text-slate-900 cursor-pointer" data-tab="tab-products">
            📦 Products & Gallery
          </button>
          <button type="button" class="admin-tab-btn py-3 border-b-2 border-transparent hover:text-slate-900 cursor-pointer" data-tab="tab-campaign">
            ✨ Hero Campaigns
          </button>
          <button type="button" class="admin-tab-btn py-3 border-b-2 border-transparent hover:text-slate-900 cursor-pointer" data-tab="tab-subscribers">
            📧 Subscribers
          </button>
          <button type="button" class="admin-tab-btn py-3 border-b-2 border-transparent hover:text-slate-900 cursor-pointer" data-tab="tab-settings">
            ⚙️ Store Settings
          </button>
          <button type="button" class="admin-tab-btn py-3 border-b-2 border-transparent hover:text-slate-900 cursor-pointer" data-tab="tab-backup">
            💾 Backup
          </button>
        </div>

        <!-- Tab Content Container -->
        <div class="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/60">
          
          <!-- TAB 1: PRODUCTS & GALLERY -->
          <div id="tab-products" class="admin-tab-content space-y-6">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div>
                <h3 class="text-sm font-black uppercase text-slate-900 tracking-wider">Product Gallery Catalog</h3>
                <p class="text-xs text-slate-500">Manage all stitched suit designs, upload images, and update badges.</p>
              </div>
              <button id="btn-open-add-product" type="button" class="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs">
                <span>➕ Add New Suit</span>
              </button>
            </div>

            <!-- Product Add/Edit Form Modal Overlay -->
            <div id="product-form-modal" class="hidden bg-white p-5 rounded-xl border border-slate-300 shadow-lg space-y-4">
              <div class="flex items-center justify-between border-b border-slate-200 pb-3">
                <h4 id="product-form-title" class="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900">Add New Stitched Suit</h4>
                <button id="btn-cancel-product-form" type="button" class="text-xs text-slate-500 hover:text-black font-bold uppercase cursor-pointer">Cancel</button>
              </div>

              <input type="hidden" id="form-product-id" value="" />

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label class="block font-bold uppercase tracking-wider text-slate-700 mb-1">Design Name / Title *</label>
                  <input id="form-product-title" type="text" placeholder="e.g. Royal Navy Blue Textured Suit" required class="w-full px-3 py-2 border border-slate-300 rounded focus:border-slate-900 focus:outline-none" />
                </div>
                <div>
                  <label class="block font-bold uppercase tracking-wider text-slate-700 mb-1">Category *</label>
                  <select id="form-product-category" class="w-full px-3 py-2 border border-slate-300 rounded focus:border-slate-900 focus:outline-none bg-white">
                    <option value="Uploaded Designs">Uploaded Designs</option>
                    <option value="Creative & Minimalist Store Designs">Creative & Minimalist Store Designs</option>
                    <option value="Signature Classics">Signature Classics</option>
                    <option value="Festive Eid 2026">Festive Eid 2026</option>
                  </select>
                </div>
                <div>
                  <label class="block font-bold uppercase tracking-wider text-slate-700 mb-1">Fabric & Weave</label>
                  <input id="form-product-fabric" type="text" placeholder="e.g. Wrinkle-Free Wash and Wear" class="w-full px-3 py-2 border border-slate-300 rounded focus:border-slate-900 focus:outline-none" />
                </div>
                <div>
                  <label class="block font-bold uppercase tracking-wider text-slate-700 mb-1">Badge Tag</label>
                  <input id="form-product-badge" type="text" placeholder="e.g. NEW ARRIVAL, BESTSELLER, EID '26" class="w-full px-3 py-2 border border-slate-300 rounded focus:border-slate-900 focus:outline-none" />
                </div>
              </div>

              <!-- Image Upload & Preview -->
              <div>
                <label class="block font-bold uppercase tracking-wider text-slate-700 mb-1">Product Photo / Image *</label>
                <div class="flex flex-col sm:flex-row gap-3 items-start">
                  <div class="flex-1 w-full space-y-2">
                    <input id="form-product-image-file" type="file" accept="image/*" class="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-slate-900 file:text-white hover:file:bg-black cursor-pointer" />
                    <span class="text-[10px] text-slate-400 block">Or enter image asset path:</span>
                    <input id="form-product-image-url" type="text" placeholder="assets/aistudio/... or images/..." class="w-full px-3 py-1.5 border border-slate-300 rounded focus:border-slate-900 focus:outline-none text-xs" />
                  </div>
                  <div class="w-20 h-24 bg-slate-100 rounded border border-slate-300 overflow-hidden flex items-center justify-center shrink-0">
                    <img id="form-image-preview" src="favicon-512x512.png" alt="Preview" class="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              <div>
                <label class="block font-bold uppercase tracking-wider text-slate-700 mb-1">Product Description</label>
                <textarea id="form-product-description" rows="3" placeholder="Crafted with fine needlework, regular fit shalwar..." class="w-full px-3 py-2 border border-slate-300 rounded focus:border-slate-900 focus:outline-none text-xs"></textarea>
              </div>

              <div class="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button id="btn-save-product" type="button" class="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer">
                  Save Product
                </button>
              </div>
            </div>

            <!-- Product Table / Cards Grid -->
            <div id="admin-products-list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <!-- Dynamically populated -->
            </div>
          </div>

          <!-- TAB 2: HERO CAMPAIGNS -->
          <div id="tab-campaign" class="admin-tab-content hidden space-y-5">
            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h3 class="text-sm font-black uppercase text-slate-900 tracking-wider">Fall / Winter & Eid Campaign Banners</h3>
              <p class="text-xs text-slate-500">Update the homepage full-screen hero carousel slides and call-to-action texts.</p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label class="block font-bold uppercase text-slate-700 mb-1">Hero Campaign Tag</label>
                  <input id="campaign-tag" type="text" class="w-full px-3 py-2 border border-slate-300 rounded text-xs" />
                </div>
                <div>
                  <label class="block font-bold uppercase text-slate-700 mb-1">Hero Title</label>
                  <input id="campaign-title" type="text" class="w-full px-3 py-2 border border-slate-300 rounded text-xs" />
                </div>
              </div>

              <!-- Slide 1 to 4 Images -->
              <div class="space-y-3 pt-2">
                <label class="block font-bold uppercase text-slate-700 text-xs">Hero Carousel Slide Images (4 Slides)</label>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div class="p-3 border border-slate-200 rounded bg-slate-50 space-y-1.5">
                    <span class="font-bold text-[11px] uppercase block">Slide 1 (Olive Green)</span>
                    <input id="slide-img-1" type="text" class="w-full px-2 py-1 border border-slate-300 rounded text-xs" />
                  </div>
                  <div class="p-3 border border-slate-200 rounded bg-slate-50 space-y-1.5">
                    <span class="font-bold text-[11px] uppercase block">Slide 2 (Cream Beige)</span>
                    <input id="slide-img-2" type="text" class="w-full px-2 py-1 border border-slate-300 rounded text-xs" />
                  </div>
                  <div class="p-3 border border-slate-200 rounded bg-slate-50 space-y-1.5">
                    <span class="font-bold text-[11px] uppercase block">Slide 3 (Teal Blue)</span>
                    <input id="slide-img-3" type="text" class="w-full px-2 py-1 border border-slate-300 rounded text-xs" />
                  </div>
                  <div class="p-3 border border-slate-200 rounded bg-slate-50 space-y-1.5">
                    <span class="font-bold text-[11px] uppercase block">Slide 4 (Navy Blue)</span>
                    <input id="slide-img-4" type="text" class="w-full px-2 py-1 border border-slate-300 rounded text-xs" />
                  </div>
                </div>
              </div>

              <div class="pt-3 border-t border-slate-200 flex justify-end">
                <button id="btn-save-campaign" type="button" class="px-5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded cursor-pointer">
                  Update Campaign Banners
                </button>
              </div>
            </div>
          </div>

          <!-- TAB 3: NEWSLETTER SUBSCRIBERS -->
          <div id="tab-subscribers" class="admin-tab-content hidden space-y-4">
            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-black uppercase text-slate-900 tracking-wider">Registered Newsletter Subscribers</h3>
                  <p class="text-xs text-slate-500">Customer email addresses submitted through the website newsletter signup.</p>
                </div>
                <button id="btn-export-csv" type="button" class="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1 cursor-pointer">
                  <span>📥 Export CSV</span>
                </button>
              </div>

              <div class="overflow-x-auto border border-slate-200 rounded-lg">
                <table class="w-full text-left text-xs">
                  <thead class="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th class="px-4 py-2.5">#</th>
                      <th class="px-4 py-2.5">Customer Email</th>
                      <th class="px-4 py-2.5">Signup Date</th>
                    </tr>
                  </thead>
                  <tbody id="subscribers-table-body" class="divide-y divide-slate-100 bg-white">
                    <!-- Dynamically populated -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- TAB 4: STORE SETTINGS -->
          <div id="tab-settings" class="admin-tab-content hidden space-y-4">
            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h3 class="text-sm font-black uppercase text-slate-900 tracking-wider">Atelier & WhatsApp Concierge Settings</h3>
              <p class="text-xs text-slate-500">Configure phone number and store coordinates for direct WhatsApp orders.</p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label class="block font-bold uppercase text-slate-700 mb-1">WhatsApp Order Number *</label>
                  <input id="setting-whatsapp" type="text" placeholder="923702265968" class="w-full px-3 py-2 border border-slate-300 rounded font-mono text-xs" />
                  <span class="text-[10px] text-slate-400">Include country code without + or spaces (e.g. 923702265968)</span>
                </div>
                <div>
                  <label class="block font-bold uppercase text-slate-700 mb-1">Support Phone</label>
                  <input id="setting-phone" type="text" placeholder="0370 2265968" class="w-full px-3 py-2 border border-slate-300 rounded text-xs" />
                </div>
                <div>
                  <label class="block font-bold uppercase text-slate-700 mb-1">Store Email</label>
                  <input id="setting-email" type="email" placeholder="fleexgarments@gmail.com" class="w-full px-3 py-2 border border-slate-300 rounded text-xs" />
                </div>
                <div>
                  <label class="block font-bold uppercase text-slate-700 mb-1">Store Address</label>
                  <input id="setting-address" type="text" placeholder="Mughal Market, Main Matli Road, Tando Ghulam Ali" class="w-full px-3 py-2 border border-slate-300 rounded text-xs" />
                </div>
              </div>

              <div class="pt-3 border-t border-slate-200 flex justify-end">
                <button id="btn-save-settings" type="button" class="px-5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded cursor-pointer">
                  Save Store Settings
                </button>
              </div>
            </div>
          </div>

          <!-- TAB 5: BACKUP & FACTORY RESET -->
          <div id="tab-backup" class="admin-tab-content hidden space-y-4">
            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h3 class="text-sm font-black uppercase text-slate-900 tracking-wider">Database Backup & Factory Reset</h3>
              <p class="text-xs text-slate-500">Download a full snapshot of your custom products, campaigns, and settings.</p>

              <div class="flex flex-wrap gap-3 pt-2">
                <button id="btn-backup-download" type="button" class="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded cursor-pointer">
                  💾 Export Data (JSON)
                </button>
                <button id="btn-factory-reset" type="button" class="px-4 py-2 bg-rose-800 hover:bg-rose-900 text-white text-xs font-bold uppercase tracking-wider rounded cursor-pointer">
                  ⚠️ Reset To Default Products
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    `;

    document.body.appendChild(modal);

    bindAdminEvents();
  }

  // Bind All Admin Interactivity
  function bindAdminEvents() {
    // Tab switching
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        document.querySelectorAll('.admin-tab-btn').forEach(b => {
          b.classList.remove('border-slate-900', 'text-slate-900');
          b.classList.add('border-transparent');
        });
        btn.classList.remove('border-transparent');
        btn.classList.add('border-slate-900', 'text-slate-900');

        document.querySelectorAll('.admin-tab-content').forEach(tc => tc.classList.add('hidden'));
        const activeContent = document.getElementById(targetTab);
        if (activeContent) activeContent.classList.remove('hidden');

        if (targetTab === 'tab-products') renderAdminProducts();
        if (targetTab === 'tab-subscribers') renderAdminSubscribers();
      });
    });

    // Close & Preview buttons
    const closeBtn = document.getElementById('admin-close-btn');
    const previewBtn = document.getElementById('admin-preview-btn');
    const logoutBtn = document.getElementById('admin-logout-btn');

    if (closeBtn) closeBtn.addEventListener('click', closeAdminPanel);
    if (previewBtn) previewBtn.addEventListener('click', closeAdminPanel);
    if (logoutBtn) logoutBtn.addEventListener('click', logoutAdmin);

    // Image file upload preview
    const fileInput = document.getElementById('form-product-image-file');
    const urlInput = document.getElementById('form-product-image-url');
    const previewImg = document.getElementById('form-image-preview');

    if (fileInput) {
      fileInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
          const reader = new FileReader();
          reader.onload = function (e) {
            previewImg.src = e.target.result;
            urlInput.value = e.target.result;
          };
          reader.readAsDataURL(this.files[0]);
        }
      });
    }

    if (urlInput) {
      urlInput.addEventListener('input', function () {
        if (this.value) previewImg.src = this.value;
      });
    }

    // Product Form open/close
    const btnOpenAdd = document.getElementById('btn-open-add-product');
    const btnCancel = document.getElementById('btn-cancel-product-form');
    const formModal = document.getElementById('product-form-modal');

    if (btnOpenAdd) {
      btnOpenAdd.addEventListener('click', () => {
        resetProductForm();
        formModal.classList.remove('hidden');
        document.getElementById('form-product-title').focus();
      });
    }

    if (btnCancel) {
      btnCancel.addEventListener('click', () => {
        formModal.classList.add('hidden');
      });
    }

    // Save Product
    const btnSaveProduct = document.getElementById('btn-save-product');
    if (btnSaveProduct) {
      btnSaveProduct.addEventListener('click', saveProductFromForm);
    }

    // Save Campaign
    const btnSaveCampaign = document.getElementById('btn-save-campaign');
    if (btnSaveCampaign) {
      btnSaveCampaign.addEventListener('click', () => {
        const campaign = {
          heroTag: document.getElementById('campaign-tag').value,
          heroTitle: document.getElementById('campaign-title').value,
          heroCta: 'EXPLORE COLLECTION',
          slide1Image: document.getElementById('slide-img-1').value,
          slide2Image: document.getElementById('slide-img-2').value,
          slide3Image: document.getElementById('slide-img-3').value,
          slide4Image: document.getElementById('slide-img-4').value
        };
        saveStoredCampaign(campaign);
        alert('Hero campaigns successfully updated!');
      });
    }

    // Save Settings
    const btnSaveSettings = document.getElementById('btn-save-settings');
    if (btnSaveSettings) {
      btnSaveSettings.addEventListener('click', () => {
        const settings = {
          whatsappNumber: document.getElementById('setting-whatsapp').value.trim(),
          storePhone: document.getElementById('setting-phone').value.trim(),
          storeEmail: document.getElementById('setting-email').value.trim(),
          storeAddress: document.getElementById('setting-address').value.trim(),
          storeName: 'Fleex Garment'
        };
        saveStoredSettings(settings);
        alert('Store & WhatsApp settings updated successfully!');
      });
    }

    // Export CSV
    const btnExportCsv = document.getElementById('btn-export-csv');
    if (btnExportCsv) {
      btnExportCsv.addEventListener('click', exportSubscribersCsv);
    }

    // Backup & Reset
    const btnBackup = document.getElementById('btn-backup-download');
    if (btnBackup) {
      btnBackup.addEventListener('click', downloadBackupJson);
    }

    const btnReset = document.getElementById('btn-factory-reset');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm('Are you sure you want to restore all original 12 stitched suit designs?')) {
          localStorage.removeItem(PRODUCTS_STORAGE_KEY);
          localStorage.removeItem('fleex_custom_products_dirty');
          renderAdminProducts();
          window.location.reload();
        }
      });
    }
  }

  function resetProductForm() {
    document.getElementById('form-product-id').value = '';
    document.getElementById('form-product-title').value = '';
    document.getElementById('form-product-category').value = 'Uploaded Designs';
    document.getElementById('form-product-fabric').value = '';
    document.getElementById('form-product-badge').value = 'NEW DESIGN';
    document.getElementById('form-product-image-url').value = '';
    document.getElementById('form-product-description').value = '';
    document.getElementById('form-image-preview').src = 'favicon-512x512.png';
    document.getElementById('product-form-title').textContent = 'Add New Stitched Suit';
  }

  function saveProductFromForm() {
    const title = document.getElementById('form-product-title').value.trim();
    const category = document.getElementById('form-product-category').value;
    const fabric = document.getElementById('form-product-fabric').value.trim() || 'Premium Blended Fabric';
    const badge = document.getElementById('form-product-badge').value.trim() || 'NEW';
    const image = document.getElementById('form-product-image-url').value.trim() || 'favicon-512x512.png';
    const description = document.getElementById('form-product-description').value.trim();
    const idVal = document.getElementById('form-product-id').value;

    if (!title) {
      alert('Please enter a product title.');
      return;
    }

    const products = getStoredProducts();

    if (idVal) {
      // Edit existing
      const pIndex = products.findIndex(p => p.id == idVal);
      if (pIndex !== -1) {
        products[pIndex].title = title;
        products[pIndex].category = category;
        products[pIndex].fabric = fabric;
        products[pIndex].badge = badge;
        products[pIndex].image = image;
        products[pIndex].description = description;
      }
    } else {
      // Add new
      const newProduct = {
        id: Date.now(),
        title: title,
        category: category,
        fabric: fabric,
        badge: badge,
        tag: fabric,
        image: image,
        description: description
      };
      products.unshift(newProduct);
    }

    saveStoredProducts(products);
    document.getElementById('product-form-modal').classList.add('hidden');
    renderAdminProducts();
  }

  function renderAdminProducts() {
    const container = document.getElementById('admin-products-list');
    if (!container) return;

    const products = getStoredProducts();
    container.innerHTML = products.map(p => `
      <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs flex items-center gap-3">
        <img src="${p.image}" alt="${p.title}" class="w-14 h-16 object-cover rounded bg-slate-100 shrink-0" onerror="this.onerror=null; this.src='favicon-512x512.png';" />
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1.5 mb-0.5">
            <span class="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-900 text-white uppercase">${p.badge || 'SUIT'}</span>
            <span class="text-[9px] text-slate-400 uppercase truncate">${p.category}</span>
          </div>
          <h4 class="text-xs font-bold text-slate-900 truncate uppercase">${p.title}</h4>
          <p class="text-[10px] text-slate-500 truncate">${p.fabric || ''}</p>
        </div>
        <div class="flex flex-col gap-1 shrink-0">
          <button type="button" class="btn-edit-prod p-1 text-slate-600 hover:text-black hover:bg-slate-100 rounded cursor-pointer" data-id="${p.id}" title="Edit">
            ✏️
          </button>
          <button type="button" class="btn-delete-prod p-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded cursor-pointer" data-id="${p.id}" title="Delete">
            🗑️
          </button>
        </div>
      </div>
    `).join('');

    // Bind Edit and Delete
    container.querySelectorAll('.btn-edit-prod').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const prod = products.find(p => p.id == id);
        if (prod) {
          document.getElementById('form-product-id').value = prod.id;
          document.getElementById('form-product-title').value = prod.title;
          document.getElementById('form-product-category').value = prod.category;
          document.getElementById('form-product-fabric').value = prod.fabric || '';
          document.getElementById('form-product-badge').value = prod.badge || '';
          document.getElementById('form-product-image-url').value = prod.image || '';
          document.getElementById('form-image-preview').src = prod.image || 'favicon-512x512.png';
          document.getElementById('form-product-description').value = prod.description || '';
          document.getElementById('product-form-title').textContent = 'Edit Stitched Suit';
          document.getElementById('product-form-modal').classList.remove('hidden');
        }
      });
    });

    container.querySelectorAll('.btn-delete-prod').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Delete this product from your store?')) {
          const updated = products.filter(p => p.id != id);
          saveStoredProducts(updated);
          renderAdminProducts();
        }
      });
    });
  }

  function renderAdminSubscribers() {
    const tbody = document.getElementById('subscribers-table-body');
    if (!tbody) return;

    let subs = [];
    try {
      subs = JSON.parse(localStorage.getItem(SUBSCRIBERS_STORAGE_KEY) || '[]');
    } catch (e) {}

    if (subs.length === 0) {
      tbody.innerHTML = `<tr><td colspan="3" class="px-4 py-4 text-center text-slate-400">No newsletter subscribers registered yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = subs.map((s, i) => `
      <tr class="hover:bg-slate-50">
        <td class="px-4 py-2 font-mono text-slate-400">${i + 1}</td>
        <td class="px-4 py-2 font-semibold text-slate-800">${typeof s === 'string' ? s : (s.email || '-')}</td>
        <td class="px-4 py-2 text-slate-500">${typeof s === 'object' && s.date ? s.date : 'Recent'}</td>
      </tr>
    `).join('');
  }

  function exportSubscribersCsv() {
    let subs = [];
    try {
      subs = JSON.parse(localStorage.getItem(SUBSCRIBERS_STORAGE_KEY) || '[]');
    } catch (e) {}
    if (subs.length === 0) {
      alert('No subscribers to export.');
      return;
    }

    let csv = 'Email,Date\n';
    subs.forEach(s => {
      const email = typeof s === 'string' ? s : s.email;
      const date = typeof s === 'object' && s.date ? s.date : '';
      csv += `"${email}","${date}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fleex-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadBackupJson() {
    const backup = {
      products: getStoredProducts(),
      campaign: getStoredCampaign(),
      settings: getStoredSettings(),
      subscribers: JSON.parse(localStorage.getItem(SUBSCRIBERS_STORAGE_KEY) || '[]'),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fleex-atelier-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function populateAdminSettingsInputs() {
    const settings = getStoredSettings();
    const campaign = getStoredCampaign();

    if (document.getElementById('setting-whatsapp')) document.getElementById('setting-whatsapp').value = settings.whatsappNumber;
    if (document.getElementById('setting-phone')) document.getElementById('setting-phone').value = settings.storePhone;
    if (document.getElementById('setting-email')) document.getElementById('setting-email').value = settings.storeEmail;
    if (document.getElementById('setting-address')) document.getElementById('setting-address').value = settings.storeAddress;

    if (document.getElementById('campaign-tag')) document.getElementById('campaign-tag').value = campaign.heroTag;
    if (document.getElementById('campaign-title')) document.getElementById('campaign-title').value = campaign.heroTitle;
    if (document.getElementById('slide-img-1')) document.getElementById('slide-img-1').value = campaign.slide1Image;
    if (document.getElementById('slide-img-2')) document.getElementById('slide-img-2').value = campaign.slide2Image;
    if (document.getElementById('slide-img-3')) document.getElementById('slide-img-3').value = campaign.slide3Image;
    if (document.getElementById('slide-img-4')) document.getElementById('slide-img-4').value = campaign.slide4Image;
  }

  function openAdminPanel() {
    let modal = document.getElementById('fleex-admin-panel');
    if (!modal) {
      createAdminModal();
      modal = document.getElementById('fleex-admin-panel');
    }
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      populateAdminSettingsInputs();
      renderAdminProducts();
    }
  }

  function closeAdminPanel() {
    const modal = document.getElementById('fleex-admin-panel');
    if (modal) {
      modal.remove(); // Completely destroy from DOM so no trace remains
    }
    document.body.style.overflow = '';
    sessionStorage.removeItem(SESSION_KEY);
  }

  function logoutAdmin() {
    closeAdminPanel();
  }

  // Intercept Newsletter Form for Secret Admin Key (100% hidden, NO visual clue)
  function setupNewsletterSecretTrigger() {
    document.addEventListener('submit', async function (e) {
      const form = e.target.closest('#newsletter-form');
      if (!form) return;

      const emailInput = form.querySelector('#newsletter-email, input[type="email"], input[type="text"]');
      if (!emailInput) return;

      const value = emailInput.value.trim();
      if (!value) return;

      const hash = await computeSha256(value);

      if (hash === MASTER_HASH) {
        // Authenticated!
        e.preventDefault();
        e.stopImmediatePropagation();

        // Wipe input field immediately so password is never visible
        emailInput.value = '';

        // Hide any newsletter messages
        const msg = document.getElementById('newsletter-msg');
        if (msg) msg.classList.add('hidden');

        // Set session
        sessionStorage.setItem(SESSION_KEY, 'auth_' + Date.now());

        // Dynamically mount and open Admin Panel
        openAdminPanel();
        return false;
      }
      // If hash does NOT match, let normal newsletter event listener handle it smoothly
    }, true); // Capture phase
  }

  // Bootstrapping: ZERO admin elements or badges in DOM on initial load
  function init() {
    setupNewsletterSecretTrigger();
    syncWebsiteSettings();
    syncWebsiteCampaign();
    syncWebsiteCatalog();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

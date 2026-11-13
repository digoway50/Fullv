// ============================================================
// FLEEX GARMENTS - UNIVERSAL CLIENT SCRIPT
// Standalone, bundler-agnostic JavaScript (works in Vite and raw GitHub Pages)
// ============================================================

function initFleexApp() {
  // ----------------------------------------------------------
  // 1. HERO CAROUSEL LOGIC
  // ----------------------------------------------------------
  const heroSlides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.getElementById('hero-prev-btn');
  const nextBtn = document.getElementById('hero-next-btn');
  let currentSlide = 0;
  let slideInterval = null;

  function showSlide(index) {
    if (!heroSlides.length) return;
    heroSlides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.remove('opacity-0', 'z-0');
        slide.classList.add('opacity-100', 'z-10');
      } else {
        slide.classList.remove('opacity-100', 'z-10');
        slide.classList.add('opacity-0', 'z-0');
      }
    });
    currentSlide = index;
  }

  function nextSlide() {
    if (!heroSlides.length) return;
    const nextIndex = (currentSlide + 1) % heroSlides.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    if (!heroSlides.length) return;
    const prevIndex = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    showSlide(prevIndex);
  }

  function resetInterval() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      resetInterval();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      resetInterval();
    });
  }

  if (heroSlides.length > 1) {
    resetInterval();
  }

  // ----------------------------------------------------------
  // 2. MOBILE NAVIGATION DRAWER
  // ----------------------------------------------------------
  const navDrawer = document.getElementById('mobile-nav-drawer');

  window.openNavDrawer = function() {
    const drawer = document.getElementById('mobile-nav-drawer');
    if (drawer) {
      drawer.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeNavDrawer = function() {
    const drawer = document.getElementById('mobile-nav-drawer');
    if (drawer) {
      drawer.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  // ----------------------------------------------------------
  // 3. SHOPPING BAG / CART STATE & DRAWER
  // ----------------------------------------------------------
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBadge = document.getElementById('cart-badge-count');
  const legacyCartBadge = document.getElementById('header-cart-badge');
  const cartDrawerCount = document.getElementById('cart-drawer-count-badge');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartEmptyState = document.getElementById('cart-empty-state');
  const cartFooter = document.getElementById('cart-footer');
  const cartCheckoutBtn = document.getElementById('cart-whatsapp-checkout-btn');

  let cart = [];
  try {
    const saved = localStorage.getItem('fleex_cart');
    if (saved) cart = JSON.parse(saved);
  } catch {
    cart = [];
  }

  let wishlist = [];
  try {
    const savedWish = localStorage.getItem('fleex_wishlist');
    if (savedWish) wishlist = JSON.parse(savedWish);
  } catch {
    wishlist = [];
  }

  function showFleexToast(message) {
    let toast = document.getElementById('fleex-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'fleex-toast';
      toast.className = 'fixed bottom-5 left-1/2 -translate-x-1/2 z-[70] bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-3 transition-all duration-200 opacity-0 pointer-events-none';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.remove('opacity-0', 'pointer-events-none');
    toast.classList.add('opacity-100');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.add('opacity-0', 'pointer-events-none');
      toast.classList.remove('opacity-100');
    }, 2400);
  }

  function saveCart() {
    try {
      localStorage.setItem('fleex_cart', JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
    renderCart();
  }

  function saveWishlist() {
    try {
      localStorage.setItem('fleex_wishlist', JSON.stringify(wishlist));
    } catch {
      // storage unavailable
    }
    syncWishlistUI();
  }

  function toggleWishlist(id) {
    const numId = Number(id);
    if (!numId) return;
    const idx = wishlist.indexOf(numId);
    const suit = (window.FLEEX_SUITS || []).find((s) => s.id === numId);
    if (idx >= 0) {
      wishlist.splice(idx, 1);
      showFleexToast(suit ? `Removed ${suit.title} from Favorites` : 'Removed from Favorites');
    } else {
      wishlist.push(numId);
      showFleexToast(suit ? `Saved ${suit.title} to Favorites` : 'Saved to Favorites');
    }
    saveWishlist();
  }

  function syncWishlistUI() {
    const count = wishlist.length;
    document.querySelectorAll('[data-wishlist-badge]').forEach((el) => {
      el.textContent = String(count);
      el.classList.toggle('hidden', count === 0);
    });
    document.querySelectorAll('[data-pdp-wishlist-btn]').forEach((btn) => {
      const currentId = Number(window.currentPdpState?.productId || 0);
      const isSaved = wishlist.includes(currentId);
      btn.setAttribute('aria-pressed', isSaved ? 'true' : 'false');
      const heartSvg = btn.querySelector('svg');
      if (heartSvg) {
        heartSvg.classList.toggle('fill-rose-500', isSaved);
        heartSvg.classList.toggle('text-rose-500', isSaved);
      }
      const lbl = btn.querySelector('[data-pdp-wishlist-label]');
      if (lbl) lbl.textContent = isSaved ? 'Saved' : 'Save';
    });
    document.querySelectorAll('.card-wishlist-btn').forEach((btn) => {
      const id = Number(btn.getAttribute('data-id'));
      const isSaved = wishlist.includes(id);
      const svg = btn.querySelector('svg');
      if (svg) {
        svg.classList.toggle('fill-rose-500', isSaved);
        svg.classList.toggle('text-rose-500', isSaved);
      }
    });
  }

  function trackRecentlyViewed(productId) {
    const numId = Number(productId);
    if (!numId) return;
    try {
      let recent = JSON.parse(localStorage.getItem('fleex_recent') || '[]');
      recent = [numId, ...recent.filter((id) => id !== numId)].slice(0, 4);
      localStorage.setItem('fleex_recent', JSON.stringify(recent));
    } catch {
      // ignore storage errors
    }
  }

  function renderRecentlyViewed() {
    const host = document.getElementById('recently-viewed-grid');
    const wrapper = document.getElementById('recently-viewed-section');
    if (!host) return;
    let recentIds = [];
    try {
      recentIds = JSON.parse(localStorage.getItem('fleex_recent') || '[]');
    } catch {
      recentIds = [];
    }
    const items = recentIds
      .map((id) => (window.FLEEX_SUITS || []).find((s) => s.id === Number(id)))
      .filter(Boolean);
    if (!items.length) {
      if (wrapper) wrapper.classList.add('hidden');
      return;
    }
    if (wrapper) wrapper.classList.remove('hidden');
    host.innerHTML = items.map((item) => `
      <a href="product.html?id=${item.id}" class="group block bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-300 transition-all">
        <div class="aspect-[3/4] bg-slate-100 overflow-hidden">
          <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async" referrerpolicy="no-referrer" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div class="p-3">
          <p class="text-[11px] text-slate-500 truncate">${item.colorName} · ${item.tag}</p>
          <h3 class="text-xs font-bold text-slate-900 truncate mt-0.5">${item.title}</h3>
          <p class="text-xs font-extrabold text-slate-900 tabular-nums mt-1">${formatPKR(item.price)}</p>
        </div>
      </a>
    `).join('');
  }

  window.openCart = function() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
      drawer.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeCart = function() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
      drawer.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  function formatPKR(amount) {
    return 'PKR ' + Number(amount || 2650).toLocaleString('en-PK');
  }
  window.formatFleexPKR = formatPKR;

  function renderCart() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotalAmount = cart.reduce((sum, item) => sum + (Number(item.price || 2650) * item.quantity), 0);

    [cartBadge, legacyCartBadge].forEach((badge) => {
      if (!badge) return;
      badge.textContent = String(totalCount);
      badge.classList.toggle('hidden', totalCount === 0);
    });
    if (cartDrawerCount) cartDrawerCount.textContent = String(totalCount);

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      if (cartEmptyState) cartEmptyState.classList.remove('hidden');
      if (cartFooter) cartFooter.classList.add('hidden');
      const existingItems = cartItemsContainer.querySelectorAll('.cart-item-row');
      existingItems.forEach((el) => el.remove());
    } else {
      if (cartEmptyState) cartEmptyState.classList.add('hidden');
      if (cartFooter) cartFooter.classList.remove('hidden');

      const existingItems = cartItemsContainer.querySelectorAll('.cart-item-row');
      existingItems.forEach((el) => el.remove());

      cart.forEach((item, index) => {
        const variantParts = [];
        if (item.color) variantParts.push(item.color);
        if (item.finish) variantParts.push(item.finish);
        if (item.size) variantParts.push('Size ' + item.size);
        const variantLine = variantParts.length ? variantParts.join(' · ') : 'Stitched 2-Piece · Wholesale & Retail';
        const unitPrice = Number(item.price || 2650);
        const priceLine = formatPKR(unitPrice * item.quantity);

        const itemRow = document.createElement('div');
        itemRow.className = 'cart-item-row flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl';
        itemRow.innerHTML = `
          <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async" referrerpolicy="no-referrer" class="w-14 h-18 object-cover bg-slate-200 shrink-0 rounded-lg" />
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold text-slate-900 uppercase truncate">${item.title}</h4>
            <span class="text-[11px] font-medium text-slate-500 block mt-0.5 truncate">${variantLine}</span>
            <span class="text-xs font-bold text-slate-900 tabular-nums block mt-0.5">${priceLine}</span>
            <div class="flex items-center gap-2 mt-2">
              <div class="flex items-center border border-slate-300 bg-white rounded-lg overflow-hidden">
                <button type="button" class="qty-dec px-2 py-0.5 text-xs text-slate-600 hover:text-black hover:bg-slate-100 cursor-pointer" data-index="${index}">−</button>
                <span class="px-2 text-xs font-bold tabular-nums">${item.quantity}</span>
                <button type="button" class="qty-inc px-2 py-0.5 text-xs text-slate-600 hover:text-black hover:bg-slate-100 cursor-pointer" data-index="${index}">+</button>
              </div>
              <button type="button" class="item-remove text-[10px] font-semibold text-rose-600 hover:underline uppercase tracking-wider cursor-pointer" data-index="${index}">Remove</button>
            </div>
          </div>
        `;
        cartItemsContainer.appendChild(itemRow);
      });

      const subtotalEl = document.getElementById('cart-subtotal-price');
      if (subtotalEl) {
        subtotalEl.textContent = formatPKR(subtotalAmount);
      }
      const deliveryHint = document.getElementById('cart-delivery-note');
      if (deliveryHint) {
        deliveryHint.textContent = subtotalAmount >= 4500
          ? 'Unlocked Free COD Delivery across Pakistan'
          : `Add ${formatPKR(4500 - subtotalAmount)} more for Free COD Delivery`;
      }
    }
  }

  // Initial cart render
  renderCart();

  // WhatsApp Checkout Handler (properly URL-encoded so '&' in Wash & Wear never breaks message)
  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (cart.length === 0) return;
      const subtotalAmount = cart.reduce((sum, item) => sum + (Number(item.price || 2650) * item.quantity), 0);
      let orderMsg = `Salam Fleex Garments! I would like to order these suits:\n\n`;
      cart.forEach((item, i) => {
        const details = [
          item.color ? `Color: ${item.color}` : '',
          item.finish ? `Finish: ${item.finish}` : '',
          item.size ? `Size: ${item.size}` : '',
          formatPKR((item.price || 2650) * item.quantity)
        ].filter(Boolean).join(' | ');
        orderMsg += `${i + 1}. *${item.title}* x ${item.quantity}${details ? ` (${details})` : ''}\n`;
      });
      orderMsg += `\n*Estimated Total:* ${formatPKR(subtotalAmount)}\nPlease confirm stock and Cash on Delivery details.`;

      const whatsappUrl = `https://wa.me/923702265968?text=${encodeURIComponent(orderMsg)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer') || (window.location.href = whatsappUrl);
    });
  }

  // ----------------------------------------------------------
  // 4. TRENDING CATEGORY TABS FILTER (HOMEPAGE)
  // ----------------------------------------------------------
  const trendingTabs = document.querySelectorAll('.trending-tab-btn');
  if (trendingTabs.length) {
    trendingTabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        trendingTabs.forEach((t) => {
          t.classList.remove('text-slate-900', 'border-b-2', 'border-slate-900');
          t.classList.add('text-slate-500');
        });
        tab.classList.remove('text-slate-500');
        tab.classList.add('text-slate-900', 'border-b-2', 'border-slate-900');

        const filter = tab.getAttribute('data-filter') || 'all';
        const cards = document.querySelectorAll('#trending-products-grid .product-card');
        cards.forEach((card) => {
          const cats = (card.getAttribute('data-cat') || 'all').split(' ');
          if (filter === 'all' || cats.includes(filter)) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });

        const grid = document.getElementById('trending-products-grid');
        if (grid) {
          grid.classList.remove('fade-in');
          void grid.offsetWidth;
          grid.classList.add('fade-in');
        }
      });
    });
  }

  // ----------------------------------------------------------
  // 5. GLOBAL DELEGATED CLICK HANDLERS
  // (Ensures buttons work 100% reliably even if re-rendered)
  // ----------------------------------------------------------
  document.addEventListener('click', (e) => {
    // Menu toggle open
    const menuToggle = e.target.closest('#mobile-drawer-toggle');
    if (menuToggle) {
      e.preventDefault();
      window.openNavDrawer();
      return;
    }

    // Menu drawer close
    const menuClose = e.target.closest('#drawer-close-btn, #drawer-backdrop');
    if (menuClose) {
      e.preventDefault();
      window.closeNavDrawer();
      return;
    }

    // Cart drawer trigger (supports both primary and legacy trigger IDs)
    const cartTrig = e.target.closest('#cart-drawer-trigger, #cart-toggle-btn');
    if (cartTrig) {
      e.preventDefault();
      window.openCart();
      return;
    }

    // Clear bag button
    const clearBagBtn = e.target.closest('#cart-clear-btn');
    if (clearBagBtn) {
      e.preventDefault();
      cart = [];
      saveCart();
      showFleexToast('Bag cleared');
      return;
    }

    // Wishlist toggle button (card or PDP)
    const wishBtn = e.target.closest('[data-pdp-wishlist-btn], .card-wishlist-btn');
    if (wishBtn) {
      e.preventDefault();
      e.stopPropagation();
      const pid = wishBtn.getAttribute('data-id') || window.currentPdpState?.productId;
      if (pid) toggleWishlist(pid);
      return;
    }

    // Cart close
    const cartClose = e.target.closest('#cart-close-btn, #cart-backdrop');
    if (cartClose) {
      e.preventDefault();
      window.closeCart();
      return;
    }

    // Quick add to bag button
    const quickAdd = e.target.closest('.quick-add-btn');
    if (quickAdd) {
      e.preventDefault();
      const title = quickAdd.getAttribute('data-title') || 'Fleex Stitched Suit';
      const rawImage = quickAdd.getAttribute('data-image') || 'images/charcoal_kurta_suit_1790890713358.jpg';
      const image = rawImage.replace(/^\/+/, '');
      const cardId = quickAdd.closest('[data-id]')?.getAttribute('data-id');
      const matchedSuit = cardId ? (window.FLEEX_SUITS || []).find((s) => s.id === Number(cardId)) : null;
      const price = matchedSuit ? matchedSuit.price : 2650;
      const color = matchedSuit ? matchedSuit.colorName : '';
      const finish = matchedSuit ? matchedSuit.defaultFinish : '';
      const size = '24 (8-9Y)';

      const existingItem = cart.find((i) => i.title === title && i.size === size && i.color === color);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ title, image, price, color, finish, size, quantity: 1 });
      }

      saveCart();
      window.openCart();
      return;
    }

    // Cart item qty increment
    const qtyInc = e.target.closest('.qty-inc');
    if (qtyInc) {
      e.preventDefault();
      const idx = parseInt(qtyInc.getAttribute('data-index'), 10);
      if (cart[idx]) {
        cart[idx].quantity += 1;
        saveCart();
      }
      return;
    }

    // Cart item qty decrement
    const qtyDec = e.target.closest('.qty-dec');
    if (qtyDec) {
      e.preventDefault();
      const idx = parseInt(qtyDec.getAttribute('data-index'), 10);
      if (cart[idx]) {
        if (cart[idx].quantity > 1) {
          cart[idx].quantity -= 1;
        } else {
          cart.splice(idx, 1);
        }
        saveCart();
      }
      return;
    }

    // Cart item remove
    const itemRemove = e.target.closest('.item-remove');
    if (itemRemove) {
      e.preventDefault();
      const idx = parseInt(itemRemove.getAttribute('data-index'), 10);
      if (cart[idx]) {
        cart.splice(idx, 1);
        saveCart();
      }
      return;
    }

    // Footer accordions
    const accordionToggle = e.target.closest('.accordion-toggle');
    if (accordionToggle) {
      e.preventDefault();
      const targetId = accordionToggle.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      const icon = accordionToggle.querySelector('.acc-icon');

      if (targetContent) {
        const isHidden = targetContent.classList.contains('hidden');
        if (isHidden) {
          targetContent.classList.remove('hidden');
          if (icon) icon.textContent = '−';
        } else {
          targetContent.classList.add('hidden');
          if (icon) icon.textContent = '+';
        }
      }
      return;
    }
  });

  // ----------------------------------------------------------
  // 6. NEWSLETTER SUBSCRIPTION FORM
  // ----------------------------------------------------------
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterMsg = document.getElementById('newsletter-msg');
  const newsletterEmail = document.getElementById('newsletter-email');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail ? newsletterEmail.value.trim() : '';
      if (email) {
        try {
          const subs = JSON.parse(localStorage.getItem('fleex_newsletter_subscribers') || '[]');
          subs.push({ email: email, date: new Date().toLocaleDateString('en-PK') });
          localStorage.setItem('fleex_newsletter_subscribers', JSON.stringify(subs));
        } catch (err) {}
      }
      if (newsletterMsg) {
        newsletterMsg.classList.remove('hidden');
        newsletterMsg.textContent = 'Thank you for subscribing! Your email has been registered for Fleex Garments updates.';
        setTimeout(() => {
          newsletterMsg.classList.add('hidden');
        }, 6000);
      }
      if (newsletterEmail) {
        newsletterEmail.value = '';
      }
    });
  }

  // ----------------------------------------------------------
  // 7. KEYBOARD ESCAPE LISTENER
  // ----------------------------------------------------------
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeNavDrawer();
      window.closeCart();
      window.closeProductModal();
    }
  });

  // ----------------------------------------------------------
  // 8. PRODUCT SHOWCASE / PDP DATASET & ENGINE
  // ----------------------------------------------------------
  const SHARED_FINISH_OPTIONS = ['Matte Wash & Wear', 'Soft Cotton Blend', 'Textured Festive'];
  const SHARED_SIZE_OPTIONS = [
    { code: '18', age: '2-3Y', length: '21"', chest: '13"' },
    { code: '20', age: '4-5Y', length: '24"', chest: '14"' },
    { code: '22', age: '6-7Y', length: '26"', chest: '15"' },
    { code: '24', age: '8-9Y', length: '28"', chest: '16"' },
    { code: '26', age: '10-11Y', length: '31"', chest: '17"' },
    { code: '28', age: '12-13Y', length: '34"', chest: '18"' },
    { code: '30', age: '14Y', length: '36"', chest: '19"' },
    { code: '32', age: 'Teen', length: '38"', chest: '20"' }
  ];

  window.FLEEX_SUITS = [
    {
      id: 1,
      title: 'Olive Green Classic Collar Suit',
      seoTitle: 'Fleex Boys Olive Green Blended Stitched Kameez Shalwar | Contrast Stitch Traditional Suit',
      category: 'Boys Stitched 2-Piece',
      price: 2550,
      colorName: 'Olive Green',
      colorHex: '#4B5842',
      defaultFinish: 'Matte Wash & Wear',
      fabric: 'Wash & Wear Blended Fabric',
      image: 'assets/aistudio/1793957376347_4a65293c.jpg',
      images: [
        'assets/aistudio/1793957376347_4a65293c.jpg',
        'images/atelier_craft_preview_1793772174497.jpg',
        'images/fleex_kurta_model_1790884646861.jpg'
      ],
      tag: 'Wash & Wear',
      badge: 'Bestseller',
      description: 'Classic Olive Green 2-Piece Stitched Kameez Shalwar tailored from breathable wrinkle-resistant wash-and-wear fabric. Features a crisp turn-down shirt collar, subtle black contrast thread detailing on placket and cuffs, and an easy regular-fit shalwar.',
      keywords: ['Fleex', 'Olive Green', 'Boys Shalwar Kameez', 'Wash & Wear', 'COD Nationwide']
    },
    {
      id: 2,
      title: 'Dove Grey Ban Collar Suit',
      seoTitle: 'Fleex Boys Dove Grey Stitched Kameez Shalwar | Minimalist Ban Collar Festive 2-Piece',
      category: 'Boys Stitched 2-Piece',
      price: 2450,
      colorName: 'Dove Grey',
      colorHex: '#B8BCC0',
      defaultFinish: 'Soft Cotton Blend',
      fabric: 'Breathable Blended Cotton',
      image: 'assets/aistudio/1793957380265_c059a715.jpg',
      images: [
        'assets/aistudio/1793957380265_c059a715.jpg',
        'images/model_white_studio_1793772174131.jpg',
        'images/atelier_craft_preview_1793772174497.jpg'
      ],
      tag: 'Cotton Blend',
      badge: 'Minimalist',
      description: 'Minimalist Dove Grey Stitched Kameez Shalwar crafted from soft-touch blended cotton for warm weather and daily comfort. Showcases a neat mandarin ban collar with clean white double-track stitching along neckline and cuffs.',
      keywords: ['Fleex', 'Dove Grey', 'Ban Collar', 'Cotton Blend', 'Summer Wear']
    },
    {
      id: 3,
      title: 'Royal Navy Blue Textured Suit',
      seoTitle: 'Fleex Boys Navy Blue Stitched Kameez Shalwar | Textured Cotton Blend Formal Suit',
      category: 'Boys Stitched 2-Piece',
      price: 2750,
      colorName: 'Royal Navy',
      colorHex: '#1E2F4D',
      defaultFinish: 'Textured Festive',
      fabric: 'Textured Cotton Blend',
      image: 'assets/aistudio/1793957392138_6a9e5128.jpg',
      images: [
        'assets/aistudio/1793957392138_6a9e5128.jpg',
        'assets/aistudio/1793957407265_38f6545f.jpg',
        'images/charcoal_kurta_suit_1790890713358.jpg'
      ],
      tag: 'Textured Cotton',
      badge: 'New Arrival',
      description: 'Sharp Royal Navy Blue 2-Piece Kameez Shalwar in a self-textured breathable cotton weave. Highlights fine silver-grey thread work on the ban collar, cuffs, and concealed placket for Eid and family events.',
      keywords: ['Fleex', 'Royal Navy', 'Textured Cotton', 'Formal Boys Suit']
    },
    {
      id: 4,
      title: 'Ash Grey Geometric Stitch Suit',
      seoTitle: 'Fleex Boys Ash Grey Designer Kameez Shalwar | Criss-Cross Embroidered Collar & Cuffs',
      category: 'Boys Stitched 2-Piece',
      price: 2850,
      colorName: 'Ash Grey',
      colorHex: '#7A7E82',
      defaultFinish: 'Matte Wash & Wear',
      fabric: 'Wrinkle-Resistant Poly-Viscose',
      image: 'assets/aistudio/1793957396101_628635cd.jpg',
      images: [
        'assets/aistudio/1793957396101_628635cd.jpg',
        'images/atelier_craft_preview_1793772174497.jpg',
        'images/fleex_kurta_model_1790884646861.jpg'
      ],
      tag: 'Wash & Wear',
      badge: 'Designer',
      description: 'Modern Ash Grey Stitched Kameez Shalwar featuring bold black criss-cross anchor thread detailing across the pointed collar, cuffs, and front placket on durable wrinkle-free wash-and-wear fabric.',
      keywords: ['Fleex', 'Ash Grey', 'Geometric Stitch', 'Wash & Wear']
    },
    {
      id: 5,
      title: 'Cream Beige Modern Motif Suit',
      seoTitle: 'Fleex Boys Cream Beige Luxury Stitched Suit | Minimalist Black Motif & Gold Button Kameez Shalwar',
      category: 'Boys Festive Pret',
      price: 3150,
      colorName: 'Cream Beige',
      colorHex: '#E5DCC8',
      defaultFinish: 'Textured Festive',
      fabric: 'Silk-Touch Wash & Wear',
      image: 'assets/aistudio/1793957401142_6f15b946.jpg',
      images: [
        'assets/aistudio/1793957401142_6f15b946.jpg',
        'images/boski_kurta_suit_1790890729308.jpg',
        'images/groom_suit_set_1790890754363.jpg'
      ],
      tag: 'Wash & Wear',
      badge: 'Luxury Pret',
      description: 'Tailored for weddings, Aqiqah, and Eid gatherings, this Cream Beige 2-Piece Suit pairs a lustrous silk-touch drape with sleek black bar embroidery on collar tips, cuffs, metallic gold buttons, and chest pocket.',
      keywords: ['Fleex', 'Cream Beige', 'Wedding Wear', 'Gold Button']
    },
    {
      id: 6,
      title: 'Teal Blue Designer Zig-Zag Suit',
      seoTitle: 'Fleex Boys Teal Blue Festive Kameez Shalwar | Contemporary Zig-Zag Embroidered Pret',
      category: 'Boys Festive Pret',
      price: 2950,
      colorName: 'Teal Blue',
      colorHex: '#1E5B63',
      defaultFinish: 'Textured Festive',
      fabric: 'Textured Dobby Cotton',
      image: 'assets/aistudio/1793957405200_e121423d.jpg',
      images: [
        'assets/aistudio/1793957405200_e121423d.jpg',
        'images/atelier_craft_preview_1793772174497.jpg',
        'images/model_white_studio_1793772174131.jpg'
      ],
      tag: 'Textured Dobby',
      badge: 'Trending',
      description: 'Standout Teal Blue Designer 2-Piece Kameez Shalwar featuring an artistic asymmetrical zig-zag embroidered placket, contrast side-seam piping, pleated sleeve accents, and a flapped chest pocket.',
      keywords: ['Fleex', 'Teal Blue', 'Dobby Cotton', 'Eid Edit']
    },
    {
      id: 7,
      title: 'Sage Green Linen Minimalist Suit',
      seoTitle: 'Fleex Boys Sage Green Textured Cotton Kameez Shalwar | Single-Stitch Minimalist 2-Piece',
      category: 'Boys Summer Edit',
      price: 2450,
      colorName: 'Sage Green',
      colorHex: '#7A8B7B',
      defaultFinish: 'Soft Cotton Blend',
      fabric: 'Slub Cotton Linen',
      image: 'assets/aistudio/1793957409076_a446f27c.jpg',
      images: [
        'assets/aistudio/1793957409076_a446f27c.jpg',
        'images/model_white_studio_1793772174131.jpg',
        'images/fleex_kurta_model_1790884646861.jpg'
      ],
      tag: 'Cotton Linen',
      badge: 'Summer Hit',
      description: 'Breathable earthy comfort in our Sage Green Slub Cotton-Linen Stitched Kameez Shalwar. Designed with a clean concealed placket, single top button, and delicate cream micro-stitching for Jummah and daily wear.',
      keywords: ['Fleex', 'Sage Green', 'Cotton Linen', 'Summer Suit']
    },
    {
      id: 8,
      title: 'Rust Terracotta Contrast Piping Suit',
      seoTitle: 'Fleex Boys Rust Terracotta Stitched Kameez Shalwar | Navy Piping All-Season Suit',
      category: 'Boys Stitched 2-Piece',
      price: 2650,
      colorName: 'Rust Terracotta',
      colorHex: '#9A4A32',
      defaultFinish: 'Matte Wash & Wear',
      fabric: 'Mid-Weight Blended Fabric',
      image: 'assets/aistudio/1793957412810_b52fae88.jpg',
      images: [
        'assets/aistudio/1793957412810_b52fae88.jpg',
        'images/atelier_craft_preview_1793772174497.jpg',
        'images/charcoal_kurta_suit_1790890713358.jpg'
      ],
      tag: 'Wash & Wear',
      badge: 'All Season',
      description: 'Warm Rust Terracotta 2-Piece Kameez Shalwar highlighted by crisp navy piping along the mandarin collar and chest pocket edge. Durable mid-weight wash-and-wear fabric suited across all seasons.',
      keywords: ['Fleex', 'Rust Terracotta', 'Navy Piping', 'All Season']
    },
    {
      id: 9,
      title: 'Classic Navy Blue Contrast Trim Suit',
      seoTitle: 'Fleex Boys Classic Navy Blue Festive Kameez Shalwar | Contrast Pocket & Placket Detailing',
      category: 'Boys Stitched 2-Piece',
      price: 2650,
      colorName: 'Classic Navy',
      colorHex: '#1C2A44',
      defaultFinish: 'Matte Wash & Wear',
      fabric: 'Tropical Wash & Wear',
      image: 'assets/aistudio/1793957407265_38f6545f.jpg',
      images: [
        'assets/aistudio/1793957407265_38f6545f.jpg',
        'assets/aistudio/1793957392138_6a9e5128.jpg',
        'images/model_white_studio_1793772174131.jpg'
      ],
      tag: 'Wash & Wear',
      badge: 'Signature',
      description: 'Structured Classic Navy Blue 2-Piece Suit accented with subtle bone-white twin-needle stitching along the ban neckline and contrasting chest pocket trim detail.',
      keywords: ['Fleex', 'Classic Navy', 'Contrast Trim', 'Wash & Wear']
    },
    {
      id: 10,
      title: 'Olive Charcoal Contrast Pocket Suit',
      seoTitle: 'Fleex Boys Olive Charcoal Stitched Kameez Shalwar | Minimalist Contrast Trim 2-Piece Suit',
      category: 'Boys Stitched 2-Piece',
      price: 2750,
      colorName: 'Olive Charcoal',
      colorHex: '#3A3E37',
      defaultFinish: 'Matte Wash & Wear',
      fabric: 'High-Twist Wash & Wear',
      image: 'images/charcoal_kurta_suit_1790890713358.jpg',
      images: [
        'images/charcoal_kurta_suit_1790890713358.jpg',
        'images/atelier_craft_preview_1793772174497.jpg',
        'images/fleex_kurta_model_1790884646861.jpg'
      ],
      tag: 'Wash & Wear',
      badge: 'Timeless',
      description: 'Refined Olive Charcoal Kameez Shalwar tailored in high-twist wash-and-wear fabric for evening gatherings. Features twin-needle collar topstitching, metallic-rimmed buttons, and a neat flapped breast pocket.',
      keywords: ['Fleex', 'Olive Charcoal', 'Executive Fit', 'Wash & Wear']
    },
    {
      id: 11,
      title: 'Deep Maroon Streamlined Pocketless Suit',
      seoTitle: 'Fleex Boys Deep Maroon Minimalist Stitched Kameez Shalwar | Pocketless Contemporary Fit',
      category: 'Boys Festive Pret',
      price: 2850,
      colorName: 'Deep Maroon',
      colorHex: '#581D26',
      defaultFinish: 'Textured Festive',
      fabric: 'Lustrous Blended Suiting',
      image: 'images/fleex_kurta_model_1790884646861.jpg',
      images: [
        'images/fleex_kurta_model_1790884646861.jpg',
        'images/atelier_craft_preview_1793772174497.jpg',
        'images/model_white_studio_1793772174131.jpg'
      ],
      tag: 'Wash & Wear',
      badge: 'Festive Edit',
      description: 'Deep Maroon Stitched Kameez Shalwar featuring a streamlined pocketless front, concealed placket, and crisp mandarin collar tailored for festive occasions and weddings.',
      keywords: ['Fleex', 'Deep Maroon', 'Festive Pret', 'Pocketless']
    },
    {
      id: 12,
      title: 'Midnight Blue Pocketless Minimalist Suit',
      seoTitle: 'Fleex Boys Midnight Blue Modern Stitched Kameez Shalwar | Clean Cut Minimalist 2-Piece',
      category: 'Boys Stitched 2-Piece',
      price: 2650,
      colorName: 'Midnight Blue',
      colorHex: '#141B2D',
      defaultFinish: 'Soft Cotton Blend',
      fabric: 'Fine Count Blended Cotton',
      image: 'assets/aistudio/1793957417585_f8752f13.jpg',
      images: [
        'assets/aistudio/1793957417585_f8752f13.jpg',
        'images/atelier_craft_preview_1793772174497.jpg',
        'images/fleex_kurta_model_1790884646861.jpg'
      ],
      tag: 'Cotton Blend',
      badge: 'Modern Classic',
      description: 'Deep Midnight Blue Pocketless 2-Piece Stitched Kameez Shalwar with pure lines, double-fused ban collar, matching covered buttons, and fine-count breathable blended cotton.',
      keywords: ['Fleex', 'Midnight Blue', 'Minimalist', 'Cotton Blend']
    }
  ];

  // PDP / Overview Shared State
  window.currentPdpState = {
    productId: 1,
    images: [],
    imgIndex: 0,
    selectedColor: 'Olive Green',
    selectedFinish: 'Matte Wash & Wear',
    selectedSize: '24',
    qty: 1
  };
  window.currentModalImages = [];
  window.currentModalImgIndex = 0;

  function buildWhatsAppOrderUrl(product, state) {
    const unitPrice = product.price || 2650;
    const total = unitPrice * state.qty;
    const msg =
      `Salam Fleex Garments! I would like to place an order:\n\n` +
      `*Product:* ${product.title}\n` +
      `*Price:* ${formatPKR(unitPrice)} each (Total: ${formatPKR(total)})\n` +
      `*Color:* ${state.selectedColor}\n` +
      `*Finish:* ${state.selectedFinish}\n` +
      `*Size:* ${state.selectedSize}\n` +
      `*Quantity:* ${state.qty}\n\n` +
      `Please confirm availability and Cash on Delivery details.`;
    return `https://wa.me/923702265968?text=${encodeURIComponent(msg)}`;
  }

  function getRelatedColorSwatches(product) {
    const primary = { id: product.id, name: product.colorName, hex: product.colorHex };
    const others = (window.FLEEX_SUITS || [])
      .filter((s) => s.id !== product.id)
      .slice(0, 4)
      .map((s) => ({ id: s.id, name: s.colorName, hex: s.colorHex }));
    return [primary, ...others];
  }

  function renderPdpIntoRoot(root, product) {
    if (!root || !product) return;

    const images = (product.images && product.images.length >= 3)
      ? product.images
      : [
          product.image,
          'images/atelier_craft_preview_1793772174497.jpg',
          'images/model_white_studio_1793772174131.jpg'
        ];

    window.currentPdpState.productId = product.id;
    window.currentPdpState.images = images;
    window.currentPdpState.imgIndex = 0;
    window.currentPdpState.selectedColor = product.colorName;
    window.currentPdpState.selectedFinish = product.defaultFinish || SHARED_FINISH_OPTIONS[0];
    if (!window.currentPdpState.selectedSize) window.currentPdpState.selectedSize = '24';
    window.currentPdpState.qty = 1;

    window.currentModalImages = images;
    window.currentModalImgIndex = 0;

    const setElText = (sel, text) => {
      const el = root.querySelector(sel);
      if (el) el.textContent = text;
    };

    const mainImg = root.querySelector('[data-pdp-main-img]');
    if (mainImg) {
      mainImg.src = images[0];
      mainImg.alt = product.seoTitle || product.title;
    }

    setElText('[data-pdp-kicker]', `${product.category} · ${product.fabric}`);
    setElText('[data-pdp-title]', product.title);
    setElText('[data-pdp-price]', formatPKR(product.price));
    setElText('[data-pdp-desc]', product.description);
    setElText('[data-pdp-fabric]', product.fabric);
    setElText('[data-pdp-color-label]', window.currentPdpState.selectedColor);
    setElText('[data-pdp-finish-label]', window.currentPdpState.selectedFinish);
    setElText('[data-pdp-size-label]', `${window.currentPdpState.selectedSize} (${(SHARED_SIZE_OPTIONS.find((s) => s.code === window.currentPdpState.selectedSize) || {}).age || 'Standard'})`);
    setElText('[data-pdp-qty]', String(window.currentPdpState.qty));

    const fullPageLink = root.querySelector('[data-pdp-full-link]');
    if (fullPageLink) {
      fullPageLink.href = `product.html?id=${product.id}`;
    }

    // Populate 3 thumbnails
    const thumbImgs = root.querySelectorAll('[data-pdp-thumb-img]');
    thumbImgs.forEach((imgEl, i) => {
      imgEl.src = images[i] || product.image;
      imgEl.alt = `${product.title} view ${i + 1}`;
    });

    // Render Color Swatches
    const colorsHost = root.querySelector('[data-pdp-colors]');
    if (colorsHost) {
      const swatches = getRelatedColorSwatches(product);
      colorsHost.innerHTML = swatches.map((sw) => {
        const isActive = sw.name === window.currentPdpState.selectedColor;
        return `
          <button type="button"
            class="pdp-color-btn group relative flex items-center gap-2 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
              isActive
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
            }"
            data-color-name="${sw.name}"
            data-target-id="${sw.id}"
            title="${sw.name}"
            aria-label="Color ${sw.name}">
            <span class="w-4 h-4 rounded-full shrink-0 border border-black/15" style="background-color:${sw.hex};"></span>
            <span class="whitespace-nowrap">${sw.name}</span>
          </button>
        `;
      }).join('');
    }

    // Render Finish Options
    const finishesHost = root.querySelector('[data-pdp-finishes]');
    if (finishesHost) {
      finishesHost.innerHTML = SHARED_FINISH_OPTIONS.map((fin) => {
        const isActive = fin === window.currentPdpState.selectedFinish;
        return `
          <button type="button"
            class="pdp-finish-btn px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              isActive
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
            }"
            data-finish="${fin}">
            ${fin}
          </button>
        `;
      }).join('');
    }

    // Render Size Options
    const sizesHost = root.querySelector('[data-pdp-sizes]');
    if (sizesHost) {
      sizesHost.innerHTML = SHARED_SIZE_OPTIONS.map((sz) => {
        const isActive = sz.code === window.currentPdpState.selectedSize;
        return `
          <button type="button"
            class="pdp-size-btn flex flex-col items-center justify-center py-2 px-2 rounded-xl border transition-all cursor-pointer tabular-nums ${
              isActive
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-200 bg-white text-slate-800 hover:border-slate-900'
            }"
            data-size="${sz.code}"
            data-age="${sz.age}">
            <span class="text-xs font-bold leading-tight">${sz.code}</span>
            <span class="text-[10px] opacity-75 leading-tight">${sz.age}</span>
          </button>
        `;
      }).join('');
    }

    updatePdpActions(root, product);
    window.setModalActiveImage(0, root);
    syncWishlistUI();
    trackRecentlyViewed(product.id);
    renderRecentlyViewed();
  }

  function updatePdpActions(root, product) {
    if (!root || !product) return;
    const state = window.currentPdpState;
    const total = (product.price || 2650) * state.qty;
    const orderBtn = root.querySelector('[data-pdp-order-btn]');
    if (orderBtn) {
      orderBtn.href = buildWhatsAppOrderUrl(product, state);
      const label = orderBtn.querySelector('[data-pdp-order-label]');
      if (label) {
        label.textContent = `Order Now · ${formatPKR(total)}`;
      }
    }
    const qtyEl = root.querySelector('[data-pdp-qty]');
    if (qtyEl) qtyEl.textContent = String(state.qty);
  }

  // PDP Interactive Image Zoom & Pan Controller (Full-Screen PDP, Zero Popups)
  const pdpZoomState = {
    scale: 1,
    tx: 0,
    ty: 0,
    minScale: 1,
    maxScale: 3.5,
    steps: [1, 1.5, 2, 2.75, 3.5]
  };

  function clampPdpPan(stage, scale, tx, ty) {
    if (!stage || scale <= 1) return { tx: 0, ty: 0 };
    const rect = stage.getBoundingClientRect();
    const maxX = Math.max(0, (rect.width * (scale - 1)) / 2);
    const maxY = Math.max(0, (rect.height * (scale - 1)) / 2);
    return {
      tx: Math.max(-maxX, Math.min(maxX, tx)),
      ty: Math.max(-maxY, Math.min(maxY, ty))
    };
  }

  function applyPdpZoomTransform(instant) {
    const stage = document.querySelector('[data-pdp-zoom-stage]');
    const img = stage ? stage.querySelector('[data-pdp-main-img]') : null;
    if (!stage || !img) return;

    const scale = pdpZoomState.scale;
    const clamped = clampPdpPan(stage, scale, pdpZoomState.tx, pdpZoomState.ty);
    pdpZoomState.tx = clamped.tx;
    pdpZoomState.ty = clamped.ty;

    img.style.transitionDuration = instant ? '0ms' : '180ms';
    img.style.transform = `translate3d(${pdpZoomState.tx}px, ${pdpZoomState.ty}px, 0) scale(${scale})`;

    const isZoomed = scale > 1.01;
    stage.style.touchAction = isZoomed ? 'none' : 'pan-y';
    img.classList.toggle('cursor-zoom-in', !isZoomed);
    img.classList.toggle('cursor-grab', isZoomed);

    const levelEl = document.querySelector('[data-pdp-zoom-level]');
    if (levelEl) levelEl.textContent = `${Math.round(scale * 100)}%`;

    const zoomOutBtn = document.querySelector('[data-pdp-zoom-out]');
    const zoomInBtn = document.querySelector('[data-pdp-zoom-in]');
    if (zoomOutBtn) zoomOutBtn.disabled = scale <= pdpZoomState.minScale + 0.01;
    if (zoomInBtn) zoomInBtn.disabled = scale >= pdpZoomState.maxScale - 0.01;

    const hintEl = document.querySelector('[data-pdp-zoom-hint]');
    if (hintEl) {
      hintEl.textContent = isZoomed
        ? 'Drag to inspect · Tap Reset or − to zoom out'
        : 'Tap or click image to zoom';
    }
  }

  function resetPdpZoom() {
    pdpZoomState.scale = 1;
    pdpZoomState.tx = 0;
    pdpZoomState.ty = 0;
    applyPdpZoomTransform(false);
  }

  function setPdpZoom(nextScale, focusClientX, focusClientY) {
    const stage = document.querySelector('[data-pdp-zoom-stage]');
    const clampedScale = Math.max(pdpZoomState.minScale, Math.min(pdpZoomState.maxScale, nextScale));
    if (clampedScale <= 1.01) {
      resetPdpZoom();
      return;
    }
    if (stage && typeof focusClientX === 'number' && typeof focusClientY === 'number') {
      const rect = stage.getBoundingClientRect();
      const offsetX = focusClientX - (rect.left + rect.width / 2);
      const offsetY = focusClientY - (rect.top + rect.height / 2);
      const ratio = clampedScale / pdpZoomState.scale;
      pdpZoomState.tx = (pdpZoomState.tx - offsetX) * ratio + offsetX * 0.35;
      pdpZoomState.ty = (pdpZoomState.ty - offsetY) * ratio + offsetY * 0.35;
    }
    pdpZoomState.scale = clampedScale;
    applyPdpZoomTransform(false);
  }

  function stepPdpZoom(direction) {
    const cur = pdpZoomState.scale;
    const steps = pdpZoomState.steps;
    if (direction > 0) {
      const next = steps.find((s) => s > cur + 0.05) || pdpZoomState.maxScale;
      setPdpZoom(next);
    } else {
      const prev = [...steps].reverse().find((s) => s < cur - 0.05) || pdpZoomState.minScale;
      setPdpZoom(prev);
    }
  }

  function initPdpImageZoom() {
    const stage = document.querySelector('[data-pdp-zoom-stage]');
    if (!stage) return;

    let dragging = false;
    let moved = false;
    let startX = 0;
    let startY = 0;
    let baseTx = 0;
    let baseTy = 0;
    let pinchStartDist = 0;
    let pinchStartScale = 1;
    let skipNextClick = false;

    const getTouchDist = (t1, t2) => Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);

    stage.addEventListener('mousedown', (e) => {
      if (e.button !== 0 || e.target.closest('button')) return;
      if (pdpZoomState.scale <= 1.01) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startY = e.clientY;
      baseTx = pdpZoomState.tx;
      baseTy = pdpZoomState.ty;
      const img = stage.querySelector('[data-pdp-main-img]');
      if (img) img.classList.add('cursor-grabbing');
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.hypot(dx, dy) > 4) moved = true;
      pdpZoomState.tx = baseTx + dx;
      pdpZoomState.ty = baseTy + dy;
      applyPdpZoomTransform(true);
    });

    window.addEventListener('mouseup', () => {
      if (!dragging) return;
      dragging = false;
      const img = stage.querySelector('[data-pdp-main-img]');
      if (img) img.classList.remove('cursor-grabbing');
      if (moved) {
        skipNextClick = true;
        setTimeout(() => { skipNextClick = false; }, 60);
      }
    });

    stage.addEventListener('touchstart', (e) => {
      if (e.target.closest('button')) return;
      if (e.touches.length === 2) {
        dragging = false;
        pinchStartDist = getTouchDist(e.touches[0], e.touches[1]);
        pinchStartScale = pdpZoomState.scale;
      } else if (e.touches.length === 1 && pdpZoomState.scale > 1.01) {
        dragging = true;
        moved = false;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        baseTx = pdpZoomState.tx;
        baseTy = pdpZoomState.ty;
      }
    }, { passive: true });

    stage.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2 && pinchStartDist > 0) {
        e.preventDefault();
        const dist = getTouchDist(e.touches[0], e.touches[1]);
        const nextScale = pinchStartScale * (dist / pinchStartDist);
        pdpZoomState.scale = Math.max(pdpZoomState.minScale, Math.min(pdpZoomState.maxScale, nextScale));
        applyPdpZoomTransform(true);
      } else if (dragging && e.touches.length === 1 && pdpZoomState.scale > 1.01) {
        e.preventDefault();
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        if (Math.hypot(dx, dy) > 4) moved = true;
        pdpZoomState.tx = baseTx + dx;
        pdpZoomState.ty = baseTy + dy;
        applyPdpZoomTransform(true);
      }
    }, { passive: false });

    stage.addEventListener('touchend', () => {
      pinchStartDist = 0;
      if (dragging && moved) {
        skipNextClick = true;
        setTimeout(() => { skipNextClick = false; }, 60);
      }
      dragging = false;
    });

    // Click/tap stage to cycle quick zoom centered around tap point
    stage.addEventListener('click', (e) => {
      if (e.target.closest('button') || skipNextClick) return;
      if (pdpZoomState.scale < 1.8) {
        setPdpZoom(2, e.clientX, e.clientY);
      } else if (pdpZoomState.scale < 2.8) {
        setPdpZoom(3, e.clientX, e.clientY);
      } else {
        resetPdpZoom();
      }
    });

    // Ctrl/trackpad pinch zoom over stage
    stage.addEventListener('wheel', (e) => {
      if (!e.ctrlKey && !e.metaKey && pdpZoomState.scale <= 1.01) return;
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.25 : -0.25;
      setPdpZoom(pdpZoomState.scale + delta, e.clientX, e.clientY);
    }, { passive: false });

    window.addEventListener('keydown', (e) => {
      if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        stepPdpZoom(1);
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        stepPdpZoom(-1);
      } else if (e.key === '0') {
        resetPdpZoom();
      } else if (e.key === 'ArrowLeft') {
        window.setModalActiveImage(window.currentPdpState.imgIndex - 1, standalonePdpRoot);
      } else if (e.key === 'ArrowRight') {
        window.setModalActiveImage(window.currentPdpState.imgIndex + 1, standalonePdpRoot);
      }
    });

    applyPdpZoomTransform(true);
  }

  window.openProductModal = function(id) {
    const targetId = Number(id) || 1;
    window.location.href = `product.html?id=${targetId}`;
  };

  window.closeProductModal = function() {};

  window.setModalActiveImage = function(idx, specificRoot) {
    const images = window.currentPdpState.images || window.currentModalImages || [];
    if (!images.length) return;
    const nextIdx = (idx + images.length) % images.length;
    window.currentPdpState.imgIndex = nextIdx;
    window.currentModalImgIndex = nextIdx;

    const roots = specificRoot
      ? [specificRoot]
      : [document.getElementById('standalone-pdp-root')].filter(Boolean);

    roots.forEach((root) => {
      const mainImg = root.querySelector('[data-pdp-main-img]') || document.getElementById('pdp-main-img');
      if (mainImg) mainImg.src = images[nextIdx];

      const counter = root.querySelector('[data-pdp-counter]');
      if (counter) counter.textContent = `${nextIdx + 1} / ${images.length}`;

      root.querySelectorAll('.modal-thumb-btn').forEach((thumbBtn, i) => {
        const btnIdx = parseInt(thumbBtn.getAttribute('data-idx') ?? String(i), 10);
        if (btnIdx === nextIdx) {
          thumbBtn.classList.remove('border-transparent', 'opacity-65');
          thumbBtn.classList.add('border-slate-900', 'opacity-100', 'ring-2', 'ring-slate-900');
        } else {
          thumbBtn.classList.remove('border-slate-900', 'opacity-100', 'ring-2', 'ring-slate-900');
          thumbBtn.classList.add('border-transparent', 'opacity-65');
        }
      });
    });

    resetPdpZoom();
  };

  // Initialize standalone Full-Screen Product Detail Page if present
  const standalonePdpRoot = document.getElementById('standalone-pdp-root');
  if (standalonePdpRoot) {
    const params = new URLSearchParams(window.location.search);
    const reqId = parseInt(params.get('id') || '1', 10);
    const product = (window.FLEEX_SUITS || []).find((s) => s.id === reqId) || window.FLEEX_SUITS[0];
    renderPdpIntoRoot(standalonePdpRoot, product);
    document.title = `${product.title} – Fleex Garment`;
    initPdpImageZoom();

    const relatedGrid = document.getElementById('pdp-related-grid');
    if (relatedGrid) {
      const related = window.FLEEX_SUITS.filter((s) => s.id !== product.id).slice(0, 4);
      relatedGrid.innerHTML = related.map((item) => `
        <a href="product.html?id=${item.id}" class="group block bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-300 transition-all">
          <div class="aspect-[3/4] bg-slate-100 overflow-hidden">
            <img src="${item.image}" alt="${item.title}" referrerpolicy="no-referrer" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          </div>
          <div class="p-3">
            <p class="text-[11px] text-slate-500 truncate">${item.colorName} · ${item.tag}</p>
            <h3 class="text-xs sm:text-sm font-bold text-slate-900 truncate mt-0.5">${item.title}</h3>
            <p class="text-xs font-extrabold text-slate-900 tabular-nums mt-1">${formatPKR(item.price)}</p>
          </div>
        </a>
      `).join('');
    }
  }

  // Single unified delegated interaction handler for Full-Screen PDP + Cards
  document.addEventListener('click', (e) => {
    const activeRoot = e.target.closest('#standalone-pdp-root');

    // Zoom toolbar controls (+ / - / Reset)
    if (e.target.closest('[data-pdp-zoom-in]')) {
      e.preventDefault();
      stepPdpZoom(1);
      return;
    }
    if (e.target.closest('[data-pdp-zoom-out]')) {
      e.preventDefault();
      stepPdpZoom(-1);
      return;
    }
    if (e.target.closest('[data-pdp-zoom-reset]')) {
      e.preventDefault();
      resetPdpZoom();
      return;
    }

    // Gallery prev / next / thumb
    if (e.target.closest('#modal-prev-img, [data-pdp-prev]')) {
      e.preventDefault();
      window.setModalActiveImage(window.currentPdpState.imgIndex - 1, activeRoot);
      return;
    }
    if (e.target.closest('#modal-next-img, [data-pdp-next]')) {
      e.preventDefault();
      window.setModalActiveImage(window.currentPdpState.imgIndex + 1, activeRoot);
      return;
    }
    const thumbBtn = e.target.closest('.modal-thumb-btn');
    if (thumbBtn) {
      e.preventDefault();
      const idx = parseInt(thumbBtn.getAttribute('data-idx') || '0', 10);
      window.setModalActiveImage(idx, activeRoot);
      return;
    }

    // PDP Color Swatch click (switches to matching color suit seamlessly)
    const colorBtn = e.target.closest('.pdp-color-btn');
    if (colorBtn && activeRoot) {
      e.preventDefault();
      const targetId = parseInt(colorBtn.getAttribute('data-target-id') || '0', 10);
      const colorName = colorBtn.getAttribute('data-color-name') || '';
      const matchedSuit = (window.FLEEX_SUITS || []).find((s) => s.id === targetId);
      if (matchedSuit && matchedSuit.id !== window.currentPdpState.productId) {
        const preservedSize = window.currentPdpState.selectedSize;
        renderPdpIntoRoot(activeRoot, matchedSuit);
        window.currentPdpState.selectedSize = preservedSize;
        // Re-apply preserved size highlight
        activeRoot.querySelectorAll('.pdp-size-btn').forEach((sb) => {
          const isMatch = sb.getAttribute('data-size') === preservedSize;
          sb.classList.toggle('border-slate-900', isMatch);
          sb.classList.toggle('bg-slate-900', isMatch);
          sb.classList.toggle('text-white', isMatch);
          sb.classList.toggle('border-slate-200', !isMatch);
          sb.classList.toggle('bg-white', !isMatch);
          sb.classList.toggle('text-slate-800', !isMatch);
        });
        const sizeLabel = activeRoot.querySelector('[data-pdp-size-label]');
        if (sizeLabel) {
          const foundSz = SHARED_SIZE_OPTIONS.find((s) => s.code === preservedSize);
          sizeLabel.textContent = `${preservedSize} (${foundSz ? foundSz.age : 'Standard'})`;
        }
        updatePdpActions(activeRoot, matchedSuit);
        if (activeRoot.id === 'standalone-pdp-root') {
          try {
            window.history.replaceState({}, '', `product.html?id=${matchedSuit.id}`);
          } catch {}
        }
      } else {
        window.currentPdpState.selectedColor = colorName;
        const colorLbl = activeRoot.querySelector('[data-pdp-color-label]');
        if (colorLbl) colorLbl.textContent = colorName;
        const currentSuit = (window.FLEEX_SUITS || []).find((s) => s.id === window.currentPdpState.productId);
        if (currentSuit) updatePdpActions(activeRoot, currentSuit);
      }
      return;
    }

    // PDP Finish selection
    const finishBtn = e.target.closest('.pdp-finish-btn');
    if (finishBtn && activeRoot) {
      e.preventDefault();
      const finish = finishBtn.getAttribute('data-finish') || '';
      window.currentPdpState.selectedFinish = finish;
      activeRoot.querySelectorAll('.pdp-finish-btn').forEach((btn) => {
        const isAct = btn === finishBtn;
        btn.classList.toggle('border-slate-900', isAct);
        btn.classList.toggle('bg-slate-900', isAct);
        btn.classList.toggle('text-white', isAct);
        btn.classList.toggle('border-slate-200', !isAct);
        btn.classList.toggle('bg-white', !isAct);
        btn.classList.toggle('text-slate-700', !isAct);
      });
      const finLbl = activeRoot.querySelector('[data-pdp-finish-label]');
      if (finLbl) finLbl.textContent = finish;
      const currentSuit = (window.FLEEX_SUITS || []).find((s) => s.id === window.currentPdpState.productId);
      if (currentSuit) updatePdpActions(activeRoot, currentSuit);
      return;
    }

    // PDP Size selection
    const sizeBtn = e.target.closest('.pdp-size-btn');
    if (sizeBtn && activeRoot) {
      e.preventDefault();
      const size = sizeBtn.getAttribute('data-size') || '24';
      const age = sizeBtn.getAttribute('data-age') || '';
      window.currentPdpState.selectedSize = size;
      activeRoot.querySelectorAll('.pdp-size-btn').forEach((btn) => {
        const isAct = btn === sizeBtn;
        btn.classList.toggle('border-slate-900', isAct);
        btn.classList.toggle('bg-slate-900', isAct);
        btn.classList.toggle('text-white', isAct);
        btn.classList.toggle('border-slate-200', !isAct);
        btn.classList.toggle('bg-white', !isAct);
        btn.classList.toggle('text-slate-800', !isAct);
      });
      const sizeLbl = activeRoot.querySelector('[data-pdp-size-label]');
      if (sizeLbl) sizeLbl.textContent = `${size} (${age})`;
      const currentSuit = (window.FLEEX_SUITS || []).find((s) => s.id === window.currentPdpState.productId);
      if (currentSuit) updatePdpActions(activeRoot, currentSuit);
      return;
    }

    // PDP Quantity stepper
    if (e.target.closest('[data-pdp-qty-dec]') && activeRoot) {
      e.preventDefault();
      if (window.currentPdpState.qty > 1) {
        window.currentPdpState.qty -= 1;
        const currentSuit = (window.FLEEX_SUITS || []).find((s) => s.id === window.currentPdpState.productId);
        if (currentSuit) updatePdpActions(activeRoot, currentSuit);
      }
      return;
    }
    if (e.target.closest('[data-pdp-qty-inc]') && activeRoot) {
      e.preventDefault();
      window.currentPdpState.qty += 1;
      const currentSuit = (window.FLEEX_SUITS || []).find((s) => s.id === window.currentPdpState.productId);
      if (currentSuit) updatePdpActions(activeRoot, currentSuit);
      return;
    }

    // PDP Size Guide Toggle
    const sizeGuideToggle = e.target.closest('[data-pdp-size-guide-btn]');
    if (sizeGuideToggle && activeRoot) {
      e.preventDefault();
      const table = activeRoot.querySelector('[data-pdp-size-guide-panel]');
      if (table) table.classList.toggle('hidden');
      return;
    }

    // PDP Add to Bag with configured Color/Finish/Size
    const pdpBagBtn = e.target.closest('[data-pdp-add-bag]');
    if (pdpBagBtn && activeRoot) {
      e.preventDefault();
      const product = (window.FLEEX_SUITS || []).find((s) => s.id === window.currentPdpState.productId);
      if (!product) return;
      const st = window.currentPdpState;
      const existing = cart.find(
        (i) => i.title === product.title && i.size === st.selectedSize && i.color === st.selectedColor && i.finish === st.selectedFinish
      );
      if (existing) {
        existing.quantity += st.qty;
      } else {
        cart.push({
          title: product.title,
          image: product.image,
          price: product.price,
          color: st.selectedColor,
          finish: st.selectedFinish,
          size: st.selectedSize,
          quantity: st.qty
        });
      }
      saveCart();
      window.closeProductModal();
      window.openCart();
      return;
    }

    // Open Full-Screen PDP Page directly when clicking product trigger, title, image, or card
    const modalBtn = e.target.closest('.open-modal-btn, .product-card-thumb');
    if (modalBtn) {
      e.preventDefault();
      e.stopPropagation();
      const pId = modalBtn.getAttribute('data-id') || modalBtn.closest('[data-id]')?.getAttribute('data-id');
      if (pId) window.location.href = `product.html?id=${pId}`;
      return;
    }

    const card = e.target.closest('.product-card, .product-item');
    if (card && !e.target.closest('a, button, input, select, .quick-add-btn, .card-wishlist-btn')) {
      const pId = card.getAttribute('data-id');
      if (pId) {
        e.preventDefault();
        window.location.href = `product.html?id=${pId}`;
      }
    }
  });

  // Render Recently Viewed & Sync Wishlist on page load
  renderRecentlyViewed();
  syncWishlistUI();

  // Collection Live Search + Sort + Category Filter (handles collection.html smoothly)
  const catalogGrid = document.getElementById('catalog-products-container');
  const catalogSearchInput = document.getElementById('catalog-search-input');
  const catalogSortSelect = document.getElementById('catalog-sort-select');
  const catalogResetBtn = document.getElementById('catalog-reset-btn');
  const catalogEmptyState = document.getElementById('catalog-empty-state');
  const catalogCountLabel = document.getElementById('catalog-results-count');
  let activeCatalogCategory = 'all';

  window.applyCatalogFilters = function() {
    if (!catalogGrid) return;
    const items = Array.from(catalogGrid.querySelectorAll('.product-item'));
    const query = (catalogSearchInput ? catalogSearchInput.value : '').trim().toLowerCase();
    const sortBy = catalogSortSelect ? catalogSortSelect.value : 'featured';

    // Sort cards cleanly by suit ID or PKR price
    items.sort((a, b) => {
      const idA = Number(a.getAttribute('data-id') || 0);
      const idB = Number(b.getAttribute('data-id') || 0);
      const suitA = (window.FLEEX_SUITS || []).find((s) => s.id === idA) || { price: 2650, id: idA };
      const suitB = (window.FLEEX_SUITS || []).find((s) => s.id === idB) || { price: 2650, id: idB };
      if (sortBy === 'price-asc') return suitA.price - suitB.price;
      if (sortBy === 'price-desc') return suitB.price - suitA.price;
      return suitA.id - suitB.id;
    });
    items.forEach((el) => catalogGrid.appendChild(el));

    let visibleCount = 0;
    items.forEach((item) => {
      const cats = (item.getAttribute('data-cat') || '').split(' ');
      const idNum = Number(item.getAttribute('data-id') || 0);
      const suit = (window.FLEEX_SUITS || []).find((s) => s.id === idNum);
      const searchable = [
        item.textContent,
        suit ? suit.colorName : '',
        suit ? suit.fabric : '',
        suit ? suit.tag : ''
      ].join(' ').toLowerCase();

      const matchesCat =
        activeCatalogCategory === 'all'
          ? true
          : activeCatalogCategory === 'saved'
            ? wishlist.includes(idNum)
            : cats.includes(activeCatalogCategory);
      const matchesSearch = !query || searchable.includes(query);

      if (matchesCat && matchesSearch) {
        item.classList.remove('hidden');
        visibleCount += 1;
      } else {
        item.classList.add('hidden');
      }
    });

    if (catalogEmptyState) catalogEmptyState.classList.toggle('hidden', visibleCount > 0);
    if (catalogCountLabel) catalogCountLabel.textContent = `${visibleCount} ${visibleCount === 1 ? 'suit' : 'suits'} shown`;
  };

  document.querySelectorAll('.catalog-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.catalog-filter-btn').forEach((b) => {
        b.classList.remove('text-slate-900', 'border-b-2', 'border-slate-900');
        b.classList.add('text-slate-500');
      });
      btn.classList.remove('text-slate-500');
      btn.classList.add('text-slate-900', 'border-b-2', 'border-slate-900');
      activeCatalogCategory = btn.getAttribute('data-cat') || 'all';
      window.applyCatalogFilters();
    });
  });

  if (catalogSearchInput) {
    catalogSearchInput.addEventListener('input', window.applyCatalogFilters);
  }
  if (catalogSortSelect) {
    catalogSortSelect.addEventListener('change', window.applyCatalogFilters);
  }
  if (catalogResetBtn) {
    catalogResetBtn.addEventListener('click', () => {
      if (catalogSearchInput) catalogSearchInput.value = '';
      if (catalogSortSelect) catalogSortSelect.value = 'featured';
      const allTab = document.querySelector('.catalog-filter-btn[data-cat="all"]');
      if (allTab) allTab.click();
      else window.applyCatalogFilters();
    });
  }
}

// Initialize immediately if DOM is ready, or on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFleexApp);
} else {
  initFleexApp();
}

// Single deduplicated global image recovery listener
document.addEventListener('error', function(e) {
  const img = e.target;
  if (!img || img.tagName !== 'IMG') return;
  const src = img.getAttribute('src') || '';
  if (src.includes('fleex-brand') || (img.alt && img.alt.includes('Logo'))) {
    if (window.__FLEEX_LOGO_DATA_URI && img.src !== window.__FLEEX_LOGO_DATA_URI) {
      img.src = window.__FLEEX_LOGO_DATA_URI;
    }
    return;
  }
  if (!img.dataset.retried && (src.startsWith('/') || src.includes('assets/aistudio/'))) {
    img.dataset.retried = '1';
    if (src.startsWith('/')) {
      img.src = src.replace(/^\/+/, '');
    } else {
      img.src = 'assets/aistudio/' + src.split('/').pop();
    }
  }
}, true);

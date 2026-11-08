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

  function saveCart() {
    try {
      localStorage.setItem('fleex_cart', JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
    renderCart();
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

  function renderCart() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartBadge) cartBadge.textContent = totalCount;
    if (cartDrawerCount) cartDrawerCount.textContent = totalCount;

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
        const itemRow = document.createElement('div');
        itemRow.className = 'cart-item-row flex items-center gap-3 p-2 bg-slate-50 border border-slate-200/80 rounded-sm';
        itemRow.innerHTML = `
          <img src="${item.image}" alt="${item.title}" class="w-14 h-18 object-cover bg-slate-200 shrink-0" />
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold text-slate-900 uppercase truncate">${item.title}</h4>
            <span class="text-[11px] font-bold text-slate-500 block mt-0.5 tracking-wider uppercase">Bespoke Atelier Stitched</span>
            <div class="flex items-center gap-2 mt-2">
              <div class="flex items-center border border-slate-300 bg-white">
                <button type="button" class="qty-dec px-2 py-0.5 text-xs text-slate-600 hover:text-black hover:bg-slate-100" data-index="${index}">−</button>
                <span class="px-2 text-xs font-bold">${item.quantity}</span>
                <button type="button" class="qty-inc px-2 py-0.5 text-xs text-slate-600 hover:text-black hover:bg-slate-100" data-index="${index}">+</button>
              </div>
              <button type="button" class="item-remove text-[10px] font-semibold text-rose-600 hover:underline uppercase tracking-wider" data-index="${index}">Remove</button>
            </div>
          </div>
        `;
        cartItemsContainer.appendChild(itemRow);
      });
    }
  }

  // Initial cart render
  renderCart();

  // WhatsApp Checkout Handler
  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (cart.length === 0) return;
      let orderMsg = `Salam Fleex Garments! I would like to inquire about these suits from the Atelier:%0A%0A`;
      cart.forEach((item, i) => {
        orderMsg += `${i + 1}. *${item.title}* x ${item.quantity}%0A`;
      });
      orderMsg += `%0APlease let me know sizing availability and consultation details.`;

      const whatsappUrl = `https://wa.me/923702265968?text=${orderMsg}`;
      window.location.href = whatsappUrl;
    });
  }

  // ----------------------------------------------------------
  // 4. TRENDING CATEGORY TABS FILTER
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

    // Cart drawer trigger
    const cartTrig = e.target.closest('#cart-drawer-trigger');
    if (cartTrig) {
      e.preventDefault();
      window.openCart();
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
      const title = quickAdd.getAttribute('data-title') || 'Fleex Bespoke Suit';
      const rawImage = quickAdd.getAttribute('data-image') || 'images/charcoal_kurta_suit_1790890713358.jpg';
      const image = rawImage.replace(/^\/+/, '');

      const existingItem = cart.find((i) => i.title === title);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ title, image, quantity: 1 });
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
      if (newsletterMsg) {
        newsletterMsg.classList.remove('hidden');
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
    }
  });

  // ----------------------------------------------------------
  // 8. GLOBAL IMAGE LOAD RESILIENCE (GITHUB PAGES & SUBPATHS)
  // ----------------------------------------------------------
  window.addEventListener('error', (event) => {
    const target = event.target;
    if (target && target.tagName === 'IMG') {
      const src = target.getAttribute('src') || '';
      if (src.startsWith('/') && !target.dataset.retried) {
        target.dataset.retried = 'true';
        target.src = src.replace(/^\/+/, '');
      }
    }
  }, true);
}

// Initialize immediately if DOM is ready, or on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFleexApp);
} else {
  initFleexApp();
}

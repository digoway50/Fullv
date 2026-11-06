import './style.css';

// ============================================================
// FLEEX GARMENTS - SAPPHIRE INSPIRED E-COMMERCE SCRIPT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
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

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
  }

  function resetInterval() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  if (heroSlides.length > 1) {
    resetInterval();
  }

  // ----------------------------------------------------------
  // 2. MOBILE NAVIGATION DRAWER
  // ----------------------------------------------------------
  const drawerToggle = document.getElementById('mobile-drawer-toggle');
  const navDrawer = document.getElementById('mobile-nav-drawer');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  function openNavDrawer() {
    if (navDrawer) {
      navDrawer.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeNavDrawer() {
    if (navDrawer) {
      navDrawer.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  if (drawerToggle) drawerToggle.addEventListener('click', openNavDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeNavDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeNavDrawer);

  // ----------------------------------------------------------
  // 3. SHOPPING BAG / CART STATE & DRAWER
  // ----------------------------------------------------------
  const cartTrigger = document.getElementById('cart-drawer-trigger');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartBadge = document.getElementById('cart-badge-count');
  const cartDrawerCount = document.getElementById('cart-drawer-count-badge');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartEmptyState = document.getElementById('cart-empty-state');
  const cartFooter = document.getElementById('cart-footer');
  const cartSubtotal = document.getElementById('cart-subtotal-price');
  const cartCheckoutBtn = document.getElementById('cart-whatsapp-checkout-btn');

  // Load cart from localStorage
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

  function openCart() {
    if (cartDrawer) {
      cartDrawer.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCart() {
    if (cartDrawer) {
      cartDrawer.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  if (cartTrigger) cartTrigger.addEventListener('click', openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

  function renderCart() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartBadge) cartBadge.textContent = totalCount;
    if (cartDrawerCount) cartDrawerCount.textContent = totalCount;

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      if (cartEmptyState) cartEmptyState.classList.remove('hidden');
      if (cartFooter) cartFooter.classList.add('hidden');
      // Remove any rendered item cards except empty state
      const existingItems = cartItemsContainer.querySelectorAll('.cart-item-row');
      existingItems.forEach((el) => el.remove());
    } else {
      if (cartEmptyState) cartEmptyState.classList.add('hidden');
      if (cartFooter) cartFooter.classList.remove('hidden');

      // Rebuild items
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

      // Attach quantity / remove handlers
      cartItemsContainer.querySelectorAll('.qty-dec').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
          if (cart[idx].quantity > 1) {
            cart[idx].quantity -= 1;
          } else {
            cart.splice(idx, 1);
          }
          saveCart();
        });
      });

      cartItemsContainer.querySelectorAll('.qty-inc').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
          cart[idx].quantity += 1;
          saveCart();
        });
      });

      cartItemsContainer.querySelectorAll('.item-remove').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
          cart.splice(idx, 1);
          saveCart();
        });
      });
    }
  }

  // Quick Add To Bag Handler
  document.querySelectorAll('.quick-add-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.currentTarget;
      const title = target.getAttribute('data-title') || 'Fleex Bespoke Suit';
      const image = target.getAttribute('data-image') || '/src/assets/images/charcoal_kurta_suit_1790890713358.jpg';

      const existingItem = cart.find((i) => i.title === title);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ title, image, quantity: 1 });
      }

      saveCart();
      openCart();
    });
  });

  // WhatsApp Checkout Handler
  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener('click', () => {
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

  // Initial cart render
  renderCart();

  // ----------------------------------------------------------
  // 4. TRENDING CATEGORY TABS FILTER
  // ----------------------------------------------------------
  const trendingTabs = document.querySelectorAll('.trending-tab-btn');
  if (trendingTabs.length) {
    trendingTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        trendingTabs.forEach((t) => {
          t.classList.remove('text-slate-900', 'border-b-2', 'border-slate-900');
          t.classList.add('text-slate-500');
        });
        tab.classList.remove('text-slate-500');
        tab.classList.add('text-slate-900', 'border-b-2', 'border-slate-900');

        // Subtle animation on products grid
        const grid = document.getElementById('trending-products-grid');
        if (grid) {
          grid.classList.remove('fade-in');
          void grid.offsetWidth; // trigger reflow
          grid.classList.add('fade-in');
        }
      });
    });
  }

  // ----------------------------------------------------------
  // 5. FOOTER ACCORDIONS (Exact Sapphire Style)
  // ----------------------------------------------------------
  const accordionToggles = document.querySelectorAll('.accordion-toggle');
  accordionToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      const icon = toggle.querySelector('.acc-icon');

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
    });
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
  // 7. GLOBAL ESCAPE & MODAL BACKDROP LISTENER
  // ----------------------------------------------------------
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeNavDrawer();
      closeCart();
    }
  });
});

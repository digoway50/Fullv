import './style.css';

// Fleex Garment Interactive Features
const features = [
  { id: 'sherwani', title: 'Sherwani', subtitle: 'Style' },
  { id: 'fabric', title: 'Kurte Bund Kurte', subtitle: 'Fabric' },
  { id: 'plate', title: 'Plate', subtitle: 'Fit & Detail' },
  { id: 'daman', title: 'Daman Colal', subtitle: 'Finish' },
  { id: 'salwar', title: 'Salwar Ghar', subtitle: 'Style' }
];

let activeFeature = 'sherwani';
let activeSegment = 0;

const featureIndexMap = {
  sherwani: 0,
  fabric: 1,
  plate: 2,
  daman: 3,
  salwar: 4
};

function updateUI() {
  // Update feature cards
  features.forEach((f) => {
    const card = document.getElementById(`feature-card-${f.id}`);
    const content = document.getElementById(`feature-content-${f.id}`);
    const chevron = card ? card.querySelector('.chevron-icon svg') : null;

    if (activeFeature === f.id) {
      if (card) {
        card.className = 'feature-card rounded-2xl transition-all duration-300 border bg-sky-50/70 border-sky-300 shadow-md ring-1 ring-sky-300/60';
      }
      if (content) {
        content.classList.remove('hidden');
      }
      if (chevron) {
        chevron.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"></path>';
      }
    } else {
      if (card) {
        card.className = 'feature-card rounded-2xl transition-all duration-300 border bg-white/60 border-white/90 hover:bg-white/90 hover:border-slate-200';
      }
      if (content) {
        content.classList.add('hidden');
      }
      if (chevron) {
        chevron.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>';
      }
    }
  });

  // Update hotspots on photo
  document.querySelectorAll('.hotspot-btn').forEach((btn) => {
    const id = btn.getAttribute('data-hotspot');
    const ripple = btn.querySelector('.hotspot-ripple');
    const ring = btn.querySelector('.hotspot-ring');
    const dot = btn.querySelector('.hotspot-dot');
    const tooltip = btn.querySelector('.hotspot-tooltip');

    if (activeFeature === id) {
      if (ripple) ripple.className = 'hotspot-ripple absolute inset-0 rounded-full transition-all duration-700 pointer-events-none bg-sky-400/50 animate-ping scale-150';
      if (ring) ring.className = 'hotspot-ring w-9 h-9 rounded-full border-2 flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-md border-sky-500 bg-sky-50/90 shadow-sky-400/40 ring-4 ring-sky-300/40 scale-110';
      if (dot) dot.className = 'hotspot-dot w-3.5 h-3.5 rounded-full bg-sky-600 ring-2 ring-white';
      if (tooltip) tooltip.className = 'hotspot-tooltip absolute left-1/2 -translate-x-1/2 bottom-full mb-2 pointer-events-none whitespace-nowrap transition-all duration-200 z-30 opacity-100 -translate-y-1';
    } else {
      if (ripple) ripple.className = 'hotspot-ripple absolute inset-0 rounded-full transition-all duration-700 pointer-events-none bg-white/30 group-hover:scale-125';
      if (ring) ring.className = 'hotspot-ring w-9 h-9 rounded-full border-2 flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-md border-white/80 bg-white/40 group-hover:bg-white/70';
      if (dot) dot.className = 'hotspot-dot w-3.5 h-3.5 rounded-full bg-slate-700/70 group-hover:bg-sky-700';
      if (tooltip) tooltip.className = 'hotspot-tooltip absolute left-1/2 -translate-x-1/2 bottom-full mb-2 pointer-events-none whitespace-nowrap transition-all duration-200 z-30 opacity-0 group-hover:opacity-100 -translate-y-0 group-hover:-translate-y-1';
    }
  });

  // Update photo banner
  const banner = document.getElementById('photo-active-banner');
  const bannerTitle = document.getElementById('photo-active-title');
  if (activeFeature) {
    const activeObj = features.find((f) => f.id === activeFeature);
    if (banner) banner.classList.remove('hidden');
    if (bannerTitle && activeObj) bannerTitle.textContent = activeObj.title;
  } else {
    if (banner) banner.classList.add('hidden');
  }

  // Update segment indicator bar
  document.querySelectorAll('.segment-btn').forEach((btn) => {
    const seg = parseInt(btn.getAttribute('data-segment') || '0', 10);
    if (seg === activeSegment) {
      btn.className = 'segment-btn h-2.5 rounded-full transition-all duration-300 cursor-pointer w-10 bg-white shadow-xs';
    } else {
      btn.className = 'segment-btn h-2.5 rounded-full transition-all duration-300 cursor-pointer w-6 bg-white/40 hover:bg-white/70';
    }
  });
}

// Feature accordion buttons
document.querySelectorAll('[data-feature-toggle]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-feature-toggle');
    if (activeFeature === id) {
      activeFeature = null;
    } else {
      activeFeature = id;
      if (featureIndexMap[id] !== undefined) {
        activeSegment = featureIndexMap[id];
      }
    }
    updateUI();
  });
});

// Hotspot click handlers
document.querySelectorAll('.hotspot-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-hotspot');
    if (activeFeature === id) {
      activeFeature = null;
    } else {
      activeFeature = id;
      if (featureIndexMap[id] !== undefined) {
        activeSegment = featureIndexMap[id];
      }
    }
    updateUI();
    const targetCard = document.getElementById(`feature-card-${id}`);
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});

// Slide left and right functions
function slideTo(direction) {
  const total = features.length;
  if (direction === 'next') {
    activeSegment = (activeSegment + 1) % total;
  } else {
    activeSegment = (activeSegment - 1 + total) % total;
  }
  if (features[activeSegment]) {
    activeFeature = features[activeSegment].id;
  }
  updateUI();
}

const slidePrevBtn = document.getElementById('slide-prev-btn');
const slideNextBtn = document.getElementById('slide-next-btn');
const photoPrevBtn = document.getElementById('photo-prev-btn');
const photoNextBtn = document.getElementById('photo-next-btn');

if (slidePrevBtn) slidePrevBtn.addEventListener('click', () => slideTo('prev'));
if (slideNextBtn) slideNextBtn.addEventListener('click', () => slideTo('next'));
if (photoPrevBtn) photoPrevBtn.addEventListener('click', () => slideTo('prev'));
if (photoNextBtn) photoNextBtn.addEventListener('click', () => slideTo('next'));

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') slideTo('prev');
  if (e.key === 'ArrowRight') slideTo('next');
});

// Segment indicator buttons
document.querySelectorAll('.segment-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const idx = parseInt(btn.getAttribute('data-segment') || '0', 10);
    activeSegment = idx;
    if (features[idx]) {
      activeFeature = features[idx].id;
    }
    updateUI();
  });
});

// Photo banner view specs link
const photoViewSpecs = document.getElementById('photo-view-specs');
if (photoViewSpecs) {
  photoViewSpecs.addEventListener('click', () => {
    if (activeFeature) {
      const el = document.getElementById(`feature-card-${activeFeature}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

// Mobile menu toggle
const mobileToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const hamburger = document.getElementById('hamburger-icon');
const closeIcon = document.getElementById('close-icon');

if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      if (hamburger) hamburger.classList.add('hidden');
      if (closeIcon) closeIcon.classList.remove('hidden');
    } else {
      mobileMenu.classList.add('hidden');
      if (hamburger) hamburger.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
    }
  });
}

// Modals setup
function setupModal(triggerId, modalId) {
  const trigger = document.getElementById(triggerId);
  const modal = document.getElementById(modalId);
  if (trigger && modal) {
    trigger.addEventListener('click', () => {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  }
}

setupModal('nav-collections-btn', 'modal-collections');
setupModal('mobile-collections-btn', 'modal-collections');
setupModal('nav-about-btn', 'modal-about');
setupModal('mobile-about-btn', 'modal-about');
setupModal('footer-terms-btn', 'modal-terms');
setupModal('footer-contact-btn', 'modal-contact');

document.querySelectorAll('.modal-close').forEach((btn) => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('[id^="modal-"]');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });
});

window.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('backdrop-blur-sm') && e.target.id && e.target.id.startsWith('modal-')) {
    e.target.classList.add('hidden');
    e.target.classList.remove('flex');
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('[id^="modal-"]').forEach((m) => {
      m.classList.add('hidden');
      m.classList.remove('flex');
    });
  }
});

// Initial render
updateUI();

import './style.css';

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

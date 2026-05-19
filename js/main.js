/* ===========================================================
   Otherside Market & Deli — main.js
   Cart state · tab switching · scroll reveals · sticky cart bar
   =========================================================== */

'use strict';

// ---- Cart State -----------------------------------------
const cart = [];

function cartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// ---- Cart Toast Update ----------------------------------
function updateCartBar() {
  const toast    = document.getElementById('cart-toast');
  const countEl  = document.getElementById('cart-toast-count');
  if (!toast) return;

  const count = cartCount();
  if (count === 0) {
    toast.classList.remove('visible');
  } else {
    if (countEl) countEl.textContent = count;
    toast.classList.add('visible');
  }
}

// ---- Cart Drawer ----------------------------------------
// Clip-path string matching the toast pill position exactly
function pillClip() {
  return 'inset(calc(100% - 52px - 1.25rem) calc(50% - 160px) 1.25rem calc(50% - 160px) round 100px)';
}

// iOS-safe scroll lock
let _scrollY = 0;
function lockBodyScroll() {
  _scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top      = `-${_scrollY}px`;
  document.body.style.left     = '0';
  document.body.style.right    = '0';
}
function unlockBodyScroll() {
  document.body.style.position = '';
  document.body.style.top      = '';
  document.body.style.left     = '';
  document.body.style.right    = '';
  window.scrollTo(0, _scrollY);
}

function openCartDrawer() {
  const drawer  = document.getElementById('cart-drawer');
  const toast   = document.getElementById('cart-toast');
  const content = drawer ? drawer.querySelector('.cart-drawer-content') : null;
  if (!drawer) return;

  renderCartDrawer();
  lockBodyScroll();

  // Hide toast instantly so drawer takes over cleanly
  if (toast) {
    toast.style.transition = 'none';
    toast.classList.remove('visible');
    requestAnimationFrame(() => { toast.style.transition = ''; });
  }

  // Step 1: show drawer instantly at pill position (no animation)
  drawer.style.display    = 'flex';
  drawer.style.clipPath   = pillClip();
  drawer.style.transition = 'none';
  drawer.setAttribute('aria-hidden', 'false');

  // Step 2: next frame — animate pill expanding to full screen
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      drawer.style.transition = 'clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      drawer.style.clipPath   = 'inset(0 round 0px)';
    });
  });

  // Step 3: fade content in after expansion finishes
  if (content) setTimeout(() => content.classList.add('visible'), 380);
}

function closeCartDrawer() {
  const drawer  = document.getElementById('cart-drawer');
  const toast   = document.getElementById('cart-toast');
  const content = drawer ? drawer.querySelector('.cart-drawer-content') : null;
  if (!drawer) return;

  // Fade content out immediately
  if (content) content.classList.remove('visible');

  // Collapse back to pill shape
  drawer.style.transition = 'clip-path 0.45s cubic-bezier(0.4, 0, 0.2, 1)';
  drawer.style.clipPath   = pillClip();

  // After collapse: fully hide drawer and restore scroll
  setTimeout(() => {
    drawer.style.display    = 'none';
    drawer.style.clipPath   = '';
    drawer.style.transition = '';
    drawer.setAttribute('aria-hidden', 'true');
    unlockBodyScroll();
  }, 460);

  // Toast reappears after drawer finishes collapsing
  if (toast && cartCount() > 0) {
    setTimeout(() => toast.classList.add('visible'), 400);
  }
}

function renderCartDrawer() {
  const itemsEl    = document.getElementById('cart-drawer-items');
  const subtotalEl = document.getElementById('cart-drawer-subtotal');
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty-msg">Your cart is empty.</p>';
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    return;
  }

  itemsEl.innerHTML = cart.map(item => `
    <div class="drawer-item" data-id="${escapeHtml(item.id)}">
      <span class="drawer-item-name">${escapeHtml(item.name)}</span>
      <div class="qty-controls">
        <button class="qty-btn qty-dec" data-id="${escapeHtml(item.id)}" aria-label="Decrease">−</button>
        <span class="qty-display">${item.qty}</span>
        <button class="qty-btn qty-inc" data-id="${escapeHtml(item.id)}" aria-label="Increase">+</button>
      </div>
    </div>
  `).join('');

  if (subtotalEl) subtotalEl.textContent = '$' + cartTotal().toFixed(2);

  itemsEl.querySelectorAll('.qty-inc').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = cart.find(i => i.id === btn.dataset.id);
      if (item) { item.qty += 1; renderCartDrawer(); updateCartBar(); }
    });
  });

  itemsEl.querySelectorAll('.qty-dec').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = cart.find(i => i.id === btn.dataset.id);
      if (!item) return;
      item.qty -= 1;
      if (item.qty <= 0) cart.splice(cart.indexOf(item), 1);
      if (cart.length === 0) { closeCartDrawer(); }
      else renderCartDrawer();
      updateCartBar();
    });
  });
}

// ---- Add to Cart ----------------------------------------
function addToCart(id, name, price, imgSrc) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1, imgSrc: imgSrc || '' });
  }
  updateCartBar();
}

// ---- Cart Drawer ----------------------------------------

function renderCartDrawer() {
  const itemsEl    = document.getElementById('cart-drawer-items');
  const subtotalEl = document.getElementById('cart-drawer-subtotal');
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty-msg">Your cart is empty.</p>';
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    return;
  }

  itemsEl.innerHTML = cart.map(item => `
    <div class="drawer-item" data-id="${escapeHtml(item.id)}">
      <div class="drawer-item-img">
        <img src="${escapeHtml(item.imgSrc)}" alt="${escapeHtml(item.name)}" width="64" height="64" />
      </div>
      <span class="drawer-item-name">${escapeHtml(item.name)}</span>
      <div class="qty-controls">
        <button class="qty-btn qty-dec" data-id="${escapeHtml(item.id)}" aria-label="Decrease quantity">−</button>
        <span class="qty-display" aria-live="polite">${item.qty}</span>
        <button class="qty-btn qty-inc" data-id="${escapeHtml(item.id)}" aria-label="Increase quantity">+</button>
      </div>
    </div>
  `).join('');

  if (subtotalEl) subtotalEl.textContent = '$' + cartTotal().toFixed(2);

  itemsEl.querySelectorAll('.qty-inc').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = cart.find(i => i.id === btn.dataset.id);
      if (item) { item.qty += 1; renderCartDrawer(); updateCartBar(); }
    });
  });

  itemsEl.querySelectorAll('.qty-dec').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = cart.find(i => i.id === btn.dataset.id);
      if (!item) return;
      item.qty -= 1;
      if (item.qty <= 0) cart.splice(cart.indexOf(item), 1);
      if (cart.length === 0) closeCartDrawer();
      else renderCartDrawer();
      updateCartBar();
    });
  });
}

// ---- Screen Management ----------------------------------
function showScreen(id) {
  document.querySelectorAll('.order-screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

// ---- Category Tabs --------------------------------------
function initTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('.menu-category').forEach(cat => cat.classList.remove('active'));
      const target = document.getElementById('cat-' + tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

// ---- Refresh a single card button to match cart state ---
function refreshItemButton(btn) {
  const id   = btn.dataset.id;
  const item = cart.find(i => i.id === id);
  const qty  = item ? item.qty : 0;

  if (qty === 0) {
    btn.classList.remove('in-cart');
    btn.innerHTML = '+ Add to Cart';
  } else {
    btn.classList.add('in-cart');
    btn.innerHTML = `
      <span class="btn-qty-dec" data-action="dec">−</span>
      <span class="btn-qty-num">${qty}</span>
      <span class="btn-qty-inc" data-action="inc">+</span>
    `;
  }
}

// ---- Add to Cart Button Wiring --------------------------
function initAddToCartButtons() {
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    if (btn.classList.contains('sold-out')) return;

    btn.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      const { id, name, price } = btn.dataset;

      if (action === 'dec') {
        const item = cart.find(i => i.id === id);
        if (item) {
          item.qty -= 1;
          if (item.qty <= 0) cart.splice(cart.indexOf(item), 1);
          updateCartBar();
        }
      } else {
        // 'inc' or initial tap
        addToCart(id, name, parseFloat(price), '');
      }

      refreshItemButton(btn);
    });
  });
}

// ---- Format time "HH:MM" → "12:30pm" -------------------
function formatTime(timeStr) {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map(Number);
  const ampm = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')}${ampm}`;
}

// ---- XSS helper -----------------------------------------
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ---- Order Page -----------------------------------------
function initOrderPage() {
  initTabs();
  initAddToCartButtons();

  // Toast "View Cart" → open drawer
  const viewCartBtn = document.getElementById('view-cart-btn');
  if (viewCartBtn) {
    viewCartBtn.addEventListener('click', openCartDrawer);
  }

  // Drawer close
  const drawerClose = document.getElementById('cart-drawer-close');
  if (drawerClose) {
    drawerClose.addEventListener('click', closeCartDrawer);
  }

  // Drawer checkout → close drawer, show checkout screen after collapse
  const drawerCheckout = document.getElementById('drawer-checkout-btn');
  if (drawerCheckout) {
    drawerCheckout.addEventListener('click', () => {
      if (cart.length === 0) return;
      closeCartDrawer();
      setTimeout(() => showScreen('screen-checkout'), 480);
    });
  }

  // Back to cart from checkout → reopen drawer
  const backToCartBtn = document.getElementById('back-to-cart-btn');
  if (backToCartBtn) {
    backToCartBtn.addEventListener('click', () => {
      showScreen('screen-menu');
      openCartDrawer();
    });
  }

  // Place Order
  const placeOrderBtn = document.getElementById('place-order-btn');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', () => {
      const form = document.getElementById('checkout-form');
      if (!form || !form.checkValidity()) {
        if (form) form.reportValidity();
        return;
      }

      const name  = document.getElementById('checkout-name').value.trim();
      const phone = document.getElementById('checkout-phone').value.trim();
      const time  = document.getElementById('checkout-time').value;
      const notes = document.getElementById('checkout-notes').value.trim();

      // Log order to console (backend integration pending)
      console.log('[Otherside] Order submitted:', {
        name, phone,
        pickupTime: formatTime(time),
        notes,
        items: cart.map(i => ({ ...i })),
        total: '$' + cartTotal().toFixed(2),
      });

      // Loading state
      const labelEl   = placeOrderBtn.querySelector('.btn-label');
      const spinnerEl = placeOrderBtn.querySelector('.spinner');
      placeOrderBtn.disabled = true;
      if (labelEl)   labelEl.textContent = 'Placing order…';
      if (spinnerEl) spinnerEl.style.display = 'block';

      setTimeout(() => {
        // Populate confirmation screen
        const confirmNameEl = document.getElementById('confirm-name');
        const confirmTimeEl = document.getElementById('confirm-time');
        if (confirmNameEl) confirmNameEl.textContent = name;
        if (confirmTimeEl) confirmTimeEl.textContent = formatTime(time);

        showScreen('screen-confirm');

        // Reset cart
        cart.length = 0;
        updateCartBar();
      }, 1000);
    });
  }

  // Back to menu from confirmation
  const backFromConfirm = document.getElementById('back-to-menu-from-confirm');
  if (backFromConfirm) {
    backFromConfirm.addEventListener('click', () => {
      // Reset place order button
      const btn       = document.getElementById('place-order-btn');
      const labelEl   = btn && btn.querySelector('.btn-label');
      const spinnerEl = btn && btn.querySelector('.spinner');
      if (btn)       btn.disabled = false;
      if (labelEl)   labelEl.textContent = 'Place Order';
      if (spinnerEl) spinnerEl.style.display = 'none';

      const form = document.getElementById('checkout-form');
      if (form) form.reset();

      showScreen('screen-menu');
    });
  }
}

// ---- Scroll-Driven Frame Sequence -----------------------
function initScrollHero() {
  const canvas = document.getElementById('sandwich-frame');
  if (!canvas) return;

  const ctx         = canvas.getContext('2d');
  const FRAME_COUNT = 61;
  const EAGER_COUNT = 6; // load first 6 immediately, rest after page load

  function frameSrc(i) {
    return `images/sandwich-frames/frame-${String(i).padStart(4, '0')}.jpg`;
  }

  const frames = Array.from({ length: FRAME_COUNT }, () => new Image());

  let currentImg = null;

  // Draw with object-fit: cover — crops center, no squish
  function drawFrame(img) {
    if (!img.complete || !img.naturalWidth) return;
    currentImg = img;
    const cw = canvas.width, ch = canvas.height;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = cw / scale, sh = ch / scale;
    const sx = (iw - sw) / 2, sy = (ih - sh) / 2;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }

  // Size canvas to its CSS display size, then redraw so resize never clears
  function resizeCanvas() {
    canvas.width  = canvas.offsetWidth  || canvas.parentElement.offsetWidth;
    canvas.height = canvas.offsetHeight || canvas.parentElement.offsetHeight;
    if (currentImg) drawFrame(currentImg);
  }
  // Wait one frame so layout is complete before reading offsetWidth/Height
  requestAnimationFrame(resizeCanvas);
  window.addEventListener('resize', resizeCanvas, { passive: true });

  // Load first frame eagerly so hero is painted before scroll
  frames[0].onload = () => drawFrame(frames[0]);
  frames[0].src = frameSrc(0);

  // Load next few eagerly (likely scroll targets)
  for (let i = 1; i < EAGER_COUNT; i++) {
    frames[i].src = frameSrc(i);
  }

  // Defer remaining frames until after page load to avoid startup burst
  window.addEventListener('load', () => {
    for (let i = EAGER_COUNT; i < FRAME_COUNT; i++) {
      frames[i].src = frameSrc(i);
    }
  }, { once: true });

  let lastFrame = 0;
  let rafId     = null;

  function updateFrame() {
    rafId = null;
    const hero      = document.querySelector('.hero');
    const maxScroll = hero ? hero.offsetHeight / 3 : document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const progress   = Math.min(window.scrollY / maxScroll, 1);
    const frameIndex = Math.round(progress * (FRAME_COUNT - 1));

    if (frameIndex !== lastFrame || frameIndex === 0) {
      drawFrame(frames[frameIndex]);
      lastFrame = frameIndex;
    }
  }

  // Only fire RAF on scroll — no idle spinning
  window.addEventListener('scroll', () => {
    if (!rafId) rafId = requestAnimationFrame(updateFrame);
  }, { passive: true });
}

// ---- Scroll Reveals (IntersectionObserver) --------------
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length || !('IntersectionObserver' in window)) {
    // Fallback: just show everything
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => observer.observe(el));
}

// ---- Open / Closed status based on real time -----------
function updateOpenStatus() {
  const el = document.querySelector('.open-now');
  if (!el) return;

  const now   = new Date();
  const total = now.getHours() * 60 + now.getMinutes();
  const open  = 9 * 60;        // 9:00am
  const close = 20 * 60 + 30;  // 8:30pm

  if (total >= open && total < close) {
    el.textContent = 'OPEN NOW';
    el.classList.remove('closed-now');
  } else {
    el.textContent = 'CLOSED NOW';
    el.classList.add('closed-now');
  }
}

// ---- Hamburger Menu -------------------------------------
function initHamburger() {
  const btn      = document.getElementById('hamburger-btn');
  const dropdown = document.getElementById('nav-dropdown');
  const nav      = document.querySelector('.site-nav');
  if (!btn || !dropdown) return;

  function openMenu() {
    // Pin dropdown to exact bottom of nav bar
    if (nav) {
      dropdown.style.top = nav.getBoundingClientRect().bottom + 'px';
    }
    btn.classList.add('open');
    dropdown.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    dropdown.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    btn.classList.remove('open');
    dropdown.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    dropdown.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.classList.contains('open') ? closeMenu() : openMenu();
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !btn.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

// ---- Init -----------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  updateOpenStatus();
  initScrollReveal();
  initHamburger();
  initScrollHero();

  if (document.getElementById('screen-menu')) {
    initOrderPage();
  }
});

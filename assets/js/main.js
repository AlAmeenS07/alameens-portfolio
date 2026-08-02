/* ============================================================
   AL AMEEN S. — Main Application Module
   alameens.in
   ============================================================ */

(function MainModule() {
  'use strict';

  /* ── Page Loader ──────────────────────────────────────── */
  function initLoader() {
    const loader   = document.getElementById('loader');
    const fill     = document.querySelector('.loader-bar-fill');
    const progress = document.querySelector('.loader-progress');
    if (!loader) return;

    let current = 0;
    const target  = 100;
    const step    = 2;
    const delay   = 20;

    function animate() {
      if (current < target) {
        current = Math.min(current + step + Math.random() * 4, target);
        if (fill)    fill.style.width = current + '%';
        if (progress) progress.textContent = Math.round(current) + '%';
        setTimeout(animate, delay);
      } else {
        // Done — hide loader
        setTimeout(() => {
          loader.classList.add('hidden');
          document.body.style.overflow = '';
          // Trigger hero animations
          document.body.classList.add('loaded');
        }, 300);
      }
    }

    // Prevent scroll during load
    document.body.style.overflow = 'hidden';
    setTimeout(animate, 200);
  }

  /* ── Mobile Menu ──────────────────────────────────────── */
  function initMobileMenu() {
    const toggle      = document.querySelector('.nav-toggle');
    const mobileMenu  = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu-link');
    if (!toggle || !mobileMenu) return;

    let isOpen = false;

    function openMenu() {
      isOpen = true;
      toggle.classList.add('open');
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
      toggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      isOpen = false;
      toggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', () => {
      isOpen ? closeMenu() : openMenu();
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) closeMenu();
    });
  }

  /* ── Particles in hero ────────────────────────────────── */
  function initParticles() {
    const container = document.querySelector('.hero-particles');
    if (!container) return;

    const count = 20;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${40 + Math.random() * 50}%;
        animation-delay: ${Math.random() * 6}s;
        animation-duration: ${4 + Math.random() * 4}s;
        width: ${1 + Math.random() * 2}px;
        height: ${1 + Math.random() * 2}px;
        opacity: ${0.2 + Math.random() * 0.5};
      `;
      container.appendChild(p);
    }
  }

  /* ── Typing / rotating headline ──────────────────────── */
  function initHeadlineRotator() {
    const rotator = document.querySelector('.headline-rotator');
    if (!rotator) return;

    const items = rotator.querySelectorAll('.headline-item');
    if (items.length < 2) return;

    let current = 0;

    function rotate() {
      const next = (current + 1) % items.length;
      items[current].style.opacity = '0';
      items[current].style.transform = 'translateY(-20px)';
      items[next].style.opacity = '0';
      items[next].style.transform = 'translateY(20px)';

      requestAnimationFrame(() => {
        setTimeout(() => {
          items[current].style.display = 'none';
          items[next].style.display = 'block';
          requestAnimationFrame(() => {
            items[next].style.opacity = '1';
            items[next].style.transform = 'translateY(0)';
          });
        }, 300);
      });

      current = next;
    }

    // Set initial styles
    items.forEach((item, i) => {
      item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      if (i !== 0) item.style.display = 'none';
    });

    setInterval(rotate, 2500);
  }

  /* ── Contact form ─────────────────────────────────────── */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('[type="submit"]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Simple validation
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let valid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('error');
          valid = false;
        } else {
          input.classList.remove('error');
        }
      });

      if (!valid) return;

      // Simulated send — replace with actual endpoint
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending…</span>';
        submitBtn.disabled = true;

        await new Promise(r => setTimeout(r, 1500));

        submitBtn.innerHTML = '<span>Message Sent ✓</span>';
        submitBtn.style.background = '#4ade80';
        submitBtn.style.borderColor = '#4ade80';

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.style.borderColor = '';
          submitBtn.disabled = false;
          form.reset();
        }, 3000);
      }
    });

    // Real-time validation
    form.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('input', () => {
        if (field.value.trim()) field.classList.remove('error');
      });
    });
  }

  /* ── Copy email ───────────────────────────────────────── */
  function initCopyEmail() {
    const copyBtns = document.querySelectorAll('[data-copy-email]');
    copyBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const email = btn.dataset.copyEmail;
        try {
          await navigator.clipboard.writeText(email);
          const original = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(() => { btn.textContent = original; }, 2000);
        } catch {
          // Fallback
          const ta = document.createElement('textarea');
          ta.value = email;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
      });
    });
  }

  /* ── Word split reveal ────────────────────────────────── */
  function initWordReveal() {
    const targets = document.querySelectorAll('[data-word-reveal]');

    targets.forEach(el => {
      const text  = el.textContent.trim();
      const words = text.split(' ');

      el.innerHTML = words.map(word =>
        `<span class="word"><span class="word-inner">${word}</span></span>`
      ).join(' ');

      el.classList.add('word-reveal');
    });
  }

  /* ── Dynamic year ─────────────────────────────────────── */
  function initDynamicYear() {
    document.querySelectorAll('[data-year]').forEach(el => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ── Project modal ────────────────────────────────────── */
  function initProjectModal() {
    const triggers = document.querySelectorAll('[data-modal]');
    const modal    = document.getElementById('project-modal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');

    function openModal(data) {
      document.getElementById('modal-title').textContent       = data.title || '';
      document.getElementById('modal-subtitle').textContent    = data.subtitle || '';
      document.getElementById('modal-description').textContent = data.description || '';

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    triggers.forEach(btn => {
      btn.addEventListener('click', () => openModal(btn.dataset));
    });

    closeBtn?.addEventListener('click', closeModal);
    backdrop?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  /* ── Focus trap for accessibility ─────────────────────── */
  function initFocusTrap() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      const focusable = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ── Marquee hover pause ──────────────────────────────── */
  function initMarquee() {
    const tracks = document.querySelectorAll('.marquee-track');
    tracks.forEach(track => {
      // Clone items for seamless loop
      const items = track.innerHTML;
      track.innerHTML = items + items;
    });
  }

  /* ── Keyboard navigation indicators ──────────────────── */
  function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
  }

  /* ── Page transition (inter-page) ─────────────────────── */
  function initPageTransitions() {
    const overlay = document.querySelector('.page-transition');
    if (!overlay) return;

    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      // Only internal links that aren't anchors
      if (!href || href.startsWith('#') || href.startsWith('mailto') ||
          href.startsWith('tel') || href.startsWith('http')) return;

      link.addEventListener('click', (e) => {
        e.preventDefault();
        overlay.classList.add('entering');

        setTimeout(() => {
          window.location.href = href;
        }, 500);
      });
    });

    // On page load, animate out
    overlay.classList.add('leaving');
    setTimeout(() => overlay.classList.remove('leaving'), 600);
  }

  /* ── Newsletter ───────────────────────────────────────── */
  function initNewsletter() {
    const form = document.querySelector('.footer-newsletter');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (!input?.value.trim()) return;

      const btn = form.querySelector('.btn');
      if (btn) {
        btn.textContent = 'Subscribed ✓';
        btn.style.background = 'rgba(200,168,107,0.3)';
        setTimeout(() => {
          btn.textContent = 'Subscribe';
          btn.style.background = '';
          input.value = '';
        }, 3000);
      }
    });
  }

  /* ── Init All ─────────────────────────────────────────── */
  function init() {
    initLoader();
    initMobileMenu();
    initParticles();
    initHeadlineRotator();
    initContactForm();
    initCopyEmail();
    initWordReveal();
    initDynamicYear();
    initProjectModal();
    initFocusTrap();
    initMarquee();
    initKeyboardNav();
    initPageTransitions();
    initNewsletter();

    // Initialize other modules
    if (window.CursorModule) {
      window.CursorModule.init();
      window.CursorModule.initMagneticButtons();
    }
    if (window.ScrollModule) {
      window.ScrollModule.init();
    }
  }

  /* ── Boot ─────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

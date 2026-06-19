// ═══════════════════════════════════════════════
// DARK MODE — toggle + localStorage + system pref
// ═══════════════════════════════════════════════
const html = document.documentElement;
const saved = localStorage.getItem('theme');
const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
if (saved === 'dark' || (!saved && prefersDark)) html.classList.add('dark');

document.getElementById('dark-toggle')?.addEventListener('click', () => {
  const dark = html.classList.toggle('dark');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
  const sun  = document.querySelector('.icon-sun');
  const moon = document.querySelector('.icon-moon');
  if (sun)  sun.classList.toggle('hidden',  dark);
  if (moon) moon.classList.toggle('hidden', !dark);
});

// ═══════════════════════════════════════════════
// RTL TOGGLE
// ═══════════════════════════════════════════════
document.getElementById('rtl-toggle')?.addEventListener('click', () => {
  const current = html.getAttribute('dir') || 'ltr';
  html.setAttribute('dir', current === 'rtl' ? 'ltr' : 'rtl');
});

// ═══════════════════════════════════════════════
// HAMBURGER — mobile menu
// ═══════════════════════════════════════════════
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');
hamburger?.addEventListener('click', () => {
  const isOpen = mobileMenu?.classList.contains('mobile-menu--open');
  if (isOpen) {
    mobileMenu.classList.remove('mobile-menu--open');
    mobileMenu.classList.add('mobile-menu--closed');
    hamburger.setAttribute('aria-expanded', 'false');
    setTimeout(() => mobileMenu.classList.add('hidden'), 300);
  } else {
    mobileMenu.classList.remove('hidden', 'mobile-menu--closed');
    requestAnimationFrame(() => mobileMenu.classList.add('mobile-menu--open'));
    hamburger.setAttribute('aria-expanded', 'true');
  }
});
// Focus trap inside mobile menu
hamburger?.addEventListener('keydown', e => { if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') hamburger.click(); });
mobileMenu?.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  const focusable = Array.from(mobileMenu.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])'));
  if (!focusable.length) return;
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
    e.preventDefault();
    (e.shiftKey ? last : first).focus();
  }
});

// ═══════════════════════════════════════════════
// NAV ACTIVE STATE — auto-detect current page
// ═══════════════════════════════════════════════
(function setActiveNavLink() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-link, #mobile-menu a, .navbar__dropdown a, nav a')
    .forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const page = href.split('/').pop();
      if (page === current || (current === '' && page === 'index.html')) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('!text-accent', 'font-semibold');
        const parentDropdown = link.closest('.group');
        const trigger = parentDropdown?.querySelector('button');
        if (trigger) {
          trigger.setAttribute('aria-current', 'page');
          trigger.classList.add('!text-accent', 'font-semibold');
        }
      }
    });
})();

// ═══════════════════════════════════════════════
// SCROLL REVEAL — IntersectionObserver
// ═══════════════════════════════════════════════
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

// ═══════════════════════════════════════════════
// STAT COUNTER — animate numbers on scroll
// ═══════════════════════════════════════════════
function animateCounter(el) {
  const target   = +el.dataset.target;
  const suffix   = el.dataset.suffix || '';
  const prefix   = el.dataset.prefix || '';
  const duration = 1500;
  const step     = target / (duration / 16);
  let current    = 0;
  const timer    = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

// ═══════════════════════════════════════════════
// FOOTER YEAR
// ═══════════════════════════════════════════════
document.querySelectorAll('#footer-year')
  .forEach(el => { el.textContent = new Date().getFullYear(); });

// ═══════════════════════════════════════════════
// NAVBAR — sticky transition on scroll
// ═══════════════════════════════════════════════
const handleNavbarScroll = () => {
  const nav = document.getElementById('navbar');
  const mobileMenu = document.getElementById('mobile-menu');
  if (nav) {
    if (window.scrollY > 10) {
      nav.classList.add('shadow-brand-md', 'h-16', 'bg-white/98', 'dark:bg-dark-bg/98');
      nav.classList.remove('h-[72px]', 'bg-white/95', 'dark:bg-dark-bg/95');
      if (mobileMenu) {
        mobileMenu.classList.add('top-16');
        mobileMenu.classList.remove('top-[72px]');
      }
    } else {
      nav.classList.remove('shadow-brand-md', 'h-16', 'bg-white/98', 'dark:bg-dark-bg/98');
      nav.classList.add('h-[72px]', 'bg-white/95', 'dark:bg-dark-bg/95');
      if (mobileMenu) {
        mobileMenu.classList.remove('top-16');
        mobileMenu.classList.add('top-[72px]');
      }
    }
  }
};
window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();


// ═══════════════════════════════════════════════
// ACCORDION / FAQ
// ═══════════════════════════════════════════════
document.querySelectorAll('details.accordion').forEach(details => {
  const icon = details.querySelector('.accordion-icon');
  details.addEventListener('toggle', () => {
    if (icon) icon.style.transform = details.open ? 'rotate(45deg)' : 'rotate(0deg)';
  });
});

// ═══════════════════════════════════════════════
// SHARED FORM HELPERS
// ═══════════════════════════════════════════════
function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.closest('.form-field')?.querySelector('.form-input')?.setAttribute('aria-invalid','true'); }
}
function clearError(id) {
  const el = document.getElementById(id);
  if (el) { el.textContent = ''; el.closest('.form-field')?.querySelector('.form-input')?.removeAttribute('aria-invalid'); }
}
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ═══════════════════════════════════════════════
// LOGIN FORM VALIDATION (login.html)
// ═══════════════════════════════════════════════
document.getElementById('login-form')?.addEventListener('submit', e => {
  e.preventDefault(); if (validateLogin()) submitLogin();
});
function validateLogin() {
  let ok = true;
  ['login-email-error','login-password-error','login-general-error'].forEach(clearError);
  const email = document.getElementById('login-email');
  const pw    = document.getElementById('login-password');
  if (!email.value.trim())           { showError('login-email-error','Email is required');                     email.focus(); ok=false; }
  else if (!emailRe.test(email.value.trim())) { showError('login-email-error','Enter a valid email address'); if(ok){email.focus();} ok=false; }
  if (!pw.value)                     { showError('login-password-error','Password is required');               if(ok){pw.focus();}    ok=false; }
  else if (pw.value.length < 8)      { showError('login-password-error','Password must be at least 8 characters'); if(ok){pw.focus();} ok=false; }
  return ok;
}
function submitLogin() {
  const btn = document.getElementById('login-btn');
  document.getElementById('login-btn-label').classList.add('hidden');
  document.getElementById('login-btn-loader').classList.remove('hidden');
  btn.disabled = true;
  setTimeout(() => {
    btn.disabled = false;
    document.getElementById('login-btn-label').classList.remove('hidden');
    document.getElementById('login-btn-loader').classList.add('hidden');
    window.location.href = 'dashboard-user.html';
  }, 1500);
}
document.getElementById('toggle-login-pw')?.addEventListener('click', function() {
  const inp = document.getElementById('login-password');
  inp.type = inp.type === 'password' ? 'text' : 'password';
  this.setAttribute('aria-label', inp.type === 'text' ? 'Hide password' : 'Show password');
});

// ═══════════════════════════════════════════════
// SIGNUP FORM VALIDATION (signup.html)
// ═══════════════════════════════════════════════
document.getElementById('su-pw')?.addEventListener('input', function() {
  const v = this.value;
  const rules = { len: v.length>=8, up: /[A-Z]/.test(v), num: /[0-9]/.test(v), sym: /[^A-Za-z0-9]/.test(v) };
  const score = Object.values(rules).filter(Boolean).length;
  const bar   = document.getElementById('strength-bar');
  const colors = ['','#EF4444','#F59E0B','#10B981','#10B981'];
  if (bar) { bar.style.width=(score*25)+'%'; bar.style.background=colors[score]; }
  [['r-len',rules.len],['r-up',rules.up],['r-num',rules.num],['r-sym',rules.sym]].forEach(([id,pass])=>{
    const el=document.getElementById(id);
    if(el){ el.className='strength-rule text-caption px-2 py-0.5 rounded-full '+(pass?'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400':'bg-gray-100 dark:bg-white/10 text-gray-500');}
  });
  checkSignupReady();
});
document.getElementById('su-terms')?.addEventListener('change', checkSignupReady);
function checkSignupReady() {
  const bar   = document.getElementById('strength-bar');
  const terms = document.getElementById('su-terms');
  const score = parseInt(bar?.style.width||'0') / 25;
  const btn = document.getElementById('su-btn');
  if (btn) btn.disabled = !(score>=4 && terms?.checked);
}
document.getElementById('signup-form')?.addEventListener('submit', e=>{
  e.preventDefault();
  let ok=true;
  ['su-name-err','su-email-err','su-pw-err','su-confirm-err','su-terms-err'].forEach(clearError);
  const name=document.getElementById('su-name'), email=document.getElementById('su-email'),
        pw=document.getElementById('su-pw'),     confirm=document.getElementById('su-confirm'),
        terms=document.getElementById('su-terms');
  if(!name.value.trim()||name.value.trim().length<2) { showError('su-name-err','Name must be at least 2 characters'); name.focus(); ok=false; }
  if(!email.value.trim())                    { showError('su-email-err','Email is required');           if(ok)email.focus(); ok=false; }
  else if(!emailRe.test(email.value.trim())) { showError('su-email-err','Enter a valid email address'); if(ok)email.focus(); ok=false; }
  const p=pw.value;
  if(!p)                                                            { showError('su-pw-err','Password is required');                        if(ok)pw.focus(); ok=false; }
  else if(p.length<8||!/[A-Z]/.test(p)||!/[0-9]/.test(p)||!/[^A-Za-z0-9]/.test(p)) { showError('su-pw-err','Password must meet all 4 requirements above'); if(ok)pw.focus(); ok=false; }
  if(confirm.value!==pw.value)  { showError('su-confirm-err','Passwords do not match');                 if(ok)confirm.focus(); ok=false; }
  if(!terms.checked)            { showError('su-terms-err','You must accept the Terms to continue');    ok=false; }
  if(ok) {
    window.location.href = 'dashboard-user.html';
  }
});

// ═══════════════════════════════════════════════
// CONTACT FORM VALIDATION (contact.html)
// ═══════════════════════════════════════════════
document.getElementById('c-message')?.addEventListener('input', function() {
  const el = document.getElementById('msg-count');
  if (el) { el.textContent = this.value.length; el.style.color = this.value.length>900?'#EF4444':''; }
});
document.getElementById('contact-form')?.addEventListener('submit', e=>{
  e.preventDefault(); let ok=true;
  ['c-name-err','c-email-err','c-subject-err','c-msg-err'].forEach(clearError);
  const name=document.getElementById('c-name'), email=document.getElementById('c-email'),
        subject=document.getElementById('c-subject'), msg=document.getElementById('c-message');
  if(!name.value.trim()||name.value.trim().length<2)    { showError('c-name-err','Name must be at least 2 characters'); name.focus(); ok=false; }
  if(!email.value.trim())                    { showError('c-email-err','Email is required');           if(ok)email.focus(); ok=false; }
  else if(!emailRe.test(email.value.trim())) { showError('c-email-err','Enter a valid email address'); if(ok)email.focus(); ok=false; }
  if(!subject.value.trim()||subject.value.trim().length<5){ showError('c-subject-err','Subject must be at least 5 characters'); if(ok)subject.focus(); ok=false; }
  if(!msg.value.trim()||msg.value.trim().length<20)      { showError('c-msg-err','Message must be at least 20 characters');     if(ok)msg.focus();     ok=false; }
  else if(msg.value.length>1000)             { showError('c-msg-err','Message cannot exceed 1000 characters');                  if(ok)msg.focus();     ok=false; }
  if(ok) {
    document.getElementById('contact-form').classList.add('hidden');
    document.getElementById('contact-success').classList.remove('hidden');
  }
});

// ═══════════════════════════════════════════════
// INTERACTIVE 3D ROOM HOTSPOTS (index.html, services.html)
// ═══════════════════════════════════════════════
(function initHotspots() {
  const markers = document.querySelectorAll('.hotspot-marker');
  const cards = document.querySelectorAll('.hotspot-card');

  markers.forEach(marker => {
    marker.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = marker.dataset.target;
      const targetCard = document.getElementById(targetId);

      cards.forEach(card => {
        if (card.id !== targetId) card.classList.remove('active');
      });
      markers.forEach(m => {
        if (m !== marker) m.classList.remove('active');
      });

      marker.classList.toggle('active');
      if (targetCard) {
        targetCard.classList.toggle('active');
      }
    });
  });

  document.addEventListener('click', () => {
    cards.forEach(card => card.classList.remove('active'));
    markers.forEach(marker => marker.classList.remove('active'));
  });
})();

// ═══════════════════════════════════════════════
// PRELOADER DISMISS
// ═══════════════════════════════════════════════
(function initPreloader() {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    const dismiss = () => { preloader.classList.add('loaded'); };
    window.addEventListener('load', dismiss);
    setTimeout(dismiss, 2000);
  }
})();

// ═══════════════════════════════════════════════
// DYNAMIC FOOTER YEAR
// ═══════════════════════════════════════════════
(function initFooterYear() {
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
  }
})();// ═══════════════════════════════════════════════
// COOKIE CONSENT BANNER
// ═══════════════════════════════════════════════
(function initCookieBanner() {
  const banner  = document.getElementById('cookie-banner');
  const accept  = document.getElementById('cookie-accept');
  const decline = document.getElementById('cookie-decline');
  if (!banner) return;

  // Only show if user hasn't decided yet
  if (!localStorage.getItem('cookie-consent')) {
    // Slight delay so it doesn't flash on load
    setTimeout(() => banner.classList.remove('hidden'), 800);
  }

  accept?.addEventListener('click', () => {
    localStorage.setItem('cookie-consent', 'accepted');
    banner.classList.add('hidden');
  });
  decline?.addEventListener('click', () => {
    localStorage.setItem('cookie-consent', 'declined');
    banner.classList.add('hidden');
  });
})();

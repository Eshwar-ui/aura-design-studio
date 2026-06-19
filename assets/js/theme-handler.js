// ═══════════════════════════════════════════════
// DARK MODE — toggle + localStorage + system pref
// ═══════════════════════════════════════════════
const html = document.documentElement;
const saved = localStorage.getItem('theme');
const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
if (saved === 'dark' || (!saved && prefersDark)) html.classList.add('dark');

document.addEventListener('DOMContentLoaded', () => {
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
});

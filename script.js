// Aura Fashion storefront behaviour.
// WhatsApp ordering: every link carries a plain-language message; we build the wa.me URL here
// so the HTML stays readable and the message text is easy to maintain.
const WA_BASE = 'https://wa.me/254701900664';
document.querySelectorAll('a[data-message]').forEach(link => {
  link.href = WA_BASE + '?text=' + encodeURIComponent(link.dataset.message);
});

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menu.textContent = open ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation'); menu.textContent = '☰';
}));

// Collection filter: Wears and Bags (plus Shop all).
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => {
    item.classList.toggle('selected', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  document.querySelectorAll('.product').forEach(product => {
    product.hidden = button.dataset.filter !== 'all' && button.dataset.filter !== product.dataset.category;
  });
  const visibleCount = document.querySelectorAll('.product:not([hidden])').length;
  document.querySelector('#product-count').textContent = `SHOWING ${visibleCount} PRODUCTS`;
}));
document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.classList.contains('selected'))));

// Collection highlights slideshow.
const slides = [
  { image: 'assets/catalog/dera-rose.jpg', alt: 'Rose Gold Dera — Aura Fashion model photograph', kicker: 'THE SIGNATURE DER A', title: 'Rose Gold Dera, from KSh 2,499.' },
  { image: 'assets/catalog/kaftan-gold.jpg', alt: 'Champagne Glow Kaftan — Aura Fashion model photograph', kicker: 'GLOW-UP SEASON', title: 'Champagne Glow Kaftan, from KSh 2,899.' },
  { image: 'assets/catalog/kimono-noir.jpg', alt: 'Noir Statement Kimono — Aura Fashion model photograph', kicker: 'THE LAYER EDIT', title: 'Noir Statement Kimono, from KSh 1,999.' }
];
let slideIndex = 0;
function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  const slide = slides[slideIndex];
  document.querySelector('#slide-image').src = slide.image;
  document.querySelector('#slide-image').alt = slide.alt;
  document.querySelector('#slide-kicker').textContent = slide.kicker;
  document.querySelector('#slide-title').textContent = slide.title;
  document.querySelectorAll('.slide-dots i').forEach((dot, index) => dot.classList.toggle('selected', index === slideIndex));
}
document.querySelector('#slide-next').addEventListener('click', nextSlide);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion) setInterval(() => { if (!document.hidden && !document.querySelector('.slideshow').matches(':hover, :focus-within')) nextSlide(); }, 2600);

// Publish only real, permissioned customer reviews. These are clearly labelled information cards,
// not fabricated testimonials or claims of third-party verification.
const reviewInfo = [
  { label: 'CUSTOMER REVIEWS', title: 'Real words belong here.', text: 'Verified customer feedback will appear here once it is available. We don’t make up reviews.' },
  { label: 'ALREADY SHOPPED WITH AURA?', title: 'How was your experience?', text: 'Tell us about your fit, your order and your delivery. Share your honest feedback with us on WhatsApp.' },
  { label: 'SHOP WITH CLARITY', title: 'Ask before you order.', text: 'Get current product photos, sizing help, prices and delivery details directly from our team.' },
  { label: 'SIZE & FIT', title: 'Let’s get the details right.', text: 'Message us your usual size and the piece you love. We’ll help you choose the right fit before you pay.' },
  { label: 'DELIVERY', title: 'Countrywide, doorstep-friendly.', text: 'From Nairobi CBD to your town — ask us about delivery costs and timelines for your location.' },
  { label: 'STYLING HELP', title: 'Not sure what works?', text: 'Send us the occasion and your budget. Our stylists will suggest pieces that suit you.' }
];
let reviewPage = 0;
let paused = reducedMotion;
const pause = document.querySelector('#review-pause');
function renderReviewInfo() {
  const container = document.querySelector('.review-cards');
  container.replaceChildren(...reviewInfo.slice(reviewPage * 3, reviewPage * 3 + 3).map(info => {
    const article = document.createElement('article'); article.className = 'review-card';
    const label = document.createElement('span'); label.textContent = info.label;
    const title = document.createElement('h3'); title.textContent = info.title;
    const text = document.createElement('p'); text.textContent = info.text;
    article.append(label, title, text); return article;
  }));
}
function updatePause() { pause.textContent = paused ? '▷' : 'Ⅱ'; pause.setAttribute('aria-label', paused ? 'Resume rotating information' : 'Pause rotating information'); pause.setAttribute('aria-pressed', String(paused)); }
pause.addEventListener('click', () => { paused = !paused; updatePause(); });
renderReviewInfo(); updatePause();
setInterval(() => { if (!paused && !document.hidden && !document.querySelector('#reviews').matches(':hover, :focus-within')) { reviewPage = (reviewPage + 1) % 2; renderReviewInfo(); } }, 5000);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) document.querySelectorAll('nav a').forEach(link => {
      const active = link.hash === '#' + entry.target.id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
document.querySelector('#year').textContent = new Date().getFullYear();

// A failed image must never break the layout or substitute an unrelated photo.
function showProductPlaceholder(image) {
  if (image.dataset.fallbackApplied) return;
  image.dataset.fallbackApplied = 'true';
  image.src = 'assets/photo-unavailable.svg';
  image.alt = 'Product photo unavailable. Request current photos on WhatsApp.';
  image.style.objectFit = 'contain';
  image.style.padding = '24px';
}
document.querySelectorAll('main img').forEach(image => {
  image.addEventListener('error', () => showProductPlaceholder(image));
  if (image.complete && image.naturalWidth === 0) showProductPlaceholder(image);
});

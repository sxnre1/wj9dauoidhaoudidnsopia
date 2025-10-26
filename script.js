const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
  ctaButton.addEventListener('click', (e) => {
    window.location.href = 'menu/product.html';
  });
}

const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.2,
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

window.addEventListener('load', () => {
  faders.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('show');
    }
  });
});
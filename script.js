const faders = document.querySelectorAll('.fade-in');
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('header nav');
const btn = document.querySelector(".hamburger-btn");
const xIcon = document.querySelectorAll(".x-icon");

btn.addEventListener("click", () => {
  nav.classList.toggle("active");

  hamburger.forEach(span => {
    span.style.opacity = nav.classList.contains("active") ? 0 : 1;
  });
  xIcon.forEach(span => {
    span.style.opacity = nav.classList.contains("active") ? 1 : 0;
  });
});


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

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
  hamburger.classList.toggle('active');
});
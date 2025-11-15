const faders = document.querySelectorAll('.fade-in');
const hamburger = document.querySelector('.hamburger');
const btn = document.querySelector(".hamburger-btn");
const nav = document.querySelector("header nav");

btn.addEventListener("click", () => {
  nav.classList.toggle("active");
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

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".menu a");
  let currentPath = window.location.pathname;

  const fileName = currentPath.split("/").pop() || "index.html";

  links.forEach(link => {
    const href = link.getAttribute("href").replace(/^\//, "");
    if (href.endsWith(fileName)) {
      link.classList.add("active");
    }
  });
});

function showPopup(message) {
  const popup = document.createElement("div");
  popup.className = "popup-message";
  popup.textContent = message;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 1500);
}
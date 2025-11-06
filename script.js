const faders = document.querySelectorAll('.fade-in');
const hamburger = document.querySelector('.hamburger');
const btn = document.querySelector(".hamburger-btn");
const nav = document.querySelector("header nav");
const playBtn = document.querySelector(".play");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const repeatBtn = document.querySelector(".repeat");
const trackTitle = document.querySelector(".track-title");
const songs = [
  { title: "Boost up", src: "https://cdn.discordapp.com/attachments/1424380040170307788/1435939535828684861/boostup.mp4?ex=690dca67&is=690c78e7&hm=7722c0c22dcc2ceace467a46b86084e25ce8b5691a1d47fa35f37eb2a40bdc0b&" }
];

let currentIndex = 0;
let isPlaying = false;
let repeat = false;
const audio = new Audio();
audio.src = songs[currentIndex].src;

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

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    audio.src = songs[currentIndex].src;
    trackTitle.textContent = songs[currentIndex].title;
    playSong();
  } else showPopup("이전 곡이 없습니다.");
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < songs.length - 1) {
    currentIndex++;
    audio.src = songs[currentIndex].src;
    trackTitle.textContent = songs[currentIndex].title;
    playSong();
  } else showPopup("다음 곡이 없습니다.");
});

repeatBtn.addEventListener("click", () => {
  repeat = !repeat;
  repeatBtn.classList.toggle("active", repeat);
  showPopup(repeat ? "해당 곡이 반복 재생됩니다." : "반복이 해제되었습니다.");
});

audio.addEventListener("ended", () => {
  if (repeat) playSong();
  else if (currentIndex < songs.length - 1) {
    currentIndex++;
    audio.src = songs[currentIndex].src;
    trackTitle.textContent = songs[currentIndex].title;
    playSong();
  }
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("songIndex", currentIndex);
  localStorage.setItem("songTime", audio.currentTime);
  localStorage.setItem("isPlaying", isPlaying);
});

window.addEventListener("load", () => {
  const savedIndex = localStorage.getItem("songIndex");
  const savedTime = localStorage.getItem("songTime");
  const wasPlaying = localStorage.getItem("isPlaying") === "true";

  if (savedIndex !== null) {
    currentIndex = parseInt(savedIndex);
    audio.src = songs[currentIndex].src;
    audio.currentTime = savedTime ? parseFloat(savedTime) : 0;
    trackTitle.textContent = songs[currentIndex].title;
    if (wasPlaying) playSong();
  }

  if (window.innerWidth <= 768) {
    document.body.addEventListener("click", () => {
      audio.play().catch(() => {});
    }, { once: true });
  }
});
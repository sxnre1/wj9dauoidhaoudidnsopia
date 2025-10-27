const faders = document.querySelectorAll('.fade-in');
const hamburger = document.querySelector('.hamburger');
const btn = document.querySelector(".hamburger-btn");
const nav = document.querySelector("header nav");
const bgm = document.getElementById("bgm");

window.addEventListener("load", () => {
  const playPromise = bgm.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          bgm.volume = 0;
            const maxVolume = 0.3;
            const fadeDuration = 5000;
            const intervalTime = 100;
            const volumeStep = maxVolume / (fadeDuration / intervalTime);

            const fadeIn = setInterval(() => {
              if (bgm.volume < maxVolume) {
                bgm.volume = Math.min(bgm.volume + volumeStep, maxVolume);
              } else {
                clearInterval(fadeIn);
              }
            }, intervalTime);
          })
          .catch((err) => {
        console.log("자동재생이 차단되었습니다:", err);
      });
    }
});

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
// Nada Birthday Website — script.js

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);

  const countdownScreen = $("#countdownScreen") || $("#countdown");
  const countdownNumber = $("#countdownNumber") || $("#countdown .number");
  const birthdayWords = $("#birthdayWords");
  const loveWords = $("#loveWords");
  const passwordScreen = $("#passwordScreen");
  const musicScreen = $("#musicScreen");
  const albumScreen = $("#albumScreen");
  const passwordInput = $("#passwordInput") || $("#password");
  const unlockButton = $("#unlockButton") || $("#enterButton");
  const playMusicButton = $("#playMusicButton") || $("#startMusic");
  const audio = $("#birthdayAudio") || $("#song") || $("audio");
  const letter = $("#birthdayLetter") || $("#letterText");
  const canvas = $("#confettiCanvas") || $("#effectsCanvas");

  const PASSWORD = "10/11/2009";

  const captions = [
    "كل سنه وانتي طيبه ي روحي 🤍😍",
    "بحبككك يا نور عيني ♥️♥️",
    "بحبك اويييي",
    "سنه سعيده عليكي ي عمري 🤍"
  ];

  const letterMessage =
    "كل سنة وانتي طيبة يا ندى، ويا رب تكون سنتك الجديدة مليانة فرحة وراحة ونجاح. أتمنى تفضلي دايمًا مبسوطة، وتحققي كل اللي نفسك فيه. وجودك جميل، وأتمنى لك أيام أحلى من كل اللي فات. بحبك ❤️";

  function show(element) {
    if (!element) return;
    element.hidden = false;
    element.style.display = "";
    element.classList.remove("hidden");

    requestAnimationFrame(() => {
      element.classList.add("show", "active");
    });
  }

  function hide(element) {
    if (!element) return;

    element.classList.remove("show", "active");
    element.classList.add("hidden");
    element.hidden = true;
    element.style.display = "none";
  }
    function burstConfetti() {
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    ctx.scale(dpr, dpr);

    const pieces = Array.from({ length: 150 }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 13,
      vy: (Math.random() - 0.8) * 13,
      gravity: 0.18 + Math.random() * 0.12,
      size: 3 + Math.random() * 5,
      angle: Math.random() * 6,
      spin: (Math.random() - 0.5) * 0.2,
      life: 70 + Math.random() * 35,
      color: ["#ff8fbd", "#ffd6e7", "#fff5fa", "#e8a6c5", "#f5d9a8"][
        Math.floor(Math.random() * 5)
      ]
    }));

    let frame = 0;

    function draw() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      pieces.forEach((piece) => {
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.vy += piece.gravity;
        piece.angle += piece.spin;
        piece.life -= 1;

        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.angle);
        ctx.fillStyle = piece.color;
        ctx.fillRect(
          -piece.size / 2,
          -piece.size / 2,
          piece.size,
          piece.size * 1.7
        );
        ctx.restore();
      });

      frame++;

      if (frame < 105) {
        requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    }

    requestAnimationFrame(draw);
  }

  function typeText(element, text, speed = 55) {
    if (!element) return;

    element.textContent = "";
    let index = 0;

    const timer = setInterval(() => {
      element.textContent += text.charAt(index);
      index++;

      if (index >= text.length) {
        clearInterval(timer);
      }
    }, speed);
  }

  function decorateCaptions() {
    const photoCards = document.querySelectorAll("[data-caption]");

    photoCards.forEach((card, index) => {
      if (!card.querySelector(".photo-caption")) {
        const caption = document.createElement("p");
        caption.className = "photo-caption";
        caption.textContent = captions[index] || "";
        card.appendChild(caption);
      }
    });
    }
    function startCountdown() {
    let count = 10;

    if (countdownNumber) {
      countdownNumber.textContent = count;
    }

    const timer = setInterval(() => {
      count--;

      if (countdownNumber) {
        countdownNumber.textContent = count > 0 ? count : "";
      }

      if (count <= 0) {
        clearInterval(timer);

        show(birthdayWords);
        burstConfetti();

        setTimeout(() => {
          hide(birthdayWords);
          show(loveWords);
        }, 2200);

        setTimeout(() => {
          hide(countdownScreen);
          hide(loveWords);
          show(passwordScreen);
        }, 4900);
      }
    }, 1000);
  }

  function unlock() {
    const entered = (passwordInput?.value || "").trim();

    if (entered !== PASSWORD) {
      if (passwordInput) {
        passwordInput.classList.add("invalid");
        passwordInput.setAttribute("aria-invalid", "true");

        setTimeout(() => {
          passwordInput.classList.remove("invalid");
          passwordInput.removeAttribute("aria-invalid");
        }, 700);
      }

      return;
    }

    hide(passwordScreen);
    show(musicScreen);
  }

  async function playMusic() {
    if (audio) {
      try {
        audio.currentTime = 0;
        await audio.play();
      } catch (error) {
        console.warn("تعذر تشغيل الأغنية:", error);
      }
    }

    hide(musicScreen);
    show(albumScreen);

    decorateCaptions();

    if (letter) {
      typeText(letter, letterMessage, 48);
    }
  }

  if (unlockButton) {
    unlockButton.addEventListener("click", unlock);
  }

  if (passwordInput) {
    passwordInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        unlock();
      }
    });
  }

  if (playMusicButton) {
    playMusicButton.addEventListener("click", playMusic);
  }

  // Start countdown automatically.
  startCountdown();
});

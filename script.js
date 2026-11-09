
document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  const intro = $("intro");
  const countWrap = $("countWrap");
  const ready = $("ready");
  const surpriseBtn = $("surpriseBtn");
  const musicSection = $("musicSection");
  const playSong = $("playSong");
  const skipSong = $("skipSong");
  const memories = $("memories");
  const letterBtn = $("letterBtn");
  const letterSection = $("letterSection");
  const envelope = $("envelope");
  const letter = $("letter");
  const endNote = $("endNote");

  // إلغاء عداد الوقت والتاريخ
  countWrap.classList.add("hidden");
  ready.classList.add("hidden");

  // تصحيح مسارات الصور
  const photos = [
    "nada-1.jpg",
    "nada-2.jpg",
    "nada-3.png",
    "nada-4.jpg"
  ];

  document.querySelectorAll(".gallery img").forEach((img, i) => {
    if (photos[i]) img.src = photos[i];
  });

  // مؤثر احتفالي بالقلوب
  const style = document.createElement("style");
  style.textContent = `
    .party-heart {
      position: fixed;
      left: var(--x);
      top: 55%;
      z-index: 9999;
      pointer-events: none;
      font-size: var(--size);
      animation: heartBurst 2.5s ease-out forwards;
    }
    @keyframes heartBurst {
      0% { opacity:1; transform:translate(0,0) scale(.5) rotate(0); }
      100% { opacity:0; transform:translate(var(--dx),var(--dy)) scale(1.5) rotate(300deg); }
    }
    .birthday-ready {
      animation: birthdayGlow 1.2s ease infinite alternate;
    }
    @keyframes birthdayGlow {
      from { text-shadow: 0 0 5px #e9a8c2; }
      to { text-shadow: 0 0 25px #ff80b5; }
    }
  `;
  document.head.appendChild(style);

  function celebrate() {
    const symbols = ["🤍", "💗", "♥", "✨", "💕", "🌸"];

    for (let i = 0; i < 45; i++) {
      const heart = document.createElement("span");
      heart.className = "party-heart";
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

      heart.style.setProperty("--x", Math.random() * 100 + "vw");
      heart.style.setProperty("--dx", (Math.random() * 300 - 150) + "px");
      heart.style.setProperty("--dy", (-150 - Math.random() * 450) + "px");
      heart.style.setProperty("--size", (15 + Math.random() * 22) + "px");

      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 2700);
    }
  }

  // بدء العد من 10 إلى 1
  surpriseBtn.addEventListener("click", () => {
    surpriseBtn.disabled = true;
    surpriseBtn.classList.add("hidden");

    countWrap.classList.remove("hidden");
    countWrap.innerHTML = `
      <div class="count-title">استعدي للمفاجأة يا ندى 🤍</div>
      <div id="launchNumber" style="
        font-size:90px;
        font-weight:800;
        color:#efa9c5;
        padding:15px;
        text-shadow:0 0 30px #e96da5;
      ">10</div>
    `;

    countWrap.scrollIntoView({ behavior: "smooth", block: "center" });

    let number = 10;
    const timer = setInterval(() => {
      number--;

      if (number > 0) {
        $("launchNumber").textContent = number;
      } else {
        clearInterval(timer);

        countWrap.classList.add("hidden");
        ready.classList.remove("hidden");

        celebrate();

        musicSection.classList.remove("hidden");
        setTimeout(() => {
          musicSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }, 500);
      }
    }, 1000);
  });

  // تشغيل الأغنية
  playSong.addEventListener("click", () => {
    window.open(
      "https://play.anghami.com/song/2179811",
      "_blank"
    );
  });

  // تخطي الأغنية والانتقال للصور
  function showMemories() {
    memories.classList.remove("hidden");
    memories.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  skipSong.addEventListener("click", showMemories);

  // الانتقال للجواب
  letterBtn.addEventListener("click", () => {
    letterSection.classList.remove("hidden");
    letterSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });

  // فتح الظرف
  envelope.addEventListener("click", () => {
    letter.classList.remove("hidden");
    endNote.classList.remove("hidden");
    envelope.style.transform = "scale(.95)";
    envelope.style.opacity = ".65";
    envelope.style.pointerEvents = "none";

    celebrate();

    setTimeout(() => {
      letter.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 300);
  });
});
    

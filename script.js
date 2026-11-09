
document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  const countScreen = $("countScreen");
  const countNumber = $("countNumber");
  const countProgress = $("countProgress");
  const celebrationScreen = $("celebrationScreen");
  const birthdayWords = $("birthdayWords");
  const loveWords = $("loveWords");
  const passwordScreen = $("passwordScreen");
  const passwordForm = $("passwordForm");
  const passwordInput = $("passwordInput");
  const passwordError = $("passwordError");
  const musicScreen = $("musicScreen");
  const playSongButton = $("playSongButton");
  const birthdaySong = $("birthdaySong");
  const musicError = $("musicError");
  const albumScreen = $("albumScreen");
  const typedMessage = $("typedMessage");
  const canvas = $("effectsCanvas");

  const PASSWORD = "10/11/2009";

  const message =
    "كل سنة وانتي طيبة يا ندى، ويا رب تكون سنتك الجديدة مليانة فرحة وراحة ونجاح. أتمنى تفضلي دايمًا مبسوطة، وتحققي كل اللي نفسك فيه. وجودك جميل، وأتمنى لك أيام أحلى من كل اللي فات. بحبك ❤️";

  function show(element) {
    if (!element) return;
    element.classList.remove("hidden");
    element.classList.add("active");
  }

  function hide(element) {
    if (!element) return;
    element.classList.remove("active");
    element.classList.add("hidden");
  }

  function confetti() {
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.scale(dpr, dpr);

    const colors = [
      "#ff8fbd", "#ffd6e7", "#fff5fa",
      "#e8a6c5", "#f5d9a8"
    ];

    const pieces = Array.from({ length: 150 }, () => ({
      x: innerWidth / 2,
      y: innerHeight / 2,
      vx: (Math.random() - 0.5) * 13,
      vy: (Math.random() - 0.8) * 13,
      size: 3 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    let frame = 0;

    function draw() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);

      pieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size * 1.7);
      });

      frame++;

      if (frame < 110) {
        requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
      }
    }

    requestAnimationFrame(draw);
  }

  function typeMessage() {
    if (!typedMessage) return;

    typedMessage.textContent = "";
    let i = 0;

    const timer = setInterval(() => {
      typedMessage.textContent += message.charAt(i);
      i++;

      if (i >= message.length) {
        clearInterval(timer);
      }
    }, 48);
  }

  // Countdown from 10 to 1
  let count = 10;
  countNumber.textContent = count;

  const timer = setInterval(() => {
    count--;

    countNumber.textContent = count > 0 ? count : "";

    if (countProgress) {
      countProgress.style.width =
        ((10 - count) * 10) + "%";
    }

    if (count <= 0) {
      clearInterval(timer);

      hide(countScreen);
      show(celebrationScreen);
      show(birthdayWords);
      confetti();

      // HAPPY BIRTHDAY first
      setTimeout(() => {
        hide(birthdayWords);
        show(loveWords);
      }, 2200);

      // Then I LOVE YOU, then password
      setTimeout(() => {
        hide(celebrationScreen);
        hide(loveWords);
        show(passwordScreen);
      }, 4900);
    }
  }, 1000);

  // Password form
  passwordForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (passwordInput.value.trim() === PASSWORD) {
      passwordError.textContent = "";
      hide(passwordScreen);
      show(musicScreen);
    } else {
      passwordError.textContent = "التاريخ مش صحيح، حاولي تاني 🤍";
    }
  });

  // Play music and open album
  playSongButton.addEventListener("click", async () => {
    try {
      birthdaySong.currentTime = 0;
      await birthdaySong.play();
      musicError.textContent = "";
    } catch (error) {
      musicError.textContent =
        "تعذر تشغيل الأغنية، تأكدي من وجود ملف nada-song.mp3";
      return;
    }

    hide(musicScreen);
    show(albumScreen);
    typeMessage();
  });
});
                         

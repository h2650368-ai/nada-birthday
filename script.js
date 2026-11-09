
document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  const screens = [
    "countScreen",
    "celebrationScreen",
    "passwordScreen",
    "albumScreen"
  ];

  // الانتقال بين الشاشات
  function showScreen(id) {
    screens.forEach((screen) => {
      $(screen).classList.toggle("active", screen === id);
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // عناصر العد التنازلي
  const countNumber = $("countNumber");
  const progressBar = $("progressBar");

  // عناصر الاحتفال
  const birthdayWords = $("birthdayWords");
  const loveWords = $("loveWords");
  const enterButton = $("enterButton");

  // عناصر الباسورد
  const passwordForm = $("passwordForm");
  const passwordInput = $("passwordInput");
  const passwordError = $("passwordError");

  // الأغنية
  const song = $("birthdaySong");

  // تشغيل الانفجار والقلوب والنجوم
  function launchConfetti() {
    const pieces = [
      "💗", "🤍", "💕", "♡",
      "✦", "✨", "🌸", "♥", "💖"
    ];

    for (let i = 0; i < 100; i++) {
      const particle = document.createElement("span");

      particle.className = "party-particle";

      particle.textContent =
        pieces[Math.floor(Math.random() * pieces.length)];

      particle.style.setProperty(
        "--x",
        Math.random() * 100 + "vw"
      );

      particle.style.setProperty(
        "--y",
        (30 + Math.random() * 50) + "vh"
      );

      particle.style.setProperty(
        "--dx",
        (Math.random() * 500 - 250) + "px"
      );

      particle.style.setProperty(
        "--dy",
        (-200 - Math.random() * 600) + "px"
      );

      particle.style.setProperty(
        "--s",
        (15 + Math.random() * 25) + "px"
      );

      particle.style.setProperty(
        "--d",
        (2 + Math.random() * 2) + "s"
      );

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 4500);
    }
  }

  // العد التنازلي من 10 إلى 1
  let count = 10;

  const countdown = setInterval(() => {
    count--;

    if (count > 0) {
      countNumber.textContent = count;

      progressBar.style.width =
        ((10 - count) * 10) + "%";

      countNumber.style.animation = "none";

      void countNumber.offsetWidth;

      countNumber.style.animation =
        "numberPop .45s ease";

      return;
    }

    clearInterval(countdown);

    // إظهار شاشة الاحتفال
    showScreen("celebrationScreen");

    launchConfetti();

    // اختفاء Happy Birthday
    // وظهور I LOVE YOU
    setTimeout(() => {
      birthdayWords.classList.add("hidden");

      loveWords.classList.remove("hidden");

    }, 3200);

    // ظهور زر الدخول
    setTimeout(() => {
      enterButton.classList.remove("hidden");

      launchConfetti();

    }, 5700);

  }, 1000);


  // زر الدخول
  enterButton.addEventListener("click", () => {
    showScreen("passwordScreen");

    setTimeout(() => {
      passwordInput.focus();
    }, 350);
  });


  // التحقق من كلمة المرور
  passwordForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const password = passwordInput.value.trim();

    if (password === "10/11/2009") {

      passwordError.textContent = "";

      showScreen("albumScreen");

      launchConfetti();

      // تشغيل الأغنية بعد فتح الألبوم
      song.play().catch(() => {
        console.log("تعذر تشغيل الأغنية تلقائياً");
      });

    } else {

      passwordError.textContent =
        "التاريخ مش مظبوط، جربي تاني يا ندى 🤍";

      passwordInput.value = "";

      passwordInput.focus();
    }
  });


  // إظهار الجواب وإخفاؤه
  $("letterButton").addEventListener("click", () => {

    const letter = $("letterCard");

    letter.classList.toggle("hidden");

    if (!letter.classList.contains("hidden")) {

      letter.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      launchConfetti();
    }
  });


  // قلوب صغيرة عند لمس الشاشة
  document.addEventListener("pointerdown", (event) => {

    if (event.target.closest("button, input")) {
      return;
    }

    const heart = document.createElement("span");

    heart.className = "party-particle";

    heart.textContent = "♡";

    heart.style.setProperty(
      "--x",
      event.clientX + "px"
    );

    heart.style.setProperty(
      "--y",
      event.clientY + "px"
    );

    heart.style.setProperty("--dx", "20px");
    heart.style.setProperty("--dy", "-90px");
    heart.style.setProperty("--s", "22px");
    heart.style.setProperty("--d", "1.2s");

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1300);

  });

});

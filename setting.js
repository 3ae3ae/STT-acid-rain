const curry = (f) => (a) => (b) => f(a, b);

function showManual() {
  const $blur = document.getElementById("blur");
  $blur.style.display = "block";
  const blurAnimation = (s) => ($blur.style.backdropFilter = `blur(${s}px)`);
  linearAnimation(blurAnimation, 0, 5, 0.3, 60);
  const $manual = document.getElementById("manual");
  $manual.style.display = "flex";
  $manual.classList.toggle("flex", true);
  const invisibleAnimation = (s) => ($manual.style.opacity = s);
  linearAnimation(invisibleAnimation, 0, 1, 0.3, 60);
  $manual.addEventListener("click", hideManual);
}

function hideManual() {
  const $manual = document.getElementById("manual");
  const invisibleAnimation = (s) => ($manual.style.opacity = s);
  linearAnimation(invisibleAnimation, 1, -1, 0.3, 60);
  const $blur = document.getElementById("blur");
  const blurAnimation = (s) => ($blur.style.backdropFilter = `blur(${s}px)`);
  linearAnimation(blurAnimation, 5, -5, 0.3, 60);
  const blrdis = (b) => ($blur.style.display = b);
  const mandis = (b) => ($manual.style.display = b);
  $blur.style.display = "none";
  setTimeout(blrdis, 300, "none");
  setTimeout($manual.classList.toggle, 300, "flex", false);
  setTimeout(mandis, 300, "none");
}

function linearAnimation(animation, init, strength, time, frame) {
  for (let i = 0; i <= time; i += 1 / frame) {
    setTimeout(animation, i * 1000, init + (i * strength) / time);
  }
}

const $how_to = document.getElementById("how_to");
$how_to.addEventListener("click", showManual);

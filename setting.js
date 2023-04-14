function showManual() {
  const $background = document.getElementById("background");
  $background.style.display = "block";
  const blurAnimation = (s) =>
    ($background.style.backdropFilter = `blur(${s}px)`);
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
  const $background = document.getElementById("background");
  const blurAnimation = (s) =>
    ($background.style.backdropFilter = `blur(${s}px)`);
  linearAnimation(blurAnimation, 5, -5, 0.3, 60);
  $background.style.display = "none";
  setTimeout(() => ($background.style.display = "none"), 300);
  setTimeout($manual.classList.toggle, 300, "flex", false);
  setTimeout(() => ($manual.style.display = "none"), 300);
  $manual.removeEventListener("click", hideManual);
}

function start() {
  $how_to.removeEventListener("click", showManual);
  $start.removeEventListener("click", start);
  const $background = document.getElementById("background");
  $background.style.display = "block";
  $background.style.opacity = 0;
  $background.style.backgroundColor = "black";
  const invisibleAnimation = (s) => ($background.style.opacity = s);
  linearAnimation(invisibleAnimation, 0, 1, 0.3, 60);
  const $title = document.getElementById("title");
  setTimeout(() => ($title.style.display = "none"), 300);
  setTimeout(() => ($start.style.display = "none"), 300);
  setTimeout(() => ($how_to.style.display = "none"), 300);
  setTimeout(() => linearAnimation(invisibleAnimation, 1, -1, 0.3, 60), 300);
  setTimeout(() => ($background.style.display = "none"), 600);
  setTimeout(countdown, 605);
}

function countdown() {
  const $count = document.createElement("div");
  $count.classList.add("count", "box");
  $count.textContent = "3";
  $wrap.appendChild($count);
  setTimeout(() => ($count.textContent = "2"), 1000);
  setTimeout(() => ($count.textContent = "1"), 2000);
  setTimeout(() => ($count.textContent = "Start"), 3000);
  setTimeout(() => $wrap.removeChild($count), 4000);
  setTimeout(() => ($wrap.style.display = "block"), 4000);
  setTimeout(window.requestAnimationFrame, 4000, set);
}

const $start = document.getElementById("start");
const $how_to = document.getElementById("how_to");

$how_to.addEventListener("click", showManual);

$start.addEventListener("click", start);

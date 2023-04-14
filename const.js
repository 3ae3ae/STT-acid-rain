const $wrap = document.getElementById("wrap");
const wrapWidth = window.getComputedStyle($wrap).width;
const curry = (f) => (a) => (b) => f(a, b);
const vxTopx = (vx) => (vx / 100) * window.innerWidth;
const pxTovx = (px) => (px / window.innerWidth) * 100;
const pxTovh = (px) => (px / window.innerHeight) * 100;
const vhTopx = (vh) => (vh / 100) * window.innerHeight;

function linearAnimation(animation, init, strength, time, frame) {
  for (let i = 0; i <= time; i += 1 / frame) {
    setTimeout(animation, i * 1000, init + (i * strength) / time);
  }
}

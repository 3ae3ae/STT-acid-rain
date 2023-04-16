class rainDrop {
  constructor(word = "") {
    this.word = word;
    this.y = 0;
    this.x = 0;
    this.me = this.init();
    this.draw();
    this.me.style.visibility = "visible";
  }

  init() {
    const me = document.createElement("div");
    me.classList.add("box");
    me.textContent = this.word;
    me.style.position = "absolute";
    me.style.padding = "0.5em";
    me.style.wordBreak = "keep-all";
    me.style.visibility = "hidden";
    me.style.left = 0;
    me.style.top = 0;
    $wrap.appendChild(me);
    this.x =
      Math.random() *
      (wrapWidth -
        window.getComputedStyle(me).width.slice(0, -2) -
        vhTopx(50 / 16));
    return me;
  }

  draw() {
    this.me.style.left = this.x + "px";
    this.me.style.top = this.y + "vh";
    const h =
      pxTovh(window.getComputedStyle(this.me).height.slice(0, -2)) +
      this.y +
      pxTovh(window.getComputedStyle(this.me).height.slice(0, -2) / 2);
    if (Math.ceil(h) >= 99) {
      window.cancelAnimationFrame(animeId);
      return false;
    }
    return true;
  }

  drop(v) {
    this.y += v;
  }
}

const time = { start: 0, elapsed: 0, level: 2, frameStart: 0, frameCheck: 0 }; //생성주기: 3000/(level+1), 떨어지는 속도: 1초에 20 + level * 20 vh
const words = [];
let animeId = 0;
function set(now = 0) {
  time.start = now;
  time.frameStart = now;
  window.requestAnimationFrame(game);
}
function game(now = 0) {
  time.frameCheck = now - time.frameStart;
  time.elapsed = now - time.start;
  if (time.elapsed > 3000 / (time.level + 1)) {
    words.push(new rainDrop("안녕"));
    time.start = now;
  }
  const v = ((20 + time.level * 20) * time.frameCheck) / 1000;
  if (words.length)
    for (const word of words) {
      word.drop(v);
      if (!word.draw()) return;
    }
  time.frameStart = now;
  animeId = window.requestAnimationFrame(game);
}

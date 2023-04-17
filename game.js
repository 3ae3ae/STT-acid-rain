var SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

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
      return false;
      //
    }
    return true;
  }

  drop(v) {
    this.y += v;
  }

  delete() {
    $wrap.removeChild(this.me);
  }

  text() {
    return this.word;
  }
}

const time = { start: 0, elapsed: 0, level: 2, frameStart: 0, frameCheck: 0 }; //생성주기: 3000/(level+1), 떨어지는 속도: 1초에 5 + level * 10 vh
const words = [];
let animeId = 0;
let recognizedWords = [];
const recognition = new SpeechRecognition();
recognition.lang = "ko-KR";
recognition.continuous = false;
recognition.interimResults = true;

function set(now = 0) {
  time.start = now;
  time.frameStart = now;
  window.requestAnimationFrame(game);
  recognition.start();
}
function game(now = 0) {
  animeId = window.requestAnimationFrame(game);
  time.frameCheck = now - time.frameStart;
  time.elapsed = now - time.start;
  if (time.elapsed > 3000 / (time.level + 1)) {
    words.push(
      new rainDrop(wordList[Math.floor(Math.random() * wordList.length)])
    );
    time.start = now;
  }
  const v = ((5 + time.level * 10) * time.frameCheck) / 1000;
  if (words.length) {
    for (const word of words) {
      word.drop(v);
      if (!word.draw()) window.cancelAnimationFrame(animeId);
    }
    if (recognizedWords.length) {
      words.forEach((word, wi, words) =>
        recognizedWords.forEach((recWord, ri, recWords) => {
          if (word.text() == recWord) {
            words.splice(wi, 1);
            word.delete();
            recWords.splice(ri, 1);
          }
        })
      );
      recognizedWords = [];
    }
  }
  time.frameStart = now;
}

recognition.addEventListener("result", (event) => {
  recognition.stop();
  const result = event.results[0][0].transcript;
  recognizedWords = recognizedWords.concat(
    result.split(/!|\.|,|\?|\s|~/g).filter((x) => !!x)
  );
  console.log(recognizedWords);
});

recognition.addEventListener("end", () => {
  recognition.start();
});

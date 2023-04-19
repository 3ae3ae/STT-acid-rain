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
    const h =
      pxTovh(window.getComputedStyle(this.me).height.slice(0, -2)) +
      this.y +
      25 / 16;
    if (Math.ceil(h) >= 99) {
      return false;
    }
    this.me.style.left = this.x + "px";
    this.me.style.top = this.y + "vh";
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

const time = {
  start: 0,
  elapsed: 0,
  level: 1,
  frameStart: 0,
  frameCheck: 0,
  levelCheck: 0,
}; //생성주기: 6000/(level+1), 떨어지는 속도: 1초에 5 + level * 5 vh
const words = [];
let animeId = 0;
let recognizedWords = [];
let score = 0;
let life = 6;
let heart = "♥ ♥ ♥";
const $life = document.getElementById("life");
const $score = document.getElementById("score");
const $recognized = document.getElementById("recognized");
const $gameOver = document.getElementById("gameover");
const recognition = new SpeechRecognition();
recognition.lang = "ko-KR";
recognition.continuous = false;
recognition.interimResults = true;

function set(now = 0) {
  time.levelCheck = now;
  time.start = now;
  time.frameStart = now;
  window.requestAnimationFrame(game);
  $recognized.style.display = "flex";
  recognition.start();
  $score.style.display = "block";
  $score.textContent = "Score: 0";
  $life.style.display = "flex";
  $life.textContent = "♥ ♥ ♥";
}

function game(now = 0) {
  animeId = window.requestAnimationFrame(game);
  $score.textContent = `Score: ${score}`;
  $life.textContent = heart;
  time.frameCheck = now - time.frameStart;
  time.elapsed = now - time.start;
  if (now - time.levelCheck > 15000) {
    time.levelCheck = now;
    time.level++;
  }
  if (time.elapsed > 6000 / (time.level + 1)) {
    words.push(
      new rainDrop(wordList[Math.floor(Math.random() * wordList.length)])
    );
    time.start = now;
  }
  const v = ((4 + time.level * 4) * time.frameCheck) / 1000;
  if (words.length) {
    words.forEach((word, i, words) => {
      word.drop(v);
      if (!word.draw()) {
        life--;
        heart = "♥ ".repeat(Math.floor(life / 2)) + "♡".repeat(life % 2);
        if (life == 0) {
          $life.textContent = heart;
          window.cancelAnimationFrame(animeId);
          recognition.removeEventListener("result", hadleResult);
          recognition.removeEventListener("end", recognitionRestart);
          recognition.stop();
          $gameOver.style.display = "block";
        } else {
          word.delete();
          words.splice(i, 1);
        }
      }
    });

    if (recognizedWords.length) {
      words.forEach((word, wi, words) =>
        recognizedWords.forEach((recWord, ri, recWords) => {
          if (word.text() == recWord) {
            score += time.level * 100;
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

function recognitionRestart() {
  recognition.start();
}

function hadleResult(event) {
  recognition.stop();
  const result = event.results[0][0].transcript;
  recognizedWords = recognizedWords.concat(
    result.split(/!|\.|,|\?|\s|~/g).filter((x) => !!x)
  );
  $recognized.textContent = recognizedWords.join(", ");
}

recognition.addEventListener("result", hadleResult);

recognition.addEventListener("end", recognitionRestart);

function newpage() {
  window.location.href = "spelOefen.html";
}


function spelpage() {
  window.location.href = "spel.html";
}

let oefenscore = 0;
const oefenscoretext = document.getElementById("scoreText");
let fairy = document.getElementById("fairyTarget"),
  playzone = document.getElementById("fairybox");
let lives = 3;

const start = document.getElementById("demoBegin"),
  skip = document.getElementById("demoSkip"),
  popup = document.getElementById("popupDemo");

function startGame() {
  spawnTime(4000);
  spawnRandom();
  fairy.style.visibility = "visible";
}

start.addEventListener("click", () => {
  startGame();
  popup.style.display = "none";
});

let timeoutDuration = 2000;
let fairyClicked = false;

function spawnRandom() {
  fairyClicked = false;
  fairy.style.opacity = "1";
  let maxX = playzone.clientWidth - fairy.clientWidth;
  let maxY = playzone.clientHeight - fairy.clientHeight;
  let randomX = Math.floor(Math.random() * maxX);
  let randomY = Math.floor(Math.random() * maxY);
  fairy.style.left = randomX + "px";
  fairy.style.top = randomY + "px";

  setTimeout(function () {
    if (fairyClicked == true){
      checkLives()
    } else{
      lives--
      checkLives()
    }
    
    fairy.style.opacity = "0";
    timeoutDuration -= 100;
    if (timeoutDuration < 600) {
      timeoutDuration = 600;
    }
  }, timeoutDuration);
}

function spawnTime(delay) {
  spawnRandom();
  if (delay <= 800) {
  } else {
    delay -=200;
  }
  if (delay >= 0) {
    setTimeout(function () {
      spawnTime(delay);
    }, delay);
  }
}

fairy.addEventListener("click", () => {
  fairy.style.opacity = "0";
  fairyClicked = true;
  oefenscore++;
  oefenscoretext.innerHTML = `${oefenscore} / 30`;
});

const popupDone = document.getElementById("popupDone")

function checkLives() {
  if (lives < 1) {
    popupDone.style.display = "block"
    heart1.style.display = "none";
    fairy.style.display = "none"
  } else if (lives < 2) {
    heart2.style.display = "none";
  } else if (lives < 3) {
    heart3.style.display = "none";
  }
}

const heart1 = document.getElementById("heart1"),
  heart2 = document.getElementById("heart2"),
  heart3 = document.getElementById("heart3");


  
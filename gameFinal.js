

let score = 0;
const oefenscoretext = document.getElementById("scoreText");
let fairy = document.getElementById("fairyTarget"),
  playzone = document.getElementById("fairybox");
let lives = 3;

const start = document.getElementById("spelBegin"),
  popup = document.getElementById("spelDemo");

function startGame() {
  spawnTime(4000);
  spawnRandom();
  fairy.style.visibility = "visible";
}


let timeoutDuration = 2000;
let fairyClicked = false

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
  score++;
  oefenscoretext.innerHTML = `${score} / 30`;
});

const popupDone = document.getElementById("popSpel")

function checkLives() {
  if (lives < 1) {
    checkScore()
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


  startGame()


const statusText = document.getElementById("statusText"),
statusZin = document.getElementById("statusZin"),
sticker = document.getElementById("fairystickerClaimed"),
scoreSpel = document.getElementById("scoreSpel"),
bestScoreSpel = document.getElementById("bestscoreSpel")

function checkScore(){
  checkBestScore()
  scoreSpel.innerHTML = `Score: ${score}`
 
  if(score >= 30){
    statusText.innerHTML = "Gefeliciteerd"
   sticker.src = "bestanden/fairysticker.png";
   statusZin.innerHTML = "Je hebt de feeën verslagen! Je hebt een sticker ontgrendeld."
  } else {
    statusText.innerHTML = "Game over"
    sticker.src = "bestanden/stickerfeenietgehaald.png";
    statusZin.innerHTML = "Helaas! je hebt te weinig punten om de sticker te ontgrendelen."
  }
}

let bestScore = 0
function checkBestScore(){

  if(score > bestScore){
    bestScore = score
  }
  bestScoreSpel.innerHTML = `Beste score: ${bestScore}`
}

function restartGame(){
  location.reload();
}



  function homepage(){
   window.location.href = "MonsterHunt.html"
  }
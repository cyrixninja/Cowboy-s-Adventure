var startBtn = document.getElementById("start-btn");
var runAnim = document.querySelectorAll(".run-anim");
var getSign = document.querySelector(".sign");
var swingSign = document.querySelector(".results");
var goldHorse = document.querySelector(".horse-gold");
var whiteHorse = document.querySelector(".horse-white");
var brownHorse = document.querySelector(".horse-brown");

var goldRes, whiteRes, brownRes, max;

var randomNo = function getRandom(min, max) {
  min = Math.ceil(6);
  max = Math.floor(9);
  return Math.floor(Math.random() * (max - min)) + min;
};

startBtn.addEventListener("click", () => {
  start();
  timeout();
});

function start() {
  for (var i = 0; i < runAnim.length; i++) {
    // Start the animation
    runAnim[i].style.webkitAnimationPlayState = "running";
  }

  // Add random time
  goldRes = goldHorse.style.animationDuration = randomNo() + "s";
  whiteRes = whiteHorse.style.animationDuration = randomNo() + "s";
  brownRes = brownHorse.style.animationDuration = randomNo() + "s";
 
  // Toggle animate class
  goldHorse.classList.toggle("animate");
  whiteHorse.classList.toggle("animate");
  brownHorse.classList.toggle("animate");

  // Add styles to disable button
  startBtn.disabled = true;
  startBtn.style.cursor = "not-allowed";
  getSign.style.opacity = "0.6";
  startBtn.style.opacity = "0.6";

  swingSign.style.display = "none";
}

function timeout() {
  // Make integer from results and get the largest
  var goldInteger = parseInt(goldRes, 10);
  var whiteInteger = parseInt(whiteRes, 10);
  var brownInteger = parseInt(brownRes, 10);
  var numbers = [goldInteger, whiteInteger, brownInteger];
  max = Math.max.apply(null, numbers) * 1000;

  function timer() {
    setTimeout(function () {
      end();
      results();
    }, max);
  }
  timer();
}

function end() {
  // Reset the button after animation ends
  function resetBtn() {
    startBtn.disabled = false;
    startBtn.style.opacity = "1";
    startBtn.style.cursor = "pointer";
    getSign.style.opacity = "1";
  }
  resetBtn();

  // Remove animate class after animation ends
  function removeAnim() {
    goldHorse.classList.remove("animate");
    whiteHorse.classList.remove("animate");
    brownHorse.classList.remove("animate");
  }
  removeAnim();

  swingSign.style.animationName = "swing";
  swingSign.style.display = "block";
}

// Get the results
function results() {
  let winner = document.getElementById('winner');
  if (goldRes == whiteRes && goldRes < brownRes) {
    winner.innerHTML = "Gold and White are tie!";
  } else if (goldRes == brownRes && goldRes < whiteRes) {
    winner.innerHTML = "Gold and Brown are tie!";
  } else if (whiteRes == goldRes && whiteRes < brownRes) {
    winner.innerHTML = "White and Gold are tie!";
  } else if (whiteRes == brownRes && whiteRes < goldRes) {
    winner.innerHTML = "White and Brown are tie!";
  } else if (brownRes == goldRes && brownRes == whiteRes) {
    winner.innerHTML = "All horses are tie!";
  } else if (goldRes < whiteRes && goldRes < brownRes) {
    winner.innerHTML = "Gold horse Wins!";
  } else if (whiteRes < goldRes && whiteRes < brownRes) {
    winner.innerHTML = "White horse Wins!";
  } else if (brownRes < goldRes && brownRes < whiteRes) {
    winner.innerHTML = "Brown horse Wins!";
  }
}
const deckCards = ["Agility.png", "Agility.png", "Boat.png", "Boat.png", "Citizenship.png", "Citizenship.png", "Hack.png", "Hack.png", "Nerd-Rage.png", "Nerd-Rage.png", "Nuka-Cola.png", "Nuka-Cola.png", "Robotics.png", "Robotics.png", "Shock.png", "Shock.png"];

const deck = document.querySelector(".deck");
let opened = [];
let matched = [];
const modal = document.getElementById("modal");
const reset = document.querySelector(".reset-btn");
const playAgain = document.querySelector(".play-again-btn");
const movesCount = document.querySelector(".moves-counter");
let moves = 0;
const star = document.getElementById("star-rating").querySelectorAll(".star");
let starCount = 3;
const timeCounter = document.querySelector(".timer");
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function startGame() {
  
  const shuffledDeck = shuffle(deckCards);

  for (i = 0; i < deckCards.length; i++){

    let tdTag = document.createElement("td")

    tdTag.classList.add("card")

    let addImage = document.createElement("img")

    tdTag.appendChild(addImage)

    addImage.src = shuffledDeck

    addImage.setAttribute('src', 'img/' + shuffledDeck[i]);

    addImage.setAttribute('alt', 'image of vault boy from fallout');

    deck.appendChild(tdTag)

  }  
}

startGame();

function removeCard() {
  while (deck.hasChildNodes()) {
    deck.removeChild(deck.firstChild);
  }
}

function timer() {
  time = setInterval(function() {
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: " + minutes + " Mins " + seconds + " Secs" ;
  }, 1000);
}

function stopTime() {
  clearInterval(time);
}

function resetEverything() {
  stopTime();
  timeStart = false;
  seconds = 0;
  minutes = 0;
  timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: 00:00";
  star[1].firstElementChild.classList.add("fa-star");
  star[2].firstElementChild.classList.add("fa-star");
  starCount = 3;
  moves = 0;
  movesCount.innerHTML = 0;
  matched = [];
  opened = [];
  removeCard();
  startGame();
}

function incrMovesCounter() {
  movesCount.innerHTML ++;
  moves ++;
}

function adjustStarRating() {
  if (moves === 14) {
    star[2].firstElementChild.classList.remove("fa-star");
    starCount--;
  }
  if (moves === 18) {
    star[1].firstElementChild.classList.remove("fa-star");
    starCount--;
  }
}


function compareTwo() {
  if (opened.length === 2) {
    document.body.style.pointerEvents = "none";

    if (opened[0].src == opened[1].src) {  
      displayMatchingCards()
      console.log("It's a Match!")
    }
    else {
      displayNotMatchingCards()
      console.log("No Match!")
    }
  }
}


function displayMatchingCards() {

  setTimeout(function() {

    opened[0].parentElement.classList.add("match");
    opened[1].parentElement.classList.add("match");
    matched.push(opened[0], opened[1])
    document.body.style.pointerEvents = "auto";
    checkIsGameFinished()
    opened = [];
  }, 600);

  incrMovesCounter();
  adjustStarRating();
}

function displayNotMatchingCards() {

  setTimeout(function() {
    opened[0].parentElement.classList.remove("flip");
    opened[1].parentElement.classList.remove("flip");
    document.body.style.pointerEvents = "auto";
    opened = [];
  }, 700);
  incrMovesCounter();
  adjustStarRating();
}

function addStatsToModal() {

  const statsParent = document.querySelector(".modal-content");

  for (let i = 1; i <= 3; i++) {

    let statsElement = document.createElement("p")

    statsElement.classList.add("stats")

    statsParent.appendChild(statsElement)
    
  }
  let p = statsParent.querySelectorAll("p.stats");

  p[0].innerHTML = `Time to Complete: ${time}`;
  p[1].innerHTML = `Moves Taken: ${moves}`;
  p[2].innerHTML = `Your Star rating is: ${starCount} out of 3`;
}

function displayModal() {
  let modalClose = document.getElementById("close")
  let modal = document.getElementById("modal")
  modal.style.display = "block"

  modalClose.onclick = function() {
      modal.style.display = "none"
  };

  window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none"
      }
  };
}

function checkIsGameFinished() {

  if (matched.length === 16) {
    stopTime()
    addStatsToModal()
    displayModal()
  }
}

deck.addEventListener("click", function(evt) {
  if (evt.target.nodeName === "TD") {
    console.log(evt.target.nodeName + " Was clicked");

    if (timeStart === false) {
      timeStart = true;
      timer();
    }

    flipCard();
  }

  function flipCard() {
    evt.target.classList.add("flip");
    addToOpened();
  }

  function addToOpened() {
    if (opened.length === 0 || opened.length === 1) {
      opened.push(evt.target.firstElementChild);
    }
    compareTwo();
  }
});

reset.addEventListener('click', resetEverything);

playAgain.addEventListener('click',function() {
  modal.style.display = "none";
  resetEverything();
});

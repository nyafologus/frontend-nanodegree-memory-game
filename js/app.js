// declaring cards array that will hold all the cards
let card = document.querySelectorAll(".card");
let cards = [ ...card ];

// deck of all cards in game
const deck = document.querySelector(".deck");

// declaring move counter
let moves = 0;
let counter = document.querySelector(".moves");

// declaring star icons
const stars = document.querySelectorAll(".fa-star");

// declaring paired cards
let pairedCard = document.getElementsByClassName("paired");

// declaring star list
let starsList = document.querySelectorAll(".stars li");

// closing congratulation modal
let close = document.querySelector(".close");

// congratulation modal
let popup = document.getElementById("popup1");

// declaring timer
var timer = document.querySelector(".timer");

// array for cards that have been clicked on and turned over (revealed)
var revealedCards = [];

// Shuffle function from http://stackoverflow.com/a/2450976 provided by Udacity
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

//function that initializes game
function initGame() {
	// shuffling cards array using the provided "shuffle" method
	shuffle(cards);
	// looping through every card and adding their innerHTML
	for (var i = 0; i < cards.length; i++) {
		deck.innerHTML = "";
		[].forEach.call(cards, function(card) {
			deck.appendChild(card);
		});
		// remove previously added classes from cards
		cards[i].classList.remove("open", "paired", "disabled");
	}

	// reseting moves to zero
	moves = 0;
	counter.innerHTML = moves;
	// reseting star rating to zero
	for (var i = 0; i < stars.length; i++) {
		stars[i].style.visibility = "visible";
	}
	//reseting timer to zero
	second = 0;
	minute = 0;
	timer.innerHTML = "0 mins 0 secs";
	clearInterval(interval);
}

// initalizing the game upon window load
window.onload = initGame();

// showing all cards on the page
var showCard = function() {
	this.classList.toggle("open");
	// this.classList.toggle("show");
	this.classList.toggle("disabled");
};

//checking whether revealed cards are succesfully paired or not by comparing their type
function revealCard() {
	revealedCards.push(this);
	var num = revealedCards.length;
	if (num === 2) {
		moveCounter();
		if (revealedCards[0].type === revealedCards[1].type) {
			paired();
		} else {
			unpaired();
		}
	}
}

// funtion for paired cards
function paired() {
	revealedCards[0].classList.add("paired", "disabled");
	revealedCards[1].classList.add("paired", "disabled");
	revealedCards[0].classList.remove("open");
	revealedCards[1].classList.remove("open");
	revealedCards = [];
}

// function for not paired cards, adding unpaired class
function unpaired() {
	revealedCards[0].classList.add("unpaired");
	revealedCards[1].classList.add("unpaired");
	disable();
	// removing unnecessary classes and flipping back both cards to previous position in 1 sec
	setTimeout(function() {
		revealedCards[0].classList.remove("open", "unpaired");
		revealedCards[1].classList.remove("open", "unpaired");
		enable();
		revealedCards = [];
	}, 400);
}

// function for disabling cards so they cannot be clicked
function disable() {
	Array.prototype.filter.call(cards, function(card) {
		card.classList.add("disabled");
	});
}

// loop for enabling cards and disabling paired cards
function enable() {
	Array.prototype.filter.call(cards, function(card) {
		card.classList.remove("disabled");
		let paired = document.querySelectorAll(".paired");
		for (const pair of paired) {
			pair.classList.add("disabled");
		}
	});
}

// function that counts valid moves
function moveCounter() {
	moves++;
	counter.innerHTML = moves;
	//initializing timer on first click
	if (moves == 1) {
		second = 0;
		minute = 0;
		initTimer();
	}
	if (moves > 6 && moves < 16) {
		for (i = 0; i < 3; i++) {
			if (i > 1) {
				stars[i].style.visibility = "collapse";
			}
		}
	} else if (moves > 16) {
		for (i = 0; i < 3; i++) {
			if (i > 0) {
				stars[i].style.visibility = "collapse";
			}
		}
	}
}

// timer function
var second = 0,
	minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;
function initTimer() {
	interval = setInterval(function() {
		timer.innerHTML = minute + "mins " + second + "secs";
		second++;
		if (second === 60) {
			minute++;
			second = 0;
		}
		if (minute === 60) {
			hour++;
			minute = 0;
		}
	}, 1000);
}

// congratulations popup appears when all cards are paired together
function congratulations() {
	if (pairedCard.length == 16) {
		clearInterval(interval);
		finalTime = timer.innerHTML;

		// opening congratulations popup tab
		popup.classList.add("open");

		// declare star rating variable
		var starRating = document.querySelector(".stars").innerHTML;

		//displaying final moves, stars, and time spent on popup tab
		document.querySelector("#finalMove").innerHTML = moves;
		document.querySelector("#starRating").innerHTML = starRating;
		document.querySelector("#totalTime").innerHTML = finalTime;

		//closing congratulations popup tab
		closePopup();
	}
}

// adding eventListener to x icon in popup
function closePopup() {
	close.addEventListener("click", function(e) {
		popup.classList.remove("open");
		initGame();
	});
}

// restarting game
function restart() {
	popup.classList.remove("open");
	initGame();
}

// adding event listeners to each card in a loop
for (let card of cards) {
	card.addEventListener("click", showCard);
	card.addEventListener("click", revealCard);
	card.addEventListener("click", congratulations);
}

// /*!
//  * A lightweight, dependency-free and responsive javascript plugin for particle backgrounds.
//  *
//  * @author Marc Bruederlin <hello@marcbruederlin.com>
//  * @version 2.2.1
//  * @license MIT
//  * @see https://github.com/marcbruederlin/particles.js
//  */

// function for background floating particles, licence can be found above
window.onload = function() {
	Particles.init({
		selector: ".background"
	});
};

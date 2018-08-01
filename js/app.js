// cards array to hold all the cards; 
let card = document.getElementsByClassName("card"); 
let cards = [...card]; 

// deck of all cards in game 
const deck = document.getElementById("card-deck"); 

// declaring move variable 
let moves = 0; 
let counter = document.querySelector(".moves"); 

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

 // stars list
 let starsList = document.querySelectorAll(".stars li");

 // close icon in modal
 let closeicon = document.querySelector(".close");

 // declare modal
 let modal = document.getElementById("final-res"); 

 // declare container1
 let gamePart = document.querySelector(".container1"); 

 // array for opened cards
var openedCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
*/
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// shuffles cards when page is loaded 
document.body.onload = startGame(); 

// start a new round  
function startGame() {
    gamePart.classList.remove("hidden"); 

    cards = shuffle(cards);

    for (let i = 0; i < cards.length; ++i)
        cards[i].classList.remove("open", "show", "match", "disabled");  

    deck.innerHTML = ""; 
    [].forEach.call(cards, function(item) {
        deck.appendChild(item);
    });

    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    
    // reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#ccff33";
    }
}; 

// open, show and disable cards 
var displayCard = function() {
    this.classList.toggle("open"); 
    this.classList.toggle("show"); 
    this.classList.toggle("disabled"); 
}; 

// add opened cards to OpenedCards list 
//and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};

// when cards match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
}


// when cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open", "unmatched");
        enable();
        openedCards = [];
    },1000);
}

// disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

// enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

// count moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;

    // setting rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations(){
    if (matchedCard.length == 16){ 
        // hide the h1 title, score panel and deck board
        gamePart.classList.add("hidden"); 

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("final-move").innerHTML = moves;
        document.getElementById("star-rating").innerHTML = starRating;

        //closeicon on modal
        closeModal();
    };
}


// @description close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}


// @desciption for user to play Again 
function playAgain(){
    modal.classList.remove("show");
    startGame();
}

// add event listeners to each card
for (let i = 0; i < cards.length; ++i){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};

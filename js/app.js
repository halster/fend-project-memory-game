/*
 * Create a list that holds all of your cards
 */
let cardDesign=["fa fa-lightbulb-o", "fa fa-lightbulb-o","fa fa-space-shuttle","fa fa-space-shuttle","fa fa-rocket", "fa fa-rocket","fa fa-umbrella", "fa fa-umbrella", "fa fa-book", "fa fa-book", "fa fa-birthday-cake", "fa fa-birthday-cake", "fa fa-snowflake-o", "fa fa-snowflake-o", "fa fa-bug", "fa fa-bug",]

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
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 var allCards = document.querySelectorAll('.card');
 var openCards = [];  //Use this var to count how many cards are open
 var moves = 0;
 var matches = 0;

 allCards.forEach(function(card){
   card.addEventListener('click', function(e) {

     if (openCards.length<2){
     openCards.push(card);
     card.classList.add('open', 'show');
     }
     if (openCards.length>=2){
      turnCount();
       compareCards(openCards); //compares the open cards
       openCards=[];
     }
   })
 });

function compareCards(openCards){
  if (openCards[0].innerHTML===openCards[1].innerHTML){
    doMatch();
  }
  else {
    console.log("cards don't match");
    doNotMatch();
  };
};

//changes cards color and makes them stay open if the cards match.
function doMatch(){
    openCards.forEach(function(card){
      card.classList.add('match');
      card.classList.remove('show', 'open');
    });
    matches++;
    console.log(openCards.length+"cards open and " + matches + "matches made");
    if (matches === 8){
    youWin();
    }
};

//changes cards color and closes if they don't match.
function doNotMatch(){
  openCards.forEach(function(card){
    card.classList.add("noMatch");
    setTimeout(function(){
      card.classList.remove('show', 'open', 'noMatch');
    },1000);
  });
};

// updates the turn count at the top of the game
function turnCount(){
  moves++;
  document.querySelector('.moves').innerText=moves;
  checkStars();
};

//decrease stars as turns go on
function checkStars(){
  if (moves === 10){
    const star3 = document.querySelector("#star3");
    star3.classList.add("darken");
  }
  else if(moves===13){
    const star2 = document.querySelector("#star2");
    star2.classList.add("darken");
  }
  else if (moves===16){
    const star1 = document.querySelector("#star1");
    star1.classList.add("darken");
  }
};

//modal pop up congratulating winner!
function youWin(){
  var modal = document.getElementById('myModal');
  document.querySelector('#movesToWin').innerText=moves;
  modal.style.display = "block";
  console.log(matches+ " matches made with "+ moves +"moves.");
};

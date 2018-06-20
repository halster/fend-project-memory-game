//todo list make reset button on modal, add class to prevent clicking on same card twice. update readme. maybe figure out how to flip cards nicely?

//initialize variables
let cardDesign=["fa fa-lightbulb-o", "fa fa-lightbulb-o","fa fa-space-shuttle","fa fa-space-shuttle","fa fa-rocket", "fa fa-rocket","fa fa-umbrella", "fa fa-umbrella", "fa fa-book", "fa fa-book", "fa fa-birthday-cake", "fa fa-birthday-cake", "fa fa-meh-o", "fa fa-meh-o", "fa fa-bug", "fa fa-bug",]
let openCards = [];  //Use this var to count how many cards are open
let moves = 0;
let matches = 0;
let starCount =3;
let seconds=0;
let minutes=0;
let startTime=0;
let timerId;

//starts game once the DOM is loaded.
document.addEventListener("DOMContentLoaded", function(){
  start();
});

//this sets up the restart button to reset the game
document.querySelector(".restart").addEventListener("click", start);

// use this function to set up the page in the beginning and to reset the page.
function start(){
  var ul=document.querySelector(".deck");
  ul.innerHTML="";
  openCards = [];
  moves = 0;
  document.querySelector('.moves').innerText=moves;
  matches = 0;
  starCount =3;
  document.querySelector("#star3").classList.remove('darken');
  document.querySelector("#star2").classList.remove('darken');
  document.querySelector("#star1").classList.remove('darken');
  seconds=0;
  minutes=0;
  startTime=0;
  clearInterval(timerId);
  var modal = document.getElementById('myModal');
  modal.style.display="none";
  document.querySelector('.time').innerText="0:00";
  cardDesign=shuffle(cardDesign);
  makeCards(cardDesign);
  let allCards = document.querySelectorAll('.card');
  init(allCards);

};

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

//takes the list of shuffled cards and turns them into html elements that get added to the page.
function makeCards(cardDesign){
  const myDeck = document.querySelector('.deck');
  for (let j = 0; j < 16; j++) {
    const newElement = document.createElement('li');
    newElement.classList.add('card');
    newElement.innerHTML = '<i class= "' + cardDesign[j]+ '"> </i>';
    myDeck.appendChild(newElement);
  }
};

//this sets up the event listeners on the cards and starts checking them
function init(allCards){
 allCards.forEach(function(card){
   card.addEventListener('click', function(e) {
     if (startTime===0){
       timer();
     }
     if (openCards.length<2){
     openCards.push(card);
     card.classList.add('open', 'show', 'disabled');
     }
     if (openCards.length>=2){
      turnCount();
       compareCards(openCards); //compares the open cards
       openCards=[];
     }
   })
 });
};

//timer function to keep track of the time. It starts once the first card pair is clicked.
function timer(){
  startTime=1;
  timerId = setInterval(function(){
    seconds++;
    if(seconds===60){
      minutes++;
      seconds=0;
    }
    if (seconds<10){
      seconds="0"+seconds;
    }
    document.querySelector('.time').innerText=minutes +":"+ seconds;
  },1000);
};

//compares the open cards to see if they match.
function compareCards(openCards){
  if (openCards[0].innerHTML===openCards[1].innerHTML){
    doMatch();
  }
  else {
    doNotMatch();
  };
};

//changes cards color and makes them stay open if the cards match.
function doMatch(){
  openCards.forEach(function(card){
    card.classList.add('match');
    card.classList.remove('show', 'open', 'disabled');
  });
  matches++;
  if (matches === 8){
    clearInterval(timerId);
  youWin();
  }
};

//changes cards color and closes if they don't match.
function doNotMatch(){
  openCards.forEach(function(card){
    card.classList.add("noMatch");
    setTimeout(function(){
      card.classList.remove('show', 'open', 'noMatch', 'disabled');
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
    starCount=2;
  }
  else if(moves===13){
    const star2 = document.querySelector("#star2");
    star2.classList.add("darken");
    starCount=1;
  }
  else if (moves===16){
    const star1 = document.querySelector("#star1");
    star1.classList.add("darken");
    starCount=0;
  }
};

//modal pop up congratulating winner!
function youWin(){
  var modal = document.getElementById('myModal');
  document.querySelector('#movesToWin').innerText=moves;
  document.querySelector('#starsLeft').innerText=starCount;
  document.querySelector('#time').innerText=minutes +":"+seconds;
  modal.style.display = "block";
};

//Resets the game from the button in the popup window.
document.querySelector("#button").addEventListener("click", start);

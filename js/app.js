(function() {
    'use strict';
}());

let cards1 = ["fa-diamond", 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube',
              'fa-leaf', 'fa-bicycle', 'fa-bomb'];
let cards = cards1.concat(cards1);
let openCards = [];
let matchCards = 0;
let win = 0;
let mov = 0;
const move = document.querySelector('.moves');
const elems = document.querySelectorAll('.name');
const cardEv = document.querySelectorAll('.card');
const rest = document.querySelector('.restart');
const stars = document.querySelectorAll('.fa-star');
const but = document.querySelector('button');
let qstars = 3;

shuffle(cards);

for (var i = 0; i < elems.length; i++) {
	elems[i].classList.add(cards[i]);
};

var timer = new Timer();
timer.start();
timer.addEventListener('secondsUpdated', function (e) {
  $('#basicUsage').html(timer.getTimeValues().toString());
});

function restar() {
    for (var i = 0; i < elems.length; i++) {
      elems[i].classList.remove(cards[i]);
    };
    openCards.splice(0,openCards.length);
    win = 0;
    mov = 0;
    qstars = 3;
    timer.stop();
    timer.start();
    move.textContent = mov;
    stars[0].classList.remove('fa-star-o');
    stars[0].classList.add('fa-star');
    stars[1].classList.remove('fa-star-o');
    stars[1].classList.add('fa-star');
    stars[2].classList.remove('fa-star-o');
    stars[2].classList.add('fa-star');
    let cardOp = document.querySelectorAll('.card');
    for (var i = 0; i < cardOp.length; i++){
      cardOp[i].classList.remove('open', 'show', 'match');
    };
    shuffle(cards);
    for (var i = 0; i < elems.length; i++) {
      elems[i].classList.add(cards[i]);
    };
};

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

cardEv.forEach(function(card) {
  card.addEventListener('click', function(e) {
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
      let firC = card.firstElementChild.classList;
      if (openCards.length === 0) {
        card.classList.add('open', 'show');
        openCards.push(firC[2]);
        mov++;
        move.textContent = mov;
      }
      else if (openCards[0] === firC[2]) {
        card.classList.add('match');
        let openName = document.querySelector('.open');
        openName.classList.remove('open', 'show');
        openName.classList.add('match');
        openCards.splice(0,openCards.length);
        win++;
        mov++;
        move.textContent = mov;
        if (win === 8) {
          const wind = document.getElementById('modal_form');
          const wind2 = document.getElementById('overlay');
          wind.style.display = 'block';
          wind2.style.display = 'block';
          let mesText1 = document.getElementById('wintext1');
          let mesText2 = document.getElementById('wintext2');
          mesText1.innerHTML = "This game took " + timer.getTimeValues().toString() + " seconds.";
          mesText2.innerHTML = "With " + mov + " moves and " + qstars + " stars.";
          timer.stop();
          but.addEventListener('click', function() {
            restar();
            wind.style.display = 'none';
            wind2.style.display = 'none';
          });
        };
      }
      else {
        card.classList.add('wrong');
        openCards.splice(0,openCards.length);
        let openName = document.querySelector('.open');
        openName.classList.remove('open', 'show');
        openName.classList.add('wrong');
        setTimeout(function() {
          openName.classList.remove('wrong');
          card.classList.remove('wrong');
        }, 500);
        mov++;
        move.textContent = mov;
      };
    };
    if (mov === 25) {
      stars[2].classList.remove('fa-star');
      stars[2].classList.add('fa-star-o');
      qstars = 2;
    }
    else if (mov === 35) {
      stars[1].classList.remove('fa-star');
      stars[1].classList.add('fa-star-o');
      qstars = 1;
    }
    else if (mov === 45){
      stars[0].classList.remove('fa-star');
      stars[0].classList.add('fa-star-o');
      qstars = 0;
    }
  });
});

rest.addEventListener('click', restar);

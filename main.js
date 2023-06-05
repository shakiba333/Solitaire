// /*----- constants -----*/
const data = ['A♠️', '2♠️', '3♠️', '4♠️', '5♠️', '6♠️', '7♠️', '8♠️', '9♠️', '10♠️', 'J♠️', 'Q♠️', 'K♠️',
    'A♣️', '2♣️', '3♣️', '4♣️', '5♣️', '6♣️', '7♣️', '8♣️', '9♣️', '10♣️', 'J♣️', 'Q♣️', 'K♣️',
    'A♥️', '2♥️', '3♥️', '4♥️', '5♥️', '6♥️', '7♥️', '8♥️', '9♥️', '10♥️', 'J♥️', 'Q♥️', 'K♥️',
    'A♦️', '2♦️', '3♦️', '4♦️', '5♦️', '6♦️', '7♦️', '8♦️', '9♦️', '10♦️', 'J♦️', 'Q♦️', 'K♦️'];

// /*----- state variables -----*/


// /*----- cached elements  -----*/

const deckEl = document.getElementById('deck');


const pile7El = document.getElementById('pile-7');
const pile6El = document.getElementById('pile-6');
const pile5El = document.getElementById('pile-5');
const pile4El = document.getElementById('pile-4');
const pile3El = document.getElementById('pile-3');
const pile2El = document.getElementById('pile-2');
const pile1El = document.getElementById('pile-1');


// /*----- event listeners -----*/


// /*----- functions -----*/
function init() { }
function shuffleCards(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function allocatePiles() {
    shuffleCards(data);
    for (let i = data.length - 1; i > 0; i--) {
        if (i <= 7) {
            const div = document.createElement('div');
            div.textContent = data[i];
            pile7El.appendChild(div)
        } else if (i > 7 && i < 14) {
            const div = document.createElement('div');
            div.textContent = data[i];
            pile6El.appendChild(div);
        } else if (i >= 14 && i < 19) {
            const div = document.createElement('div');
            div.textContent = data[i];
            pile5El.appendChild(div);
        } else if (i >= 19 && i < 23) {
            const div = document.createElement('div');
            div.textContent = data[i];
            pile4El.appendChild(div);
        } else if (i >= 23 && i < 26) {
            const div = document.createElement('div');
            div.textContent = data[i];
            pile3El.appendChild(div);
        } else if (i >= 26 && i < 28) {
            const div = document.createElement('div');
            div.textContent = data[i];
            pile2El.appendChild(div);
        } else if (i >= 28 && i < 29) {
            const div = document.createElement('div');
            div.textContent = data[i];
            pile1El.appendChild(div);
        } else {
            const div = document.createElement('div');
            div.textContent = data[i];
            deckEl.appendChild(div);
        }
    }
}
allocatePiles();


// /*----- constants -----*/
const cards = ['A♠️', '2♠️', '3♠️', '4♠️', '5♠️', '6♠️', '7♠️', '8♠️', '9♠️', '10♠️', 'J♠️', 'Q♠️', 'K♠️',
    'A♣️', '2♣️', '3♣️', '4♣️', '5♣️', '6♣️', '7♣️', '8♣️', '9♣️', '10♣️', 'J♣️', 'Q♣️', 'K♣️',
    'A♥️', '2♥️', '3♥️', '4♥️', '5♥️', '6♥️', '7♥️', '8♥️', '9♥️', '10♥️', 'J♥️', 'Q♥️', 'K♥️',
    'A♦️', '2♦️', '3♦️', '4♦️', '5♦️', '6♦️', '7♦️', '8♦️', '9♦️', '10♦️', 'J♦️', 'Q♦️', 'K♦️'];


// /*----- state variables -----*/


// /*----- cached elements  -----*/
const cardEls = document.getElementsByClassName('card');

// /*----- event listeners -----*/


// /*----- functions -----*/

allocateCards()
function allocateCards() {
    shuffleCards(cards);

    for (let i = 0; i < cards.length; i++) {
        cardEls[i].textContent = cards[i];

    }
}

function shuffleCards(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}









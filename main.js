// /*----- constants -----*/
const cards = ['A♠️', '2♠️', '3♠️', '4♠️', '5♠️', '6♠️', '7♠️', '8♠️', '9♠️', '10♠️', 'J♠️', 'Q♠️', 'K♠️',
    'A♣️', '2♣️', '3♣️', '4♣️', '5♣️', '6♣️', '7♣️', '8♣️', '9♣️', '10♣️', 'J♣️', 'Q♣️', 'K♣️',
    'A♥️', '2♥️', '3♥️', '4♥️', '5♥️', '6♥️', '7♥️', '8♥️', '9♥️', '10♥️', 'J♥️', 'Q♥️', 'K♥️',
    'A♦️', '2♦️', '3♦️', '4♦️', '5♦️', '6♦️', '7♦️', '8♦️', '9♦️', '10♦️', 'J♦️', 'Q♦️', 'K♦️'];
const containerPileIds = ['pile-7', 'pile-6', 'pile-5', 'pile-4', 'pile-3', 'pile-2', 'pile-1', 'deck'];


// /*----- state variables -----*/

let pile1 = [], pile2 = [], pile3 = [], pile4 = [], pile5 = [], pile6 = [], pile7 = [], deck = [];

// /*----- cached elements  -----*/


// /*----- event listeners -----*/


// /*----- functions -----*/

function shuffleCards(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function createPiles() {
    shuffleCards(cards);
    pile1 = cards.slice(0, 7);
    pile2 = cards.slice(7, 13);
    pile3 = cards.slice(14, 19);
    pile4 = cards.slice(19, 23);
    pile5 = cards.slice(23, 26);
    pile6 = cards.slice(26, 28);
    pile7 = cards.slice(28, 29);
    deck = cards.slice(29, 52);

    const containerPileIds = ['pile-7', 'pile-6', 'pile-5', 'pile-4', 'pile-3', 'pile-2', 'pile-1', 'deck'];

    for (let i = 0; i < containerPileIds.length; i++) {
        const currentPile = [pile1, pile2, pile3, pile4, pile5, pile6, pile7, deck][i];
        const currentContainerPileId = containerPileIds[i];

        const currentPileContainer = document.getElementById(currentContainerPileId);

        for (let j = 0; j < currentPile.length; j++) {
            const newCard = document.createElement('div');
            newCard.textContent = currentPile[j];
            currentPileContainer.appendChild(newCard);
        }
    }
    return [pile1, pile2, pile3, pile4, pile5, pile6, pile7, deck];
}

createPiles();








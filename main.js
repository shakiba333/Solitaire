// /*----- constants -----*/
const cards = ['A♠️', '2♠️', '3♠️', '4♠️', '5♠️', '6♠️', '7♠️', '8♠️', '9♠️', '10♠️', 'J♠️', 'Q♠️', 'K♠️',
    'A♣️', '2♣️', '3♣️', '4♣️', '5♣️', '6♣️', '7♣️', '8♣️', '9♣️', '10♣️', 'J♣️', 'Q♣️', 'K♣️',
    'A♥️', '2♥️', '3♥️', '4♥️', '5♥️', '6♥️', '7♥️', '8♥️', '9♥️', '10♥️', 'J♥️', 'Q♥️', 'K♥️',
    'A♦️', '2♦️', '3♦️', '4♦️', '5♦️', '6♦️', '7♦️', '8♦️', '9♦️', '10♦️', 'J♦️', 'Q♦️', 'K♦️'];


// /*----- state variables -----*/


// /*----- cached elements  -----*/
const cardEls = document.getElementsByClassName('card');
const pile1 = document.getElementById('pile1');
const pile2 = document.getElementById('pile2');
const pile3 = document.getElementById('pile3');
const pile4 = document.getElementById('pile4');
const pile5 = document.getElementById('pile5');
const pile6 = document.getElementById('pile6');
const pile7 = document.getElementById('pile7');
const PileContainers = [pile1, pile2, pile3, pile4, pile5, pile6, pile7];

// /*----- event listeners -----*/

for (const cardEl of cardEls) {

    cardEl.addEventListener('dragstart', dragStart);
    cardEl.addEventListener('dragover', dragOver);
    cardEl.addEventListener('dragenter', dragEnter);
    cardEl.addEventListener('dragleave', dragLeave);
    cardEl.addEventListener('drop', dragDrop);
    cardEl.addEventListener('dragend', dragEnd);
}
// /*----- functions -----*/

allocateCards()
function allocateCards() {
    shuffleCards(cards);

    for (let i = 0; i < cards.length; i++) {
        cardEls[i].textContent = cards[i];
        cardEls[i].classList.add('hideCard');
        checkLastChildInPile(PileContainers);
    }
}

function shuffleCards(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
function checkLastChildInPile(containers) {
    containers.forEach(container => {
        const containerChildren = container.children;
        const lastChild = containerChildren[containerChildren.length - 1];
        if (lastChild) {
            lastChild.classList.remove('hideCard');
            lastChild.draggable = true;
        }
    });
}



function dragStart(event) {
    draggedCard = event.target;
    event.dataTransfer.effectAllowed = 'move';
    event.target.classList.add('dragging');
}
function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

function dragEnter(event) {
    event.target.classList.add('drag-over');
}

function dragLeave(event) {
    event.target.classList.remove('drag-over');
}
function dragDrop(event) {
    event.preventDefault();
    event.target.classList.remove('drag-over');
    event.target.appendChild(draggedCard);
}

function dragEnd(event) {
    event.target.classList.remove('dragging');
    draggedCard = null;
    checkLastChildInPile(PileContainers);
}



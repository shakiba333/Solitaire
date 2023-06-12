








// /*----- constants -----*/
const cards = ['A♠️', '2♠️', '3♠️', '4♠️', '5♠️', '6♠️', '7♠️', '8♠️', '9♠️', '10♠️', 'J♠️', 'Q♠️', 'K♠️',
    'A♣️', '2♣️', '3♣️', '4♣️', '5♣️', '6♣️', '7♣️', '8♣️', '9♣️', '10♣️', 'J♣️', 'Q♣️', 'K♣️',
    'A♥️', '2♥️', '3♥️', '4♥️', '5♥️', '6♥️', '7♥️', '8♥️', '9♥️', '10♥️', 'J♥️', 'Q♥️', 'K♥️',
    'A♦️', '2♦️', '3♦️', '4♦️', '5♦️', '6♦️', '7♦️', '8♦️', '9♦️', '10♦️', 'J♦️', 'Q♦️', 'K♦️'];



// /*----- state variables -----*/
let draggedCard = null;
let droppedCard = null;
let draggedCardText = null;
let droppedCardText = null;


// /*----- cached elements  -----*/
const cardEls = document.getElementsByClassName('card');
const piles = document.getElementsByClassName('piles');
const foundationdationContainers = document.getElementsByClassName('foundationSlots');
const pile1 = document.getElementById('pile1');
const pile2 = document.getElementById('pile2');
const pile3 = document.getElementById('pile3');
const pile4 = document.getElementById('pile4');
const pile5 = document.getElementById('pile5');
const pile6 = document.getElementById('pile6');
const pile7 = document.getElementById('pile7');
const found1 = document.getElementById('spade');
const found2 = document.getElementById('clubs');
const found3 = document.getElementById('hearts');
const found4 = document.getElementById('diamonds');

const PileContainers = [pile1, pile2, pile3, pile4, pile5, pile6, pile7];
const foundationContainer = [found1, found2, found3, found4];
const deckCards = document.getElementsByClassName('deck');
const wasteCards = document.getElementsByClassName('waste');
const restartBtn = document.getElementById('restartButton');
const msg = document.getElementById('msg');

/*----- event listeners -----*/
for (const foundationContainer of foundationdationContainers) {
    foundationContainer.addEventListener('dragover', dragOver);
    foundationContainer.addEventListener('drop', compareFoundationEl);
}
for (const pile of piles) {
    pile.addEventListener('dragover', dragOver);
    pile.addEventListener('drop', dragDrop);
}
for (const cardEl of cardEls) {
    cardEl.addEventListener('dragstart', dragStart);
    cardEl.addEventListener('dragover', dragOver);
    cardEl.addEventListener('dragenter', dragEnter);
    cardEl.addEventListener('dragleave', dragLeave);
    cardEl.addEventListener('drop', dragDrop);
    cardEl.addEventListener('dragend', dragEnd);
}
for (const deckCard of deckCards) {
    deckCard.addEventListener('click', makeLastChildDraggable);
}
for (const wasteCard of wasteCards) {
    wasteCard.addEventListener('dragover', dragOver);
    wasteCard.addEventListener('drop', function (event) {
        event.preventDefault();
        moveCardsToWaste(event);
    });
}
restartBtn.addEventListener('click', restartGameBtn);
// /*----- functions -----*/

allocateCards()

function restartGameBtn() {
    window.location.reload();
}

function makeLastChildDraggable(event) {
    const card = event.target;
    const parent = card.parentNode;
    const lastChild = parent.lastElementChild;

    if (card === lastChild) {
        card.classList.remove('hideCard');
        card.draggable = true;
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragover', dragOver);
        card.addEventListener('dragenter', dragEnter);
        card.addEventListener('dragleave', dragLeave);
        card.addEventListener('drop', dragDrop);
        card.addEventListener('dragend', dragEnd);
    }
}
function moveCardsToWaste(event) {
    event.target.appendChild(draggedCard);
    draggedCard.style.position = 'absolute';
    draggedCard.classList.add('hideCard');

}
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
            faceUpLastChild(lastChild)
        }
    });
}
function faceUpLastChild(card) {
    card.classList.remove('hideCard');
    card.draggable = true;

}

function checkSequentialOrder(droppedCardText, draggedCardText) {
    const droppedCardValue = droppedCardText.includes('A') ? '1' :
        droppedCardText.includes('J') ? '11' :
            droppedCardText.includes('Q') ? '12' :
                droppedCardText.includes('K') ? '13' :
                    droppedCardText;

    const draggedCardValue = draggedCardText.includes('A') ? '1' :
        draggedCardText.includes('J') ? '11' :
            draggedCardText.includes('Q') ? '12' :
                draggedCardText.includes('K') ? '13' :
                    draggedCardText;

    const droppedCardNumber = parseInt(droppedCardValue);
    const draggedCardNumber = parseInt(draggedCardValue);

    const isSequentialOrder = droppedCardNumber - draggedCardNumber === 1;

    return isSequentialOrder;
}

function checkSequentialOrderForFoundation(droppedCardText, draggedCardText) {
    const droppedCardValue = droppedCardText.includes('A') ? '1' :
        droppedCardText.includes('J') ? '11' :
            droppedCardText.includes('Q') ? '12' :
                droppedCardText.includes('K') ? '13' :
                    droppedCardText;

    const draggedCardValue = draggedCardText.includes('A') ? '1' :
        draggedCardText.includes('J') ? '11' :
            draggedCardText.includes('Q') ? '12' :
                draggedCardText.includes('K') ? '13' :
                    draggedCardText;

    const droppedCardNumber = parseInt(droppedCardValue);
    const draggedCardNumber = parseInt(draggedCardValue);

    const isSequentialOrder = draggedCardNumber - droppedCardNumber === 1;

    return isSequentialOrder;
}
function compareFoundationEl(event) {
    event.preventDefault();
    droppedCard = event.target;
    droppedCardText = droppedCard.innerText;
    if ((droppedCard.innerText === '' && draggedCardText.includes('A'))) {
        droppedCard.classList.remove('drag-over');
        droppedCard.draggable = true;
        droppedCard.appendChild(draggedCard);
        console.log("Element dropped into pile container:", event.target.id);
    } else if (checkFoundationRules(draggedCardText, droppedCardText)) {
        droppedCard.classList.remove('drag-over');
        droppedCard.appendChild(draggedCard);
        console.log("Element dropped into pile container:", event.target.id);
    } else {
        msg.innerText = 'Invalid move, try again!';
    }
}

function compareElements(event) {
    if ((droppedCard.innerText === '' && draggedCardText.includes('K'))) {
        droppedCard.classList.remove('drag-over');
        droppedCard.appendChild(draggedCard);
        console.log("Element dropped into pile container:", event.target.id);
    } else if (checkPileRules(draggedCardText, droppedCardText)) {
        droppedCard.classList.remove('drag-over');
        droppedCard.appendChild(draggedCard);
        console.log("Element dropped into pile container:", event.target.id);
    } else {
        msg.innerText = 'Invalid move, try again!';
    }
}


function checkPileRules(draggedCardText, droppedCardText) {
    return (
        (draggedCardText.includes('♥️') && droppedCardText.includes('♣️') && checkSequentialOrder(droppedCardText, draggedCardText)) ||
        (draggedCardText.includes('♣️') && droppedCardText.includes('♦️') && checkSequentialOrder(droppedCardText, draggedCardText)) ||
        (draggedCardText.includes('♥️') && droppedCardText.includes('♠️') && checkSequentialOrder(droppedCardText, draggedCardText)) ||
        (draggedCardText.includes('♣️') && droppedCardText.includes('♥️') && checkSequentialOrder(droppedCardText, draggedCardText)) ||
        (draggedCardText.includes('♠️') && droppedCardText.includes('♥️') && checkSequentialOrder(droppedCardText, draggedCardText)) ||
        (draggedCardText.includes('♠️') && droppedCardText.includes('♦️') && checkSequentialOrder(droppedCardText, draggedCardText)) ||
        (draggedCardText.includes('♦️') && droppedCardText.includes('♣️') && checkSequentialOrder(droppedCardText, draggedCardText)) ||
        (draggedCardText.includes('♦️') && droppedCardText.includes('♠️') && checkSequentialOrder(droppedCardText, draggedCardText))
    );
}

function checkFoundationRules(draggedCardText, droppedCardText) {
    return (
        (draggedCardText.includes('♥️') && droppedCardText.includes('♥️')) && checkSequentialOrderForFoundation(droppedCardText, draggedCardText) ||
        (draggedCardText.includes('♠️') && droppedCardText.includes('♠️')) && checkSequentialOrderForFoundation(droppedCardText, draggedCardText) ||
        (draggedCardText.includes('♣️') && droppedCardText.includes('♣️')) && checkSequentialOrderForFoundation(droppedCardText, draggedCardText) ||
        (draggedCardText.includes('♦️') && droppedCardText.includes('♦️')) && checkSequentialOrderForFoundation(droppedCardText, draggedCardText)

    );
}


function dragStart(event) {
    draggedCard = event.target;
    draggedCardText = draggedCard.innerText;
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
    droppedCard = event.target;
    droppedCardText = droppedCard.innerText;
    compareElements(event);
}

function dragEnd(event) {
    event.target.classList.remove('dragging');
    draggedCard = null;
    checkLastChildInPile(PileContainers);
}


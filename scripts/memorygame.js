/*
Kilder til kode: 
Kubow, A. (2020) Memory Game [online] available from <https://github.com/kubowania/memory-game> [29 September 2022]

Der er hentet inspirtion herfra
*/

const cardArray = [];
const memoryTiles = 50;
let chosenCards = [];
let cardsWon = 0;
let cardsId = [];

//generer kort
for (let i = 0; i < memoryTiles; i++) {
   cardArray.push(i);
   cardArray.push(i);
};
cardArray.sort(() => 0.5 - Math.random());

const grid = document.getElementById('grid');

function createBoard() {
    for (let i = 0; i < cardArray.length; i++){
        const card = document.createElement('div');
        card.setAttribute('id', i);
        card.innerHTML = `<p>${cardArray[i]}</p>`;
        let number = card.firstElementChild;
        number.setAttribute('id', 'hidden');
        card.addEventListener('click', flip);
        grid.appendChild(card);
    };
};
createBoard();

//infoBoards
let min = 0;
let sec = 0;

const myInterval = setInterval(()=> {
        sec++;
        if(sec === 60) {
            sec = 0;
            min++;
        };
        document.getElementById('timer').innerHTML = `Tid brugt: ${min}min ${sec<10 ? "0" + sec : sec}sek`;
    }, 1000);

function stopTimer () {
    clearInterval(myInterval);
    document.getElementById('winner').innerHTML = "Tillykke du har vundet!";
};

function cardsWonShow() {
    document.getElementById('set').innerHTML = `Antal sæt vundet: ${cardsWon}`;
    if(cardsWon === memoryTiles) {
        stopTimer();
    }
};
cardsWonShow();

//check kort
function checkMatch () {
    let message = document.getElementById('message');
    let optionOneId = cardsId[0];
    let optionTwoId = cardsId[1];

    if (chosenCards[0] === chosenCards[1]){
        message.innerHTML = 'Du fik et match, tillykke!';
        
        document.getElementById(optionOneId).setAttribute('id', 'won');
        document.getElementById(optionTwoId).setAttribute('id', 'won');

        chosenCards = [];
        cardsId = [];
        cardsWon += 1;

        cardsWonShow();
    } else {
        message.innerHTML = 'Prøv igen';

        setTimeout(() => {
            let number1 = document.getElementById(optionOneId).firstElementChild;
            let number2 = document.getElementById(optionTwoId).firstElementChild;
            number1.setAttribute('id', 'hidden');
            number2.setAttribute('id', 'hidden');
            
    
            chosenCards = [];
            cardsId = [];
        }, 750);
    };
};

function flip() {
    let cardId = this.getAttribute('id');
    chosenCards.push(cardArray[cardId]);
    cardsId.push(cardId);
    let number = document.getElementById(cardId).firstElementChild;
    number.setAttribute('id', 'show');

    if (chosenCards.length == 2) {
        checkMatch();
    };
};
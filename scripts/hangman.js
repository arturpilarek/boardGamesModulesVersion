/*
Kilder til kode: 
Dutton, C. (2020) JavaScript Hangman Game [online] available from <https://codepen.io/cathydutton/pen/JjpxMm> [28 September 2022]
srps8912 (2021) VANILLA JAVASCRIPT HANGMAN GAME [online] available from <https://codesandbox.io/s/z9fhk> [28 September 2022]

Der er hentet inspirtion herfra
*/

//create buttons
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z', 'æ', 'ø', 'å'];


function createButtons(){
    let buttons = document.getElementById('buttons'); 
    let letters = document.createElement('ul');

    for (let i = 0; i < alphabet.length; i++) {
        letters.id = 'alphabet';
        let list = document.createElement('li');
        list.id = 'letter';
        list.addEventListener('click', clickFunction);
        list.innerHTML = alphabet[i];

        buttons.appendChild(letters);
        letters.appendChild(list);
    };
};
createButtons();

//generate word and counter
const wordsArray = ['pasta', 'brandbil', 'danmark', 'webudvikling', 'antifrost', 'skuffe', 
'irritation', 'kampsport', 'tusindben', 'spredning']; 
const randomWord = wordsArray[(Math.floor(Math.random() * wordsArray.length))];
let wordDisplay = [];
var randomWordArray = randomWord.split("");

function generateWord(){
    for (var i = 0; i < randomWordArray.length; i++) {
        wordDisplay.push("_");
    };
    outputWord();
};
generateWord();

function outputWord (){
    document.getElementById('word').innerHTML = wordDisplay.join(' ');
};

let counter = 0;
let lives = 10;

function showCounter() {
    document.getElementById('counter').innerHTML = `Du har brugt ${counter} tur(e)`;
};
showCounter();

function showLives() {
    document.getElementById('lives').innerHTML = `Du har ${lives} liv tilbage`;
    hangman();
};
showLives();


function check () {
    if (JSON.stringify(wordDisplay) === JSON.stringify(randomWordArray)) {
        document.getElementById('win').innerHTML = 'tillykke du har vundet!';
        saveScore();
    }
    else if (lives == 0) {
        document.getElementById('win').innerHTML = 'Game over!';
    };
};

// OnClick Function
function clickFunction () {
    let guessCount = 0;
    let guess = this.innerHTML;
    this.setAttribute('class', 'usedLetter');
    for (var i = 0; i < wordDisplay.length; i++) {
        if (randomWordArray[i] === guess) {
            wordDisplay[i] = guess;
            guessCount += 1;
            outputWord();
        };
    };

    if (guessCount === 0) {
        lives -= 1;
        counter += 1;
        guessCount = 0;
    } else {
        counter += 1;
    };

    showLives();
    showCounter();
    check();
};


//hangman
function hangman() {
    let hangman = document.getElementById('hangmanImg');
    hangman.setAttribute("src", `./assets/hangman/${lives}.png`);
};

//show topscore
function showTopscore () {
    if (localStorage.getItem('fejl') && localStorage.getItem('forsøg') && localStorage.getItem('name')) {
        document.getElementById('topscore').innerHTML = `<h4>Topscore</h4>
            <div>
                <p>Navn: ${localStorage.getItem('name')}</p>
                <p>Forsøg: ${localStorage.getItem('forsøg')}</p>
                <p>Fejl: ${localStorage.getItem('fejl')}</p>
            </div>`;
    } else {
        document.getElementById('topscore').innerHTML = '<h4>Topscore</h4> <p>Ingen topscore fundet</p>';
    };
};
showTopscore();

//save score
function saveScore () {
    let mistakes = 10-lives;
    if (localStorage.getItem('fejl') >= mistakes && localStorage.getItem('forsøg') > counter || 
    !localStorage.getItem('fejl') && !localStorage.getItem('forsøg') && !localStorage.getItem('name')) {
        let name = prompt('Tillykke, du har vundet og har lavet en ny topscore. Indtast din navn, så vi kan gemme den');

        localStorage.setItem('name', name);
        localStorage.setItem('fejl', mistakes);
        localStorage.setItem('forsøg', counter);
    };
    showTopscore();
};
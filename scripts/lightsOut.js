const gameScore = document.getElementById("gameScore");
const gameGrid = document.getElementById("gameGrid");
const gameStartBtn = document.getElementById("game__start-btn");
const cheatButton = document.getElementById("cheatBtn");
const leaderboardList = document.getElementById("leaderboardList");

gridSize = 25;
startingLights = 10;
let attempts = 0;

let tilesParameters = [];
let tilesHTMLElements = null;


//Helper function to determine position of the tiles
let x = 0;
let y = 1;
const handlePosition = (index) => {
    if (index % 5 || index === 0) {
        x++;
    } else {
        x = 1;
        y += 1;
    }
}


const renderNewGame = () => {
    //Generate game tiles and assign default parameters
    for (let i = 0; i < (gridSize); i++) {
        const newTile = document.createElement('div');
        newTile.classList.add("game-grid__tile");
        newTile.setAttribute('data-index', String(i));
        gameGrid.appendChild(newTile);
        handlePosition(i);
        tilesParameters.push({
            position: {
                x: x ,
                y: y
            },
            tileIndex: i,
            lightOn: false,
        })
    }
    //Add listeners to tiles
    handleTileClickLogic();
    //Assign random tiles to be lightOn on setup
    chooseRandomTilesOnSetup();
    //Render tile classes based on the lightOn state
    renderLight();
    renderLeaderboardData();
}

gameStartBtn.addEventListener("click", () => {
    window.location.reload();
})



const handleTileClickLogic = () => {
    tilesHTMLElements = Array.from(document.getElementsByClassName("game-grid__tile"));
    tilesHTMLElements.forEach((tile, tileIndex) => tile.addEventListener("click", () => {
            const tileObject = tilesParameters.find(tile => tile.tileIndex === tileIndex);
            tile.classList.remove("lightOff");
            tile.classList.add("lightOn");
            tileObject.lightOn = !tileObject.lightOn;
            checkAdjacentTiles(tileObject.tileIndex);
            renderLight();
            addAttempt();
        })
    )
}

//
const checkAdjacentTiles = (tileIndex) => {
    const topTile = tilesParameters.find(topTile => topTile.position.x === tilesParameters[tileIndex].position.x && (topTile.position.y - tilesParameters[tileIndex].position.y === -1));
    const rightTile = tilesParameters.find(rightTile => rightTile.position.y === tilesParameters[tileIndex].position.y && tilesParameters[tileIndex].position.x - rightTile.position.x === -1 );
    const bottomTile = tilesParameters.find(bottomTile => bottomTile.position.x === tilesParameters[tileIndex].position.x && (bottomTile.position.y - tilesParameters[tileIndex].position.y === 1));
    const leftTile = tilesParameters.find(leftTile => leftTile.position.y === tilesParameters[tileIndex].position.y && tilesParameters[tileIndex].position.x - leftTile.position.x === 1 );
    // Combine all adjacent Tiles into an array and filter out falsy values
    const adjacentTiles = [topTile, rightTile, bottomTile, leftTile].filter(elementNotFalsy => elementNotFalsy);
    // Change the state of adjacent tiles to the opposite one
    adjacentTiles.forEach(tile => {
        tile.lightOn = !tile.lightOn;
    })
}

//Function to render lightOn and lightOff based on their state
const renderLight = () => {
    const tilesWithLight = tilesParameters.filter(element => element.lightOn);
        tilesWithLight.forEach(tile => tilesHTMLElements[tile.tileIndex].classList.add("lightOn"));
        tilesWithLight.forEach(tile => tilesHTMLElements[tile.tileIndex].classList.remove("lightOff"));
    const tilesWithoutLight = tilesParameters.filter(element => !element.lightOn);
    tilesWithoutLight.forEach(tile => tilesHTMLElements[tile.tileIndex].classList.add("lightOff"));
    tilesWithoutLight.forEach(tile => {tilesHTMLElements[tile.tileIndex].classList.remove("lightOn")});
}

//Function assigns lightOn value to true to x Lights on setup
const chooseRandomTilesOnSetup = () => {
    const randomIndexes = [];
    for (let i = 0; i < startingLights; i++) {
        const generateRandomNumber = () => {
            const randomNumber = Math.floor(Math.random() * gridSize);
            randomIndexes.some(number => number === randomNumber) || randomNumber === 0 ? generateRandomNumber() : randomIndexes.push(randomNumber);
        }
        generateRandomNumber();
    }
    const randomGridElements = tilesParameters.filter(gridElement => randomIndexes.find(randomIndex => randomIndex === gridElement.tileIndex));
    randomGridElements.forEach(el => el.lightOn = !el.lightOn);
}

const addAttempt = () => {
    attempts++;
    gameScore.innerHTML = `Attempts: ${attempts}`;
}

let getLeaderboardData = JSON.parse(localStorage.getItem("leaderboard"));

const checkWinCondition = () => {
    if (tilesParameters.every(tile => !tile.lightOn)) {
        const username = prompt("Congratulations! Winner's username:");
        if (!getLeaderboardData) localStorage.setItem("leaderboard", JSON.stringify([{username, attempts}]));
        localStorage.setItem("leaderboard", JSON.stringify([...getLeaderboardData, {username, attempts}]));
        getLeaderboardData = JSON.parse(localStorage.getItem("leaderboard"));
        renderLeaderboardData();
    }
}

const renderLeaderboardData = () => {
    leaderboardList.innerHTML = "";
    if (!getLeaderboardData) {
        leaderboardList.innerHTML = "No data";
    } else {
        const top5 = getLeaderboardData.sort((a,b) => parseFloat(a.attempts) - parseFloat(b.attempts)).slice(0, 5);
        top5.forEach((item, index) => {
            const newListItem = document.createElement("li");
            newListItem.innerHTML = `${index + 1}. ${item.username} ${item.attempts} ${item.attempts === 1 ? "attempt" : "attempts"}`;
            leaderboardList.appendChild(newListItem);
        })
    }
}


cheatButton.addEventListener("click", () => {
    tilesParameters.forEach((tile, tileIndex) => tilesParameters[tileIndex].lightOn = false);
    renderLight();
    checkWinCondition();
})

renderNewGame();



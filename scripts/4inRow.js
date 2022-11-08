
const resetbtn = document.querySelector("rest");
const grid= document.getElementById("grid")
const result = document.querySelector("result");
const displayCurrentPlayer = document.querySelector("current-player");
const playerTurn = document.querySelector("#player-turn");
const cell= document.getElementsByTagName("cell");
const reset=document.querySelector("reset");




for( let i = 0; i < 7;i++){
    const newcolumn=document.createElement('div');
    newcolumn.classList.add("column-styling");
    newcolumn.setAttribute("columnId", i);
    newcolumn.setAttribute("onClick","columnName(this)");
    grid.appendChild(newcolumn);
   
    for( let j = 0; j <6;j++){
        const newrow=document.createElement('div');
        newrow.classList.add("row-styling");
        newrow.setAttribute("RowId", j);
        newrow.setAttribute("full", false);
       newrow.setAttribute("brink","white");
        newcolumn.appendChild(newrow);
        


    }
}   
    

for(let i = 0;i <cell.length;i++){
    cell[i].addEventListener("click", returnCell);
    
}

function returnCell(){
    console.log("click");
}

 
while(!player1){
    var player1 = prompt("Player one: Enter your name.You will be red");
};

var player1color= "red";

while(!player2){
    var player2 = prompt("Player Two: Enter your name. You will be blue");
};

var player2color= "Blue";

var currentPlayer = 1;
playerTurn.textContent = `${player1}'s turn!`;
playerTurn.innerHTML

const winningArrays = [
    [0,1,2,3],
    [4,5,6,7,]
    [8,9,10,11],
    [12,13,14,15],
    [16,17,18,19],
    [20,21,22,23],
    [24,25,26,27],
    [28,29,30,31],
    [32,33,34,35],
    [36,37,38,39],
    [0,8,16,24],
    [1,9,17,25],
    [2,10,18,26],
    [3,11,19,27],
    [4,12,20,28],
    [5,13,21,29],
    [6,14,22,30],
    [7,15,23,31],
    [8,16,24,32],
    [16,24,32,40],
    [9,17,25,33],
    [17,25,33,41],
    [10,18,26,34],
    [18,26,34,42],
    [11,19,27,35],
    [12,20,28,36],
    [13,21,29,37],
    [14,22,30,38],
    [15,23,31,39],
    [0,9,18,27],
    [1,10,19,28],
    [2,11,20,29],
    [3,12,21,30],
    [7,14,21,28],
    [14,21,28,35],
    [21,28,35,42],
    [6,13,20,27],
    [13,20,27,34],
    [20,27,34,41],
    [5,12,19,26],
    [12,19,26,33],
    [19,26,33,40],
    [4,11,18,25],
    [11,18,25,32],
    [3,10,17,24],
    [35,26,17,8],
    [36,27,18,9],
    [37,28,19,10],
    [28,19,10,1],
    [38,29,20,11],
    [29,20,11,2],
    [39,30,21,12],
    [30,21,12,3],
]

const statusDisplay=document.querySelector('.game--status');
let gameActive=true;//initial state of game
let currentPlayer="x";//initial play
//initialize all the 9 cells as empty cells
let gamestate=["","","","","","","","",""];
//give a winning message x,o
const winningMessage=()=> `player ${currentPlayer} has won!`;
const drawMessage=()=> `Game ended in daw`;
const currentPlayerTurn=()=> `Its ${currentPlayer} turn`;
statusDisplay.innerHTML=currentPlayerTurn();
//declare 5 funtions
function handleCellPlayed(){
}
function handlePlayerChange(){
}
function handleResultValidation(){
}
function handleCellClick(){
}
function handleRestartGame(){
}
document.querySelectorAll(".cell").forEach(cell=>cell.addEventListener('click',handleCellClick));
document.querySelector(".game--restart").addEventListener("click",handleRestartGame);
//part2 of the code handlecellclick--> handlecell played
function handleCellClick(clickedcellEvent){
    const clickedcell=clickedcellEvent.target;//moving the cursor
    const clickedcellIndex=parseInt(clickedcell.getAttribute('data-cell-index'));//it stores 2 as value
    if(gamestate[clickedcellIndex]!==""||!gameActive){
        return;//this does not allow a cell clicked twice, playing after game over
    }
    handleCellPlayed(clickedcell,clickedcellIndex);
    handleResultValidation();
}
//part-3 of the program 
function handleCellPlayed(clickedcell,clickedcellIndex){
    gamestate[clickedcellIndex]=currentPlayer;
    clickedcell.innerHTML=currentPlayer;
}
//part-4 Result validation -probabilities
const winningConditions=[
    [0,1,2],//0
    [3,4,5],//1
    [6,7,8],//2
    [0,4,8],//3
    [2,4,6],//4
    [0,3,6],//5
    [1,4,7],//6
    [2,5,8]];//7
function handleResultValidation(){
    let roundWon=false;
    for(let i=0;i<=7;i++){
        const winCondition=winningConditions[i];
        let a=gamestate[winCondition[0]];
        let b=gamestate[winCondition[1]];
        let c=gamestate[winCondition[2]];
        if(a===""||b===""||c===""){
            continue;
        }
        if(a===b && b===c){
            roundWon=true;
            break;
        }
    }
    if(roundWon){
        statusDisplay.innerHTML=winningMessage();
        gameActive=false;
        return;
    }
    let roundDraw=!gamestate.includes("");//true if all 9 cells are occupied
    if(roundDraw){
        statusDisplay.innerHTML=drawMessage();
        gameActive=false;
        return;
    }
    handlePlayerChange();
}
//part-5 -x-o-x-o
function handlePlayerChange(){
    currentPlayer=currentPlayer==="x"?"o":"x";
    statusDisplay.innerHTML=currentPlayerTurn();
}
//part-6 restart game
function handleRestartGame(){
    gameActive=true;
    currentPlayer="x";
    gamestate=["","","","","","","","",""];
    statusDisplay.innerHTML=currentPlayerTurn();
    document.querySelectorAll(".cell").forEach(cell=>cell.innerHTML="");
}
const boxes = document.querySelectorAll(".box");
const restart = document.getElementById("restart");
const O = "O";
const X = "X";

let currentPlayer = O;
const board = new Array(9).fill(null);
const boxClicked = (e) => {

    const id = e.target.id;
    if (!board[id]) {
        board[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        if (checkLine()) endGame();
        
        if (!board.some((e) => e === null)) endGame("draw");
        currentPlayer = currentPlayer === O ? X : O;
    }
    startStop();

};

const endGame = (result)  => {
   intro.innerText = result == "draw" ? "Draw!" : currentPlayer + " has won!";
   boxes.forEach((box) => box.removeEventListener("click", boxClicked)); 
};

const restartGame = () => {
    currentPlayer = O;
    board.fill(null);
    boxes.forEach((box) => {
        box.innerText = "";

    });

   intro.innerText = "Let's play!" ;  
   boxes.forEach((box) => box.addEventListener("click", boxClicked));

   reset();

   
};

const checkLine = () => {
    if (currentPlayer == board[0] && board[0] == board[1] && board[0] == board[2])
        return true;

    if (currentPlayer == board[3] && board[3] == board[4] && board[3] == board[5])
        return true;

    if (currentPlayer == board[6] && board[6] == board[7] && board[6] == board[8])
        return true;

    if (currentPlayer == board[0] && board[0] == board[3] && board[0] == board[6])
        return true;

    if (currentPlayer == board[1] && board[4] == board[1] && board[1] == board[7])
        return true;

    if (currentPlayer == board[2] && board[2] == board[5] && board[8] == board[2])
        return true;

    if (currentPlayer == board[0] && board[0] == board[4] && board[0] == board[8])
        return true;

    if (currentPlayer == board[2] && board[2] == board[4] && board[2] == board[6])
        return true;

    return false;


};
boxes.forEach((box) => box.addEventListener("click", boxClicked));
restart.addEventListener("click", restartGame);


let seconds = 0;
let minutes = 0;
let hours = 0;

let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

let interval = null;

let status = "stopped";

function stopWatch(){

    seconds++;

    
    if(seconds / 60 === 1){
        seconds = 0;
        minutes++;

        if(minutes / 60 === 1){
            minutes = 0;
            hours++;
        }

    }

    if(seconds < 10){
        displaySeconds = "0" + seconds.toString();
    }
    else{
        displaySeconds = seconds;
    }

    if(minutes < 10){
        displayMinutes = "0" + minutes.toString();
    }
    else{
        displayMinutes = minutes;
    }

    if(hours < 10){
        displayHours = "0" + hours.toString();
    }
    else{
        displayHours = hours;
    }

    
    document.getElementById("display").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;

}



function startStop(){

    if(status === "stopped"){

        
        interval = window.setInterval(stopWatch, 1000);
        document.getElementById("startStop").innerHTML = "Stop";
        status = "started";

    }
    else{

        window.clearInterval(interval);
        document.getElementById("startStop").innerHTML = "Start";
        status = "stopped";

    }

}


function reset(){

    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("display").innerHTML = "00:00:00";
    document.getElementById("startStop").innerHTML = "Start";

}

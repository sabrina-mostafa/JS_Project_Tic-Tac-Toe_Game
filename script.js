let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newGame-btn");
let msgContainer = document.querySelector(".msg-container");
let winnerMsg = document.querySelector("#msg");

let winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let turn_O = true; 





let gotWinner = (position_1)=> {
    boxes.forEach((box)=> {
        box.disabled = true ;
    }) ;

    let winner;
    if(position_1==="O") {
        winner = "Player1" ;
    }
    else {
        winner = "Player2";
    }
    winnerMsg.textContent = `Congratulation! winner is ${winner}`;
    msgContainer.classList.remove("hide");
}

let checkWinner = (counter)=> {
    // console.log(counter);
    let winner = false;
    winPatterns.forEach((pattern)=> {
        let position_1 = boxes[pattern[0]].textContent;
        let position_2 = boxes[pattern[1]].textContent;
        let position_3 = boxes[pattern[2]].textContent;

        if(position_1!=""  && position_2!="" && position_3!="") {
            if(position_1===position_2 && position_2===position_3) {
                // console.log("winner:", position_1);
                gotWinner(position_1);
                winner=true;
            }
        }
    }) 
    if(counter===9 && !winner) {
        winnerMsg.textContent = "Opps! This Match is a DRAW";
        msgContainer.classList.remove("hide");
    }
}

// staring of the Game
let counter=0 ;
boxes.forEach((box)=> {
    box.addEventListener("click", ()=> {
        counter++ ;
        // console.log("Box was clicked") ;
        if(turn_O) {
            box.textContent = "O" ;
            box.style.backgroundColor = "#FFA384";
            turn_O = false;
        }
        else {
            box.textContent = "X" ;
            box.style.backgroundColor = "#FFAEBC";
            turn_O = true;
        }
        box.disabled= true;
        checkWinner(counter) ;
    });
});


// buttons 
function resetGame() {
    turn_O=true ;
    counter=0;
    boxes.forEach((box)=> {
        box.textContent = "";
        box.disabled = false;
        box.style.backgroundColor = "#ffffc7";
    })
    msgContainer.classList.add("hide");
}


resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener('click', resetGame);
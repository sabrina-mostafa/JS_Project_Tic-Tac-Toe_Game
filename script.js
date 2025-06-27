let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newGame-btn");
let msgContainer = document.querySelector(".msg-container");
let winnerMsg = document.querySelector("#msg");

// Sound effects
const clickSound = new Audio("sounds/click.wav");
const winSound = new Audio("sounds/win.wav");
const drawSound = new Audio("sounds/draw.wav");

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

// Show winner and animate winning boxes
let gotWinner = (winnerChar, winningIndices) => {
    boxes.forEach((box) => box.disabled = true);

    let winner = winnerChar === "O" ? "Player 1" : "Player 2";
    winnerMsg.textContent = `🎉 Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");

    winSound.play();

    // Add animation class to winning boxes
    winningIndices.forEach((index) => {
        boxes[index].classList.add("win");
    });
};

let checkWinner = (counter) => {
    let winnerFound = false;

    winPatterns.forEach((pattern) => {
        let [a, b, c] = pattern;
        let pos1 = boxes[a].textContent;
        let pos2 = boxes[b].textContent;
        let pos3 = boxes[c].textContent;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            gotWinner(pos1, pattern);
            winnerFound = true;
        }
    });

    if (counter === 9 && !winnerFound) {
        winnerMsg.textContent = "😶 Oops! This Match is a DRAW";
        msgContainer.classList.remove("hide");
        drawSound.play();
    }
};

// Game logic
let counter = 0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        counter++;

        clickSound.play();

        if (turn_O) {
            box.textContent = "O";
            box.style.backgroundColor = "#FFA384";
            turn_O = false;
        } else {
            box.textContent = "X";
            box.style.backgroundColor = "#FFAEBC";
            turn_O = true;
        }

        box.disabled = true;
        box.style.transform = "scale(0.9)";
        setTimeout(() => (box.style.transform = "scale(1)"), 150);

        checkWinner(counter);
    });
});

// Reset Game
function resetGame() {
    turn_O = true;
    counter = 0;
    boxes.forEach((box) => {
        box.textContent = "";
        box.disabled = false;
        box.style.backgroundColor = "#ffffc7";
        box.classList.remove("win");
    });
    msgContainer.classList.add("hide");
}

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

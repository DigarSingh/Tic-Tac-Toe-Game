let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new");
let msg = document.querySelector("#win");
let msgContainer = document.querySelector(".msg-container");
let player1Input = document.querySelector("#player1");
let player2Input = document.querySelector("#player2");
let currentTurnDisplay = document.querySelector("#current-turn");

let turnO = true;
let count = 0;

// Default player names
let player1Name = "Player 1";
let player2Name = "Player 2";

const winning = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const checkAndHideInputs = () => {
  const playerSetup = document.querySelector(".player-setup");
  if (player1Input.value.trim() && player2Input.value.trim()) {
    playerSetup.style.display = "none";
  }
};

const showInputs = () => {
  const playerSetup = document.querySelector(".player-setup");
  playerSetup.style.display = "flex";
};

player1Input.addEventListener("input", () => {
  player1Name = player1Input.value.trim() || "Player 1";
  updateTurnDisplay();
});

player2Input.addEventListener("input", () => {
  player2Name = player2Input.value.trim() || "Player 2";
  updateTurnDisplay();
});
player1Input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    player1Input.blur();
    if (player2Input.value.trim()) {
      checkAndHideInputs();
    } else {
      player2Input.focus();
    }
  }
});

player2Input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    player2Input.blur();
    checkAndHideInputs();
  }
});

const updateTurnDisplay = () => {
  if (turnO) {
    currentTurnDisplay.innerText = `${player1Name}'s Turn (O)`;
  } else {
    currentTurnDisplay.innerText = `${player2Name}'s Turn (X)`;
  }
};

const resetGame = () => {
     turnO = true;
     count = 0;
     enableBoxes();
     msgContainer.classList.add("hide");
     updateTurnDisplay();
     showInputs();
};

const enableBoxes = () => {
     for (let box of boxes){
          box.disabled = false;
          box.innerText = "";
          box.classList.remove("x", "o");
     }
};

const disabledBoxes = () => {
     for (let box of boxes){
          box.disabled = true;
     }
};

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disabledBoxes();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.classList.remove("x");
      box.classList.add("o");
      turnO = false;
    } else {
      box.innerText = "X";
      box.classList.remove("o");
      box.classList.add("x");
      turnO = true;
    }
    box.disabled = true;
    count++;
    
    let isWinner = checkWinner();
    if(count === 9 && !isWinner){
     gameDraw();
    } else if (!isWinner) {
      updateTurnDisplay();
    }
  });
});

const showWinnner = (winner) => {
  let winnerName = winner === "O" ? player1Name : player2Name;
  msg.innerText = `Congratulations, ${winnerName} wins!`;
  msgContainer.classList.remove("hide");
  disabledBoxes();
};

const checkWinner = () => {
  for (let pattern of winning) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) { 
        showWinnner(pos1Val);
        fireConfetti();
        return true;
      }
    }
  }
};

function fireConfetti() {
  confetti({
    particleCount: 300,
    spread: 200,
    origin: { y: 0.6 }
  });
}
updateTurnDisplay();

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
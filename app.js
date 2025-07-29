let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new");
let msg = document.querySelector("#win");
let msgContainer = document.querySelector(".msg-container");
let currplayer = "X";

let turnO = true;
let count = 0;

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

const resetGame = () => {
     turnO = true;
     enableBoxes();
     msgContainer.classList.add("hide");
};

const enableBoxes = () => {
     for (let box of boxes){
          box.disabled = false;
          box.innerText = "";
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
      box.classList.remove("o")
      box.classList.add("x");
      turnO = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if(count === 9 && !isWinner){
     gameDraw();
    }
  });
});

const showWinnner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
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

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
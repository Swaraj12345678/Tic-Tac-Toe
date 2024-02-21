// accessing necessary necessary HTML elements ->>
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let winCount = document.querySelector(".winCount");

let turnO = true; // playerX, playerO
let playerO = 0, playerX = 0, boxCount = 0;
// 2D arrays ka use to store winning patterns ->>
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked");
    boxCount++;
    if(boxCount<9){
        if (turnO) {
        box.innerText = "O";
        turnO = false;
        } else {
        box.innerText = "X";
        turnO = true;
        }
        box.disabled = true; // needed for fair play.

        checkWinner();
    }
    else {
        alert("Draw Game!");
        newGame();
    }
  });
});
const enableBoxes = () => {  // while new game/ reset game
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner = () => {
  for (let pattern of winPatterns) {
    // console.log(pattern[0], pattern[1], pattern[2]);
    // console.log(
    //   boxes[pattern[0]].innerText,
    //   boxes[pattern[1]].innerText,
    //   boxes[pattern[2]].innerText
    // );
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText; 
    if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
        if(pos1Val === pos2Val && pos2Val === pos3Val && pos3Val === pos1Val){
            if(pos1Val == "X") playerX++;
            if(pos1Val == "O") playerO++;
            console.log("Winner",pos1Val);
            showWinner(pos1Val);
            winCount.classList.add("winCountProp");
            winCount.innerHTML = `Player O - ${playerO} wins & Player X - ${playerX} wins`;
        }
    }
  }
};

const resetGame = () => {
        turnO = true;
        enableBoxes();
        msgContainer.classList.add("hide");
        playerO = 0;
        playerX = 0;
        winCount.innerHTML = "";
        winCount.classList.remove("winCountProp");
        boxCount = 0;
}
const newGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    winCount.innerHTML = "";
    winCount.classList.remove("winCountProp");
    boxCount = 0;
}

newGameBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", resetGame);
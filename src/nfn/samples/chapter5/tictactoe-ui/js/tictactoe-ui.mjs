let currentPlayer = "cross";

function boardState() {
  const cells = Array.from(document.querySelectorAll(".cell"));
  return cells.map(cell => cell.getAttribute("data-value"));
}

function isDraw(state) {
  return state.every(cell => cell !== "blank");
}

function playerHasWon(state, player) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (state[a] === player && state[b] === player && state[c] === player) {
      return true;
    }
  }
  return false;
}

function gameOver(state) {
  return playerHasWon(state, "cross") || playerHasWon(state, "nought") || isDraw(state);
}

function showSVG(elementId, value) {
  if (value == "cross") {
    file = "img/cross.svg";
  } else if (value == "nought") {
    file = "img/nought.svg";
  } else {
    file = "img/blank.svg"
  }
  fetch(file)
    .then(res => res.text())
    .then(html => {
      element = document.getElementById(elementId);
      element.setAttribute("data-value", value);
      element.innerHTML = html;
      state = boardState();
      if (gameOver(state)) {
        overlay = document.getElementById("game-over-overlay");
        overlay.classList.add("overlay-active");
        console.log("Game is over");
        if (playerHasWon(state, "cross")) {
          overlay.textContent = "Cross wins!";
          console.log("Cross wins");
        } else if (playerHasWon(state, "nought")) {
          overlay.textContent = "Nought wins!";
          console.log("Nought wins!");
        } else if (isDraw(state)) {
          overlay.textContent = "It's a draw!";
          console.log("It's a draw!");
        }

      }
    })
    .catch(err => console.error("Error loading file:", err));
}

function recordMove(cellId) {
  const cell = document.getElementById(cellId);
  const currentValue = cell.getAttribute("data-value") ?? "blank";
  if (gameOver(boardState())) {
    // Game is over, reset the board
    resetBoard();
    currentPlayer = "cross";
  } else {
    if (currentValue === "blank") {
      showSVG(cellId, currentPlayer);
      currentPlayer = currentPlayer === "cross" ? "nought" : "cross";
    }
  }
}

function resetBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.getElementById(`cell-${i}`);
    cell.setAttribute("data-value", "blank");
    showSVG(`cell-${i}`, "blank");
  }
}

function clearGameOverOverlay() {
  const overlay = document.getElementById("game-over-overlay");
  overlay.classList.remove("overlay-active");
  overlay.textContent = "";
  resetBoard();
  currentPlayer = "cross";
}


function attachEventListeners() {
  for (let i = 0; i < 9; i++) {
    document.getElementById(`cell-${i}`).addEventListener("click", () => {
      recordMove(`cell-${i}`);
    });
  }
  overlay = document.getElementById("game-over-overlay").addEventListener("click", () => {
    clearGameOverOverlay();
  });
}


resetBoard();
document.addEventListener(
  "DOMContentLoaded", () => {attachEventListeners();});

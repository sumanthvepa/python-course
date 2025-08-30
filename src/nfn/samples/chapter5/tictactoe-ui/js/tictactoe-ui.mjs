let currentPlayer = "cross";

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
    })
    .catch(err => console.error("Error loading file:", err));
}

function recordMove(cellId) {
  const cell = document.getElementById(cellId);
  const currentValue = cell.getAttribute("data-value") ?? "blank";
  if (currentValue === "blank") {
    showSVG(cellId, currentPlayer);
    currentPlayer = currentPlayer === "cross" ? "nought" : "cross";
  }
}

function initializeCells() {
  for (let i = 0; i < 9; i++) {
    const cell = document.getElementById(`cell-${i}`);
    cell.setAttribute("data-value", "blank");
    showSVG(`cell-${i}`, "blank");
  }
}

function attachEventListeners() {
  for (let i = 0; i < 9; i++) {
    document.getElementById(`cell-${i}`).addEventListener("click", () => {
      recordMove(`cell-${i}`);
    });
  }
}


initializeCells();
document.addEventListener(
  "DOMContentLoaded", () => {attachEventListeners();});

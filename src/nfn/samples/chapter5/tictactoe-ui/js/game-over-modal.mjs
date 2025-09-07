
export class GameOverModal {
  constructor() {
    this.dismissedHandler = null;
    document.getElementById("game-over-overlay").addEventListener("click", () => {
      this.clear();
    });

  }

  display(winner) {
    const message = (winner == null) ? "It's a draw." : `${winner.symbol.name} wins!`;
    const modal = document.getElementById("game-over-overlay");
    modal.textContent = message;
    // Make the modal active
    modal.classList.add("overlay-active");
  }

  clear() {
    const modal = document.getElementById("game-over-overlay");
    modal.classList.remove("overlay-active");
    modal.textContent = "";
    if (this.dismissedHandler) {
      this.dismissedHandler();
    }
  }

  async dismissed() {
    return new Promise((resolve) => {
      const handler = () => { resolve(); };
      this.dismissedHandler = handler;
    });
  }
}
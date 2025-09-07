import { Symbols } from "./symbol.mjs";
import { Board } from "./board.mjs";
import { HumanPlayer } from "./player.mjs";
import { GameOverModal } from "./game-over-modal.mjs";
import { Game } from "./game.mjs";

export class Application {
  constructor() {
    this.board = new Board();
    this.gameOverModal = new GameOverModal();
    this.crossPlayer = new HumanPlayer(Symbols.Cross);
    this.noughtPlayer = new HumanPlayer(Symbols.Nought);
  }

  async run() {
    let firstPlayer = this.crossPlayer;
    let secondPlayer = this.noughtPlayer;
    // Keep playing the game forever (as long as the page is loaded)
    while (true) {
      let game = new Game(firstPlayer, secondPlayer, this.board, this.gameOverModal);
      await game.play();
      // Swap players around
      const tmpPlayer = firstPlayer;
      firstPlayer = secondPlayer;
      secondPlayer = tmpPlayer;
    }
  }
}

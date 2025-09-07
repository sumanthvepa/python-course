import { Symbols, symbolForName } from './symbol.mjs';

export class Game {
  constructor(firstPlayer, secondPlayer, board, gameOverModal) {
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.board = board;
    this.gameOverModal = gameOverModal;
  }

  isWinner(player) {
    const winningCombinations = [
      [this.board.cellByIndex(0), this.board.cellByIndex(1), this.board.cellByIndex(2)],
      [this.board.cellByIndex(3), this.board.cellByIndex(4), this.board.cellByIndex(5)],
      [this.board.cellByIndex(6), this.board.cellByIndex(7), this.board.cellByIndex(8)],
      [this.board.cellByIndex(0), this.board.cellByIndex(3), this.board.cellByIndex(6)],
      [this.board.cellByIndex(1), this.board.cellByIndex(4), this.board.cellByIndex(7)],
      [this.board.cellByIndex(2), this.board.cellByIndex(5), this.board.cellByIndex(8)],
      [this.board.cellByIndex(0), this.board.cellByIndex(4), this.board.cellByIndex(8)],
      [this.board.cellByIndex(2), this.board.cellByIndex(4), this.board.cellByIndex(6)],
    ];
    return winningCombinations.some(combination =>
      combination.every(cell =>
        symbolForName(cell.getAttribute("data-value")) === player.symbol
      )
    );
  }

  isFull() {
    return this.board.allCells().every(cell =>
      symbolForName(cell.getAttribute("data-value")) !== Symbols.Blank
    );
  }

  isDraw() {
    return (
      this.isWinner(this.firstPlayer) === false &&
      this.isWinner(this.secondPlayer) === false &&
      this.isFull(this.board)
    );
  }

  isGameOver() {
    return (
      this.isWinner(this.firstPlayer) ||
      this.isWinner(this.secondPlayer) ||
      this.isFull()
    );
  }

  async play() {
    this.board.reset();
    let currentPlayer = this.firstPlayer;
    while (!this.isGameOver()) {
      const cell = await currentPlayer.makeMove(this.board);
      this.board.markMove(cell, currentPlayer.symbol);
      currentPlayer = (currentPlayer === this.firstPlayer) ? this.secondPlayer : this.firstPlayer;
    }
    console.log("Game over!");
    const winner = this.isWinner(this.firstPlayer) ? this.firstPlayer :
                   this.isWinner(this.secondPlayer) ? this.secondPlayer :
                   null;
    this.gameOverModal.display(winner);
    await this.gameOverModal.dismissed();
  }
}
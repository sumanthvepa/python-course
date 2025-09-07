import { Symbols, symbolForName } from './symbol.mjs';
import { BoardController } from './board-controller.mjs';

export class Board {
  static BOARD_SIZE = 3;
  static TOTAL_CELLS = Board.BOARD_SIZE * Board.BOARD_SIZE;

  #controller;

  constructor() {
    this.reset();
    this.#controller = new BoardController(this.allCells());
  }

  allCells() {
    const cells = [];
    for (let i = 0; i < Board.TOTAL_CELLS; i++) {
      cells.push(document.getElementById(`cell-${i}`));
    }
    return cells;
  }

  cellByIndex(index) {
    return document.getElementById(`cell-${index}`);
  }

  #clearCell(cell) {
    cell.setAttribute("data-value", Symbols.Blank.name);
    cell.innerHTML = Symbols.Blank.svg;
  }

  reset() {
    this.allCells().forEach((cell) => {
      this.#clearCell(cell);
    });
  }

  markMove(cell, symbol) {
    cell.setAttribute("data-value", symbol.name);
    cell.innerHTML = symbol.svg;
  }

  get state() {
    return this.allCells().map((cell) => symbolForName(cell.getAttribute("data-value")));
  }

  get controller() {
    return this.#controller;
  }
}

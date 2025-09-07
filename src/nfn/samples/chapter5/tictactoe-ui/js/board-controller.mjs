import { Symbols, symbolForName } from "./symbol.mjs";

export class BoardController {
  constructor(cells) {
    this.listener = null;
    this.#attachEventListeners(cells);
  }

  #attachEventListeners(cells) {
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        this.processEvent(cell);
      });
    });
  }

  registerListener(handler) {
    this.listener = handler;
  }
  
  processEvent(cell) { 
    const symbol = symbolForName(cell.getAttribute("data-value"));
    if ((symbol === Symbols.Blank) && this.listener) {
      this.listener(cell);
    }
  }
}

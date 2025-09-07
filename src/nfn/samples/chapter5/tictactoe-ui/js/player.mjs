class Player {
  #symbol;

  constructor(symbol) {
    this.#symbol = symbol;
  }

  get symbol() {
    return this.#symbol;
  }
}

export class HumanPlayer extends Player {
  constructor(symbol) {
    super(symbol);
  }

  async makeMove(board) {
    return new Promise((resolve) => {
      const handler = (cell) => { resolve(cell); };
      board.controller.registerListener(handler);
    });
  }
}
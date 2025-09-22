/**
 * @module player
 * @file Defines player classes for the Tic-Tac-Toe game.
 * @version 1.0.0
 * 
 * @description Defines player classes for the Tic-Tac-Toe game,
 * including a base Player class and a HumanPlayer class that extends
 * it to handle human interactions.
 * 
 * @requires module:symbol
 * 
 * @author Sumanth Vepa <svepa@milestone42.com>
 * @copyright 2025 Sumanth Vepa.
 * @license GPL-3.0-or-later
 */
/* -------------------------------------------------------------------
 *  player.mjs: Define player classes for the Tic-Tac-Toe game
 *
 *  This file is part of the tictactoe-ui project.
 *
 * Copyright (C) 2025 Sumanth Vepa.
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see
 * <https://www.gnu.org/licenses/>.
 -------------------------------------------------------------------*/
import { Symbol } from "./symbol.mjs";

/**
 * @class Player
 * An abstract base class representing a player in the Tic Tac Toe
 * game.
 * 
 * Each player has a symbol (either cross or nought) that they use
 * to mark their moves on the board.
 * 
 * DO NOT INSTANTIATE THIS CLASS DIRECTLY. Instead, create
 * subclasses that implement the makeMove method, and instantiate
 * those subclasses.
 */
class Player {
  #symbol;

  /**
   * @constructor
   * Creates an instance of a player with a specific symbol.
   * @param {Symbol} symbol - The symbol representing the player
   * (cross or nought).
   */
  constructor(symbol) {
    this.#symbol = symbol;
  }

  /**
   * @property {Symbol} symbol
   * The symbol representing the player (cross or nought).
   * @return {Symbol} The player's symbol.
   */
  get symbol() {
    return this.#symbol;
  }
}

/**
 * @class HumanPlayer
 * A player that represents a human user.
 * 
 * Extends the {@link Player} class and implements the makeMove to
 * get the move from the user via the board's controller.
 * 
 * @example
 * // Create a human player
 * let board = new Board();
 * let humanPlayer = new HumanPlayer(Symbols.Cross);
 * // Get a move from the user
 * let move = await humanPlayer.makeMove(board);
 */
export class HumanPlayer extends Player {
  /**
   * @constructor
   * Creates an instance of a human player. Calls the superclass
   * constructor to set the player's symbol.
   * 
   * @param {Symbol} symbol - The symbol representing the player
   * (cross or nought).
   */
  constructor(symbol) {
    super(symbol);
  }

  /**
   * @function makeMove
   * @async
   * Makes a move on the board by getting input from the user.
   * 
   * The function is used by the game loop to get the next move
   * from the player. It returns a promise that resolves to the
   * 
   * @param {Board} board - The game board.
   * @returns {Promise<Cell>} A promise that resolves to the cell
   * where the player wants to make a move.
   * 
   * @see {@link Game.play}
   */
  async makeMove(board) {
    return new Promise((resolve) => {
      const handler = (cell) => { resolve(cell); };
      board.controller.registerListener(handler);
    });
  }
}
/**
 * @module board
 * @file Defines the Board class representing the Tic Tac Toe board.
 * @version 1.0.0
 * 
 * @description This module defines the {@link Board} class, which
 * represents the Tic Tac Toe board. It provides methods to reset
 * the board, mark moves, and retrieve the current state of the
 * board. The board consists of a 3x3 grid of cells, each of which
 * can be empty or marked with a player's symbol (cross or nought).
 * The class also integrates with the {@link BoardController} class
 * to handle user interactions with the board.
 *
 * @requires module:symbol
 * @requires module:board-controller
 * 
 * @author Sumanth Vepa <svepa@milestone42.com>
 * @copyright 2025 Sumanth Vepa.
 * @license GPL-3.0-or-later
 */
/* -------------------------------------------------------------------
 *  board.mjs: Define the Board class
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
import { Symbols, symbolForName } from './symbol.mjs';
import { BoardController } from './board-controller.mjs';

/**
 * @class Board
 * Represents the Tic Tac Toe board.
 * 
 * Provides methods to reset the board, mark moves, and retrieve
 * the current state of the board. Integrates with the
 * {@link BoardController} class to handle user interactions.
 * 
 * @example
 * let board = new Board();
 * board.reset();
 * board.markMove(board.cellByIndex(0), Symbols.Cross);
 * let state = board.state;
 */
export class Board {
  /**
   * @static {number} BOARD_SIZE
   * The size of the board (number of rows and columns).
   * For a standard Tic Tac Toe game, this is 3.
   */
  static BOARD_SIZE = 3;
  /**
   * @static {number} TOTAL_CELLS
   * The total number of cells on the board.
   * This is calculated as BOARD_SIZE * BOARD_SIZE.
   */
  static TOTAL_CELLS = Board.BOARD_SIZE * Board.BOARD_SIZE;

  /**
   * @type {BoardController}
   * @private
   * The controller that manages user interactions with the board.
   */
  #controller;

  /**
   * @constructor
   * Initializes the board by resetting it and creating a
   * {@link BoardController} instance to manage user interactions.
   * 
   * The board cells are assumed to be HTML elements with IDs
   * in the format "cell-{index}", where index ranges from 0 to
   * TOTAL_CELLS - 1.
   */
  constructor() {
    this.reset();
    this.#controller = new BoardController(this.allCells());
  }

  /**
   * @function allCells
   * Retrieves all the cells of the board as an array of HTML
   * elements.
   * 
   * @returns {HTMLElement[]}
   */
  allCells() {
    const cells = [];
    for (let i = 0; i < Board.TOTAL_CELLS; i++) {
      cells.push(document.getElementById(`cell-${i}`));
    }
    return cells;
  }

  /**
   * @function cellByIndex
   * Retrieves a cell of the board by its index.
   * 
   * @param {number} index - The index of the cell (0 to 8).
   * @returns {HTMLElement|null} The cell element or null if not found.
   */
  cellByIndex(index) {
    return document.getElementById(`cell-${index}`);
  }

  /**
   * @function reset
   * Resets the board to its initial state, clearing all cells
   * and marking them as empty (blank).
   */
  reset() {
    /**
     * @function clearCell
     * Clears the specified cell by resetting its value and inner HTML.
     * @param {HTMLElement} cell - The cell element to clear.
     */
    function clearCell(cell) {
      cell.setAttribute("data-value", Symbols.Blank.name);
      cell.innerHTML = Symbols.Blank.svg;
    }
    this.allCells().forEach((cell) => { clearCell(cell); });
  }

  /**
   * @function markMove
   * Marks a move on the board.
   * 
   * It does two things: updates the cell's data-value attribute
   * to reflect the symbol placed in the cell, and updates the
   * inner HTML to display the symbol's SVG representation.
   *
   * @param {HTMLElement} cell - The cell element to mark.
   * @param {Symbol} symbol - The symbol to place in the cell.
   */
  markMove(cell, symbol) {
    cell.setAttribute("data-value", symbol.name);
    cell.innerHTML = symbol.svg;
  }

  /**
   * @property {Symbol[]} state
   * The current state of the board as an array of symbols.
   * Each element in the array corresponds to a cell on the board,
   * in row-major order (left to right, top to bottom).
   */
  get state() {
    // Get an array of all html elements representing the cells
    // of the board. The map function transforms each cell
    // element into the corresponding Symbol instance by
    // reading the data-value attribute of the cell and
    // calling the symbolForName function.
    // The result is a Symbol[] array representing the
    // current state of the board.
    return this.allCells().map((cell) => symbolForName(cell.getAttribute("data-value")));
  }

  /**
   * @property {BoardController} controller
   * The controller that manages user interactions with the board.
   */
  get controller() {
    return this.#controller;
  }
}

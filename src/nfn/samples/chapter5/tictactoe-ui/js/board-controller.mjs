/**
 * @module board-controller
 * @file Define the BoardController class
 * @version 1.0.0
 * 
 * @description Contains the definition of the {@link BoardController}
 * class, which is responsible for managing user interactions with the
 * Tic Tac Toe board. It attaches event listeners to the board cells
 * and notifies a registered listener when a cell is clicked.
 * 
 * @requires module:symbol
 * 
 * @author Sumanth Vepa <svepa@milestone42.com>
 * @copyright 2025 Sumanth Vepa.
 * @license GPL-3.0-or-later
 */
/* -------------------------------------------------------------------
 *  board-controller.mjs: Define the BoardController class
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

import { Symbols, symbolForName } from "./symbol.mjs";

/**
 * @class BoardController
 * Manages user interactions with the Tic Tac Toe board.
 * 
 * Attaches event listeners to the board cells and notifies a
 * registered listener when a cell is clicked.
 * 
 * Note that there can be only one listener registered at a time.
 * 
 * This class is used by the {@link Board} class to handle user
 * interactions.
 * 
 * @example
 * let controller = new BoardController(cells);
 * controller.registerListener((cell) => {
 *   console.log(`Cell clicked: ${cell.id}`);
 * });
 */
export class BoardController {
  /**
   * @constructor
   * Initializes the BoardController with a collection of cells
   * that it should listen to, by attaching event listeners to
   * the provided board cells.
   * 
   * @param {HTMLElement[]} cells - The cells of the Tic Tac Toe board.
   * 
   */
  constructor(cells) {
    this.listener = null;
    this.#attachEventListeners(cells);
  }

  /**
   * @function #attachEventListeners
   * @private
   * Attaches click event listeners to the provided board cells. When
   * triggered, each listener calls the processEvent method with the
   * cell that was clicked.
   * 
   * @param {HTMLElement[]} cells - The cells of the Tic Tac Toe board.
   */
  #attachEventListeners(cells) {
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        this.processEvent(cell);
      });
    });
  }

  /**
   * @callback Listener
   * A function that is called when a cell is clicked. It receives the
   * clicked cell as an argument.
   * 
   * @param {HTMLElement} cell - The cell that was clicked.
   */
  /**
   * @function registerListener
   * Registers a listener to be notified when a cell is clicked.
   * 
   * @param {Listener} handler - The function to call when a cell is
   * clicked.
   */
  registerListener(handler) {
    this.listener = handler;
  }

  /**
   * @function processEvent
   * Processes a click event on a cell.
   * 
   * @param {HTMLElement} cell - The cell that was clicked.
   */
  processEvent(cell) { 
    const symbol = symbolForName(cell.getAttribute("data-value"));
    if ((symbol === Symbols.Blank) && this.listener) {
      this.listener(cell);
    }
  }
}

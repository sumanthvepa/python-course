/**
 * @module application
 * @file Define the Application class
 * @version 1.0.0
 *
 * @description Contains the definition of the {@link Application}
 * class, which is responsible for initializing and running the Tic
 * Tac Toe UI application.
 *
 * @requires module:symbol
 * @requires module:board
 * @requires module:player
 * @requires module:game-over-modal
 * @requires module:game
 * 
 * @author Sumanth Vepa <svepa@milestone42.com>
 * @copyright 2025 Sumanth Vepa.
 * @license GPL-3.0-or-later
 */
/* -------------------------------------------------------------------
 *  application.mjs: Define the Application class
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
import { Symbols } from "./symbol.mjs";
import { Board } from "./board.mjs";
import { HumanPlayer } from "./player.mjs";
import { GameOverModal } from "./game-over-modal.mjs";
import { Game } from "./game.mjs";

/**
 * @class Application
 * A TicTacToe application.
 * 
 * Handles initialization of the board, players,
 * provides a game loop to play games forever, and
 * manages the game over modal.
 * 
 * @example
 * let app = new Application();
 * app.run();
 */
export class Application {
  /**
   * @constructor
   * Initializes the application by creating instances of the
   * {@link Board}, {@link GameOverModal}, and two {@link HumanPlayer}
   * classes (one for each player symbol).
   */
  constructor() {
    this.board = new Board();
    this.gameOverModal = new GameOverModal();
    this.crossPlayer = new HumanPlayer(Symbols.Cross);
    this.noughtPlayer = new HumanPlayer(Symbols.Nought);
  }

  /**
   * @function run
   * @async
   * 
   * @description Starts the application by entering an infinite loop
   * that creates and plays new {@link Game} instances. The players are
   * swapped after each game to ensure fairness.
   * 
   * @returns {Promise<void>} A promise that resolves when the
   * application run method completes (which it never does in this
   * implementation).
   */
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

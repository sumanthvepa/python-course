/**
 * @module game-over-modal
 * @file Defines the GameOverModal class for displaying game over messages.
 * @version 1.0.0
 * 
 * @description Defines the GameOverModal class, which is responsible
 * for displaying a modal dialog when the game is over, indicating
 * whether there is a winner or if the game ended in a draw. The modal
 * can be dismissed by clicking on it, and it provides a promise-based
 * mechanism to notify when it has been dismissed.
 * 
 * @requires module:fetch
 * @requires module:player
 * 
 * @author Sumanth Vepa <svepa@milestone42.com>
 * @copyright 2025 Sumanth Vepa.
 * @license GPL-3.0-or-later
 */
/* -------------------------------------------------------------------
 *  game-over-modal.mjs: Define the GameOverModal class
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

import { Player } from './player.mjs';

/**
 * @class GameOverModal
 * Represents a modal dialog that appears when the game is over.
 * 
 * Provides methods to display the modal with the game result,
 * clear the modal, and wait for the modal to be dismissed by the
 * user.
 * 
 * @example
 * let winner = ...; // Determine the winner (null for draw)
 * let modal = new GameOverModal();
 * modal.display(winner); // Display the modal with the winner
 * await modal.dismissed(); // Wait for the user to dismiss the modal
 */
export class GameOverModal {
  /**
   * @constructor
   * Initializes the GameOverModal by setting up the click event
   * listener on the modal overlay to allow dismissal.
   */
  constructor() {
    this.dismissedHandler = null;
    document.getElementById("game-over-overlay").addEventListener("click", () => {
      this.clear();
    });

  }

  /**
   * Displays the game over modal with the result.
   * @param {Player} winner - The winning player, or null if the game
   * ended in a draw.
   */
  display(winner) {
    const message = (winner == null) ? "It's a draw." : `${winner.symbol.name} wins!`;
    const modal = document.getElementById("game-over-overlay");
    modal.textContent = message;
    // Make the modal active
    modal.classList.add("overlay-active");
  }

  /**
   * @function clear
   * Clears the modal and removes it from view. If a dismissed
   * handler is registered, it is called to notify that the modal
   * has been dismissed.
   */
  clear() {
    const modal = document.getElementById("game-over-overlay");
    modal.classList.remove("overlay-active");
    modal.textContent = "";
    if (this.dismissedHandler) {
      this.dismissedHandler();
    }
  }

  /**
   * @function dismissed
   * Returns a promise that resolves when the modal is dismissed.
   * 
   * This is used in the game to wait for the user to dismiss the
   * game over modal before starting a new game.
   * 
   * @returns {Promise<void>} A promise that resolves when the modal is dismissed.
   */
  async dismissed() {
    return new Promise((resolve) => {
      const handler = () => { resolve(); };
      this.dismissedHandler = handler;
    });
  }
}

/**
 * @module game
 * @file Defines the Game class for managing the Tic-Tac-Toe game logic.
 * @version 1.0.0
 *
 * @description This module defines the {@link Game} class, which
 * encapsulates the core logic of a Tic-Tac-Toe game. It manages the
 * players, the game board, and the game over modal, providing methods
 * to play the game, check for winners, and determine if the game has
 * ended in a draw.
 *
 * @requires module:symbol
 *
 * @author Sumanth Vepa <svepa@milestone42.com>
 * @copyright 2025 Sumanth Vepa.
 * @license GPL-3.0-or-later
 */
/* -------------------------------------------------------------------
 *  game.mjs: Define the Game class for managing the Tic-Tac-Toe game
 *  logic
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

/**
 * @class Game
 * Encapsulates the core logic of a Tic-Tac-Toe game.
 * 
 * Manages the players, the game board, and the game over modal,
 * providing methods to play the game, check for winners, and
 * determine if the game has ended in a draw.
 * 
 * @example
 * // Create players, board, and game over modal
 * let player1 = new HumanPlayer(Symbols.Cross);
 * let player2 = new HumanPlayer(Symbols.Nought);
 * let board = new Board();
 * let gameOverModal = new GameOverModal();
 * // Create a new game
 * let game = new Game(player1, player2, board, gameOverModal);
 * // and play it
 * await game.play();
 */
export class Game {
  /**
   * @constructor
   * Creates an instance of the Game class with two players,
   * a game board, and a game over modal.
   * 
   * @param {Player} firstPlayer - The first player.
   * @param {Player} secondPlayer - The second player.
   * @param {Board} board - The game board.
   * @param {GameOverModal} gameOverModal - The game over modal.
   */
  constructor(firstPlayer, secondPlayer, board, gameOverModal) {
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.board = board;
    this.gameOverModal = gameOverModal;
  }

  /**
   * @function isWinner
   * Checks if the specified player has won the game by forming a
   * winning combination on the board.
   * 
   * The logic just checks all possible winning combinations
   * (rows, columns, and diagonals) to see if any of them are
   * fully occupied by the specified player's symbol.
   * 
   * @param {Player} player - The player to check for a win.
   * @returns {boolean} True if the player has won, false otherwise.
   */
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

  /**
   * @function isFull
   * Checks if the board is full, meaning all cells are occupied.
   * 
   * This is used to determine if the game has ended.
   * @returns {boolean} True if the board is full, false otherwise.
   */
  isFull() {
    return this.board.allCells().every(cell =>
      symbolForName(cell.getAttribute("data-value")) !== Symbols.Blank
    );
  }

  /**
   * @function isDraw
   * Checks if the game has ended in a draw, meaning there are no
   * winning combinations for either player and the board is full.
   * 
   * @returns {boolean} True if the game has ended in a draw, false
   * otherwise.
   */
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

  /**
   * @function play
   * @async
   * Starts and manages the game loop, alternating turns between
   * players until the game ends.
   * 
   * The function resets the board, then enters a loop where it
   * prompts the current player to make a move. After each move, it
   * checks if the game has ended (either by a win or a draw). If
   * the game ends, it displays the game over modal with the result
   * and waits for the user to dismiss it before returning.
   * 
   * @returns {Promise<void>} A promise that resolves when the game
   * is over and the game-over modal has been dismissed.
   */
  async play() {
    this.board.reset();
    let currentPlayer = this.firstPlayer;
    while (!this.isGameOver()) {
      const cell = await currentPlayer.makeMove(this.board);
      this.board.markMove(cell, currentPlayer.symbol);
      currentPlayer = (currentPlayer === this.firstPlayer) ? this.secondPlayer : this.firstPlayer;
    }
    console.log("Game over!");
    const winner
      = this.isWinner(this.firstPlayer) ? this.firstPlayer :
        this.isWinner(this.secondPlayer) ? this.secondPlayer :
        null;
    this.gameOverModal.display(winner);
    await this.gameOverModal.dismissed();
  }
}
/**
 * @module symbol
 * @file Define the Symbol class and functions to load symbols
 * @version 1.0.0
 *
 * @description This module defines the {@link Symbol} class,
 * which represents a game symbol with a name and SVG content. It
 * also provides functions to load symbols from SVG files and
 * retrieve symbols by name.
 *
 * @requires module:fetch
 *
 * @author Sumanth Vepa <svepa@milestone42.com>
 * @copyright 2025 Sumanth Vepa.
 * @license GPL-3.0-or-later
 */
/* -------------------------------------------------------------------
 *  symbol.mjs: Define the Symbol class and functions to load symbols
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

 
/**
 * @class Symbol
 * Represents a game symbol with a name and SVG content.
 * 
 * @property {string} name - The name of the symbol (e.g., "cross", "nought", "blank").
 * @property {string} svg - The SVG content representing the symbol.
 * 
 * @example
 * let crossSymbol = new Symbol("cross", "<svg>...</svg>");
 */
export class Symbol {
  constructor(name, svg) {
    this.name = name;
    this.svg = svg;
  }
}

/**
 * @function make
 * @async
 * 
 * @description Creates a new Symbol instance. It loads the SVG image
 * of the symbol from a file named `img/{name}.svg`, and returns a new
 * Symbol instance with the given name and loaded SVG content. We
 * prefer to use a factory function instead of a constructor because
 * the operation of loading the SVG content is asynchronous and could
 * fail. By using a factory function, we can handle errors more
 * gracefully.
 *
 * @param {string} name - The name of the symbol.
 * @returns {Promise<Symbol>} A promise that resolves to a new Symbol
 * instance.
 */
async function make(name) {
  /**
   * @function filenameFromSymbolName
   * @description Constructs the filename for the SVG image of the
   * symbol based on its name.
   * @param {string} name
   * @returns {string}
   */
  function filenameFromSymbolName(name) {
    return `img/${name}.svg`;
  }

  /**
   * @function loadFrom
   * @async
   * @description Loads the SVG content from the specified file.
   * @param {string} file - The path to the SVG file.
   * @returns {Promise<string>} A promise that resolves to the SVG content.
   */
  async function loadFrom(file) {
    const response = await fetch(file);
    return await response.text();
  }

  // Try to load the SVG content from the file and create a new
  // Symbol instance. If loading fails, log the error and rethrow it.
  try {
    const file = filenameFromSymbolName(name);
    const content = await loadFrom(file);
    return new Symbol(name, content);
  } catch (error) {
    console.error(`Error loading symbol ${name}:`, error);
    throw error;
  }
}

/**
 * @constant {Object} Symbols
 * An object containing the predefined symbols: Blank, Cross, and Nought.
 * Each symbol is an instance of the {@link Symbol} class.
 * 
 * @example
 * import { Symbols } from "./symbol.mjs";
 * console.log(Symbols.Cross.name); // "cross"
 */
const [Blank, Cross, Nought] = await Promise.all([
    make("blank"),
    make("cross"),
    make("nought")
]);
// Freeze the Symbols object to prevent modification.
export const Symbols = Object.freeze({
    Blank,
    Cross,
    Nought
});

/**
 * @function symbolForName
 * @description Retrieves a symbol by its name.
 * @param {string} name - The name of the symbol.
 * @returns {Symbol} The symbol instance corresponding to the name.
 */
export function symbolForName(name) {
  for (const symbol of Object.values(Symbols)) {
    if (symbol.name === name) {
      return symbol;
    }
  }
  throw new Error(`Symbol not found for name: ${name}`);
}

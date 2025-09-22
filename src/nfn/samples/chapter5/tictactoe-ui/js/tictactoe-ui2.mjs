/**
 * @module tictactoe-ui2
 * @file Entrypoint for the Tic Tac Toe UI application.
 * @version 1.0.0
 * 
 * @description This module initializes and runs the Tic Tac Toe UI
 * application. It defines the {@link main} function, which waits for the DOM
 * to be fully loaded before creating an instance of the {@link Application}
 * class and invoking its {@link Application.run} method.
 *
 * @requires module:application
 * 
 * @author Sumanth Vepa <svepa@milestone42.com>
 * @copyright 2025 Sumanth Vepa.
 * @license GPL-3.0-or-later
 */
/* -------------------------------------------------------------------
 *  tictactoe-ui2.mjs: Entrypoint for the Tic Tac Toe UI application
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
import { Application } from "./application.mjs";


/**
 * @function main
 * @async
 * 
 * @description The main entry point for the Tic Tac Toe UI
 * application. It waits for the DOM to be fully loaded before
 * creating an instance of the {@link Application} class and invoking
 * its {@link Application.run} method.
 *
 * @returns {Promise<void>} A promise that resolves when the
 * application has been initialized and run.
 */
async function main() {
  // The function creates, and awaits on a promise that checks if the
  // DOM is stll loading (i.e., `document.readyState` is "loading").
  // If it is, it adds an event listener for the `DOMContentLoaded`
  // event, which when triggered by the completion of the DOM loading,
  // resolves the promise by calling the resolve method. If the DOM
  // is already loaded, it resolves the promise immediately.
  await new Promise((resolve) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", resolve);
    } else {
      resolve();
    }
  });

  // At this point we can be sure that the DOM is fully loaded. This
  // is necessary because the Application class and its run method add
  // event listeners to DOM elements.

  // Now create an instance of the Application class run it.
  let app = new Application();
  app.run();
}


// Invoke the main function to start the application. We assume modern
// environments that allow us to call an async function at the top
// level of a module.

// Notice that we do not await on the promise returned by the main
// function. This allows any other unrelated scripts on the page to
// run without waiting for the application to be fully initialized.

// TODO: How are errors raised by main handled.
main();
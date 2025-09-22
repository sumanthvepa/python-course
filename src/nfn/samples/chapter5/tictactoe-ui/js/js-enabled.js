/**
 * @file A JavaScript-enabled indicator script.
 * @version 1.0.0
 * 
 * @description This script enables JavaScript-specific features on
 * the webpage by replacing the 'no-js' class on the HTML element
 * with 'js'. This allows for conditional styling and functionality
 * based on the presence of JavaScript.
 * 
 * @author Sumanth Vepa <svepa@milestone42.com>
 * @copyright 2024-25 Sumanth Vepa.
 * @license GPL-3.0-or-later
 */
/* -------------------------------------------------------------------
 * js-enabled.js: A JavaScript-enabled indicator script.
 * 
 * This file is part of the tictactoe-ui project.
 *
 * Copyright (C) 2024-25 Sumanth Vepa.
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
"use strict";
document.documentElement.classList.replace('no-js', 'js');

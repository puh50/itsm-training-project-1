console.log(`main`)

import {createMainBoard} from './view/main-board.js';
import {favoriteBlock} from './view/favorite-block.js';
import {render} from './utils.js';
import {workingWithData} from './presenter/card-presenter.js';

console.log(`main2`)
const cardInfoBoardsSection = document.querySelector(`.main__card-info-boards`);
render(cardInfoBoardsSection, createMainBoard(), `beforeend`);
const cardFavoriteSection = document.querySelector(`.main__card-favorite-board`);
render(cardFavoriteSection, favoriteBlock(), `beforeend`);

workingWithData();

console.log(`main3`)


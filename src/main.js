console.log(`main`)

import {createMainBoard} from './view/main-board.js';
import {render} from './utils.js';
import {workingWithData} from './presenter/card-presenter.js';
import {switchBoardHandler} from './process/switch-board.js';

console.log(`main2`)
const cardInfoBoardsSection = document.querySelector(`.main__card-info-boards`);
render(cardInfoBoardsSection, createMainBoard(), `beforeend`);

workingWithData();
switchBoardHandler();

console.log(`main3`)


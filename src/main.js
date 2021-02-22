console.log(`main`)

import {createMainBoard} from './view/main-board.js';
import {favoriteBlock} from './view/favorite-block.js';
import {getDataFromServer} from './data.js';
import {render, clear} from './utils.js';
import {createObjectsFromData, renderCards, cardEventsHandler} from './presenter/card-presenter.js';
console.log(`main2`)
const cardInfoBoardsSection = document.querySelector(`.main__card-info-boards`);
render(cardInfoBoardsSection, createMainBoard(), `beforeend`);
const cardFavoriteSection = document.querySelector(`.main__card-favorite-board`);
render(cardFavoriteSection, favoriteBlock(), `beforeend`);

async function workingWithData() {
  const data = await getDataFromServer(`https://jsonplaceholder.typicode.com/posts`, `GET`);

  createObjectsFromData(data);
  renderCards();
  cardEventsHandler();
};

workingWithData();

console.log(`main3`)


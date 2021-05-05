console.log(`switch-board`);

import {clear} from '../utils.js';
import {cardEventsHandler, notFavoriteCards, favoriteCards, renderCards} from '../presenter/card-presenter.js';

export const switchBoardHandler = () => {

  const favoriteButton = document.querySelector(`.button-favorite`);
  const homeButton = document.querySelector(`.button-home`);
  const board = document.querySelector(`.main__board`);

  document.addEventListener(`click`, (evt) => {

    if (evt.target.classList.contains(`button-board-change`)) {

      homeButton.classList.toggle(`active`);
      favoriteButton.classList.toggle(`active`);
      clear(board);

      if (evt.target === favoriteButton) {
        renderCards(favoriteCards);
      } else if (evt.target === homeButton) {
        renderCards(notFavoriteCards);
      }

      cardEventsHandler();
    }

  })
}

console.log(`switch-board`);

import {clear} from '../utils.js';
import {cardEventsHandler, notFavoriteCards, favoriteCards, renderCards} from '../presenter/card-presenter.js';
import {customNotFavoriteCards, customFavoriteCards} from '../process/create-card.js';

export const switchBoardHandler = () => {

  const favoriteButton = document.querySelector(`.button-favorite`);
  const homeButton = document.querySelector(`.button-home`);
  const board = document.querySelector(`.main__board`);

  document.addEventListener(`click`, (evt) => {

    if (evt.target.classList.contains(`button-board-change`)) {

      switch (evt.target) {
        case homeButton:
          favoriteButton.classList.remove(`active`);
          homeButton.classList.add(`active`);
          break;

        case favoriteButton:
          homeButton.classList.remove(`active`);
          favoriteButton.classList.add(`active`);
          break;
      }

      clear(board);

      if (evt.target === favoriteButton) {
        renderCards(customFavoriteCards);
        renderCards(favoriteCards);
      } else if (evt.target === homeButton) {
        renderCards(customNotFavoriteCards);
        renderCards(notFavoriteCards);
      }

      cardEventsHandler();
    }

  })
}

import {clear} from '../utils.js';
import {allCards, notFavoriteCards, favoriteCards, renderCards, cardEventsHandler, textHighlight} from '../presenter/card-presenter.js';
import {customNotFavoriteCards, customFavoriteCards} from '../process/create-card.js';

export const search = {
  element: document.querySelector(`.search`),

  typeTextHandler: function () {

    this.element.addEventListener(`input`, () => {
      const searchText = this.element.value;

      const searchedNotFavoriteCards = notFavoriteCards.filter((card) => {
        return card.title.includes(searchText);
      });

      const searchedFavoriteCards = favoriteCards.filter((card) => {
        return card.title.includes(searchText);
      });

      const searchedcustomNotFavoriteCards = customNotFavoriteCards.filter((card) => {
        return card.title.includes(searchText);
      });

      const searchedcustomFavoriteCards = customFavoriteCards.filter((card) => {
        return card.title.includes(searchText);
      });

      const mainBoard = document.querySelector(`.main__board`);
      const favoriteButton = document.querySelector(`.button-favorite`);

      if (searchText.length >= 3) {

        clear(mainBoard);

        if (favoriteButton.classList.contains(`active`)) {
          renderCards(searchedcustomFavoriteCards);
          renderCards(searchedFavoriteCards);
        } else {
          renderCards(searchedcustomNotFavoriteCards);
          renderCards(searchedNotFavoriteCards);
        }
        textHighlight(searchText);
        cardEventsHandler();

      }

      if (searchText.length < 3) {

        clear(mainBoard);

        if (favoriteButton.classList.contains(`active`)) {
          renderCards(customFavoriteCards);
          renderCards(favoriteCards);
        } else {
          renderCards(customNotFavoriteCards);
          renderCards(notFavoriteCards);
        }
        cardEventsHandler();

      }

    })
  }
}

import {clear} from '../utils.js';
import {allCards, renderCards, cardEventsHandler, textHighlight} from './card-presenter.js';

export const search = {
  element: document.querySelector(`.search`),

  typeTextHandler: function () {

    this.element.addEventListener(`input`, () => {
      let searchText = this.element.value;

      const searchedCards = allCards.filter((card) => {
        return card.title.includes(searchText);
      });

      const mainBoard = document.querySelector(`.main__board`);
      const cardFavoriteSection = document.querySelector(`.main__card-favorite-board`);
      const cardFavoriteBlock = cardFavoriteSection.querySelector(`.main__card-favorite-block`);

      if (searchText.length >= 3) {

        clear(mainBoard);
        clear(cardFavoriteBlock);

        renderCards(searchedCards);
        cardEventsHandler();
        textHighlight(searchText);

      } else {

        clear(mainBoard);
        clear(cardFavoriteBlock);

        renderCards(allCards);
        cardEventsHandler();
        textHighlight(searchText);

      }
    })
  }
}

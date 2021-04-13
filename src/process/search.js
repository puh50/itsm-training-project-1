import {clear} from '../utils.js';
import {allCards, renderCards, cardEventsHandler, textHighlight} from '../presenter/card-presenter.js';

export const search = {
  element: document.querySelector(`.search`),

  typeTextHandler: function () {

    this.element.addEventListener(`input`, () => {
      const searchText = this.element.value;

      const searchedCards = allCards.filter((card) => {
        return card.title.includes(searchText);
      });

      const mainBoard = document.querySelector(`.main__board`);
      const cardFavoriteSection = document.querySelector(`.main__card-favorite-board`);
      const cardFavoriteBlock = cardFavoriteSection.querySelector(`.main__card-favorite-block`);

      clear(mainBoard);
      clear(cardFavoriteBlock);

      if (searchText.length >= 3) {
        renderCards(searchedCards);
        textHighlight(searchText);
      } else {
        renderCards(allCards);
      }
      cardEventsHandler();

    })
  }
}

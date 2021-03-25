import {cardObject} from "./card-object.js";
import {activeCardQualifier, notFavoriteCards, favoriteCards, allCards, moveCard} from "./card-presenter.js";

export const cardEdit = (card) => {
  return {
    __proto__: card,

    closeEditMode: function () {
      const modal = document.querySelector(`.card-modal`);
      const closeButton = modal.querySelector(`.close-button`);

      closeButton.addEventListener(`click`, () => {
        this.editMode = false;
        modal.remove();
      })

    },

    closeEditModeByDocumentClick: function () {
      document.addEventListener('click', function (evt) {
        const modal = document.querySelector('.modal');

        if (modal) {
          !modal.contains(evt.target)
            ? modal.remove()
            : false;
        }

      }, true);
    },

    moveToFromFavorite: function (card) {
      const modal = document.querySelector(`.card-modal`);
      const favoriteStar = modal.querySelector(`.favorite-star`);
      const currentCard = activeCardQualifier(card)[0];

      favoriteStar.addEventListener(`click`, () => {

        card.classList.toggle(`favorite-card`);
        modal.classList.toggle(`favorite-card`);

        card.classList.contains(`favorite-card`)
          ? (
            this.favorite = true,
            this.moveToFavorite(card),
            currentCard.favorite = true,
            moveCard(currentCard, favoriteCards, notFavoriteCards, allCards)
          )
          : (
            this.favorite = false,
            this.moveFromFavorite(card),
            currentCard.favorite = false,
            moveCard(currentCard, favoriteCards, notFavoriteCards, allCards)
          );
      })
    },
  }
}

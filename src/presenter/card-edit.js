import {cardObject} from "./card-object.js";

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

      favoriteStar.addEventListener(`click`, () => {

        card.classList.toggle(`favorite-card`);
        modal.classList.toggle(`favorite-card`);

        card.classList.contains(`favorite-card`)
          ? (cardObject.moveToFavorite(card), this.favorite = true)
          : (cardObject.moveFromFavorite(card), this.favorite = false);
      })
    },
  }
}

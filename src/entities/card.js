import {render} from "../utils";

export const cardObject = {
  title: ``,
  body: ``,
  id: ``,
  userId: ``,
  favorite: false,
  editMode: false,

  openEditMode: function () {
    this.editMode = true;

    const magnifierButton = this.querySelector(`.magnifier`);

    magnifierButton.addEventListener(`click`, () => {

      const mainBlock = document.querySelector(`.main`);
      const modalCard = Object.create(cardEdit(this));
      render(mainBlock, extandedCard(modalCard), `beforeend`);
    })
  },

  moveToFavorite: function (card) {
    const cardFavoriteSection = document.querySelector(`.main__card-favorite-board`);
    const cardFavoriteBlock = cardFavoriteSection.querySelector(`.main__card-favorite-block`);

    cardFavoriteBlock.appendChild(card);
  },

  moveFromFavorite: function (card) {
    const mainBoard = document.querySelector(`.main__board`);

    mainBoard.appendChild(card);
  },


}

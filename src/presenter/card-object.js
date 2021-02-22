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

    this.favorite = true;
    cardFavoriteBlock.appendChild(card);
  },

  moveFromFavorite: function (card) {
    const mainBoard = document.querySelector(`.main__board`);

    this.favorite = false;
    mainBoard.appendChild(card);
  },

  cardEventsHandler: function () {
    const card = document.querySelector(`.card`);
    const favoriteStar = document.querySelector(`.favorite-star`);

    favoriteStar.addEventListener(`click`, (evt) => {
      card.classList.toggle(`favorite-card`);

      card.remove();

      card.classList.contains(`favorite-card`)
        ? this.moveToFavorite()
        : this.moveFromFavorite();

      if (evt.target.classList.contains(`magnifier`)) {
        this.editMode = true;
        const mainBlock = document.querySelector(`.main`);

        const modal = document.querySelector(`.card-modal`);
        modal ? modal.remove() : ``;

        const modalCard = Object.create(cardEdit(card));
        render(mainBlock, extandedCard(modalCard), `beforeend`);

        modalCard.closeEditMode();
        modalCard.moveToFromFavorite();
      }
    });
  },

}

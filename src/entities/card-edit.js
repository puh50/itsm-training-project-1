import {activeCardQualifier, notFavoriteCards, favoriteCards, allCards, moveCard} from "../presenter/card-presenter.js";
import {cardObject} from "./card.js";
import {remove} from '../utils.js';

export const cardEdit = Object.create(cardObject);

const closeEditModeActions = (object, card, element) => {
  object.editMode = false;
  card.editMode = false;
  element.remove();
}

cardEdit.closeEditMode = function (card) {
  const modal = document.querySelector(`.card-modal`);
  const closeButton = modal.querySelector(`.close-button`);
  const currentCard = activeCardQualifier(card)[0];

  closeButton.addEventListener(`click`, () => {
    closeEditModeActions(this, currentCard, modal);
  })

};

cardEdit.closeEditModeByDocumentClick = function (card) {
  document.addEventListener('click', function (evt) {
    const modal = document.querySelector('.modal');
    const currentCard = activeCardQualifier(card)[0];

    if (modal && !modal.contains(evt.target)) {
      closeEditModeActions(this, currentCard, modal);
    }

  }, true);
};

cardEdit.moveToFromFavorite = function (card) {
  const modal = document.querySelector(`.card-modal`);
  const favoriteStar = modal.querySelector(`.favorite-star`);
  const currentCard = activeCardQualifier(card)[0];

  favoriteStar.addEventListener(`click`, () => {

    card.classList.toggle(`favorite-card`);
    modal.classList.toggle(`favorite-card`);

    const isCardFavorite = card.classList.contains(`favorite-card`);
    currentCard.favorite = isCardFavorite;
    this.favorite = isCardFavorite;
    remove(card);

    if (isCardFavorite) {
      moveCard(currentCard, favoriteCards, notFavoriteCards, allCards);
    } else {
      moveCard(currentCard, notFavoriteCards, favoriteCards, allCards);
    }

  })
}

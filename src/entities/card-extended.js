import {activeCardQualifier, notFavoriteCards, favoriteCards, allCards, moveCard, moveCustomFavoriteCard, moveCustomNotFavoriteCard} from "../presenter/card-presenter.js";
import {cardObject} from "./card.js";
import {remove} from '../utils.js';
import {renderActiveBoardCards} from '../process/switch-board.js';

export const cardExtended = Object.create(cardObject);

const closeExtendedModeActions = (object, card) => {
  object.extendedMode = false;
  card.extendedMode = false;
}

cardExtended.closeExtendedMode = function (card) {
  const modal = document.querySelector(`.modal`);
  const closeButton = modal.querySelector(`.close-button`);
  const currentCard = activeCardQualifier(card)[0];

  closeButton.addEventListener(`click`, () => {
    closeExtendedModeActions(this, currentCard);
    remove(modal);
  })

};

cardExtended.closeExtendedModeByDocumentClick = function (card) {

  document.addEventListener('click', function (evt) {
    const modal = document.querySelector('.modal');
    const currentCard = activeCardQualifier(card)[0];

    if (modal && !modal.contains(evt.target)) {
      closeExtendedModeActions(this, currentCard);
      remove(modal);
    }

  }, true);
};

cardExtended.moveToFromFavorite = function (card) {
  const modal = document.querySelector(`.card-modal`);
  const favoriteStar = modal.querySelector(`.favorite-star`);
  const currentCard = activeCardQualifier(card)[0];

  favoriteStar.addEventListener(`click`, () => {

    card.classList.toggle(`favorite-card`);
    modal.classList.toggle(`favorite-card`);

    const isCardFavorite = card.classList.contains(`favorite-card`);
    const isCardCustom = card.classList.contains(`card-custom`);
    currentCard.favorite = isCardFavorite;
    this.favorite = isCardFavorite;

    if (isCardCustom && isCardFavorite) {
      moveCustomFavoriteCard(card);
    } else if (!isCardCustom && isCardFavorite) {
      moveCard(currentCard, favoriteCards, notFavoriteCards, allCards);
    }

    if (isCardCustom && !isCardFavorite) {
      moveCustomNotFavoriteCard(card);
    } else if (!isCardCustom && !isCardFavorite) {
      moveCard(currentCard, notFavoriteCards, favoriteCards, allCards);
    }

    renderActiveBoardCards(`afterbegin`);
  })
}

import {notFavoriteCards, favoriteCards, cardEventsHandler} from '../presenter/card-presenter.js';
import {render, remove, closeModalByCrossClick, closeModalByDocumentClick, favoriteToggle} from '../utils.js';
import {cardCustom} from '../view/card-custom.js';
import {cardNewPopup} from '../view/card-new-popup.js';

export const customNotFavoriteCards = [];
export const customFavoriteCards = [];

if (!localStorage.customCardCounter) {
  localStorage.customCardCounter = 1;
} else {
  localStorage.customCardCounter = localStorage.customCardCounter;
}

// localStorage.clear();

export const newCardCreation = () => {
  const mainBlock = document.querySelector(`.main__board`);
  const addCardButton = document.querySelector(`.add-card-button`);

  addCardButton.addEventListener(`click`, () => {
    render(mainBlock, cardNewPopup(), `beforeend`);
    const modal = document.querySelector(`.modal`);

    const titleField = document.querySelector(`#add-card-form__title`);
    titleField.focus();

    closeModalByCrossClick(modal);
    closeModalByDocumentClick(modal);
    favoriteToggle(modal);

    createCardHandler();
  });
};

const createCardHandler = function () {
  const mainBlock = document.querySelector(`.main__board`);
  const addCardForm = document.querySelector(`.add-card-form`);

  if (addCardForm) {
    const submitButton = addCardForm.querySelector(`.add-card-form__submit`);

    submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();

      const cardTitle = document.querySelector(`#add-card-form__title`).value;
      const cardDescription = document.querySelector(`#add-card-form__description`).value;
      const newCardId = 1000 + Number(localStorage.customCardCounter);
      const cardId = newCardId;
      const cardUserId = document.querySelector(`.add-card-form__user-id`).dataset.userId;
      const isCardFavorite = addCardForm.classList.contains(`favorite-card`);

      const newCustomCard = {title: cardTitle, body: cardDescription, id: cardId, userId: cardUserId, favorite: isCardFavorite, extendedMode: false, custom: true}

      remove(addCardForm);

      // Card rendering depend on active board and card status
      const isHomeBoardActive = document.querySelector(`.button-home`).classList.contains(`active`);
      if (isHomeBoardActive && !newCustomCard.favorite || !isHomeBoardActive && newCustomCard.favorite) {
        render(mainBlock, cardCustom(newCustomCard), `afterbegin`);
      }

      // Populate localstorage with new card
      const card = `card_${localStorage.getItem(`customCardCounter`)}`;
      localStorage[card] = JSON.stringify(newCustomCard);
      localStorage.customCardCounter++;

      if (newCustomCard.favorite) {
        customFavoriteCards.push(newCustomCard);
      } else {
        customNotFavoriteCards.push(newCustomCard);
      }

      cardEventsHandler();
    });
  }

};

export const fillCardArraysWithLocalCards = () => {
  const keys = Object.keys(localStorage);
  for (let key of keys) {
    const reg = /card_[0-9]*/g;
    let cardMatched = key.match(reg);

    if (cardMatched) {
      const cardParsed = JSON.parse(localStorage.getItem(cardMatched));

      if (cardParsed.favorite) {
        customFavoriteCards.push(cardParsed);
      } else {
        customNotFavoriteCards.push(cardParsed);
      }
    };
  };
};


import {cardEventsHandler} from '../presenter/card-presenter.js';
import {render, remove, closeModalByCrossClick, closeModalByDocumentClick, favoriteToggle, getLocalCards} from '../utils.js';
import {cardCustom} from '../view/card-custom.js';
import {cardNewPopup} from '../view/card-new-popup.js';

export const customNotFavoriteCards = [];
export const customFavoriteCards = [];

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
      const newCardId = Date.now();
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
      const card = `card_${cardId}`;
      localStorage[card] = JSON.stringify(newCustomCard);

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

  const localCards = getLocalCards();

  localCards.cardValues.forEach((item) => {
    if (item.favorite) {
      customFavoriteCards.push(item);
    } else {
      customNotFavoriteCards.push(item);
    }
  })

};




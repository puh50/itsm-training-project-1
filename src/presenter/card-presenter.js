console.log(`cardPresenter`)

import {render} from '../utils.js';
import {renderCard} from '../view/card.js';
import {extandedCard} from '../view/card-extanded-info.js';
import {cardObject} from "./card-object.js";
import {cardEdit} from "./card-edit.js";

const cards = [];

const cardFavoriteSection = document.querySelector(`.main__card-favorite-board`);

export const createObjectsFromData = (data) => {
  data.forEach((item) => {

    const newCard = Object.create(cardObject);

    newCard.title = item.title;
    newCard.body = item.body;
    newCard.id = item.id;
    newCard.userId = item.userId;

    cards.push(newCard);
  });
};

export const renderCards = () => {
  const mainBoard = document.querySelector(`.main__board`);
  const cardFavoriteBlock = cardFavoriteSection.querySelector(`.main__card-favorite-block`);
  cards.forEach((item) => {
    item.favorite
      ? render(cardFavoriteBlock, renderCard(item), `beforeend`)
      : render(mainBoard, renderCard(item), `beforeend`);
  })
};

const activeCardQualifier = (index) => {
  const activeCards = cards.filter((item) => {
    if (item.id === index + 1) {
      return item;
    }
  })

  return activeCards;
};

export const cardEventsHandler = () => {
  const cardElements = document.querySelectorAll(`.card`);

  cardElements.forEach((card, index) => {
    card.addEventListener(`click`, (evt) => {
      evt.stopPropagation();

      const currentCard = activeCardQualifier(index)[0];

      if (evt.target.classList.contains(`favorite-star`)) {
        const modal = document.querySelector(`.card-modal`);

        card.classList.toggle(`favorite-card`);

        if (modal) {
          const modalCardId = Number(modal.querySelector(`.id`).innerText);

          currentCard.id === modalCardId
            ? modal.classList.toggle(`favorite-card`)
            : false;
        }

        card.classList.contains(`favorite-card`)
          ? (cardObject.moveToFavorite(card))
          : (cardObject.moveFromFavorite(card));
      }

      if (evt.target.classList.contains(`magnifier`)) {

        currentCard.editMode = true;
        const mainBlock = document.querySelector(`.main`);
        const modal = document.querySelector(`.card-modal`);

        modal
          ? modal.remove()
          : false;

        const modalCard = Object.create(cardEdit(currentCard));

        currentCard.favorite === true && card.classList.contains(`favorite-card`)
          ? modalCard.favorite = true
          : modalCard.favorite = false;

        render(mainBlock, extandedCard(modalCard), `beforeend`);
        modalCard.closeEditMode();
        modalCard.closeEditModeByDocumentClick();
        modalCard.moveToFromFavorite(card, index);

      }

    });
  });
};


console.log(`cardPresenter2`)

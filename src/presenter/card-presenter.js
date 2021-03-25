console.log(`cardPresenter`)

import {render} from '../utils.js';
import {renderCard} from '../view/card.js';
import {extandedCard} from '../view/card-extanded-info.js';
import {cardObject} from "./card-object.js";
import {cardEdit} from "./card-edit.js";
import {getDataFromServer} from '../data.js';
import {search} from './search.js';

export const notFavoriteCards = [];
export const favoriteCards = [];
export let allCards = [];

const cardFavoriteSection = document.querySelector(`.main__card-favorite-board`);

const createObjectsFromData = (data) => {
  data.forEach((item) => {

    const newCard = Object.create(cardObject);

    newCard.title = item.title;
    newCard.body = item.body;
    newCard.id = item.id;
    newCard.userId = item.userId;
    newCard.favorite = false;

    newCard.favorite
      ? favoriteCards.push(newCard)
      : notFavoriteCards.push(newCard);

    allCards = [].concat(notFavoriteCards, favoriteCards);
  });
};

export const renderCards = (cards) => {
  const mainBoard = document.querySelector(`.main__board`);
  const cardFavoriteBlock = cardFavoriteSection.querySelector(`.main__card-favorite-block`);
  cards.forEach((item) => {
    item.favorite
      ? render(cardFavoriteBlock, renderCard(item), `beforeend`)
      : render(mainBoard, renderCard(item), `beforeend`);
  })
};

export const activeCardQualifier = (card) => {
  const activeCards = allCards.filter((item) => {
    return item.id === Number(card.dataset.id);
  })

  return activeCards;
};

export const moveCard = (currentCard, toArray, fromArray, mainArray) => {
  toArray.push(currentCard);
  fromArray.splice(defineCardIndex(fromArray, currentCard), 1);
  mainArray = [].concat(fromArray, toArray);
}

const defineCardIndex = (array, currentCard) => {
  return array.findIndex(card => card == currentCard);
}

export const cardEventsHandler = () => {
  const cardElements = document.querySelectorAll(`.card`);

  cardElements.forEach((card) => {
    card.addEventListener(`click`, (evt) => {
      evt.stopPropagation();

      const currentCard = activeCardQualifier(card)[0];

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
          ? (
            cardObject.moveToFavorite(card),
            currentCard.favorite = true,
            moveCard(currentCard, favoriteCards, notFavoriteCards, allCards)
          )
          : (
            cardObject.moveFromFavorite(card),
            currentCard.favorite = false,
            moveCard(currentCard, notFavoriteCards, favoriteCards, allCards)
          );
      }

      if (evt.target.classList.contains(`magnifier`)) {

        const mainBlock = document.querySelector(`.main`);
        const modal = document.querySelector(`.card-modal`);

        currentCard.editMode = true;

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
        modalCard.moveToFromFavorite(card);

      }

    });

  });
};

export const textHighlight = (text) => {
  const cardElements = document.querySelectorAll(`.card`);

  cardElements.forEach((card) => {
    const cardChildren = card.children;

    for (let child of cardChildren) {
      if (child.classList.contains(`card__title`)) {

        let currentTitle = child.innerHTML;
        let newTitle;

        text.indexOf(currentTitle)
          ? (
            newTitle = currentTitle.replace(new RegExp(text, `g`), `<span class="serched-text">` + text + `</span>`),
            child.innerHTML = newTitle
          )
          : false;
      }
    }
  })
}

export async function workingWithData() {
  const data = await getDataFromServer(`https://jsonplaceholder.typicode.com/posts`, `GET`);

  createObjectsFromData(data);
  renderCards(allCards);
  cardEventsHandler();
  search.typeTextHandler();
};

console.log(`cardPresenter2`)

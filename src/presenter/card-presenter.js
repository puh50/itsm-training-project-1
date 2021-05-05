console.log(`cardPresenter`)

import {remove, render} from '../utils.js';
import {renderCard} from '../view/card.js';
import {extandedCard} from '../view/card-edit.js';
import {cardEdit} from "../entities/card-edit.js";
import {getDataFromServer} from '../data.js';
import {search} from '../process/search.js';

export const notFavoriteCards = [];
export const favoriteCards = [];
export let allCards = [];

const createObjectsFromData = (data) => {
  data.forEach((item) => {

    const newCard = new Object();  // can be just "{}"

    newCard.title = item.title;
    newCard.body = item.body;
    newCard.id = item.id;
    newCard.userId = item.userId;
    newCard.favorite = false;

    if (newCard.favorite) {
      favoriteCards.push(newCard);
    } else {
      notFavoriteCards.push(newCard);
    }

    allCards = [].concat(notFavoriteCards, favoriteCards);
  });
};

export const renderCards = (cards) => {
  const mainBoard = document.querySelector(`.main__board`);

  cards.forEach((item) => {
    render(mainBoard, renderCard(item), `beforeend`);
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
  // mainArray.push([].concat(fromArray, toArray));
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
      let isCardFavorite = card.classList.contains(`favorite-card`);

      if (evt.target.classList.contains(`favorite-star`)) {
        const modal = document.querySelector(`.card-modal`);

        card.classList.toggle(`favorite-card`);
        isCardFavorite = card.classList.contains(`favorite-card`);

        if (modal) {

          const modalCardId = Number(modal.querySelector(`.id`).innerText);
          if (currentCard.id === modalCardId) {
            modal.classList.toggle(`favorite-card`);
          }

        }

        currentCard.favorite = isCardFavorite;
        remove(card);

        if (isCardFavorite) {
          moveCard(currentCard, favoriteCards, notFavoriteCards, allCards);
        } else {
          moveCard(currentCard, notFavoriteCards, favoriteCards, allCards);
        }

      }

      if (evt.target.classList.contains(`magnifier`)) {

        const mainBlock = document.querySelector(`.main`);
        const modal = document.querySelector(`.card-modal`);

        currentCard.editMode = true;

        if (modal) {
          modal.remove();
        }

        cardEdit.favorite = isCardFavorite;

        render(mainBlock, extandedCard(currentCard), `beforeend`);
        cardEdit.closeEditMode(card);
        cardEdit.closeEditModeByDocumentClick(card);
        cardEdit.moveToFromFavorite(card);

      }

    });

  });
};

export const textHighlight = (text) => {
  const cardElements = document.querySelectorAll(`.card`);

  cardElements.forEach((card) => {
    const cardChildren = card.children;

    for (const child of cardChildren) {
      if (child.classList.contains(`card__title`)) {

        const currentTitle = child.innerHTML;
        let newTitle;

        if (text.indexOf(currentTitle)) {
          newTitle = currentTitle.replace(new RegExp(text, `g`), `<span class="serched-text">` + text + `</span>`);
          child.innerHTML = newTitle;
        }

      }
    }
  })
}

export async function workingWithData() {
  const data = await getDataFromServer(`https://jsonplaceholder.typicode.com/posts`);

  createObjectsFromData(data);
  renderCards(allCards);
  cardEventsHandler();
  search.typeTextHandler();
};

console.log(`cardPresenter2`)

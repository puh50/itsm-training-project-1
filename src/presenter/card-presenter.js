console.log(`cardPresenter`)

import {remove, render, closeModalByCrossClick, closeModalByDocumentClick} from '../utils.js';
import {renderCard} from '../view/card.js';
import {cardCustom} from '../view/card-custom.js';
import {extandedCard} from '../view/card-extended.js';
import {cardExtended} from "../entities/card-extended.js";
import {getDataFromServer} from '../data.js';
import {search} from '../process/search.js';
import {cardObject} from '../entities/card.js';
import {customNotFavoriteCards, customFavoriteCards} from '../process/create-card.js';

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
    newCard.custom = false;

    if (newCard.favorite) {
      favoriteCards.push(newCard);
    } else {
      notFavoriteCards.push(newCard);
    }

    allCards = [].concat(customNotFavoriteCards, customFavoriteCards, notFavoriteCards, favoriteCards);
  });
};

export const renderCards = (cards) => {
  const mainBoard = document.querySelector(`.main__board`);

  cards.forEach((item) => {
    if (item.custom) {
      render(mainBoard, cardCustom(item), `beforeend`);
    } else {
      render(mainBoard, renderCard(item), `beforeend`);
    }
  })

};

export const activeCardQualifier = (card) => {
  const activeCards = allCards.filter((item) => {
    return Number(item.id) === Number(card.dataset.id);
  })

  return activeCards;
};

export const moveCard = (currentCard, toArray, fromArray, mainArray) => {
  toArray.push(currentCard);
  fromArray.splice(defineCardIndex(fromArray, currentCard), 1);
  // mainArray.push([].concat(fromArray, toArray));
  mainArray = [].concat(fromArray, toArray);
}

export const moveCustomFavoriteCard = (card) => {
  const currentCard = activeCardQualifier(card)[0];
  const keys = Object.keys(localStorage);

  for (let key of keys) {
    const reg = /card_[0-9]*/g;
    let cardMatched = key.match(reg);

    if (cardMatched) {
      const cardParsed = JSON.parse(localStorage.getItem(cardMatched));
      if (currentCard.id === cardParsed.id) {
        cardParsed.favorite = true;
        moveCard(currentCard, customFavoriteCards, customNotFavoriteCards, allCards);
        localStorage.setItem(cardMatched, JSON.stringify(cardParsed));
      }

    }
  }
}

export const moveCustomNotFavoriteCard = (card) => {
  const currentCard = activeCardQualifier(card)[0];
  const keys = Object.keys(localStorage);

  for (let key of keys) {
    const reg = /card_[0-9]*/g;
    let cardMatched = key.match(reg);

    if (cardMatched) {
      const cardParsed = JSON.parse(localStorage.getItem(cardMatched));
      if (currentCard.id === cardParsed.id) {
        cardParsed.favorite = false;
        moveCard(currentCard, customNotFavoriteCards, customFavoriteCards, allCards);
        localStorage.setItem(cardMatched, JSON.stringify(cardParsed));
      }

    }
  }
}

const defineCardIndex = (array, currentCard) => {
  return array.findIndex(card => card == currentCard);
}

export const cardEventsHandler = () => {
  allCards = [].concat(customNotFavoriteCards, customFavoriteCards, notFavoriteCards, favoriteCards);
  const cardElements = document.querySelectorAll(`.card`);

  cardElements.forEach((card) => {
    card.addEventListener(`click`, (evt) => {
      evt.stopPropagation();

      const currentCard = activeCardQualifier(card)[0];
      let isCardFavorite = card.classList.contains(`favorite-card`);
      const isCardCustom = card.classList.contains(`card-custom`);

      if (evt.target.classList.contains(`favorite-star`)) {
        const modal = document.querySelector(`.card-modal`);

        card.classList.toggle(`favorite-card`);
        isCardFavorite = card.classList.contains(`favorite-card`);

        if (modal) {
          const modalCardId = Number(modal.querySelector(`.id`).innerText);
          if (currentCard.id === modalCardId) {
            modal.classList.toggle(`favorite-card`);
          }
        };

        currentCard.favorite = isCardFavorite;
        remove(card);

        if (isCardCustom && isCardFavorite) {
          moveCustomFavoriteCard(card);
        } else if (!isCardCustom && isCardFavorite) {
          moveCard(currentCard, favoriteCards, notFavoriteCards, allCards);
        };

        if (isCardCustom && !isCardFavorite) {
          moveCustomNotFavoriteCard(card);
        } else if (!isCardCustom && !isCardFavorite) {
          moveCard(currentCard, notFavoriteCards, favoriteCards, allCards);
        };

      };

      if (evt.target.classList.contains(`magnifier`)) {

        const mainBlock = document.querySelector(`.main`);
        const modal = document.querySelector(`.card-modal`);

        currentCard.extendedMode = true;
        cardExtended.favorite = isCardFavorite;

        if (modal) {
          remove(modal);
        }

        render(mainBlock, extandedCard(currentCard), `beforeend`);
        cardExtended.closeExtendedMode(card);
        cardExtended.closeExtendedModeByDocumentClick(card);
        cardExtended.moveToFromFavorite(card);

      }

      if (evt.target.classList.contains(`recycle-bin`)) {
        remove(evt.target.parentElement);

        const keys = Object.keys(localStorage);
        for (let key of keys) {
          const reg = /card_[0-9]*/g;
          let cardMatched = key.match(reg);

          if (cardMatched) {
            const cardParsed = JSON.parse(localStorage.getItem(cardMatched));
            if (currentCard.id === cardParsed.id) {
              localStorage.removeItem(cardMatched);

              if (currentCard.favorite) {
                customFavoriteCards.splice(defineCardIndex(customFavoriteCards, currentCard), 1);
              } else {
                customNotFavoriteCards.splice(defineCardIndex(customNotFavoriteCards, currentCard), 1);
              };

            };

          };
        };

      };

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
  renderCards(customNotFavoriteCards);
  renderCards(notFavoriteCards);
  cardEventsHandler();
  search.typeTextHandler();
};

console.log(`cardPresenter2`)

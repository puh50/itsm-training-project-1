console.log(`cardPresenter`)

import {remove, render, getLocalCards, getLocalCardById} from '../utils.js';
import {renderCard} from '../view/card.js';
import {cardCustom} from '../view/card-custom.js';
import {extandedCard} from '../view/card-extended.js';
import {cardExtended} from "../entities/card-extended.js";
import {getDataFromServer} from '../data.js';
import {search} from '../process/search.js';
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

export const renderCards = (cards, where = `afterbegin`) => {
  const mainBoard = document.querySelector(`.main__board`);

  cards.forEach((item) => {
    if (item.custom) {
      render(mainBoard, cardCustom(item), where);
    } else {
      render(mainBoard, renderCard(item), where);
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
  const localCards = getLocalCards();
  const cardParsedCurrent = getLocalCardById(localCards, currentCard);

  cardParsedCurrent[0].favorite = true;
  moveCard(currentCard, customFavoriteCards, customNotFavoriteCards, allCards);
  localStorage.setItem(`card_${currentCard.id}`, JSON.stringify(cardParsedCurrent[0]));
}

export const moveCustomNotFavoriteCard = (card) => {
  const currentCard = activeCardQualifier(card)[0];
  const localCards = getLocalCards();
  const cardParsedCurrent = getLocalCardById(localCards, currentCard);

  cardParsedCurrent[0].favorite = false;
  moveCard(currentCard, customNotFavoriteCards, customFavoriteCards, allCards);
  localStorage.setItem(`card_${currentCard.id}`, JSON.stringify(cardParsedCurrent[0]));
}

const defineCardIndex = (array, currentCard) => {
  return array.findIndex(card => card == currentCard);
}

const saveDescriptionHandler = (card, currentCard, button) => {
  button.addEventListener(`click`, () => {
    const description = card.querySelector(`.card__description-text`);
    const textarea = card.querySelector(`textarea`);

    description.style.display = `inline`;
    description.innerText = textarea.value;
    currentCard.body = description.innerText;

    const localCards = getLocalCards();
    const cardParsedCurrent = getLocalCardById(localCards, currentCard);
    cardParsedCurrent[0].body = description.innerText;
    localStorage[`card_${currentCard.id}`] = JSON.stringify(cardParsedCurrent[0]);
  });
}

const cancelDescriptionHandler = (card, button, initialValue) => {
  button.addEventListener(`click`, () => {
    const description = card.querySelector(`.card__description-text`);

    description.style.display = `inline`;
    description.innerText = initialValue;
  });
}

const saveTitleHandler = (card, currentCard, button) => {
  button.addEventListener(`click`, () => {
    const title = card.querySelector(`.card__title-text`);
    const input = card.querySelector(`input`);

    title.innerText = input.value;
    currentCard.title = title.innerText;

    const localCards = getLocalCards();
    const cardParsedCurrent = getLocalCardById(localCards, currentCard);
    cardParsedCurrent[0].title = title.innerText;
    localStorage[`card_${currentCard.id}`] = JSON.stringify(cardParsedCurrent[0]);
  });
}

const cancelTitleHandler = (card, button, initialValue) => {
  button.addEventListener(`click`, () => {
    const title = card.querySelector(`.card__title-text`);

    title.innerText = initialValue;
  });
};

export const cardEventsHandler = () => {
  allCards = [].concat(customNotFavoriteCards, customFavoriteCards, notFavoriteCards, favoriteCards);
  const cardElements = document.querySelectorAll(`.card`);

  cardElements.forEach((card) => {
    card.addEventListener(`click`, (evt) => {
      evt.stopPropagation();
      console.dir(evt.target)

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
        localStorage.removeItem(`card_${currentCard.id}`);

        if (currentCard.favorite) {
          customFavoriteCards.splice(defineCardIndex(customFavoriteCards, currentCard), 1);
        } else {
          customNotFavoriteCards.splice(defineCardIndex(customNotFavoriteCards, currentCard), 1);
        };
      };

      if (!card.querySelector(`input`)) {
        if (evt.target.classList.contains(`card__title-label`) || evt.target.classList.contains(`card__title-text`)) {
          const title = card.querySelector(`.card__title-text`);
          title.style.textAlign = `right`;
          title.style.fontSize = `30px`;

          const titleText = title.innerText;
          title.innerHTML = `<input type="text" value="${titleText}" style="width: 100%">
                              <div style="text-align: right; margin-top: -6px;">
                                <button class="title-save-button" style="font-size: 16px; margin-right: -4px; cursor: pointer;" title="Save">&#x2713;</button>
                                <button class="title-cancel-button" style="font-size: 16px; cursor: pointer;" title="Cancel">&#x2717;</button>
                              </div>`;

          const saveTitleButton = card.querySelector(`.title-save-button`);
          const cancelTitleButton = card.querySelector(`.title-cancel-button`);
          const input = card.querySelector(`input`);
          const inputInitialValue = input.value;

          saveTitleHandler(card, currentCard, saveTitleButton);
          cancelTitleHandler(card, cancelTitleButton, inputInitialValue);
        };
      }

      if (!card.querySelector(`textarea`)) {
        if (evt.target.classList.contains(`card__description-label`) || evt.target.classList.contains(`card__description-text`)) {
          const description = card.querySelector(`.card__description-text`);
          description.style.display = `block`;

          const descriptionText = description.innerText;
          description.innerHTML = `<textarea type="text" rows="7" style="width: 100%">${descriptionText}</textarea>
                                    <div style="text-align: right">
                                      <button class="description-save-button" style="cursor: pointer;" title="Save">&#x2713;</button>
                                      <button class="description-cancel-button" style="cursor: pointer;" title="Cancel">&#x2717;</button>
                                    </div>`;

          const saveDescriptionButton = card.querySelector(`.description-save-button`);
          const cancelDescriptionButton = card.querySelector(`.description-cancel-button`);
          const textarea = card.querySelector(`textarea`);
          const textareainitialValue = textarea.defaultValue;

          saveDescriptionHandler(card, currentCard, saveDescriptionButton);
          cancelDescriptionHandler(card, cancelDescriptionButton, textareainitialValue);
        }
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
  renderCards(notFavoriteCards);
  renderCards(customNotFavoriteCards);
  cardEventsHandler();
  search.typeTextHandler();
};

console.log(`cardPresenter2`)

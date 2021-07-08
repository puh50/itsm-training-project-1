console.log(`utils`);

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const clear = (element) => {
  element.innerHTML = ``;
};

export const remove = (element) => {
  element.remove();
}

export const closeModalByCrossClick = (modal) => {
  if (modal) {
    const cross = modal.querySelector(`.close-button`);

    cross.addEventListener(`click`, () => {
      remove(modal);
    });
  }
};

export const closeModalByDocumentClick = (modal) => {

  document.addEventListener(`click`, (evt) => {
    if (modal && !modal.contains(evt.target)) {
      remove(modal);
    }
  }, true);
};

export const favoriteToggle = (element) => {
  // const modal = document.querySelector(`.modal`);
  if (element) {
    const star = element.querySelector(`.favorite-star`);

    star.addEventListener(`click`, () => {
      element.classList.toggle(`favorite-card`);
    }, true);
  };

};

export const getLocalCards = () => {
  const keys = Object.keys(localStorage);

  const localCards = {
    cardKeys: [],
    cardValues: [],
  };

  for (const key of keys) {
    const reg = /card_[0-9]*/g;
    const cardMatched = key.match(reg);

    if (cardMatched) {
      const cardParsed = JSON.parse(localStorage.getItem(cardMatched));

      localCards.cardKeys.push(cardMatched[0]);
      localCards.cardValues.push(cardParsed);
    };

  };

  return localCards;
};

export const getLocalCardById = (localCards, currentCard) => {
  return localCards.cardValues.filter((item) => {
    return currentCard.id === item.id;
  });
}

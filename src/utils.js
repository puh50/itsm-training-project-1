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

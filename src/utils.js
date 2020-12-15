import {createCard} from './view/card.js';

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const clear = (element) => {
  element.innerHTML = ``;
};

export const remove = (element) => {
  element.remove();
}

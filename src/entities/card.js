import {render} from "../utils";
import {extandedCard} from '../view/card-extended.js';
import {cardExtended} from '../entities/card-extended.js';

export const cardObject = {
  title: ``,
  body: ``,
  id: ``,
  userId: ``,
  favorite: false,
  extendedMode: false,

  openExtendedMode: function (card) {
    this.extendedMode = true;

    // const magnifierButton = this.querySelector(`.magnifier`);

    // magnifierButton.addEventListener(`click`, () => {

    const mainBlock = document.querySelector(`.main`);
    const modalCard = Object.create(cardExtended);
    render(mainBlock, extandedCard(modalCard), `beforeend`);
    // })
  },

}

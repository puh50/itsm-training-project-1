import {render} from "../utils";

export const cardObject = {
  title: ``,
  body: ``,
  id: ``,
  userId: ``,
  favorite: false,
  editMode: false,

  openEditMode: function () {
    this.editMode = true;

    const magnifierButton = this.querySelector(`.magnifier`);

    magnifierButton.addEventListener(`click`, () => {

      const mainBlock = document.querySelector(`.main`);
      const modalCard = Object.create(cardEdit(this));
      render(mainBlock, extandedCard(modalCard), `beforeend`);
    })
  },

}

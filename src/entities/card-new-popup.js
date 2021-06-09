import {cardExtended} from "./card-extended.js"

export const cardNewPopupObject = Object.create(cardExtended);

cardNewPopupObject.element = document.querySelector(`.add-card-form`);

cardNewPopupObject.favorite = false;


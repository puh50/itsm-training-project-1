import {createMainBoard} from './view/main-board.js';
import {createCard} from './view/card.js';
import {extandedCardSection} from './view/card-extanded-block.js';
import {extandedCard} from './view/card-extanded-info.js';
import {favoriteBlock} from './view/favorite-block.js';
import {getDataFromServer} from './data.js';
import {render, clear} from './utils.js';


const siteMainSection = document.querySelector(`.main`);
const cardInfoBoardsSection = document.querySelector(`.main__card-info-boards`);
render(cardInfoBoardsSection, createMainBoard(), `beforeend`);
render(cardInfoBoardsSection, extandedCardSection(), `beforeend`);
const cardFavoriteSection = document.querySelector(`.main__card-favorite-board`);
render(cardFavoriteSection, favoriteBlock(), `beforeend`);
const extandedCardBlock = cardInfoBoardsSection.querySelector(`.main__card-full-section`);
const cardFavoriteBlock = cardFavoriteSection.querySelector(`.main__card-favorite-block`)

const mainBoard = cardInfoBoardsSection.querySelector(`.main__board`);
getDataFromServer(`https://jsonplaceholder.typicode.com/posts`, `GET`)
  .then((data) => {
    data.forEach((item) => {
      render(mainBoard, createCard(item), `beforeend`);
    });

    return data;
  })
  .then((data) => {
    const cards = siteMainSection.querySelectorAll(`.card`);

    cards.forEach((card, index) => {
      card.addEventListener(`click`, (evt) => {

        const activeCard = data.filter((card) => {
          if (card.id === index + 1) {
            return true;
          }
        })

        if (evt.target.classList.contains(`favorite-star`)) {
          card.classList.toggle(`favorite-card`);

          card.classList.contains(`favorite-card`)
            ? cardFavoriteBlock.appendChild(card)
            : mainBoard.appendChild(card);
        }

        clear(extandedCardBlock);
        render(extandedCardBlock, extandedCard(activeCard[0]), `beforeend`);

      });
    })

  })
  .catch((err) => alert(`The following error is occured: ${err}`));


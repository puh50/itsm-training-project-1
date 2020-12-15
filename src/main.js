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
    const items = data.map((item) => {
      render(mainBoard, createCard(item), `beforeend`);
    });

    return data;
  })
  .then((data) => {
    const cards = siteMainSection.querySelectorAll(`.card`);
    const stars = siteMainSection.querySelectorAll(`.favorite-star`);

    for (let i = 0; i < cards.length; i++) {

      cards[i].addEventListener(`click`, () => {

        const activeCard = data.filter((card) => {
          if (card.id === i + 1) {
            return true;
          }
        })

        clear(extandedCardBlock);
        render(extandedCardBlock, extandedCard(activeCard[0]), `beforeend`);

      });
    }

    stars.forEach((star) => {
      star.addEventListener(`click`, () => {
        const currentCard = star.parentElement;
        currentCard.classList.toggle(`favorite-card`);

        star.parentElement.classList.contains(`favorite-card`)
          ? cardFavoriteBlock.appendChild(currentCard)
          : mainBoard.appendChild(currentCard);

      })
    })

  })
  .catch((err) => alert(`The following error is occured: ${err}`));


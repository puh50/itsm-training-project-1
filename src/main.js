import {createMainBoard} from './view/main-board.js';
import {createCard} from './view/card.js';
import {extandedCard} from './view/card-extanded.js';
import {getDataFromServer} from './data.js';
import {render, clear} from './utils.js';


const siteMainSection = document.querySelector(`.main`);
render(siteMainSection, createMainBoard(), `beforeend`);
render(siteMainSection, extandedCard(), `beforeend`);
const extandedCardBlock = siteMainSection.querySelector(`.main__card-full`)

const mainBoard = siteMainSection.querySelector(`.main__board`);
getDataFromServer(`https://jsonplaceholder.typicode.com/posts`, `GET`)
  .then((data) => {
    const items = data.map((item) => {
      createCard.title = item.title;
      createCard.body = item.body;
      render(mainBoard, createCard(item), `beforeend`);
    });

    return items;
  })
  .then(() => {
    const cards = mainBoard.querySelectorAll(`.card`);
    for (let i = 0; i < cards.length; i++) {
      cards[i].addEventListener(`click`, () => {
        clear(extandedCardBlock);
        render(extandedCardBlock, cards[i].innerHTML, `beforeend`);
      })
    }

  })
  .catch((err) => alert(`The following error is occured: ${err}`));


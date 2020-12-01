import {createMainBoard} from "./view/main-board.js";
import {createCard} from "./view/card.js";
import {getDataFromServer} from "./data.js";

const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
}

const siteMainSection = document.querySelector(`.main`);
render(siteMainSection, createMainBoard(), `beforeend`);

getDataFromServer(`https://jsonplaceholder.typicode.com/posts`)
    .then((data) => {
        const mainBoard = siteMainSection.querySelector(`.main__board`);
        const items = data.map((item) => {
            createCard.title = item.title;
            createCard.body = item.body;
            render(mainBoard, createCard(item), `beforeend`);
        })

        return items;
    })
    .catch(err => alert(`The following error is occured: ${err}`))

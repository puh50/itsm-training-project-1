`use strict`;

export const createCard = (card) => {

    const {title = 'title', body = 'body'} = card;

    return `<div class='main__board-card card'>
                <h1 class='card__title'>Title: ${title}</h1>
                <p class='card__description'>Description: ${body}</p>
            </div>`;
};
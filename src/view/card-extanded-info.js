export const extandedCard = (card) => {
  const {title, body, id, userId} = card;

  return `<h1 class='card__title'>Title: ${title}</h1>
          <p class='card__description'>Description: ${body}</p>
          <p class='card__id'>ID: ${id}</p>
          <p class='card__user-id'>User ID: ${userId}</p>`;
}

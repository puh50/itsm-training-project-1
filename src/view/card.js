console.log(`renderCard`)

export const renderCard = (card) => {
  const {title, body, favorite, id, userId} = card;

  const favoriteCard = favorite
    ? `favorite-card`
    : ``;

  return `<div class='main__board-card card ${favoriteCard}' data-id=${id}>
          <svg class="magnifier" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z"/>
          </svg>
          <svg class="favorite-star" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              width="25px" height="25px" viewBox="0 0 612 612" style="enable-background:new 0 0 612 612;" xml:space="preserve">
            <g>
            <path  d="M387.674,238.179L305.583,0l-84.428,236.26L0,238.179l181.82,150.942L116.475,612l189.108-135.308L494.69,612
              l-65.372-221.433L612,238.179H387.674z M452.964,556.058L305.583,434.659l-147.38,121.398l55.664-173.475L69.545,265.664
              l172.139-2.142l63.898-180.401l62.007,182.543h174.864L395.24,382.556L452.964,556.058z"/>
            </g>
          </svg>
              <h1 class='card__title'>Title: ${title}</h1>
              <p class='card__description'>Description: ${body}</p>
              <p class='card__id visually-hidden'>ID: ${id}</p>
              <p class='card__user-id visually-hidden'>User ID: ${userId}</p>
          </div>`;
};

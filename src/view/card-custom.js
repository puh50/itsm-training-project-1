export const cardCustom = (card) => {
  const {title, body, favorite, id, userId} = card;

  const favoriteCard = favorite
    ? `favorite-card`
    : ``;

  return `<div class='main__board-card card card-custom ${favoriteCard}' data-id=${id}>
            <button class="magnifier" title="Open card"></button>
            <button class="recycle-bin" title="Remove card"></button>
            <svg class="favorite-star" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 612 612">
              <title>Move to favorite</title>
              <g>
                <path  d="M387.674,238.179L305.583,0l-84.428,236.26L0,238.179l181.82,150.942L116.475,612l189.108-135.308L494.69,612
                l-65.372-221.433L612,238.179H387.674z M452.964,556.058L305.583,434.659l-147.38,121.398l55.664-173.475L69.545,265.664
                l172.139-2.142l63.898-180.401l62.007,182.543h174.864L395.24,382.556L452.964,556.058z"/>
              </g>
            </svg>
              <h1 class='card__title'>
                <label class='card__title-label' for=".card__title-text">Title:</label>
                <span class='card__title-text'>${title}</span>
               </h1>
              <p class='card__description'>
                <label class='card__description-label' for=".card__description-text">Description:</label>
                <span class='card__description-text'>${body}</span>
              </p>
              <p class='card__id visually-hidden'>ID: ${id}</p>
              <p class='card__user-id visually-hidden'>User ID: ${userId}</p>
          </div>`;
};

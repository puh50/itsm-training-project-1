export const cardNewPopup = () => {

  const userId = 1001;

  return `<form class="add-card-form modal" action="#" method="post">

    <button class="close-button" title="Close/Cancel adding">
      <span><b>&#215;</b></span>
    </button>

    <svg class="favorite-star" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 612 612">
      <title>Mark as favorite</title>
      <g>
      <path d="M387.674,238.179L305.583,0l-84.428,236.26L0,238.179l181.82,150.942L116.475,612l189.108-135.308L494.69,612
        l-65.372-221.433L612,238.179H387.674z M452.964,556.058L305.583,434.659l-147.38,121.398l55.664-173.475L69.545,265.664
        l172.139-2.142l63.898-180.401l62.007,182.543h174.864L395.24,382.556L452.964,556.058z"/>
      </g>
    </svg>

    <h1>Add new card</h1>

    <div>
      <label for="add-card-form__title">Title</label>
      <input type="text" id="add-card-form__title" required="required">
    </div>

    <div>
      <label for="add-card-form__description">Description</label>
      <textarea name="" id="add-card-form__description" cols="30" rows="10" required="required"></textarea>
      <p class="add-card-form__id visually-hidden" data-id="custom">ID: custom</p>
      <p class="add-card-form__user-id visually-hidden" data-user-id=${userId}>User ID: ${userId}</p>
    </div>

    <div class="add-card-form__buttons">
      <button type="reset">Reset</button>
      <button type="" class="add-card-form__submit">Save</button>
    </div>

  </form>`;

}

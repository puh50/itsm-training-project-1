export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const clear = (element) => {
  element.innerHTML = ``;
};

console.log(`getDataFromServer`)

export const getDataFromServer = (url) => {
  return fetch(url, {
    method: `GET`,
  })
    .then((resolve) => resolve.json())
    .catch((err) => alert(`The following error is occured: ${err}`));
};

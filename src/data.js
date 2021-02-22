console.log(`getDataFromServer`)

export const getDataFromServer = (url, method) => {
  return fetch(url, {
    method,
  })
    .then((resolve) => resolve.json())
    .catch((err) => alert(`The following error is occured: ${err}`));
};

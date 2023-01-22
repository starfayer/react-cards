const ACCESS_KEY = 'ge4dOpKIumal1ZDwduYLxOyHcbU_g5af-M7m82vTu0w';
const defaultPhotoCount = 12;

function parseUrl(url: string) {
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error with response: ${res.status}`);
      } else return res;
    })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
}

function getRandomPhotos(count?: number) {
  if (!count) count = defaultPhotoCount;
  const url = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=${count}`;

  const res = parseUrl(url);
  return res;
}
function getPhotoByURI(photoURI: string) {
  const stringArray = photoURI.split('/');
  const id = stringArray[stringArray.length - 1];
  const url = `https://api.unsplash.com/photos/${id}?client_id=${ACCESS_KEY}`;

  const res = parseUrl(url);
  return res;
}
function getRandomUserPhotos(profileURI: string) {
  const stringArray = profileURI.split('/');
  const lastEl = stringArray[stringArray.length - 1].split('');
  lastEl.splice(0, 1);
  const username = lastEl.join('');
  const url = `https://api.unsplash.com/users/${username}/photos/?client_id=${ACCESS_KEY}&quantity=1`;

  const res = parseUrl(url);
  return res;
}

export { getRandomPhotos, getPhotoByURI, getRandomUserPhotos };

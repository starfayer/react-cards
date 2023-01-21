const ACCESS_KEY = 'ge4dOpKIumal1ZDwduYLxOyHcbU_g5af-M7m82vTu0w';
const defaultPhotoCount = 12;

async function getRandomPhotos(count?: number) {
  if (!count) count = defaultPhotoCount;
  const url = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=${count}`;

  const res = fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error with response: ${res.status}`);
      } else return res;
    })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return res;
}

export { getRandomPhotos };

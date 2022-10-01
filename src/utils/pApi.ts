const ACCESS_KEY = 'ge4dOpKIumal1ZDwduYLxOyHcbU_g5af-M7m82vTu0w';

function getRandomPhotos(count: number) {
  const req = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=${count}`;

  const res = fetch(req).then((res) => res.json());
  return res;
}

export { getRandomPhotos };

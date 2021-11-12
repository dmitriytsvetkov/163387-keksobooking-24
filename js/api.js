const SERVER_URL = 'https://24.javascript.pages.academy/keksobooking';
const DATA_PATH = 'data';

const sendData = async (body) => {
  const response = await fetch(`${SERVER_URL}`, {
    method: 'POST',
    body: body,
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

const getData = async () => {
  const response = await fetch(`${SERVER_URL}/${DATA_PATH}`);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
};

export {getData, sendData};

const sendData = async (body) => {
  const response = await fetch('https://24.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body: body,
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

const getData = async () => {
  const response = await fetch('https://24.javascript.pages.academy/keksobooking/data');
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

export {getData, sendData};

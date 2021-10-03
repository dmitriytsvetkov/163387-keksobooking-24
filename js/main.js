const getRandomInteger = (minValue, maxValue) => {
  if (minValue < 0 || maxValue < 0) {
    throw new Error('Min or Max value must be greater or equals to 0');
  }
  if (maxValue <= minValue) {
    throw new Error('Min should be less than max');
  }
  return Math.floor(minValue + Math.random() * (maxValue + 1 - minValue));
};

const getRandomFloat = (minValue, maxValue, precision) => {
  if (minValue < 0 || maxValue < 0) {
    throw new Error('Min or Max value must be greater or equals to 0');
  }
  if (maxValue <= minValue) {
    throw new Error('Min should be less than max');
  }
  return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue).toFixed(precision));
};

getRandomInteger(0, 5);
getRandomFloat(0, 1, 2);

const AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};



const createLoc = () => ({
  lat: getRandomFloat(35.65000, 35.70000, 5),
  lng: getRandomFloat(139.70000, 139.80000, 5),
});

const getRandomArray = ([...source], maxLength) => Array.from(
  { length: Math.min(source.length, 1 + Math.random() * maxLength | 0) },
  () => source.splice(Math.random() * source.length | 0, 1)[0]
);

const res = [];

const createOffer = () => {
  AVATARS.forEach((element) => {
    const loc = createLoc();
    const result = {
      author: {
        avatar: element,
      },
      offer: {
        title: 'test',
        address: `${loc.lat}, ${loc.lng}`,
        price: getRandomInteger(1, 100),
        type: getRandomArrayElement(OFFER_TYPES),
        rooms: getRandomInteger(1, 5),
        guests: getRandomInteger(1, 4),
        checkin: getRandomArrayElement(TIMES),
        checkout: getRandomArrayElement(TIMES),
        features : getRandomArray(FEATURES, FEATURES.length),
        description: 'test',
        photos: getRandomArray(PHOTOS, PHOTOS.length),
      },
      location: loc,
    };
    res.push(result);
  });
};

createOffer();

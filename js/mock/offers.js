import {getRandomArray, getRandomArrayElement, getRandomFloat, getRandomInteger} from '../utils.js';

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

const TITLES = [
  'название1',
  'название2',
  'название3',
  'название4',
  'название5',
  'название6',
  'название7',
];

const DESCRIPTIONS = [
  'описание1',
  'описание2',
  'описание3',
  'описание4',
  'описание5',
  'описание6',
  'описание7',
];

const createLocation = () => ({
  lat: getRandomFloat(35.65000, 35.70000, 5),
  lng: getRandomFloat(139.70000, 139.80000, 5),
});

const createOffer = () => {
  const location = createLocation();
  return {
    author: {
      avatar: getRandomArrayElement(AVATARS),
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${location.lat}, ${location.lng}`,
      price: getRandomInteger(1, 100),
      type: getRandomArrayElement(OFFER_TYPES),
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 4),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features : getRandomArray(FEATURES, FEATURES.length),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArray(PHOTOS, PHOTOS.length),
    },
    location: location,
  };
};

const OFFERS_COUNT = 10;

const createOffers = () => {
  const result = [];
  // eslint-disable-next-line id-length
  for(let i = 0; i < OFFERS_COUNT; i++) {
    result.push(createOffer());
  }
  return result;
};

export {createOffers};

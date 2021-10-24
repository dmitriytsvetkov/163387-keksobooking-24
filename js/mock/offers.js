import {getRandomArray, getRandomArrayElement, getRandomFloat, getRandomInteger, getRandomElementFromObject} from '../utils.js';

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

const HouseTypes = {
  palace: 'palace',
  flat: 'flat',
  house: 'house',
  bungalow: 'bungalow',
  hotel: 'hotel',
};

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
  'Sirena Palace Family Hotel',
  'HVD Reina del Mar - 24 Hours Premium',
  'Отель Paraizo Beach',
  'Family Hotel Jemelly',
  'Park Hotel Argo - All Inclusive',
  'Obzor City Hotel',
  'Sunrise Blue Magic',
];

const DESCRIPTIONS = [
  'Апарт-отель Sirena Palace расположен в городе Обзор. К услугам гостей кондиционер, бесплатный Wi-Fi и бесплатная частная парковка.',
  'Отель HVD Reina del Mar - 24 Hours Premium типа «все включено» расположен в городе Обзор. К услугам гостей частный пляж с бесплатными шезлонгами и зонтиками, 3 бассейна для взрослых (1 из них с подогревом) и 1 детский бассейн с подогревом. Предоставляется бесплатный Wi-Fi.',
  'Отель Paraizo Beach расположен на первой пляжной линии. К услугам гостей сезонный открытый бассейн и номера с кондиционером и бесплатным Wi-Fi. В числе других бесплатных услуг — зонтики и шезлонги на пляже. Напротив отеля находится бесплатная общественная парковка.',
  'Отель Family Jemelly расположен в Обзоре, в 700 м от пляжа. К услугам гостей бесплатный Wi-Fi на всей территории отеля, а также светлые и уютные номера с кондиционером и кабельным телевидением.',
  'Отель Park Argo с открытым бассейном и рестораном национальной кухни на 150 посадочных мест находится в городке Обзор, в 350 метрах от ближайшего пляжа. К услугам гостей бесплатный Wi-Fi.',
  'Отель Obzor City расположен в городе Обзор. В распоряжении гостей номера с кондиционером и бесплатным Wi-Fi. За дополнительную плату можно воспользоваться отдельной сезонной и частной парковками на территории отеля.',
  'Курортный отель Sunrise Blue Magic расположен в Обзоре. К услугам гостей сезонный открытый бассейн, фитнес-центр, принадлежности для барбекю, круглосуточная стойка регистрации, ресторан и детская игровая площадка. Гости могут пользоваться бесплатным Wi-Fi и камерой хранения багажа.',
];

const OFFERS_COUNT = 10;

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
      type: getRandomElementFromObject(HouseTypes),
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

const createOffers = () => {
  const result = [];
  // eslint-disable-next-line id-length
  for(let i = 0; i < OFFERS_COUNT; i++) {
    result.push(createOffer());
  }
  return result;
};

export {createOffers, HouseTypes};

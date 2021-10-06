import {createOffer} from './offers.js';

const OFFERS_COUNT = 10;

const createOffers = () => {
  const result = [];
  // eslint-disable-next-line id-length
  for(let i = 0; i < OFFERS_COUNT; i++) {
    result.push(createOffer());
  }
  return result;
};

const offers = createOffers();
// eslint-disable-next-line no-console
console.log(offers);

import {createPopup} from './popup.js';
import {createOffers} from './mock/offers.js';

const mapCanvas = document.querySelector('#map-canvas');

const offers = createOffers();
const popupElement = createPopup(offers[0]);
mapCanvas.appendChild(popupElement);

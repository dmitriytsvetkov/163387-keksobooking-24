import {createPopup} from './popup.js';
import {createOffers} from './mock/offers.js';
import {disableForms, enableForms, setValidationForm} from './form.js';

const mapCanvas = document.querySelector('#map-canvas');

const offers = createOffers();
const popupElement = createPopup(offers[0]);
mapCanvas.appendChild(popupElement);

disableForms();
enableForms();
setValidationForm();

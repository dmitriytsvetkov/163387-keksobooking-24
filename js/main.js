import {disableForms, setValidationForm} from './form.js';
import {mapInit} from './map.js';
import {createOffers} from './mock/offers.js';

const offers = createOffers();
disableForms();
mapInit(offers);

setValidationForm();

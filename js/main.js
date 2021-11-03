import {disableForms, setUserFormSubmit, setValidationForm, setTypeClick, setPriceClick, setRoomsClick, setHousingGuestsClick, setFeaturesClick} from './form.js';
import {mapInit, createOffers} from './map.js';
import {createFailPopup, createSuccessPopup} from './popup.js';
import {getData} from './api.js';
import {enableForms} from './form.js';
import {debounce} from './utils/debounce.js';

const RERENDER_DELAY = 500;

disableForms();
getData((offers) => {
  mapInit(offers);
  enableForms();
  setUserFormSubmit(createSuccessPopup);
  setValidationForm();
  setTypeClick(debounce(
    () => createOffers(offers),
    RERENDER_DELAY,
  ));
  setPriceClick(debounce(
    () => createOffers(offers),
    RERENDER_DELAY,
  ));
  setRoomsClick(debounce(
    () => createOffers(offers),
    RERENDER_DELAY,
  ));
  setHousingGuestsClick(debounce(
    () => createOffers(offers),
    RERENDER_DELAY,
  ));
  setFeaturesClick(debounce(
    () => createOffers(offers),
    RERENDER_DELAY,
  ));
}, () => {
  createFailPopup('Произошла ошибка при загрузке данных', 'OK');
});

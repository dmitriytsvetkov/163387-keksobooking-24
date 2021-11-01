import {disableForms, setUserFormSubmit, setValidationForm, setTypeClick, setPriceClick, setRoomsClick, setHousingGuestsClick, setFeaturesClick} from './form.js';
import {mapInit, createOffers} from './map.js';
import {createFailPopup, createSuccessPopup} from './popup.js';
import {getData} from './api.js';
import {enableForms} from './form.js';

disableForms();
getData((offers) => {
  mapInit(offers);
  enableForms();
  setUserFormSubmit(createSuccessPopup);
  setValidationForm();
  setTypeClick(() => {
    createOffers(offers);
  });
  setPriceClick(() => {
    createOffers(offers);
  });
  setRoomsClick(() => {
    createOffers(offers);
  });
  setHousingGuestsClick(() => {
    createOffers(offers);
  });
  setFeaturesClick(() => {
    createOffers(offers);
  });
}, () => {
  createFailPopup('Произошла ошибка при загрузке данных', 'OK');
});

import {disableForms, setUserFormSubmit, setValidationForm} from './form.js';
import {mapInit} from './map.js';
import {createFailPopup, createSuccessPopup} from './popup.js';
import {getData} from './api.js';
import {enableForms} from './form.js';

disableForms();
getData((offers) => {
  mapInit(offers);
  enableForms();
}, () => {
  createFailPopup('Произошла ошибка при загрузке данных', 'OK');
});

setUserFormSubmit(createSuccessPopup);
setValidationForm();



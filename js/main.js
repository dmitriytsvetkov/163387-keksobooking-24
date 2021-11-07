import {
  disableForms,
  setUserFormSubmit,
  setValidationForm,
  setAllFilters
} from './form.js';
import {mapInit, rerenderMap} from './map.js';
import {createFailPopup, createSuccessPopup} from './popup.js';
import {getData} from './api.js';
import {enableForms} from './form.js';
import {setFilesPreview} from './photo-upload.js';

const run = async () => {
  try {
    disableForms();
    const offers = await getData();
    mapInit(offers);
    enableForms();
    setUserFormSubmit(createSuccessPopup);
    setValidationForm();
    setFilesPreview();
    setAllFilters(() => rerenderMap(offers));
  } catch (err) {
    createFailPopup('Произошла ошибка при загрузке данных', 'OK');
  }
};

run();

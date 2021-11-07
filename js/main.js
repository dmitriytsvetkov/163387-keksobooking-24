import {
  disableForms,
  setUserFormSubmit,
  setValidationForm,
  setAll
} from './form.js';
import {mapInit, rerenderMap} from './map.js';
import {createFailPopup, createSuccessPopup} from './popup.js';
import {getData} from './api.js';
import {enableForms} from './form.js';
import {setFilesPreview} from './photo-upload.js';

async function run() {
  try {
    disableForms();
    const offers = await getData();
    mapInit(offers);
    enableForms();
    setUserFormSubmit(createSuccessPopup);
    setValidationForm();
    setFilesPreview();
    setAll(() => rerenderMap(offers));
  } catch (err) {
    createFailPopup('Произошла ошибка при загрузке данных', 'OK');
  }
}

run();

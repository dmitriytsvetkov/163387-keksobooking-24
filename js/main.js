import {disableForms, setUserFormSubmit, setValidationForm, setAllFilters} from './form.js';
import {mapInit, rerenderMap} from './map.js';
import {createFailPopup, createSuccessPopup} from './popup.js';
import {setFilesPreview} from './photo-upload.js';

const run = async () => {
  try {
    disableForms();
    mapInit((offers) => {
      setUserFormSubmit(createSuccessPopup(offers));
      setValidationForm();
      setFilesPreview();
      setAllFilters(() => rerenderMap(offers));
    });
  } catch (err) {
    createFailPopup('Произошла ошибка при загрузке данных');
  }
};

run();

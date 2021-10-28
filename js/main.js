import {disableForms, setUserFormSubmit, setValidationForm} from './form.js';
import {mapInit} from './map.js';
import {createSuccessPopup} from './popup.js';


disableForms();
mapInit();
setUserFormSubmit(createSuccessPopup);
setValidationForm();



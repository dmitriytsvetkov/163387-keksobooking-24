import {HouseTypes} from './mock/offers.js';

const form = document.querySelector('.ad-form');
const roomNumberSelect = form.querySelector('#room_number');
const roomCapacitySelect = form.querySelector('#capacity');
const roomCapacityOptions = Array.from(roomCapacitySelect.options);
const flatTypeSelect = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const timeInSelect = form.querySelector('#timein');
const timeOutSelect = form.querySelector('#timeout');
const disabledFormClass = 'ad-form--disabled';
const roomsCapacityConditions = {
  1 : [
    '1',
  ],
  2 : [
    '1',
    '2',
  ],
  3 : [
    '1',
    '2',
    '3',
  ],
  100 : [
    '0',
  ],
};

const flatTypeMinPrices = {
  [HouseTypes.bungalow]: '0',
  [HouseTypes.flat] : '1000',
  [HouseTypes.hotel] : '3000',
  [HouseTypes.house] : '5000',
  [HouseTypes.palace] : '10000',
};

const disableInteractiveElements = (rootSelector, childrenSelector) => {
  const rootElement = document.querySelector(rootSelector);
  rootElement.classList.add(disabledFormClass);
  const childrenElements = rootElement.querySelectorAll(childrenSelector);
  childrenElements.forEach((element) => {
    element.disabled = true;
  });
};

const enableInteractiveElements = (rootSelector, childrenSelector) => {
  const rootElement = document.querySelector(rootSelector);
  rootElement.classList.remove(disabledFormClass);
  const childrenElements = rootElement.querySelectorAll(childrenSelector);
  childrenElements.forEach((element) => {
    element.disabled = false;
  });
};

const disableForms = () => {
  disableInteractiveElements('.ad-form', 'fieldset');
  disableInteractiveElements('.map__filters', 'fieldset, fieldset>input, select');
};

const enableForms = () => {
  enableInteractiveElements('.ad-form', 'fieldset');
  enableInteractiveElements('.map__filters', 'fieldset, fieldset>input, select');
};

const disablePlacesForRooms = (roomAmount) => {
  const result = roomsCapacityConditions[roomAmount];
  roomCapacityOptions.forEach((element) => {
    element.disabled = !result.includes(element.value);
  });
};

const selectInitialRoomOption = (rooms) => {
  const result = roomsCapacityConditions[rooms];
  if (!result.includes(roomCapacitySelect.value)) {
    roomCapacitySelect.value = result[0];
  }
};

const setValidationForm = () => {
  roomNumberSelect.addEventListener('change', (evt) => {
    disablePlacesForRooms(evt.target.value);
    selectInitialRoomOption(evt.target.value);
  });
  flatTypeSelect.addEventListener('change', (evt) => {
    const minValue = evt.target.value;
    priceInput.placeholder = flatTypeMinPrices[minValue];
    priceInput.min = flatTypeMinPrices[minValue];
  });
  timeOutSelect.addEventListener('change', (evt) => {
    timeInSelect.value = evt.target.value;
  });
  timeInSelect.addEventListener('change', (evt) => {
    timeOutSelect.value = evt.target.value;
  });
  roomNumberSelect.dispatchEvent(new Event('change'));
  flatTypeSelect.dispatchEvent(new Event('change'));
  timeOutSelect.dispatchEvent(new Event('change'));
};

export {disableForms, enableForms, setValidationForm};

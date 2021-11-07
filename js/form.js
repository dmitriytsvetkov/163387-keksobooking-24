import {HouseTypes} from './utils.js';
import {createFailPopup} from './popup.js';
import {sendData} from './api.js';

const form = document.querySelector('.ad-form');
const roomNumberSelect = form.querySelector('#room_number');
const roomCapacitySelect = form.querySelector('#capacity');
const roomCapacityOptions = Array.from(roomCapacitySelect.options);
const flatTypeSelect = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const timeInSelect = form.querySelector('#timein');
const timeOutSelect = form.querySelector('#timeout');
const disabledFormClass = 'ad-form--disabled';
const mapFiltersForm = document.querySelector('.map__filters');
const housingTypeSelect = mapFiltersForm.querySelector('#housing-type');
const housingPriceSelect = mapFiltersForm.querySelector('#housing-price');
const housingRoomsSelect = mapFiltersForm.querySelector('#housing-rooms');
const housingGuestsSelect = mapFiltersForm.querySelector('#housing-guests');
const mapCheckboxes = mapFiltersForm.querySelectorAll('.map__checkbox');
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

const HousingPricesConditions = {
  'low': 10000,
  'middle': 49999,
  'high': 50000,
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

const formReset = () => {
  form.reset();
  mapFiltersForm.reset();
  setValidationForm();
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', async (evt) => {
    try {
      evt.preventDefault();
      await sendData(new FormData(evt.target));
      onSuccess();
    } catch (err) {
      createFailPopup('Не удалось отправить форму', 'OK');
    }
  });
};

const compareGuests = (offer) => {
  if (housingGuestsSelect.value === 'any') {
    return true;
  }
  return offer.guests === +housingGuestsSelect.value;
};

const compareRooms = (offer) => {
  if (housingRoomsSelect.value === 'any') {
    return true;
  }
  return offer.rooms === +housingRoomsSelect.value;
};

const comparePrice = (offer) => {
  let result;
  if (housingPriceSelect.value === 'any') {
    return true;
  }
  if (offer.price <= HousingPricesConditions.low) {
    result = 'low';
  } else if (offer.price > HousingPricesConditions.low && offer.price < HousingPricesConditions.middle) {
    result = 'middle';
  } else {
    result = 'high';
  }

  return result === housingPriceSelect.value;
};

const compareType = (offer) => {
  if (housingTypeSelect.value === 'any') {
    return true;
  }
  return offer.type === housingTypeSelect.value;
};

const compareFeatures = (offer) => {
  const checkedCheckboxes = [];
  mapFiltersForm.querySelectorAll('input:checked').forEach((element) => {
    checkedCheckboxes.push(element.value);
  });
  if (checkedCheckboxes.length === 0) {
    return true;
  } else {
    if (offer.features) {
      const filteredArray = offer.features.filter((feature) => checkedCheckboxes.includes(feature));
      return filteredArray.length === checkedCheckboxes.length;
    } else {
      return false;
    }
  }
};

const filterOffers = ({offer}) => compareType(offer) && comparePrice(offer) && compareRooms(offer) && compareGuests(offer) && compareFeatures(offer);

const setTypeClick = (cb) => {
  housingTypeSelect.addEventListener('change', () => {
    cb();
  });
};

const setPriceClick = (cb) => {
  housingPriceSelect.addEventListener('change', () => {
    cb();
  });
};

const setRoomsClick = (cb) => {
  housingRoomsSelect.addEventListener('change', () => {
    cb();
  });
};

const setHousingGuestsClick = (cb) => {
  housingGuestsSelect.addEventListener('change', () => {
    cb();
  });
};
const setFeaturesClick = (cb) => {
  mapCheckboxes.forEach((element) => {
    element.addEventListener('change', () => {
      cb();
    });
  });
};

const setAllFilters = (cb) => {
  setTypeClick(cb);
  setPriceClick(cb);
  setRoomsClick(cb);
  setHousingGuestsClick(cb);
  setFeaturesClick(cb);
};

export {disableForms, enableForms, setValidationForm, setUserFormSubmit, formReset, setAllFilters, filterOffers};

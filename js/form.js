const form = document.querySelector('.ad-form');
const formRoomNumberSelect = form.querySelector('#room_number');
const formCapacitySelect = form.querySelector('#capacity');
const formCapacityOptions = Array.from(formCapacitySelect.options);
const disabledFormClass = 'ad-form--disabled';

const conditions = {
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

const disablePlacesForRooms = (rooms) => {
  const result = conditions[rooms];
  formCapacityOptions.forEach((element) => {
    element.disabled = !result.includes(element.value);
  });
};

const selectInitialOption = (rooms) => {
  const result = conditions[rooms];
  if (!result.includes(formCapacitySelect.value)) {
    formCapacitySelect.value = result[0];
  }
};

formRoomNumberSelect.addEventListener('change', (evt) => {
  disablePlacesForRooms(evt.target.value);
  selectInitialOption(evt.target.value);
});

disablePlacesForRooms(formRoomNumberSelect.value);
selectInitialOption(formRoomNumberSelect.value);

export {disableForms, enableForms};

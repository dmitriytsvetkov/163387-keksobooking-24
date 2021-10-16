const disabledFormClass = 'ad-form--disabled';

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
    element.disabled = true;
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

export {disableForms, enableForms};

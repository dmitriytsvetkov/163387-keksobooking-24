import {HouseTypes} from './mock/offers.js';
import {formReset} from './form.js';
import {mapReset} from './map.js';

const TRANSLATED_OFFER_TYPES = {
  [HouseTypes.flat]: 'Квартира',
  [HouseTypes.bungalow]: 'Бунгало',
  [HouseTypes.house]: 'Дом',
  [HouseTypes.palace]: 'Дворец',
  [HouseTypes.hotel]: 'Отель',
};

const createPopup = (offer) => {
  const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popup = popupTemplate.cloneNode(true);

  const popupTitle = popup.querySelector('.popup__title');
  const popupAddress = popup.querySelector('.popup__text--address');
  const popupPrice = popup.querySelector('.popup__text--price');
  const popupType = popup.querySelector('.popup__type');
  const popupCapacity = popup.querySelector('.popup__text--capacity');
  const popupTextTime = popup.querySelector('.popup__text--time');
  const popupDescription = popup.querySelector('.popup__description');
  const popupPhotosList = popup.querySelector('.popup__photos');
  const popupPhotoItem = popupPhotosList.querySelector('.popup__photo');
  const popupAvatar = popup.querySelector('.popup__avatar');
  const popupFeaturesContainer = popup.querySelector('.popup__features');
  const popupFeaturesList = popupFeaturesContainer.querySelectorAll('.popup__feature');

  if (offer.offer.title) {
    popupTitle.textContent = offer.offer.title;
  } else {
    popupTitle.classList.add('hidden');
  }
  if (offer.offer.address) {
    popupAddress.textContent = offer.offer.address;
  } else {
    popupAddress.classList.add('hidden');
  }
  if (offer.offer.price) {
    popupPrice.textContent = `${offer.offer.price} ₽/ночь`;
  } else {
    popupPrice.classList.add('hidden');
  }
  if (offer.offer.type) {
    popupType.textContent = TRANSLATED_OFFER_TYPES[offer.offer.type];
  } else {
    popupType.classList.add('hidden');
  }
  if (offer.offer.rooms && offer.offer.guests) {
    popupCapacity.textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  } else {
    popupCapacity.classList.add('hidden');
  }
  if (offer.offer.checkin && offer.offer.checkout) {
    popupTextTime.textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;
  } else {
    popupTextTime.classList.add('hidden');
  }
  if (offer.offer.description) {
    popupDescription.textContent = offer.offer.description;
  } else {
    popupDescription.classList.add('hidden');
  }
  if (offer.offer.photos) {
    offer.offer.photos.forEach((src) => {
      const newImg = popupPhotoItem.cloneNode(true);
      newImg.src = src;
      popupPhotosList.appendChild(newImg);
    });
    popupPhotoItem.remove();
  } else {
    popupPhotosList.classList.add('hidden');
  }
  if (offer.offer.features) {
    popupFeaturesList.forEach((item) => {
      const isNecessary = offer.offer.features.some(
        (feature) => item.classList.contains(`popup__feature--${feature}`),
      );

      if (!isNecessary) {
        item.remove();
      }
    });
  } else {
    popupFeaturesContainer.classList.add('hidden');
  }
  popupAvatar.src = offer.author.avatar;
  return popup;
};

const createSuccessPopup = () => {
  const popupTemplate = document.querySelector('#success').content.querySelector('.success');
  const popup = popupTemplate.cloneNode(true);
  document.body.appendChild(popup);

  formReset();
  mapReset();
  popup.addEventListener('click', () => {
    popup.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      popup.remove();
    }
  });
};

const createFailPopup = () => {
  const popupTemplate = document.querySelector('#error ').content.querySelector('.error');
  const popup = popupTemplate.cloneNode(true);
  const closeButton = popup.querySelector('.error__button');
  document.body.appendChild(popup);
  popup.addEventListener('click', () => {
    popup.remove();
  });
  closeButton.addEventListener('click', () => {
    popup.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      popup.remove();
    }
  });
};

export {createPopup, createSuccessPopup, createFailPopup};

const createPopup = (offer) => {
  const TRANSLATED_OFFER_TYPES = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector('.popup__title');
  const cardTextAddress = cardElement.querySelector('.popup__text--address');
  const cardTextPrice = cardElement.querySelector('.popup__text--price');
  const cardType = cardElement.querySelector('.popup__type');
  const cardTextCapacity = cardElement.querySelector('.popup__text--capacity');
  const cardTextTime = cardElement.querySelector('.popup__text--time');
  const cardDescription = cardElement.querySelector('.popup__description');
  const cardPhotosList = cardElement.querySelector('.popup__photos');
  const cardAvatar = cardElement.querySelector('.popup__avatar');
  const featuresContainer = cardElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');

  offer.offer.title ? cardTitle.textContent = offer.offer.title : cardTitle.classList.add('hidden');
  offer.offer.address ? cardTextAddress.textContent = offer.offer.address : cardTextAddress.classList.add('hidden');
  offer.offer.price ? cardTextPrice.textContent = `${offer.offer.price} ₽/ночь` : cardTextPrice.classList.add('hidden');
  if (offer.offer.type) {
    cardType.textContent = TRANSLATED_OFFER_TYPES[`${offer.offer.type}`];
  } else {
    cardType.classList.add('hidden');
  }
  offer.offer.rooms && offer.offer.guests ? cardTextCapacity.textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей` : cardTextCapacity.classList.add('hidden');
  offer.offer.checkin && offer.offer.checkout ? cardTextTime.textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}` : cardTextTime.classList.add('hidden');
  featuresList.forEach((item) => {
    const isNecessary = offer.offer.features.some(
      (feature) => item.classList.contains(`popup__feature--${feature}`),
    );

    if (!isNecessary) {
      item.remove();
    }
  });

  offer.offer.description ? cardDescription.textContent = offer.offer.description : cardDescription.classList.add('hidden') ;

  if (offer.offer.photos) {
    offer.offer.photos.forEach((src) => {
      const oldImg = cardPhotosList.querySelector('.popup__photo');
      const newImg = cardPhotosList.querySelector('.popup__photo').cloneNode(true);
      oldImg.remove();
      newImg.src = src;
      cardPhotosList.appendChild(newImg);
    });
  } else {
    cardPhotosList.classList.add('hidden');
  }

  cardAvatar.src = offer.author.avatar;
  return cardElement;
};

export {createPopup};

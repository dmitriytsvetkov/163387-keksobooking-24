import {createOffers} from './mock/offers.js';

const offers = createOffers();
const firstOffer = offers[6];

const mapCanvas = document.querySelector('#map-canvas');
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

mapCanvas.appendChild(cardElement);

// eslint-disable-next-line no-console
console.log(firstOffer);

firstOffer.offer.title ? cardTitle.textContent = firstOffer.offer.title : cardTitle.classList.add('hidden');
firstOffer.offer.address ? cardTextAddress.textContent = firstOffer.offer.address : cardTextAddress.classList.add('hidden');
firstOffer.offer.price ? cardTextPrice.textContent = `${firstOffer.offer.price} ₽/ночь` : cardTextPrice.classList.add('hidden');
firstOffer.offer.type ? cardType.textContent = firstOffer.offer.type : cardType.classList.add('hidden');
firstOffer.offer.rooms && firstOffer.offer.guests ? cardTextCapacity.textContent = `${firstOffer.offer.rooms} комнаты для ${firstOffer.offer.guests} гостей` : cardTextCapacity.classList.add('hidden');
firstOffer.offer.checkin && firstOffer.offer.checkout ? cardTextTime.textContent = `Заезд после ${firstOffer.offer.checkin}, выезд до ${firstOffer.offer.checkout}` : cardTextTime.classList.add('hidden');
//cardElement.querySelector('.popup__features').textContent = `Заезд после ${firstOffer.offer.checkin}, выезд до ${firstOffer.offer.checkout}`;
firstOffer.offer.description ? cardDescription.textContent = firstOffer.offer.description : cardDescription.classList.add('hidden') ;

if (firstOffer.offer.photos) {
  firstOffer.offer.photos.forEach((src) => {
    const oldImg = cardPhotosList.querySelector('.popup__photo');
    const newImg = cardPhotosList.querySelector('.popup__photo').cloneNode(true);
    oldImg.remove();
    newImg.src = src;
    cardPhotosList.appendChild(newImg);
  });
} else {
  cardPhotosList.classList.add('hidden');
}

cardAvatar.src = firstOffer.author.avatar; // TODO: Перенести код в отдельный модуль, подключить модуль в main.js

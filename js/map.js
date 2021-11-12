import {createFailPopup, createPopup} from './popup.js';
import {formReset, filterOffers, enableForms} from './form.js';
import {debounce} from './utils/debounce.js';
import {getData} from './api.js';

const MapSettings = {
  ZOOM: 12,
  MAX_OFFERS_COUNT: 10,
  MAIN_ICON_WIDTH: 52,
  MAIN_ICON_HEIGHT: 52,
  OFFER_ICON_WIDTH: 40,
  OFFER_ICON_HEIGHT: 40,
  MAIN_PIN_ICON_URL: 'img/main-pin.svg',
  OFFER_PIN_ICON_URL: 'img/pin.svg',
  TOKYO_LAT: 35.65283,
  TOKYO_LNG: 139.83947,
  DIVIDER: 2,
};

const mapContainer = document.querySelector('#map-canvas');
const addressInput = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');

const map = L.map(mapContainer);
const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: MapSettings.MAIN_PIN_ICON_URL,
  iconSize: [MapSettings.MAIN_ICON_WIDTH, MapSettings.MAIN_ICON_HEIGHT],
  iconAnchor: [MapSettings.MAIN_ICON_WIDTH / MapSettings.DIVIDER, MapSettings.MAIN_ICON_HEIGHT],
});

const mainPinMarker = L.marker(
  {
    lat: MapSettings.TOKYO_LAT,
    lng: MapSettings.TOKYO_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const mapReset = () => {
  map.closePopup();
  mainPinMarker.setLatLng({
    lat: MapSettings.TOKYO_LAT,
    lng: MapSettings.TOKYO_LNG,
  });

  map.setView({
    lat: MapSettings.TOKYO_LAT,
    lng: MapSettings.TOKYO_LNG,
  }, MapSettings.ZOOM);
};

const createOffer = (offer) => {
  const icon = L.icon({
    iconUrl: MapSettings.OFFER_PIN_ICON_URL,
    iconSize: [MapSettings.OFFER_ICON_WIDTH, MapSettings.OFFER_ICON_HEIGHT],
    iconAnchor: [MapSettings.OFFER_ICON_WIDTH / MapSettings.DIVIDER, MapSettings.OFFER_ICON_HEIGHT],
  });
  const marker = L.marker(
    {
      lat: offer.location.lat,
      lng: offer.location.lng,
    },
    {
      icon,
    },
  );
  marker.addTo(markerGroup).bindPopup(createPopup(offer));
};

const createOffers = (offers) => {
  offers
    .filter(filterOffers)
    .slice(0, MapSettings.MAX_OFFERS_COUNT)
    .forEach((offer) => {
      createOffer(offer);
    });
};

const clearMarkers = () => {
  markerGroup.clearLayers();
};

const rerenderMap = debounce(
  (offers) => {
    clearMarkers();
    createOffers(offers);
  },
);

const mapInit = (cb) => {
  map
    .on('load', async () => {
      try {
        const offers = await getData();
        enableForms();
        addressInput.value = `${MapSettings.TOKYO_LAT}, ${MapSettings.TOKYO_LNG}`;
        createOffers(offers);
        cb(offers);
        resetButton.addEventListener('click', (evt) => {
          evt.preventDefault();
          formReset();
          mapReset();
          rerenderMap(offers);
        });
      } catch (err) {
        createFailPopup('Произошла ошибка при загрузке данных');
      }
    })
    .setView({
      lat: MapSettings.TOKYO_LAT,
      lng: MapSettings.TOKYO_LNG,
    }, MapSettings.ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.addTo(map);

  mainPinMarker.on('move', (evt) => {
    addressInput.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });
};

export {mapInit, mapReset, rerenderMap};

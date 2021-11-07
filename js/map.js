import {createPopup} from './popup.js';
import {formReset, filterOffers} from './form.js';
import {debounce} from './utils/debounce.js';

const mapContainer = document.querySelector('#map-canvas');
const addressInput = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
const TOKYO_COORDS = {
  lat: 35.65283,
  lng: 139.83947,
};

const RERENDER_DELAY = 500;

const markers = [];

const map = L.map(mapContainer);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: TOKYO_COORDS.lat,
    lng: TOKYO_COORDS.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const mapReset = () => {
  map.closePopup();
  mainPinMarker.setLatLng({
    lat: TOKYO_COORDS.lat,
    lng: TOKYO_COORDS.lng,
  });

  map.setView({
    lat: TOKYO_COORDS.lat,
    lng: TOKYO_COORDS.lng,
  }, 12);
};

const createOffers = (offers) => {
  offers
    .slice()
    .filter(filterOffers)
    .slice(0, 10)
    .forEach((offer) => {
      const icon = L.icon({
        iconUrl: '../img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
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
      markers.push(marker);
      marker.addTo(map).bindPopup(createPopup(offer));
    });
};

const clearMarkers = () => {
  markers.forEach((marker) => {
    marker.remove();
  });
};

const rerenderMap = debounce(
  (offers) => {
    clearMarkers();
    createOffers(offers);
  }, RERENDER_DELAY,
);

const mapInit = (offers) => {
  map
    .on('load', () => {
      addressInput.value = `${TOKYO_COORDS.lat}, ${TOKYO_COORDS.lng}`;
      createOffers(offers);
    })
    .setView({
      lat: TOKYO_COORDS.lat,
      lng: TOKYO_COORDS.lng,
    }, 12);

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

  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    formReset();
    mapReset();
    rerenderMap(offers);
  });
};

export {mapInit, mapReset, rerenderMap};

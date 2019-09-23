'use strict';

var MAX_ADVERTS = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var MapRect = {
  LEFT: 0,
  TOP: 130,
  RIGHT: 1200,
  BOTTOM: 630
};

var PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

var titles = [
  'Отличная квартира с видом на вельзевула',
  'Дом в самом сердце жерла вулкана',
  'Хостел. Если боитесь крыс, берите с собой кошек',
  'Матрас на заднем дворе. За доп плату дам зонт'
];

var address = '600, 350';
var price = 2000;
var rooms = 4;
var guests = 5;
var description = 'заселяйся - и не выселишься';
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var map = document.querySelector('.map');
var pinAdvertTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinAdvertList = document.querySelector('.map__pins');

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomArray = function (array) {
  var newArray = [];
  var newLength = getRandomNumber(0, array.length);

  for (var i = 0; i < newLength; i++) {
    newArray.push(array[i]);
  }

  return newArray;
};

var getRandomFeatures = function () {
  return FEATURES.slice(0, getRandomNumber(0, FEATURES.length));
};

var getLocation = function () {
  return {
    x: getRandomNumber(MapRect.LEFT, MapRect.RIGHT),
    y: getRandomNumber(MapRect.TOP, MapRect.BOTTOM)
  }
};

var createAdvert = function (id) {
  var location = getLocation();

  return {
    author: {
      avatar: 'img/avatars/user0' + id + '.png',
    },
    offer: {
      title: getRandomElement(titles),
      address: location.x + ', ' + location.y,
      price: price,
      type: getRandomElement(TYPES),
      rooms: rooms,
      guests: guests,
      checkin: getRandomElement(CHECKIN_TIME),
      checkout: getRandomElement(CHECKOUT_TIME),
      features: getRandomFeatures(),
      description: description,
      photos: getRandomArray(photos)
    },
    location: location
  };
};

var generateAdverts = function (num) {
  var adverts = [];

  for (var i = 1; i < num; i++) {
    adverts.push(createAdvert(i));
  }

  return adverts;
};

var renderAdvert = function (advert) {
  var advertItem = pinAdvertTemplate.cloneNode(true);
  var advertAvatar = advertItem.querySelector('img');

  advertAvatar.src = advert.author.avatar;
  advertAvatar.alt = advert.offer.title;
  advertItem.style.left = advert.location.x - PinSize.WIDTH / 2 + 'px';
  advertItem.style.top = advert.location.y - PinSize.HEIGHT + 'px';

  return advertItem;
};

var addAdverts = function (adverts) {
  var fragment = document.createDocumentFragment();

  adverts.forEach(function (advert) {
    fragment.appendChild(renderAdvert(advert));
  });

  pinAdvertList.appendChild(fragment);
};

map.classList.remove('map--faded');

addAdverts(generateAdverts(MAX_ADVERTS));

'use strict';

var MAX_ADVERTS = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var LIMIT_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;

var titles = ['Отличная квартира с видом на вельзевула', 'Дом в самом сердце жерла вулкана', 'Хостел. Если боитесь крыс, берите с собой кошек', 'Матрас на заднем дворе. За доп плату дам зонт', 'Отличная квартира с видом на вельзевула', 'Дом в самом сердце жерла вулкана', 'Хостел. Если боитесь крыс, берите с собой кошек', 'Матрас на заднем дворе. За доп плату дам зонт'];
var address = '600, 350';
var price = 2000;
var rooms = 4;
var guests = 5;
var description = 'заселяйся - и не выселишься';
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
var pinAdvertTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinAdvertList = document.querySelector('.map__pins');

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var randomFromInterval = function (min, max) {
  var number = min + Math.random() * (max + 1 - min);
  return Math.floor(number);
};

var randomArray = function (array) {
  var newArray = [];
  var newLength = randomFromInterval(0, array.length);

  for (var i = 0; i < newLength; i++) {
    newArray.push(array[i]);
  }

  return newArray;
};

var createAdvert = function (id) {
  return {
    author: {
      avatar: 'img/avatars/user0' + id + '.png',
    },
    offer: {
      title: getRandomElement(titles),
      address: address,
      price: price,
      type: getRandomElement(TYPES),
      rooms: rooms,
      guests: guests,
      checkin: getRandomElement(CHECKIN_TIME),
      checkout: getRandomElement(CHECKOUT_TIME),
      features: randomArray(FEATURES),
      description: description,
      photos: randomArray(photos)
    },
    location: {
      x: randomFromInterval(0, LIMIT_X) + 'px',
      y: randomFromInterval(MIN_Y, MAX_Y) + 'px'
    }
  }
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

    advertItem.querySelector('img').src = advert.author.avatar;
    advertItem.querySelector('img').alt = advert.offer.title;
    advertItem.style.left = advert.location.x;
    advertItem.style.top = advert.location.y;

    return advertItem;
};

var addAdvert = function (adverts) {
  var fragment = document.createDocumentFragment();

  adverts.forEach(function (advert) {
    fragment.appendChild(renderAdvert(advert));
  });

  pinAdvertList.appendChild(fragment);
};

map.classList.remove('map--faded');

addAdvert(generateAdverts(MAX_ADVERTS));

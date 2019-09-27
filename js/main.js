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
  HEIGHT: 70,
  RADIUS: 25
};

var titles = [
  'Отличная квартира с видом на вельзевула',
  'Дом в самом сердце жерла вулкана',
  'Хостел. Если боитесь крыс, берите с собой кошек',
  'Матрас на заднем дворе. За доп плату дам зонт'
];

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
  };
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

  for (var i = 1; i <= num; i++) {
    adverts.push(createAdvert(i));
  }

  return adverts;
};

var renderAdvert = function (advert) {
  var advertItem = pinAdvertTemplate.cloneNode(true);
  var advertAvatar = advertItem.querySelector('img');

  advertAvatar.src = advert.author.avatar;
  advertAvatar.alt = advert.offer.title;
  advertItem.style.left = advert.location.x - PinSize.RADIUS + 'px';
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

//временно закомментировала, чтобы не мешала
// addAdverts(generateAdverts(MAX_ADVERTS));

//задание 8

//добавить disabled элементам управления формы

var advertForm = document.querySelector('.ad-form');
var advertFormParts = advertForm.querySelectorAll('fieldset');
var filterForm = document.querySelector('.map__filters');
var filterFormParts = filterForm.querySelectorAll('.map__filter');
var filterFormFeatures = filterForm.querySelector('.map__features').querySelectorAll('input');


var setDisabled = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].setAttribute('disabled', 'true');
  }
};

var blockPage = function () {
  setDisabled(advertFormParts);
  setDisabled(filterFormParts);
  setDisabled(filterFormFeatures);
};

blockPage();


//8.1 Активация страницы
var deleteDisabled = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].removeAttribute('disabled');
  }
};

var activatePage = function () {
  deleteDisabled(advertFormParts);
  deleteDisabled(filterFormParts);
  deleteDisabled(filterFormFeatures);
  map.classList.remove('map--faded');
  advertForm.classList.remove('ad-form--disabled');
};

//активация карты при клике mousedown на основной пин (.map__pin--main)
var mainPin = document.querySelector('.map__pin--main');

mainPin.addEventListener('mousedown', function() {
  activatePage();
});

//активация страницы при enter
var KeyboardKey = {
  ENTER: 'Enter'
};

var isEnterKey = function (evt) {
  return evt.key === KeyboardKey.ENTER;
};

mainPin.addEventListener('keydown', function(evt) {
  if (isEnterKey(evt)) {
    activatePage();
  }
});

//8.2 Заполнение поля адреса
//взаимодействие с меткой приводит к заполнению поля адреса
//поле адреса должно быть заполнено всегда, в том числе сразу после открытия страницы (см тз)

var addressInput = document.querySelector('#address');

var MainPinSize = {
  WIDTH: 62,
  HEIGHT: 84,
  RADIUS: 31
};

var mainPinX = mainPin.style.left;
var mainPinY = mainPin.style.top;

var mainPinLocation = {
  x: mainPinX,
  y: mainPinY
};

addressInput.value = mainPinLocation.x + ', ' + mainPinLocation.y;





//8.3 Непростая валидация
//установки соответствия количества гостей с количеством комнат
//Вы пишите код проверки соответствия и если выбранное количество гостей не подходит под количество комнат, вызываете метод setCustomValidity

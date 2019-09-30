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

var advertForm = document.querySelector('.ad-form');
var advertFormParts = advertForm.querySelectorAll('fieldset');
var filterForm = document.querySelector('.map__filters');
var filterFormParts = filterForm.querySelectorAll('.map__filter');
var filterFormFeatures = filterForm.querySelector('.map__features').querySelectorAll('input');
var mainPin = document.querySelector('.map__pin--main');
var addressInput = advertForm.querySelector('#address');

var MainPinSize = {
  WIDTH: 62,
  HEIGHT: 84,
  RADIUS: 31,
  HALF_HEIGHT: 42
};

var KeyboardKey = {
  ENTER: 'Enter'
};

var setDisabled = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].setAttribute('disabled', 'true');
  }
};

var blockPage = function () {
  setDisabled(advertFormParts);
  setDisabled(filterFormParts);
  setDisabled(filterFormFeatures);
  fillAddressDisable();
};

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
  fillAddressActivate();
};

var isEnterKey = function (evt) {
  return evt.key === KeyboardKey.ENTER;
};

mainPin.addEventListener('mousedown', function() {
  activatePage();
});

mainPin.addEventListener('keydown', function(evt) {
  if (isEnterKey(evt)) {
    activatePage();
  }
});

var mainPinX = Math.floor(parseInt(mainPin.style.left, 10));
var mainPinY = Math.floor(parseInt(mainPin.style.top, 10));

var mainPinLocation = {
  x: mainPinX,
  y: mainPinY
};

var fillAddressDisable = function () {
  addressInput.value = (mainPinLocation.x + MainPinSize.RADIUS) + ', ' + (mainPinLocation.y + MainPinSize.HALF_HEIGHT);
};

var fillAddressActivate = function () {
  addressInput.value = (mainPinLocation.x + MainPinSize.RADIUS) + ', ' + (mainPinLocation.y + MainPinSize.HEIGHT);
};


blockPage();

//8.3 Непростая валидация
var roomsSelect = advertForm.querySelector('#room_number');
var capacitySelect = advertForm.querySelector('#capacity');
var capacityList = capacitySelect.querySelectorAll('option');

var Style = {
  HIDDEN: 'hidden'
};

var showElement = function (element) {
  element.classList.remove(Style.HIDDEN);
};

var hideElement = function (element) {
  element.classList.add(Style.HIDDEN);
};

var roomToCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

var capacityToIndex = {};
capacityList.forEach(function (option) {
  capacityToIndex[option.value] = option.index;
});

var isNotSelected = function (options) {
  var selected = +capacityList[capacitySelect.selectedIndex].value;

  return options.indexOf(selected) === -1;
};

var getCapacityIndex = function (options) {
  return capacityToIndex[Math.max.apply(null, options)];
};

var getRoomValue = function (idx) {
  return roomsSelect.options[idx].value;
};

var syncCapacity = function (rooms) {
  var options = roomToCapacity[rooms];

  if (isNotSelected(options)){
    capacitySelect.selectedIndex = getCapacityIndex(options);
  }

  capacityList.forEach(function (option) {
    var hasOption = options.indexOf(+option.value) > -1;
    (hasOption ? showElement : hideElement)(option);
  })
};

var onRoomChange = function (evt) {
  syncCapacity(evt.target.value);
};

roomsSelect.addEventListener('change', onRoomChange);

syncCapacity(getRoomValue(roomsSelect.selectedIndex));

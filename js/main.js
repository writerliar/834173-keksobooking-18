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
var pinContainer = document.querySelector('.map__pins');

var Style = {
  HIDE: 'hidden',
  DISABLED: 'ad-form--disabled',
  FADE: 'map--faded'
};

var showElement = function (element) {
  element.classList.remove(Style.HIDE);
};

var hideElement = function (element) {
  element.classList.add(Style.HIDE);
};

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
  var pin = pinAdvertTemplate.cloneNode(true);
  var pinImage = pin.querySelector('img');

  pinImage.src = advert.author.avatar;
  pinImage.alt = advert.offer.title;
  pin.style.left = advert.location.x - PinSize.RADIUS + 'px';
  pin.style.top = advert.location.y - PinSize.HEIGHT + 'px';

  return pin;
};

var addAdverts = function (adverts) {
  var fragment = document.createDocumentFragment();

  adverts.forEach(function (advert) {
    fragment.appendChild(renderAdvert(advert));
  });

  pinContainer.appendChild(fragment);
};

addAdverts(generateAdverts(MAX_ADVERTS));

// задание 8
var advertForm = document.querySelector('.ad-form');
var advertFormParts = advertForm.querySelectorAll('fieldset');
var filterFormList = map.querySelectorAll('.map__filter, .map__checkbox');
var mainPin = document.querySelector('.map__pin--main');
var addressInput = advertForm.querySelector('#address');

var MainPinSize = {
  WIDTH: 65,
  HEIGHT: 80,
  RADIUS: 32
};

var getMainPinLocation = function (height) {
  return {
    x: mainPin.offsetLeft + MainPinSize.RADIUS,
    y: mainPin.offsetTop + height
  };
};

var renderAddress = function (coords) {
  addressInput.value = coords.x + ', ' + coords.y;
};

var KeyboardKey = {
  ENTER: 'Enter'
};

var setDisabled = function (element) {
  element.disabled = true;
};

var deleteDisabled = function (element) {
  element.disabled = false;
};

var setFormLock = function (locked) {
  advertFormParts.forEach(locked ? setDisabled : deleteDisabled);
  advertForm.classList[locked ? 'add' : 'remove'](Style.DISABLED);
  filterFormList.forEach(locked ? setDisabled : deleteDisabled);
};

var deactivatePage = function () {
  setFormLock(true);
  renderAddress(getMainPinLocation(MainPinSize.RADIUS));
  mainPin.addEventListener('mousedown', onMainPinMouseDown);
  mainPin.addEventListener('keydown', onMainPinEnterPress);
};

var activatePage = function () {
  setFormLock(false);
  map.classList.remove(Style.FADE);
  advertForm.classList.remove(Style.DISABLED);
  renderAddress(getMainPinLocation(MainPinSize.HEIGHT));
};

var isEnterKey = function (evt) {
  return evt.key === KeyboardKey.ENTER;
};

var onMainPinMouseDown = function () {
  activatePage();
  mainPin.removeEventListener('mousedown', onMainPinMouseDown);
  mainPin.removeEventListener('keydown', onMainPinEnterPress);
};

var onMainPinEnterPress = function (evt) {
  if (isEnterKey(evt)) {
    activatePage();
    mainPin.removeEventListener('mousedown', onMainPinMouseDown);
    mainPin.removeEventListener('keydown', onMainPinEnterPress);
  }
};

// 8.3 Непростая валидация
var roomsSelect = advertForm.querySelector('#room_number');
var capacitySelect = advertForm.querySelector('#capacity');
var capacityList = capacitySelect.querySelectorAll('option');

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

var syncCapacity = function (roomsQuantity) {
  var options = roomToCapacity[roomsQuantity];

  if (isNotSelected(options)) {
    capacitySelect.selectedIndex = getCapacityIndex(options);
  }

  capacityList.forEach(function (option) {
    var hasOption = options.indexOf(+option.value) > -1;
    (hasOption ? showElement : hideElement)(option);
  });
};

var onRoomChange = function (evt) {
  syncCapacity(evt.target.value);
};

roomsSelect.addEventListener('change', onRoomChange);

syncCapacity(getRoomValue(roomsSelect.selectedIndex));

deactivatePage();

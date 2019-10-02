'use strict';

(function() {
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

  var getRandomFeatures = function () {
    return FEATURES.slice(0, window.util.getRandomNumber(0, FEATURES.length));
  };

  var createAdvert = function (id) {
    var location = window.util.getLocation();

    return {
      author: {
        avatar: 'img/avatars/user0' + id + '.png',
      },
      offer: {
        title: window.util.getRandomElement(titles),
        address: location.x + ', ' + location.y,
        price: price,
        type: window.util.getRandomElement(TYPES),
        rooms: rooms,
        guests: guests,
        checkin: window.util.getRandomElement(CHECKIN_TIME),
        checkout: window.util.getRandomElement(CHECKOUT_TIME),
        features: getRandomFeatures(),
        description: description,
        photos: window.util.getRandomArray(photos)
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
    var pin = window.domRef.pinAdvertTemplate.cloneNode(true);
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

    window.domRef.pinContainer.appendChild(fragment);
  };

  addAdverts(generateAdverts(MAX_ADVERTS));
})();

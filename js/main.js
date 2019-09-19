'use strict';

//здесь константы
var MAX_ADVERTS = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var LIMIT = 1200;

//моки
var titles = ['Отличная квартира с видом на вельзевула', 'Дом в самом сердце жерла вулкана', 'Хостел. Если боитесь крыс, берите с собой кошек', 'Матрас на заднем дворе. За доп плату дам зонт', 'Отличная квартира с видом на вельзевула', 'Дом в самом сердце жерла вулкана', 'Хостел. Если боитесь крыс, берите с собой кошек', 'Матрас на заднем дворе. За доп плату дам зонт'];
var address = '600, 300';
var price = 2000;
var rooms = 4;
var guests = 5;
var description = 'заселяйся - и не выселишься';
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

//получение рандомного элемента
var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var avatarImg = 'img/avatars/user01.png';



//найти и разблокировать карту
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// найти шаблон пина, который будем копировать
var pinAdvertTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// найти элемент, в который будем добавлять пины
var pinAdvertList = document.querySelector('.map__pins');

// создать одно предложение
var makeAdvert = function () {
  for (var j = 1; j < MAX_ADVERTS; j++) {
    avatarImg = 'img/avatars/user0' + j + '.png';
  }
  var similarAdvert = [
    {
      author: {
        avatar: avatarImg,
      },
      offer: {
        title: 'отличная квартира с видом на вельзевула',
        address: '600, 350',
        price: 5000,
        type: 'bungalo',
        rooms: 3,
        guests: 5,
        checkin: '12:00',
        checkout: '14:00',
        features: 'wifi',
        description: 'descripyion',
        photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
      },
      location: {
        x: 500 + 'px', //случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка
        y: 130 + 'px' //случайное число, координата y метки на карте от 130 до 630
      }
    },
    {
      author: {
        avatar: avatarImg,
      },
      offer: {
        title: 'отличная квартира с видом на вельзевула',
        address: '600, 350',
        price: 5000,
        type: 'bungalo',
        rooms: 3,
        guests: 5,
        checkin: '12:00',
        checkout: '14:00',
        features: 'wifi',
        description: 'descripyion',
        photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
      },
      location: {
        x: 700 + 'px', //случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка
        y: 630 + 'px' //случайное число, координата y метки на карте от 130 до 630
      }
    },
    {
      author: {
        avatar: avatarImg,
      },
      offer: {
        title: 'отличная квартира с видом на вельзевула',
        address: '600, 350',
        price: 5000,
        type: 'bungalo',
        rooms: 3,
        guests: 5,
        checkin: '12:00',
        checkout: '14:00',
        features: 'wifi',
        description: 'descripyion',
        photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
      },
      location: {
        x: 400 + 'px', //случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка
        y: 300 + 'px' //случайное число, координата y метки на карте от 130 до 630
      }
    }
  ];
};

// добавим 8 шаблонов предложений
for (var i = 0; i < MAX_ADVERTS; i++) {
  var advertItem = pinAdvertTemplate.cloneNode(true);

  advertItem.querySelector('img').src = similarAdvert[i].author.avatar;
  advertItem.querySelector('img').alt = similarAdvert[i].offer.title;
  advertItem.style.left = similarAdvert[i].location.x;
  advertItem.style.top = similarAdvert[i].location.y;

  pinAdvertList.appendChild(advertItem);
}

//создаем массив из предложений

//автоматизируем его заполнение


// создадим массив на основе предложений




//Координаты:style="left: {{location.x}}px; top: {{location.y}}px;"
// src="{{author.avatar}}"
// alt="{{заголовок объявления}}"



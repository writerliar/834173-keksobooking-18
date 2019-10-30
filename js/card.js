'use strict';

(function () {
  var renderAdvertPopup = function (advert) {
    var advertTypeEnToRus = {
      flat: 'Квартира',
      bungalo: 'Бургало',
      house: 'Дом',
      palace: 'Дворец'
    };

    var getAdvertType = function () {
      return advertTypeEnToRus[advert.offer.type];
    };

    var popup = window.domRef.pinCardTemplate.cloneNode(true);
    var popupImg = popup.querySelector('.popup__avatar');
    var popupTitle = popup.querySelector('.popup__title');
    var popupAddress = popup.querySelector('.popup__text--address');
    var popupPrice = popup.querySelector('.popup__text--price');
    var popupType = popup.querySelector('.popup__type');
    var popupCapacity = popup.querySelector('.popup__text--capacity');
    var popupTime = popup.querySelector('.popup__text--time');
    var popupFeatures = popup.querySelector('.popup__features');
    var popupDesc = popup.querySelector('.popup__description');
    var popupPhotos = popup.querySelector('.popup__photos');

    var advertFeatures = advert.offer.features;
    var advertPhotos = advert.offer.photos;

    popupImg.src = advert.author.avatar;
    popupImg.alt = advert.offer.title;
    popupTitle.textContent = advert.offer.title;
    popupAddress.textContent = advert.offer.address;
    popupPrice.textContent = advert.offer.price + '₽/ночь';
    popupType.textContent = getAdvertType(advert);
    popupCapacity.textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    popupTime.textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    popupDesc.textContent = advert.offer.description;

    popupFeatures.innerHTML = advertFeatures.map(function (feature) {
      return '<li class="popup__feature popup__feature--' + feature + '"></li>';
    }).join(' ');

    popupPhotos.innerHTML = advertPhotos.map(function (photo) {
      return '<img class="popup__photo" src="' + photo + '" alt="" style="height: 40px;">';
    }).join(' ');

    return popup;
  };

  var addAdvertPopup = function (adverts) {
    var fragment = document.createDocumentFragment();

    fragment.appendChild(renderAdvertPopup(adverts[0]));

    window.domRef.map.insertBefore(fragment, window.domRef.filterContainer);
  };

  window.card = {
    addAdvertPopup: addAdvertPopup
  };
})();

'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var offerTypeEnToRus = {
    flat: 'Квартира',
    bungalo: 'Бургало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var getOfferType = function (offer) {
    return offerTypeEnToRus[offer.type];
  };

  var getOfferPrice = function (offer) {
    return offer.price + ' \u20bd/ночь';
  };

  var getOfferCapacity = function (offer) {
    return offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  };

  var getOfferTime = function (offer) {
    return 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  };

  var getFeatureMarkup = function (feature) {
    return '<li class="popup__feature popup__feature--' + feature + '"></li>';
  };

  var getPhotoMarkup = function (photo) {
    return '<img src="' + photo + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
  };

  var renderCard = function (advert) {
    var offer = advert.offer;

    var card = cardTemplate.cloneNode(true);

    card.querySelector('.popup__avatar').src = advert.author.avatar;
    card.querySelector('.popup__avatar').alt = offer.title;

    card.querySelector('.popup__title').textContent = offer.title;
    card.querySelector('.popup__text--address').textContent = offer.address;
    card.querySelector('.popup__description').textContent = offer.description;

    card.querySelector('.popup__type').textContent = getOfferType(offer);
    card.querySelector('.popup__text--price').textContent = getOfferPrice(offer);
    card.querySelector('.popup__text--capacity').textContent = getOfferCapacity(offer);
    card.querySelector('.popup__text--time').textContent = getOfferTime(offer);

    card.querySelector('.popup__features').innerHTML = offer.features.map(getFeatureMarkup).join(' ');

    card.querySelector('.popup__photos').innerHTML = offer.photos.map(getPhotoMarkup).join(' ');

    return card;
  };

  var removeCard = function () {
    window.util.removeElement(window.domRef.map.querySelector('.map__card'));
    document.removeEventListener('keydown', onCardEscapePress);
    window.card.onRemove();
    window.card.onRemove = window.util.noop;
  };

  var onCloseButtonClick = function (evt) {
    evt.preventDefault();
    removeCard();
  };

  var onCardEscapePress = function (evt) {
    window.util.isEscapeEvent(evt, removeCard);
  };

  var addCardListeners = function (card) {
    card.querySelector('.popup__close').addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onCardEscapePress);
  };

  var showCard = function (advert) {
    var card = renderCard(advert);
    addCardListeners(card);

    window.domRef.map.insertBefore(card, window.domRef.filterContainer);
  };

  window.card = {
    show: showCard,
    remove: removeCard,
    onRemove: window.util.noop,
  };
})();

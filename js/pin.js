'use strict';

(function () {
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70,
    RADIUS: 25
  };

  var MAX_ADVERTS = 5;

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

    var stopNumber = adverts.length >= MAX_ADVERTS ? MAX_ADVERTS : adverts.length;

    for (var i = 0; i < stopNumber; i++) {
      fragment.appendChild(renderAdvert(adverts[i]));
    }

    window.domRef.pinContainer.appendChild(fragment);
  };

  var onDataLoadError = function (message) {
    window.message.showError(message);
  };

  var adverts = [];

  var onDataLoad = function (data) {
    adverts = data;
    window.domRef.filterFormList.forEach(window.util.deleteDisabled);
    window.filter.filterAdverts(adverts);
    window.card.addAdvertPopup(adverts);
  };

  window.pin = {
    onDataLoadError: onDataLoadError,
    onDataLoad: onDataLoad,
    addAdverts: addAdverts
  };
})();

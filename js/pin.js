'use strict';

(function () {
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70,
    RADIUS: 25
  };

  var renderPin = function (advert) {
    var pin = window.domRef.pinAdvertTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pinImage.src = advert.author.avatar;
    pinImage.alt = advert.offer.title;
    pin.style.left = advert.location.x - PinSize.RADIUS + 'px';
    pin.style.top = advert.location.y - PinSize.HEIGHT + 'px';

    pin.addEventListener('click', function () {
      var cardPopup = document.querySelector('.map__card');

      pin.classList.add('main__pin--active');

      if (cardPopup === null) {
        window.card.show(advert);
      } else {
        window.card.remove();
        window.card.show(advert);
      }
    });

    return pin;
  };

  var addAdverts = function (adverts) {
    var fragment = document.createDocumentFragment();

    adverts.forEach(function (advert) {
      fragment.appendChild(renderPin(advert));
    });

    window.domRef.pinContainer.appendChild(fragment);
  };

  var deletePins = function () {
    var pins = window.domRef.pinContainer.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(window.util.removeElement);
  };

  var onDataLoad = function (data) {
    window.pin.adverts = data;
    window.filter.activate();
  };

  var onDataLoadError = function (message) {
    window.message.showError(message);
  };

  window.pin = {
    onDataLoadError: onDataLoadError,
    onDataLoad: onDataLoad,
    add: addAdverts,
    delete: deletePins
  };
})();

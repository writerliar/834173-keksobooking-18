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
      var activePin = window.domRef.pinContainer.querySelector('.map__pin--active');

      if (activePin === null) {
        pin.classList.add('map__pin--active');
      } else {
        activePin.classList.remove('map__pin--active');
        pin.classList.add('map__pin--active');
      }

      window.card.remove();
      window.card.show(advert);
    });

    return pin;
  };

  var renderPins = function (adverts) {
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
    window.filter.update();
  };

  var onDataLoadError = function (message) {
    window.message.showError(message);
  };

  window.pin = {
    onDataLoadError: onDataLoadError,
    onDataLoad: onDataLoad,
    add: renderPins,
    delete: deletePins
  };
})();

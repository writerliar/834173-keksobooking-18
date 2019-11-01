'use strict';

(function () {
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70,
    RADIUS: 25
  };

  var setPinActive = function (pin, active) {
    pin.classList[active ? 'add' : 'remove']('map__pin--active');
  };

  var renderPin = function (advert) {
    var pin = window.domRef.pinAdvertTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pinImage.src = advert.author.avatar;
    pinImage.alt = advert.offer.title;
    pin.style.left = advert.location.x - PinSize.RADIUS + 'px';
    pin.style.top = advert.location.y - PinSize.HEIGHT + 'px';

    pin.addEventListener('click', function () {
      setPinActive(pin, true);

      window.card.remove();
      window.card.show(advert);
      window.card.onRemove = function () {
        setPinActive(pin, false);
      };
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

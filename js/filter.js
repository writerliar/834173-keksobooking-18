'use strict';

(function () {
  var filterAdverts = function (adverts) {
    var getTypeValue = function (idx) {
      return window.domRef.filterOfType.options[idx].value;
    };

    var typeOfHousing;
    var sameTypeOfHousing;

    var advertsCopy = adverts.slice();

    var clearAdverts = function (array) {
      for (var i = array.length; i > 0; i--) {
        array.pop();
      }
    };

    var excludeMainPin = function (pins) {
      pins.shift();
    };

    window.domRef.filterOfType.addEventListener('change', window.debounce(function () {
      typeOfHousing = getTypeValue(window.domRef.filterOfType.selectedIndex);

      sameTypeOfHousing = adverts.filter(function (advert) {
        return advert.offer.type === typeOfHousing;
      });

      var pins = window.domRef.pinContainer.querySelectorAll('.map__pin');
      var pinsArray = Array.from(pins);

      excludeMainPin(pinsArray);

      pinsArray.forEach(function (pin) {
        window.util.deleteElement(pin);
      });

      clearAdverts(advertsCopy);

      if (typeOfHousing === 'any') {
        adverts.forEach(function (advert) {
          advertsCopy.push(advert);
        });
      } else {
        sameTypeOfHousing.forEach(function (type) {
          advertsCopy.push(type);
        });
      }

      window.pin.addAdverts(advertsCopy);
    }));

    window.pin.addAdverts(advertsCopy);
  };

  window.filter = {
    filterAdverts: filterAdverts
  };
})();
